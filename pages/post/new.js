import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { useRouter } from 'next/router';
import { useState } from "react";
import { Comment } from 'react-loader-spinner';
import { AppLayout } from "../../components/AppLayout";
import { getAppProps } from "../../utils/getAppProps";
 
export default function NewPost(props) {
    const router = useRouter();
    const [topic, setTopic] = useState("");
    const [keywords, setKeywords] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFormVisible(false);
        const startTime = Date.now();
        try{
            const response = await axios.post('/api/generatepost', {topic, keywords}, {
                headers: {
                    'content-type': 'application/json',
                }
            });
            console.log('Response data:', response.data); 
            if(response.data.postId){
                router.push(`/post/${response.data.postId}`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            const endTime = Date.now();  // Record the end time
            const duration = endTime - startTime;  // Calculate the difference
            console.log(`GPT-3 generation took ${duration} milliseconds`);
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-12">
            <div className="w-[550px] h-[320px] max-w-[550px] rounded-lg bg-gray-100 shadow-lg">
                    <form className={`px-9 py-6 ${formVisible ? "" : "hidden"}`} onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label className="mb-3 block text-base  text-[#07074D]"> Generate a blog post on the topic of: </label>
                            <input placeholder="Best places to visit in Italy" class="w-full rounded-md border border-[#e0e0e0] bg-my-white px-6 py-3 text-base  text-[#6B7280] outline-none focus:border-[#007ea7ff] focus:shadow-md" value={topic} onChange={(evt) => setTopic(evt.target.value)} />
                        </div>
                        <div className="mb-5">
                            <label className="mb-3 font-body block text-base  text-[#07074D]"> Targeting the following keywords: </label>
                            <input placeholder="food, beaches, wine" className="w-full rounded-md border border-[#e0e0e0] bg-my-white px-6 py-3 text-base  text-[#6B7280] outline-none focus:border-[#007ea7ff] focus:shadow-md" value={keywords} onChange={(evt) => setKeywords(evt.target.value)} />
                            {/* <p class="my-1 block text-base font-light text-gray-400">(Seperate keywords with a comma.)</p> */}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="disabled:bg-gray-200 disabled:cursor-not-allowed text-my-white bg-my-lightblue w-full px-8 py-3 text-center outline-none cursor-pointer uppercase rounded-md hover:bg-my-white hover:text-my-black hover:ring-4 hover:ring-[#00a8e8ff] hover:shadow-inset hover:ring-opacity-50 transition-colors block text-heading-500 tracking-widest"
                                disabled={!topic.trim() || !keywords.trim()}
                            >
                                Generate
                            </button>
                        </div>
                    </form>

                {/* Loading spinner */}
                {isLoading ? (
                    <div className="fixed inset-0 flex items-center justify-center pl-[310px]">
                        <Comment visible={true} height="80" width="80" ariaLabel="comment-loading" wrapperStyle={{}} wrapperClass="comment-wrapper" color="#fff" backgroundColor="#00a8e8ff" />
                    </div>
                ) : null}
            </div>
        </div>
    )



}
  
NewPost.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
    
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
      const props = await getAppProps(context);
      return {
        props
      }
    }
})