import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";

export default function BuyBucks() {

  const handleClick = async (e) => {
    e.preventDefault();
    let response = await axios.post('/api/addbucks');
    const json = response.data;
    console.log("THIS IS THE AXIOS RESPONSE ON PURCHASE",json);
    window.location.href = json.session.url;
  }  

    return (
      <div>
        <h1>Quillbucks Dashboard</h1>
        <button onClick={handleClick} className="text-my-white bg-my-green w-64 text-center cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-my-white hover:text-my-black transition-colors block text-heading-500 tracking-widest my-4 mx-auto">Add Quillbucks</button>
      </div>
    )
  
  }

BuyBucks.getLayout = function getLayout(page, pageProps) {
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