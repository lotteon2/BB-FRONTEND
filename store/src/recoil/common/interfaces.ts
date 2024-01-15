import { Dayjs } from "dayjs";

export interface signinDto {
  email: string;
  password: string;
}

export interface reRegisterBusinessNumberImageDto {
  email: string;
  businessNumberImage: string;
}

export interface signupDto {
  email: string;
  isEmailVerified: boolean;
  password: string;
  name: string;
  businessNumberImage: string;
}

export interface storeInfoDto {
  storeName: string;
  detailInfo: string;
  storeThumbnailImage: string;
  phoneNumber: string;
  accountNumber: string;
  bank: string;
  deliveryPrice: number | null;
  freeDeliveryMinPrice: number | null;
  sido: string;
  gugun: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  lat: number;
  lon: number;
}

export interface subscriptionRegisterDto {
  productName: string;
  productSummary: string;
  productPrice: number | null;
  productDescriptionImage: string;
  productThumbnail: string;
}

export interface subscriptionInfoDto {
  productId: number;
  productThumbnail: string;
  productName: string;
  productPrice: number;
  productSummary: string;
  productDescriptionImage: string;
  averageRating: number;
}

export interface couponItemDto {
  key: number;
  couponCode: string;
  couponName: string;
  minPrice: number;
  discountPrice: number;
  unusedCount: number;
  startDate: string;
  endDate: string;
}

export interface couponDto {
  couponName: string;
  discountPrice: number | null;
  minPrice: number | null;
  limitCount: number | null;
  startDate: null | Dayjs;
  endDate: null | Dayjs;
}

export interface couponRegisterDto {
  couponName: string;
  discountPrice: number | null;
  minPrice: number | null;
  limitCount: number | null;
  startDate: string;
  endDate: string;
}

export interface flowers {
  flowerId: number | undefined;
  flowerCount: number | null;
}
export interface productRegisterDto {
  productName: string;
  productSummary: string;
  productDescriptionImage: string;
  productThumbnail: string;
  productPrice: number | null;
  categoryId: number | undefined;
  productTag: number[];
  representativeFlower: flowers;
  flowers: flowers[];
}

export interface productItemDto {
  key: string;
  productThumbnail: string;
  productName: string;
  representativeFlower: string;
  category: string;
  productPrice: number;
  productSaleAmount: number;
  averageRating: number;
  productSaleStatus: string;
}

export interface flowersDetail {
  flowerId: number;
  flowerName: string;
  flowerCount: number;
}

export interface productModifyInfoDto {
  productName: string;
  productSummary: string;
  productDescriptionImage: string;
  productThumbnail: string;
  productPrice: number | null;
  productSaleStatus: string;
  category: number;
  productTag: number[];
  representativeFlower: flowers;
  flowers: flowers[];
}

export interface orderDeliveryDetail {
  key: number;
  productId: number;
  thumbnailImage: string;
  name: string;
  price: number;
  quantity: number;
  paymentAmount: number;
}
export interface orderDelivery {
  key: string;
  orderDeliveryId: string;
  products: orderDeliveryDetail[];
  orderDeliveryStatus: string;
  paymentAmount: number;
  paymentDate: string;
  zipcode: string;
  roadName: string;
  addressDetail: string;
  deliveryRequest: string;
  ordererName: string;
  ordererPhoneNumber: string;
  recipientName: string;
  recipientPhone: string;
}
export interface productRead {
  productId: number;
  thumbnailImage: string;
  name: string;
  price: number;
  quantity: number;
  totalAmount: number; // price*quantity 계산하기
}

export interface subscriptionListDto {
  storeSubscriptionId: string;
  subscriptionCode: string;
  productName: string; // feign
  productThumbnailImage: string; // feign
  deliveryRecipientName: string; // feign
  deliveryRecipientPhoneNumber: string; // feign
  deliveryAddress: string; // feign
  productPrice: number; // feign
}

export interface reservationInfoDto {
  pickupReservationId: string;
  reservationCode: string;
  productName: string; // feign
  productThumbnailImage: string; // feign
  count: number; // feign
  orderPickupTotalAmount: number; // feign
  nickname: string; // feign
  phoneNumber: string; // feign
  pickupDate: string;
  pickupTime: string;
  isCanceled: boolean;
}

export interface stockDto {
  flowerId: number;
  name: string;
  data: number[];
}

export interface stockModifyDto {
  flowerId: number;
  stock: number;
}

export interface reviewDto {
  reviewId: number;
  createdAt: string;
  profileImage: string;
  rating: number;
  nickname: string;
  productName: string;
  content: string;
  reviewImages: string[];
}

export interface questionItemDto {
  key: string;
  productName: string; // feign
  nickname: string; // feign
  title: string;
  createdAt: string;
  isReplied: boolean; // answer 테이블
  isRead: boolean;
}

export interface replyDto {
  content: string;
  repliedAt: string;
}

export interface questionDetailDto {
  nickname: string;
  createdAt: string;
  productName: string;
  content: string;
  isReplied: boolean;
  reply: replyDto;
}

export interface settlementDto {
  key: number;
  storeName: string;
  settlementDate: string;
  totalAmountPerMonth: number;
  settlementAmount: number;
  bankName: string;
  accountNumber: string;
}

export interface notiDto {
  notificationId: number;
  notificationContent: string;
  notificationLink: string;
}

export interface couponDownloadDto {
  nickname: string;
  phoneNumber: string;
  createdAt: string;
  isUsed: boolean;
}
