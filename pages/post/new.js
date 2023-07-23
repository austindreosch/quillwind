import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { useState } from "react";
import { Comment } from 'react-loader-spinner';
import { AppLayout } from "../../components/AppLayout";

export default function NewPost(props) {
    // console.log("This is the new post props.", props);
    const [postContent, setPostContent ] = useState("");
    const [topic, setTopic] = useState("");
    const [keywords, setKeywords] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // console.log("we are loading new post");
        try{
            const response = await axios.post('/api/generatepost', {topic, keywords}, {
                headers: {
                    'content-type': 'application/json',
                }
            });
            console.log('Response data:', response.data); 
            setPostContent(response.data.post.postContent);
        } catch (error) {
            console.log(error);
        } finally {
            // console.log("we are done loading new post");
            setIsLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <strong>Generate a blog post on the topic of:</strong>
                    </label>
                    <textarea  className="resize-none border border-my-black w-full block my-2 px-4 py-2 rounded-sm" value={topic} onChange={(evt) => setTopic(evt.target.value)}></textarea>
                </div>
                <div>
                    <label>
                        <strong>Targeting the following keywords: </strong>
                    </label>
                    <textarea className="resize-none border border-my-black w-full block my-2 px-4 py-2 rounded-sm" value={keywords} onChange={(evt) => setKeywords(evt.target.value)}></textarea>
                </div>
                <button type="submit" className="text-my-white bg-my-lightblue w-64 text-center cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-my-white hover:text-my-black transition-colors block text-heading-500 tracking-widest my-4 mx-auto">
                    Generate
                </button>
            </form>
            {isLoading ? (
                <div className="fixed inset-0 flex items-center justify-center pl-80">
                    <Comment visible={true} height="80" width="80" ariaLabel="comment-loading" wrapperStyle={{}} wrapperClass="comment-wrapper" color="#fff" backgroundColor="#00a8e8ff" />
                </div>
                ) : null}
                {!isLoading && postContent && (
                <div>
                    <div dangerouslySetInnerHTML={{ __html: postContent }} />
                </div>
                )}
        </div>
    )
}
  
NewPost.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
    
}

export const getServerSideProps = withPageAuthRequired(() => {
    return {
        props: {
        }
    }
})