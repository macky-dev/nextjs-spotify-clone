import { useRecoilState } from "recoil";
import { isPlayingState } from "../atoms/songAtom";
import SpotifyPlayer from "react-spotify-web-playback";

interface PlayerProps {
  token: string;
  trackUri: string | null;
}

const Player = ({ token, trackUri }: PlayerProps) => {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  return (
    <SpotifyPlayer
      name="spotify.markmartinez.dev"
      token={token}
      uris={trackUri ? [trackUri] : []}
      autoPlay={true}
      play={isPlaying}
      callback={(state) => {
        setIsPlaying(state.isPlaying);
      }}
      magnifySliderOnHover={true}
      showSaveIcon={true}
      styles={{
        activeColor: "#1cb954",
        bgColor: "#181818",
        color: "#fff",
        loaderColor: "#1cb954",
        sliderColor: "#fff",
        sliderTrackColor: "#6b7280",
        sliderHandleColor: "#fff",
        sliderHandleBorderRadius: 50,
        sliderTrackBorderRadius: 50,
        trackArtistColor: "#6b7280",
        trackNameColor: "#fff",
      }}
    />
  );
};

export default Player;
