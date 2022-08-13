import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { SearchIcon, LibraryIcon, RssIcon } from "@heroicons/react/outline";
import { PlusCircleIcon, HeartIcon, HomeIcon } from "@heroicons/react/solid";
import useSpotify from "../hooks/useSpotify";
import { IPlaylist } from "../models/spotifyModel";
import Link from "next/link";

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlist, setPlaylist] = useState<IPlaylist[]>([]);

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
        <Link href="/">
          <button className="flex items-center space-x-4 hover:text-white">
            <HomeIcon className="h-7 w-7" />
            <p>Home</p>
          </button>
        </Link>
        <button className="flex items-center space-x-4 hover:text-white">
          <SearchIcon className="h-7 w-7" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-4 hover:text-white">
          <LibraryIcon className="h-7 w-7" />
          <p>Your Library</p>
        </button>
        <div className="flex p-1" />
        <button className="flex items-center space-x-4 hover:text-white">
          <PlusCircleIcon className="h-7 w-7" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-4 hover:text-white">
          <HeartIcon className="h-7 w-7 text-blue-500" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-4 hover:text-white">
          <RssIcon className="h-7 w-7 text-green-500" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.01px] border-color-gray-500" />

        {/* Playlist */}
        {playlist.map((plist: IPlaylist) => (
          <Link
            href="/playlist/[id]"
            as={`/playlist/${plist.id}`}
            key={plist.id}
          >
            <p className="cursor-pointer hover:text-white">{plist.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
