import { getSession } from "@auth0/nextjs-auth0";
import stripeInit from 'stripe';
import ClientPromise from "../../lib/mongodb";

const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const {user} = await getSession(req, res);

  const lineItems = [{
    price: process.env.STRIPE_PRODUCT_PRICE_ID,
    quantity: 1,
  }]

  // line_items: [
  //   {
  //     price_data: {
  //       currency: 'usd',
  //       product_data: {
  //         name: 'Your Product Name',
  //       },
  //       unit_amount: 2000,
  //     },
  //     quantity: 1,
  //   },
  // ],

  const protocol  = process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
  const host = req.headers.host;
  
  const checkoutSession = await stripe.checkout.sessions.create({
    line_items: lineItems,
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${protocol}${host}/purchase/success`,
    cancel_url: `${protocol}${host}/purchase/cancel`,
  })

  // console.log("This is the user:", user);
  try {
      const client = await ClientPromise;
      // console.log("This is the client:", client);
      const db = client.db('quillwind');
      const userProfile = await db.collection('users').updateOne({
        auth0Id: user.sub
      },{
        $inc: {
          availableQuillbucks: 10
        },
        $setOnInsert: {
          auth0Id: user.sub
        }
      },{
        upsert: true
      });
  

      res.status(200).json({ session: checkoutSession })
    } catch (error) {
      res.status(500).json({ error })
    }
}


  