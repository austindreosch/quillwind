import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";

export default function NewPost(props) {
    console.log("This is the new post props.", props);

    const handleClick = async () => {
        const reponse = fetch('/api/generatePost', {
            method: 'POST',
        });
        const json = await reponse.json();
        console.log("Result:", json);
    }

    return (
        <div>
            <button className="text-my-white bg-my-lightblue w-64 text-center cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-my-white hover:text-my-black transition-colors block text-heading-500 tracking-widest my-4 mx-auto">
                <a href="/api/generatePost">Generate</a>
            </button>
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