import { atom } from "recoil";
import { IPlaylist } from "../models/spotifyModel";

export const playlistState = atom<IPlaylist | null>({
  key: "playlist",
  default: null,
});

export const playlistIdState = atom<string>({
  key: "playlistId",
  default: "",
});
