// pages/api/checkbucks.js

import { getSession } from "@auth0/nextjs-auth0";
import ClientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const {user} = await getSession(req, res);
  const client = await ClientPromise;
  const db = client.db('quillwind');
  const userProfile = await db.collection('users').findOne({auth0Id: user.sub});

  if (!userProfile) {
    // User not found in database, create a new profile
    await db.collection('users').insertOne({
      auth0Id: user.sub,
      availableQuillbucks: 20  // You can set an initial value or modify as needed
    });
  }

  if(userProfile) {5
    res.status(200).json({ availableQuillbucks: userProfile.availableQuillbucks });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}
