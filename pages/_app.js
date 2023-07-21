import { UserProvider } from '@auth0/nextjs-auth0/client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <UserProvider>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </UserProvider>
  )
}

export default MyApp
