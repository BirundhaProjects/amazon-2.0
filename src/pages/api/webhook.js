import { buffer } from "micro"
import { firestoreAdmin, admin } from "../../../firebase";



//Establish connection to stripe

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fullfillOrder = async (session) => {
    try {
      await firestoreAdmin
        .collection('users')
        .doc(session.metadata.email)
        .collection('orders')
        .doc(session.id)
        .set({
          amount: session.amount_total / 100,
          amount_shipping: session.total_details.amount_shipping,
          images: JSON.parse(session.metadata.images),
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
  
      console.log(`Success! Order ${session.id} has been added to the database.`);
    } catch (error) {
      console.error(`Error adding order to the database: ${error}`);
    }
  };

export default async (req, res) => {
    if(req.method == 'POST'){
        const requestbuffer = await buffer(req);
        const payload = requestbuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;

        // Verify webhook signature and extract the event.
        // See https://stripe.com/docs/webhooks/signatures for more information.
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            return response.status(400).send(`Webhook Error: ${err.message}`);
        }

        //handle checkout.session.completed event

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            return fullfillOrder(session)
              .then(() => res.status(200).end())
              .catch((err) => res.status(400).send(`Webhook error: ${err.message}`));
          }
    }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    }
}