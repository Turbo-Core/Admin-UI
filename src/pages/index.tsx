import Head from "next/head";
import type { NextPageWithLayout } from "./_app";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import Layout from "@/components/Layout";
import { ProjectContext } from "@/context/project";
import dynamic from 'next/dynamic'

const Page: NextPageWithLayout = () => {
  const { user, login, logout } = useContext(AuthContext);
  const { query } = useContext(ProjectContext);
  const Login = dynamic(() => import('@/components/Login'), { ssr: false })
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && query.projectId && <Layout logout={logout}/> }
      {!user && <Login login={login} />}
      {user && !query.projectId && <div>Project not found</div>}
    </>
  );
};

export default Page;
