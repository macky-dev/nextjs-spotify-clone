import { useEffect, useState, ReactElement } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRecoilState } from "recoil";
import shuffle from "lodash/shuffle";
import { playlistState } from "../../atoms/playlistAtom";
import type { NextPageWithLayout } from "../_app";
import Songs from "../../components/Songs";
import Layout from "../../components/Layout";
import Head from "next/head";
import { IPlaylist } from "../../models/spotifyModel";
import spotifyApi from "../../lib/spotify";

const RANDOM_COLORS = [
  "from-red-500",
  "from-green-500",
  "from-blue-500",
  "from-indigo-500",
  "from-purple-500",
];

const Playlist: NextPageWithLayout<{ playlist: IPlaylist }> = ({
  playlist,
}) => {
  const router = useRouter();
  const playlistId = router.query.id as string;
  const [headerBgColor, setHeaderBgColor] = useState("from-red-500");
  const [_, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    const color = shuffle(RANDOM_COLORS).pop();
    setHeaderBgColor(color!);
    setPlaylist(playlist);
  }, [playlistId]);

  return (
    <>
      <Head>
        <title>Spotify Clone - {playlist.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${headerBgColor} h-100 text-white p-8 pt-20`}
      >
        <img
          className="h-44 w-44 lg:h-60 lg:w-60 shadow-2xl"
          src={playlist.images[0].url}
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist.name}
          </h1>
          <p>{playlist.description}</p>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </>
  );
};

Playlist.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions,
  );
  const playlistId = context.params!.id as string;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  typeof session.accessToken === "string" &&
    spotifyApi.setAccessToken(session.accessToken);
  const { body: playlist } = await spotifyApi.getPlaylist(playlistId);

  return {
    props: {
      session,
      playlist,
    },
  };
};

export default Playlist;
