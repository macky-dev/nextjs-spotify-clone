import Link from "next/link";
import { IPlaylist } from "../models/spotifyModel";

interface FeaturedPlaylistItemProps {
  playlist: IPlaylist;
}

const FeaturedPlaylistItem = ({ playlist }: FeaturedPlaylistItemProps) => {
  return (
    <div className="bg-gray-800/40 hover:bg-gray-700/50 rounded-md min-w-fit cursor-pointer">
      <Link href="/playlist/[id]" as={`/playlist/${playlist.id}`}>
        <div className="flex flex-col space-y-2 p-4">
          <img
            src={playlist.images[0].url}
            className="h-44 w-44 rounded-md self-center"
            alt=""
          />
          <p className="text-lg truncate text-white">{playlist.name}</p>
          <p className="truncate text-gray-500">
            {playlist.owner.display_name}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedPlaylistItem;
