import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import {
  orderDto,
  orderInfoByStore,
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

export const cartOrderState = atom<orderDto>({
  key: "cartOrderState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const orderInfoState = atom<orderInfoByStore[]>({
  key: "orderInfoState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
