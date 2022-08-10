export interface IPlaylist {
  id: string;
  name: string;
  uri: string;
  description: string;
  images: { url: string }[];
  tracks: { items: { track: ITrackInfo }[] };
}

export interface ITrackInfo {
  id: string;
  name: string;
  album: { images: { url: string }[] };
  artistString: string;
  artists: { name: string }[];
  uri: string;
  duration_ms: number;
}
