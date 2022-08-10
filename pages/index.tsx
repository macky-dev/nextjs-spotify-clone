import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import Player from "../components/Player";
import { getSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <div className="h-screen bg-black overflow-hidden">
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};

export default Home;
