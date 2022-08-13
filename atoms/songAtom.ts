import { atom } from "recoil";

export const currentTrackUriState = atom<string | null>({
  key: "currentTrackUri",
  default: null,
});

export const isPlayingState = atom<boolean>({
  key: "isPlaying",
  default: false,
});
