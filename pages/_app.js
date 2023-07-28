import { UserProvider } from '@auth0/nextjs-auth0/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { DM_Sans, Rubik } from '@next/font/google';
import '../styles/globals.css';
config.autoAddCss = false;

const dmSans = DM_Sans ({
  weight : ['400', '500', '700'],
  subsets: ['latin'],
  variable: "--font-dm-sans"
})
const rubik = Rubik ({
  weight : ['400', '500', '700'],
  subsets: ['latin'],
  variable: "--font-rubik"
})


function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <UserProvider>
      <main className={`${dmSans.variable} ${rubik.variable} font-body`}>
        {getLayout(<Component {...pageProps} />, pageProps)}
      </main>
    </UserProvider>
  )
}

export default MyApp
