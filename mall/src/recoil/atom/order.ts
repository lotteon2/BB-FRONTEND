import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { pickupOrderDto } from "../common/interfaces";

const { persistAtom } = recoilPersist();

export const pickupOrderState = atom<pickupOrderDto>({
  key: "pickupOrderState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
