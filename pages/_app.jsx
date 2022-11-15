import Layout from "../components/layout";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "../styles/globals.scss";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { SSRProvider } from "react-bootstrap";

function MyApp({ Component, pageProps: session, ...pageProps }) {
  return (
    <>
      <Head>
        <title>Impulsive Musician</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SessionProvider session={session}>
        <SSRProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SSRProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
