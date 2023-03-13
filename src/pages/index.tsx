import Head from "next/head";
import type { NextPageWithLayout } from "./_app";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import Layout from "@/components/Layout";
import Login from "@/components/Login";

const Page: NextPageWithLayout = () => {
  const { user, login, logout } = useContext(AuthContext);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout logout={logout}/>
      )}
      {!user && <Login login={login} />}
    </>
  );
};

export default Page;
