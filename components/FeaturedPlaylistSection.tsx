import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { IPlaylist } from "../models/spotifyModel";
import FeaturedPlaylistItem from "./FeaturedPlaylistItem";

const FeaturedPlaylistSection = () => {
  const spotifyApi = useSpotify();
  const [featuredPlaylist, setFeaturedPlaylist] = useState<IPlaylist[]>([]);

  useEffect(() => {
    spotifyApi
      .getFeaturedPlaylists({ limit: 6 })
      .then((data: any) => {
        setFeaturedPlaylist(data.body.playlists.items);
      })
      .catch((err) => console.log("Something went wrong!", err));
  }, []);

  return (
    <div className="grid grid-cols-autoFit gap-6">
      {featuredPlaylist.map((playlist) => (
        <FeaturedPlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};

export default FeaturedPlaylistSection;
