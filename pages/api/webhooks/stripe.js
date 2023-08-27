import verifyStripe from '@webdeveducation/next-verify-stripe';
import Cors from 'micro-cors';
// import getRawBody from 'raw-body';
import stripeInit from 'stripe';
import ClientPromise from "../../../lib/mongodb";

const cors = Cors({
    allowMethods: ['POST', 'HEAD'],
})

export const config = {
    api: {
        bodyParser: false,
    }
}

const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handler = async (req, res) => {
  console.log('Received Stripe webhook request:', req.method, req.url);

  if(req.method === 'POST'){
      let event;
      try {
          console.log('Verifying Stripe webhook signature...');


          // const rawBody = await getRawBody(req);
          // console.log("Raw body:", rawBody.toString('utf8'));
          // console.log("Stripe-Signature header:", req.headers['stripe-signature']);


          event = await verifyStripe({req, stripe, endpointSecret});
          console.log('Webhook event verified:', event.type);
      } catch (error) {
          console.error('Error during Stripe webhook verification:', error);
          return res.status(400).send(`Webhook Error: ${error.message}`);
      }

      switch (event.type) { 
          case 'payment_intent.succeeded': {
              console.log('Processing payment_intent.succeeded event...');
              const client = await ClientPromise;
              const db = client.db('quillwind');
              const paymentIntent = event.data.object;
              const auth0Id = paymentIntent.metadata.sub;

              console.log("Auth0Id from payment intent:", auth0Id);

              const result = await db.collection('users').updateOne({
                auth0Id: auth0Id
              },{
                $inc: {
                  availableQuillbucks: 10
                },
                $setOnInsert: {
                  auth0Id,
                }
              },{
                upsert: true
              });
              console.log('User profile updated:', result);
              break;
          }
          default:{
              console.log(`Unhandled event type: ${event.type}`);
              break;
          }
      }
      res.status(200).json({received: true});
  }
}



export default cors(handler);