export interface loginData {
  socialId: number;
  nickname: string;
  email: string;
  phoneNumber: string;
}

export interface mainProductListDto {
  productId: string;
  productThumbnail: string;
  productName: string;
  productSummary: string;
  productPrice: number;
  productAverageRating: number;
  isLiked: boolean;
}

export interface mainStoreListDto {
  storeId: number;
  storeThumbnailImage: string;
  storeName: string;
  detailInfo: string;
  averageRating: number;
  isLiked: boolean;
}

export interface productWishDto {
  productId: string;
  productName: string;
  productSummary: string;
  productPrice: number;
  averageRating: number;
}

export interface storeWishDto {
  storeId: number;
  storeName: string;
  detailInfo: string;
  averageRating: number;
}

export interface storeListNearByDto {
  storeId: number;
  storeName: string;
  isLiked: boolean;
  detailInfo: string;
  thumbnailImage: string;
  averageRating: number;
  position: {
    lat: number;
    lon: number;
  };
}

export interface productListDto {
  key: string;
  productName: string;
  productSummary: string;
  productThumbnail: string;
  productPrice: number;
  salesCount: number;
  reviewCount: number;
  isLiked: boolean;
  averageRating: number;
}

export interface couponDto {
  couponId: number;
  couponName: string;
  discountPrice: number;
  endDate: string;
  isIssued: boolean;
  minPrice: number;
  storeName: string;
}

export interface reviewItemDto {
  profileImage: string;
  rating: number;
  nickname: string;
  content: string;
  reviewImages: string[];
}

export interface questionItemDto {
  key: number;
  isReplied: boolean; // reply null검사
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  isSecret: boolean;
  isMine: boolean;
  reply: string; // answer 테이블
  repliedAt: string; // answer 테이블
}

export interface questionRegisterDto {
  storeId: number;
  productId: string | undefined;
  productName: string;
  title: string;
  content: string;
  isSecret: boolean;
  nickname: string;
}

export interface storeDeliveryPolicyDto {
  deliveryPrice: number;
  freeDeliveryMinPrice: number;
}

export interface productCreate {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  productThumbnailImage: string;
}

export interface pickupOrderDto {
  storeId: number;
  storeName: string;
  pickupDate: string;
  pickupTime: string;
  products: productCreate;
  totalAmount: number; // 총 상품금액
  deliveryCost: number; // 총 배송비
  couponId: number;
  couponAmount: number; // 총 할인금액
  actualAmount: number; //  실 결제금액
  ordererName: string;
  ordererPhoneNumber: string;
  ordererEmail: string;
}

export interface orderDto {
  storeId: number;
  storeName: string;
  products: productCreate; // 1개 상품만 담김
  totalAmount: number; // 총 상품금액
  deliveryCost: number; // 총 배송비
  couponId: number;
  couponAmount: number; // 총 할인금액
  actualAmount: number; //  실 결제금액
  ordererName: string;
  ordererPhoneNumber: string;
  ordererEmail: string;
  recipientName: string;
  deliveryZipcode: string;
  deliveryRoadName: string;
  deliveryAddressDetail: string;
  recipientPhone: string;
  deliveryRequest: string;
  deliveryAddressId: number;
}

export interface subscriptionOrderDto {
  storeId: number;
  storeName: string;
  paymentDay: Date;
  deliveryDay: Date; // == paymentDay+3
  products: productCreate;
  totalAmount: number; // 총 상품금액
  deliveryCost: number; // 총 배송비
  couponId: number;
  couponAmount: number; // 총 할인금액
  actualAmount: number; //  실 결제금액
  ordererName: string;
  ordererPhoneNumber: string;
  ordererEmail: string;
  recipientName: string;
  deliveryZipcode: string;
  deliveryRoadName: string;
  deliveryAddressDetail: string;
  recipientPhone: string;
  deliveryRequest: string;
  deliveryAddressId: number;
}

export interface orderInfoByStore {
  storeId: number;
  storeName: string;
  products: productCreate[];
  totalAmount: number; // 총 상품금액
  deliveryCost: number; // 총 배송비
  couponId: number;
  couponAmount: number; // 총 할인금액
  actualAmount: number; //  실 결제금액
}

export interface cartOrderDto {
  sumOfActualAmount: number; // 총 실 결제금액
  ordererName: string;
  ordererPhoneNumber: string;
  ordererEmail: string;
  recipientName: string;
  deliveryZipcode: string;
  deliveryRoadName: string;
  deliveryAddressDetail: string;
  recipientPhone: string;
  deliveryRequest: string;
}

export interface couponForPayDto {
  couponId: number;
  couponName: string;
  storeName: string;
  discountPrice: number;
  endDate: string;
  minPrice: number;
  isAvailable: boolean;
}

export interface deliveryAddressDto {
  deliveryAddressId: number;
  recipientName: string;
  zipcode: string;
  roadName: string;
  addressDetail: string;
  phoneNumber: string;
}

export interface productInfoDto {
  productId: string;
  productName: string;
  quantity: number;
  productThumbnailImage: string;
  price: number;
}

export interface cartItemDto {
  storeId: number;
  storeName: string;
  deliveryCost: number;
  freeDeliveryMinCost: number;
  productInfo: productInfoDto[];
}

export interface modifyCartCountDto {
  productId: string;
  selectedQuantity: number;
}

export interface modifyMemberDto {
  nickname: string;
  email: string;
  phoneNumber: string;
}

export interface couponItemDto {
  couponId: number;
  couponName: string;
  storeName: string;
  discountPrice: number;
  endDate: string;
  minPrice: number;
}

export interface myQuestionItemDto {
  key: number;
  isReplied: boolean; // reply null검사
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  reply: string; // answer 테이블
  repliedAt: string; // answer 테이블
  productName: string;
}

export interface mySubscriptionItemDto {
  storeSubscriptionId: string;
  subscriptionProductName: string;
  subscriptionProductThumbnail: string;
  paymentDate: string;
  deliveryDate: string;
}
