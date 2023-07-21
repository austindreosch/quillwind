import { withPageAuthRequired } from "@auth0/nextjs-auth0"

export default function BuyBucks() {
    return (
      <div>
        <h1>This is where you buy quillbucks!</h1>
      </div>
    )
  
  }
  
export const getServerSideProps = withPageAuthRequired(() => {
  return {
      props: {
      }
  }
})