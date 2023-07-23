import { getSession } from "@auth0/nextjs-auth0";
import ClientPromise from "../../lib/mongodb";


export default async function handler(req, res) {
  const {user} = await getSession(req, res);
  console.log("This is the user:", user);
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
  

      res.status(200).json({ name: 'John Doe' })
    } catch (error) {
      res.status(500).json({ error })
    }
}


  