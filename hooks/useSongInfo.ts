import useSpotify from "./useSpotify";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import { useEffect, useState } from "react";

const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          },
        ).then((res) => res.json());

        const artistString = trackInfo.artists
          .map((artist: string) => artist.name)
          .join(", ");

        setSongInfo({ ...trackInfo, artistString });
      }
    };

    fetchSongInfo();
  }, [currentTrackId]);

  return songInfo;
};

export default useSongInfo;
