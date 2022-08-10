import { atom } from "recoil";
import { IPlaylist } from "../models/spotifyModel";

export const playlistState = atom<IPlaylist | null>({
  key: "playlistState",
  default: null,
});

export const playlistIdState = atom<string>({
  key: "playlistIdState",
  default: "7mnryfbY1oOH2ZHlQE8tj5",
});
