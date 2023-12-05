import { Dayjs } from "dayjs";

export interface signinDto {
  email: string;
  password: string;
}

export interface signupDto {
  email: string;
  emailVerified: boolean;
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
  minOrderPrice: number | null;
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
  key: number;
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
  categoryId: number;
  productTag: number[];
  representativeFlower: flowers;
  flowers: flowers[];
}

export interface orderDeliveryDetail {
  productId: number;
  thumbnailImage: string;
  name: string;
  price: number;
  quantity: number;
}
export interface orderDelivery {
  key: string;
  products: orderDeliveryDetail[];
  orderDeliveryStatus: string;
  paymentAmount: number;
  paymentDate: string;
  zipcode: string;
  roadName: string;
  addressDetail: string;
  deliveryRequest: string;
}
export interface productRead {
  productId: number;
  thumbnailImage: string;
  name: string;
  price: number;
  quantity: number;
  totalAmount: number; // price*quantity 계산하기
}

export interface subscriptionInfoDto {
  storeSubscriptionId: number;
  subscriptionCode: string;
  productName: string; // feign
  productThumbnailImage: string; // feign
  deliveryRecipientName: string; // feign
  deliveryRecipientPhoneNumber: string; // feign
  deliveryRoadName: string; // feign
  deliveryAddressDetail: string; // feign
  productPrice: number; // feign
}

export interface reservationInfoDto {
  pickupReservationId: number;
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
  id: number;
  name: string;
  data: number[];
}

export interface stockModifyDto {
  flowerId: number;
  stock: number;
}
