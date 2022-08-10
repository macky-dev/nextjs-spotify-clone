import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import { IPlaylist } from "../models/spotifyModel";

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlist, setPlaylist] = useState<IPlaylist[]>([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylist(data.body.items);
      });
    }
  }, [session]);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen min-w-[15rem] md:max-w-[20rem] hidden md:inline-flex">
      <div className="space-y-4 min-w-full">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.01px] border-color-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5 text-green-500" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.01px] border-color-gray-900" />

        {/* Playlist */}
        {playlist.map((plist: IPlaylist) => (
          <p
            key={plist.id}
            className="cursor-pointer hover:text-white"
            onClick={() => setPlaylistId(plist.id)}
          >
            {plist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
