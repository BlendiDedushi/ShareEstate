import '@/styles/globals.css'
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
      <script src="https://cdn.tailwindcss.com"></script>
    </Head>
    <Component {...pageProps} />
  </>
  );
}