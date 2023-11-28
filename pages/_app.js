import '@/styles/globals.css'
import Head from 'next/head'
import Layout from '@/components/include/Layout'
import AuthProvider from '@/context/authProvider'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  console.log(router)
  return <>
  <AuthProvider>
  <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
      rel="stylesheet"
    />
  </Head>
  {router.pathname === "/login" ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )}
</AuthProvider></>
}
