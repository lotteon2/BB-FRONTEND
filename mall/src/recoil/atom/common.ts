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
  default: false,
  effects_UNSTABLE: [persistAtom],
});

/**
 * 프로젝트 상태
 * true: 쇼핑몰
 * false: 픽업/예약
 */
export const mallState = atom({
  key: "mallState",
  default: true,
  effects_UNSTABLE: [persistAtom],
});

/**
 * 사이드메뉴 상태
 * 0: 마이페이지, 1: 위시리스트, 2: 최근 본 상품
 */
export const sideMenuState = atom({
  key: "sideMenuState",
  default: 0,
});

/**
 * 닉네임
 */
export const nicknameState = atom({
  key: "nicknameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

/**
 * 프로필이미지
 */
export const profileImageState = atom({
  key: "profileImageState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const locationstate = atom({
  key: "locationState",
  default: {
    lat: 37.4923615,
    lng: 127.0292881,
    level: 5,
  },
});

export const wishState = atom({
  key: "wishState",
  default: false,
});
