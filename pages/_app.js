import { UserProvider } from '@auth0/nextjs-auth0/client'
import { DM_Sans, Rubik } from '@next/font/google'
import '../styles/globals.css'

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
