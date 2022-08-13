import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { ITrackInfo } from "../models/spotifyModel";
import uniqBy from "lodash/uniqBy";
import RecentlyPlayedItem from "./RecentlyPlayedItem";

const RecentlyPlayedSection = () => {
  const spotifyApi = useSpotify();
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState<
    ITrackInfo[]
  >([]);

  useEffect(() => {
    spotifyApi
      .getMyRecentlyPlayedTracks({
        limit: 20,
      })
      .then(function (data) {
        const tracks: ITrackInfo[] = data.body.items.map((item) => {
          const artistString = item.track.artists
            .map(({ name }) => name)
            .join(", ");

          return {
            ...item.track,
            artistString,
          };
        });
        const uniqueTracks = uniqBy(tracks, "id");
        setRecentlyPlayedTracks(uniqueTracks.slice(0, 6));
      })
      .catch((err) => console.log("Something went wrong!", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-full max-h-fit">
      {recentlyPlayedTracks.map((track) => (
        <RecentlyPlayedItem key={track.id} track={track} />
      ))}
    </div>
  );
};

export default RecentlyPlayedSection;
