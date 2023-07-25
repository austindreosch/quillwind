import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObjectId } from "mongodb";
import { AppLayout } from "../../components/AppLayout";
import ClientPromise from "../../lib/mongodb";
import { getAppProps } from "../../utils/getAppProps";

export default function Post(props) {
  console.log("This is the post props.", props);
  return (
    <div className="overflow-auto h-full">
      <div className="max-w-screen-sm mx-auto">
        <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded sm">
          Title & Meta Description
        </div>
        <div className="p-4 my-2 border border-stone-200 rounded-md">
          <div className="text-my-midblue text-2xl">{props.title.replace(/<\/?[^>]+(>|$)/g, "")}</div>
          <div className="mt-2 ">{props.metaDescription}</div>
        </div>
        <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded sm">
          Keywords
        </div>
        <div className="flex flex-wrap pt-2 gap-1">
        {props.keywords.split(", ").map((keyword, index) => {
          return (
            <div key={index} className="p-2 rounded-full bg-my-black text-my-white">
              <FontAwesomeIcon icon={faHashtag}/> {keyword}
            </div>
          );
        })}
        </div>
        <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded sm">
          Blog
        </div>
        <div dangerouslySetInnerHTML={{__html: props.postContent}}></div>
      </div>
    </div>
  )
  
}
  

  export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async (context) => {

      const props = await getAppProps(context);

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
          keywords: post.keywords,
          ...props
        }
      }
    }
  });
  


Post.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
  
}