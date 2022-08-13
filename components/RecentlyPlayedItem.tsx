import { PlayIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { currentTrackUriState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { ITrackInfo } from "../models/spotifyModel";

interface RecentlyPlayedItemProps {
  track: ITrackInfo;
}

const RecentlyPlayedItem = ({
  track: { album, name, uri },
}: RecentlyPlayedItemProps) => {
  const spotifyApi = useSpotify();
  const [currentTrackUri, setCurrentTrackUri] =
    useRecoilState(currentTrackUriState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackUri(uri);
    setIsPlaying(true);
    spotifyApi
      .play({ uris: [uri] })
      .then(() => console.log("Playback started"))
      .catch((err) => console.log("Something went wrong!", err));
  };

  return (
    <div
      className="flex items-center justify-between bg-gray-500/30 hover:bg-gray-500/50 rounded-md h-20 hidePlayWrap"
      onClick={playSong}
    >
      <div className="flex flex-row items-center space-x-4">
        <img src={album.images[0].url} className="h-20 w-20" alt="" />
        <p className="flex text-white truncate">{name}</p>
      </div>
      <PlayIcon className="h-14 w-14 text-green-500 mx-2 drop-shadow-lg hover:scale-110" />
    </div>
  );
};

export default RecentlyPlayedItem;
