import Head from "next/head";
import type { NextPageWithLayout } from "./_app";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/auth";
import Layout from "@/components/Layout";
import { ProjectContext } from "@/context/project";
import dynamic from "next/dynamic";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import prisma from "@lib/prisma";
import { useRouter } from "next/navigation"

export const getServerSideProps: GetServerSideProps = async () => {
    const userCount = await prisma.user.count();
    return {
        props: { userCount },
    };
};

const Page: NextPageWithLayout = ({
    userCount,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const router = useRouter();

    useEffect(() => {
        if (!userCount) {
            router.push("/setup")
        }
    }, [userCount])

    const { user, login, logout } = useContext(AuthContext);
    const { query } = useContext(ProjectContext);
    const Login = dynamic(() => import("@/components/Login"), { ssr: false });
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {user && query.projectId && <Layout logout={logout} />}
            {!user && <Login login={login} />}
            {user && !query.projectId && <div>Project not found</div>}
        </>
    );
};

export default Page;
