import { modifyMemberDto } from "../recoil/common/interfaces";
import { authInstance } from "./utils";

// 회원 휴대폰 번호 등록
export const registerPhoneNumber = async (phoneNumber: string) => {
  const { data } = await authInstance.put("/users/phone-number", phoneNumber);
  return data;
};

// 상품 찜
export const modifyWishList = async (list: string[]) => {
  const { data } = await authInstance.post("/wishlist/likes/product", list);
  return data;
};

// 가게 찜
export const modifyStoreWishList = async (list: number[]) => {
  const { data } = await authInstance.post("/wishlist/likes/store", list);
  return data;
};

// 내 정보 조회
export const getMyInfo = async () => {
  const { data } = await authInstance.get("/users/social");
  return data;
};

// 회원탈퇴
export const withdraw = async (type: string) => {
  const { data } = await authInstance.delete("/auth/social/" + type);
  return data;
};

// 회원정보 수정
export const modifyMemberInfo = async (modifyDto: modifyMemberDto) => {
  const { data } = await authInstance.patch("/users/social", modifyDto);
  return data;
};

// 발급받은 쿠폰 조회
export const getMyCouponList = async () => {
  const { data } = await authInstance.get("/stores/coupons/my");
  return data;
};

// 마이페이지 문의 조회
export const getMyQuestionsList = async (
  page: number,
  size: number,
  isReplied: boolean | undefined
) => {
  const { data } = await authInstance.get(
    "/stores/questions/myPage?page=" +
      page +
      "&size=" +
      size +
      "&is-replied=" +
      isReplied
  );
  return data;
};

// 마이페이지 구독 조회
export const getMySubscriptionList = async () => {
  const { data } = await authInstance.get("/stores/store-subscriptions");
  return data;
};

// 구독 취소
export const cancelSubscription = async (orderSubscriptionId: string) => {
  const { data } = await authInstance.delete(
    "/orders/subscription/" + orderSubscriptionId
  );
  return data;
};

// 찜 상품 목록 조회
export const getMyWishList = async (page: number, size: number) => {
  const { data } = await authInstance.get(
    "/wishlist/likes/products?page=" + page + "&size=" + size
  );
  return data;
};

// 찜 가게 목록 조회
export const getMyWishStoreList = async (page: number, size: number) => {
  const { data } = await authInstance.get(
    "/wishlist/likes/stores?page=" + page + "&size=" + size
  );
  return data;
};

// 주문 목록 조회
export const getMyOrderList = async (
  page: number,
  size: number,
  sort: string
) => {
  const { data } = await authInstance.get(
    "/orders/delivery?page=" + page + "&sort=" + sort + "&size=" + size
  );
  return data;
};

// 픽업 주문 목록 조히
export const getMyPickupOrderList = async (page: number, size: number) => {
  const { data } = await authInstance.get(
    "/stores/reservations?page=" + page + "&size=" + size
  );
  return data;
};
