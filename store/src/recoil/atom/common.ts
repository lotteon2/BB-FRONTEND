import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

/**
 * 로그인 여부
 * true: 로그인됨
 * false: 로그인 안됨
 */
export const loginState = atom({
  key: "loginState",
  default: true,
  effects_UNSTABLE: [persistAtom],
});

/**
 * 이름
 */
export const nameState = atom({
  key: "nameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

/**
 * 가게 ID
 */
export const storeIdState = atom({
  key: "storeIdState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
