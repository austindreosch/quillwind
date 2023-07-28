import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { useRouter } from 'next/router';
import { useState } from "react";
import { Comment } from 'react-loader-spinner';
import { AppLayout } from "../../components/AppLayout";
import { PostForm } from "../../components/PostForm";
import { getAppProps } from "../../utils/getAppProps";
 
export default function NewPost(props) {
    const router = useRouter();
    const [topic, setTopic] = useState("");
    const [keywords, setKeywords] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
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
        <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-[550px] bg-gray-100 shadow-lg rounded-lg">
                <form class="px-9 py-6" onSubmit={handleSubmit}>
                    <div class="mb-5">
                        <label  className="mb-3 block text-base font-medium text-[#07074D]"> Generate a blog post on the topic of: </label>
                        <textarea placeholder="Best places to visit in Italy" class="w-full rounded-md border border-[#e0e0e0] bg-my-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#007ea7ff] focus:shadow-md" value={topic} onChange={(evt) => setTopic(evt.target.value)} />
                    </div>
                    <div class="mb-5">
                        <label class="mb-3 block text-base font-medium text-[#07074D]"> Targeting the following keywords: </label>
                        <input  placeholder="food, beaches, wine" className="w-full rounded-md border border-[#e0e0e0] bg-my-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#007ea7ff] focus:shadow-md" value={keywords} onChange={(evt) => setKeywords(evt.target.value)} />
                        <p class="my-1 block text-base font-light text-gray-400">(Seperate keywords with a comma.)</p>
                    </div>
                    <div>
                        {/* <button class="hover:shadow-form w-full rounded-md bg-[#00a8e8ff] px-8 py-3 text-center text-base font-semibold text-white outline-none text-heading-500 tracking-widest">GENERATE</button>
                         */}
                        <button
                        type="submit"
                        className="text-my-white bg-my-lightblue w-full px-8 py-3 text-center outline-none cursor-pointer uppercase rounded-md hover:bg-my-white hover:text-my-black hover:ring-4 hover:ring-[#00a8e8ff] hover:shadow-inset hover:ring-opacity-50 transition-colors block text-heading-500 tracking-widest"
                        >
                        Generate
                        </button>
                    </div>
                </form>
            </div>
            {isLoading ? (
                <div className="fixed inset-0 flex items-center justify-center pl-80">
                    <Comment visible={true} height="80" width="80" ariaLabel="comment-loading" wrapperStyle={{}} wrapperClass="comment-wrapper" color="#fff" backgroundColor="#00a8e8ff" />
                </div>
                ) : null},
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