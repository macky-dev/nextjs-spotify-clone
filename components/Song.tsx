import { useRecoilState } from "recoil";
import { currentTrackUriState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";
import { ITrackInfo } from "../models/spotifyModel";

interface SongProps {
  track: ITrackInfo;
  order: number;
}

const Song = ({ track, order }: SongProps) => {
  const spotifyApi = useSpotify();
  const [currentTrackUri, setCurrentTrackUri] =
    useRecoilState(currentTrackUriState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const artistString = track.artists
    .map((artist: any) => artist.name)
    .join(", ");

  const playSong = () => {
    setCurrentTrackUri(track.uri);
    setIsPlaying(true);
    spotifyApi
      .play({ uris: [track.uri] })
      .then(() => console.log("Playback started"))
      .catch((err) => console.log("Something went wrong!", err));
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img src={track.album.images[0].url} className="h-10 w-10" alt="" />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.name}</p>
          <p className="w-40 lg:w-64 truncate">{artistString}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline ">album</p>
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
};
export default Song;
