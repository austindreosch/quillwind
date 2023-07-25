import { getSession } from "@auth0/nextjs-auth0";
import ClientPromise from "../lib/mongodb";



export const getAppProps  = async (context) => {
    const userSession = await getSession(context.req, context.res);
    const client = await ClientPromise;
    const db = client.db('quillwind');
    const user = await db.collection('users').findOne({
        auth0Id: userSession.user.sub
    });

    if (!user) {
        return {
            availableQuillbucks: 0,
            posts: []
        };
    }

    const posts = await db.collection('posts').find({
        userId: user._id
    }).sort({
        created: -1
    }).toArray();

    return {
        availableQuillbucks: user.availableQuillbucks,
        posts: posts.map(({created, _id, userId, ...rest}) => ({
            _id: _id.toString(),
            created: created.toString(),
            ...rest 
        })),
        // could send quillbucks and postid here for AppLayout
    };
}