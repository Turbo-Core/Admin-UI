import Head from "next/head";
import Layout from "@/components/Layout";
import type { NextPageWithLayout } from "./_app";
import { ReactElement, useEffect } from "react";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>Page Content</div>
      </main>
    </>
  );
};

Page.GetLayout = function GetLayout(page: ReactElement) {

  return (
      <>
        <Layout>{page}</Layout>
      </>
  );
};

export default Page;
