import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function NewPost(props) {
    console.log("This is the new post props.", props);
    return (
        <div>
        <h1>This is the new post page.</h1>
        </div>
    )
}
  

export const getServerSideProps = withPageAuthRequired(() => {
    return {
        props: {
        }
    }
})