import { useEffect, useState, ReactNode } from "react";
import Sidebar from "./Sidebar";
import { useSession, signOut } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { currentTrackUriState, isPlayingState } from "../atoms/songAtom";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Player from "./Player";

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentTrackUri, setCurrentTrackUri] =
    useRecoilState(currentTrackUriState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const accessToken: string = session?.accessToken as string;

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  const fetchCurrentTrack = () => {
    spotifyApi
      .getMyCurrentPlayingTrack()
      .then((data: any) => {
        setCurrentTrackUri(data.body.item.uri);
        setIsPlaying(true);
      })
      .catch((err) => setCurrentTrackUri(null));
  };

  useEffect(() => {
    if (accessToken) {
      fetchCurrentTrack();
    }
  }, [accessToken]);

  return (
    <div className="h-screen bg-black overflow-hidden">
      <main className="flex">
        <Sidebar />

        {/* Center */}
        <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
          {/* User header */}
          <header className="absolute top-2 right-6">
            <div
              className="flex items-center bg-black space-x-2 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
              onClick={() => signOut()}
            >
              <img
                className="rounded-full w-8 h-8"
                src={session?.user?.image!}
                alt=""
              />
              <h2>{session?.user?.name}</h2>
              <ChevronDownIcon className="h-5 w-5" />
            </div>
          </header>

          {children}
        </div>
      </main>
      <div className="sticky bottom-0">
        {showPlayer && (
          <Player
            key={accessToken}
            token={accessToken}
            trackUri={currentTrackUri}
          />
        )}
      </div>
    </div>
  );
};

export default Layout;
