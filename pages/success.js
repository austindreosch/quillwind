import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";

export default function Success() {

    return (
      <div className="flex items-center justify-center min-h-screen p-12">
        <div className="w-[550px] h-[320px] max-w-[550px] rounded-lg bg-gray-100 shadow-lg text-center">
          <FontAwesomeIcon icon={faBagShopping} className="text-my-green mx-auto mt-20 pb-2 " size="4x"/>
          <div className="text-3xl text-center pb-4 font-body-600 text-my-darkblue">
              Thank you for your purchase!
          </div>
          <Link href="/post/new" className="text-my-white bg-my-lightblue w-64 text-center cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-my-white hover:text-my-black transition-colors block text-heading-500 tracking-widest mx-auto">New Post</Link>
        </div>
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