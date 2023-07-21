import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { AppLayout } from "../components/AppLayout"

export default function BuyBucks() {
    return (
      <div>
        <h1>This is where you buy quillbucks!</h1>
      </div>
    )
  
  }

BuyBucks.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
}
  
export const getServerSideProps = withPageAuthRequired(() => {
  return {
      props: {
      }
  }
})