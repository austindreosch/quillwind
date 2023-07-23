import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
import { AppLayout } from "../../components/AppLayout";
import ClientPromise from "../../lib/mongodb";

export default function Post(props) {
    console.log("This is the post props.", props);
    return (
      <div>
        <h1>This is the post page.</h1>
      </div>
    )
  
  }
  

  export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async (context) => {
      const userSession = await getSession(context.req, context.res);
      const client = await ClientPromise;
      const db = client.db('quillwind');
      const user = await db.collection('users').findOne({
        auth0Id: userSession.user.sub
      });
  
      const post = await db.collection('posts').findOne({
        _id: new ObjectId(context.params.postID), // this is the postID from the URL
        userId: user._id
      });
  
      if (!post) {
        return {
          redirect: {
            destination: '/post/new',
            permanent: false
          }
        };
      }
      return {
        props: {
          postContent: post.postContent,
          title: post.title,
          metaDescription: post.metaDescription,
          topic: post.topic,
          keywords: post.keywords
        }
      }
    }
  });
  


Post.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
  
}