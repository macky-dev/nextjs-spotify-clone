import { atom } from "recoil";

export const currentTrackIdState = atom<string | null>({
  key: "currentTrackId",
  default: null,
});

export const isPlayingState = atom<boolean>({
  key: "isPlaying",
  default: false,
});
