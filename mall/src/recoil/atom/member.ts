import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// 찜 상품 목록
export const productWishState = atom<string[]>({
  key: "productWishState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// 찜 가게 목록
export const storeWishState = atom<number[]>({
  key: "storeWishState",
  default: [],
});
