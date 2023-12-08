import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import {
  orderDto,
  pickupOrderDto,
  subscriptionOrderDto,
} from "../common/interfaces";

const { persistAtom } = recoilPersist();

export const pickupOrderState = atom<pickupOrderDto>({
  key: "pickupOrderState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const orderState = atom<orderDto>({
  key: "orderState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const subscriptionOrderState = atom<subscriptionOrderDto>({
  key: "subscriptionOrderState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
