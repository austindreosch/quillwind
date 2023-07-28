import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";

export default function Success() {

    return (
      <div>
        <h1>Thank you so much for your purchase!</h1>
      </div>
    )
  
  }

Success.getLayout = function getLayout(page, pageProps) {
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