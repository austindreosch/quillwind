import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

      <div className="flex items-center justify-center min-h-screen p-12">
        <div className="w-[550px] h-[320px] max-w-[550px] rounded-lg bg-gray-100 shadow-lg text-center">
          <div className="flex items-center justify-center">
            <div className="text-5xl text-center font-heading pb-4 font-semibold text-my-green ml-2">
            <FontAwesomeIcon icon={faSackDollar} className="text-my-yellow mx-auto mt-20 pb-2 px-2" size="2x"/>  
                5
            </div>
          </div>
          <button onClick={handleClick} className="text-my-white bg-my-green w-64 text-center cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-my-white hover:text-my-black transition-colors block text-heading-500 tracking-widest my-4 mx-auto">Add Quillbucks</button>
        </div>
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