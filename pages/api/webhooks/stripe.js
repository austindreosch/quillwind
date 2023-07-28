import verifyStripe from '@webdeveducation/next-verify-stripe';
import Cors from 'micro-cors';
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
    console.log('Incoming request:', req.method, req.url);
    // rest of your code...

    if(req.method === 'POST'){
        let event;
        try {
            event = await verifyStripe({req, stripe, endpointSecret});
        } catch (error) {
            console.log(error);
            return res.status(400).send(`Webhook Error: ${error.message}`);
        }

        switch (event.type) { 
            case 'payment_intent.succeeded': {
                const client = await ClientPromise;
                const db = client.db('quillwind');
                const paymentIntent = event.data.object;
                const auth0Id = paymentIntent.metadata.sub;

                console.log("Auth0Id: ", auth0Id);  // Debugging line

                const userProfile = await db.collection('users').updateOne({
                  auth0Id,
                },{
                  $inc: {
                    availableQuillbucks: 5
                  },
                  $setOnInsert: {
                    auth0Id,
                  }
                },{
                  upsert: true
                });
            }
            default:{
                console.log(`Unhandled event type: ${event.type}`);
            }
        }
        res.status(200).json({received: true});
    }
}



export default cors(handler);