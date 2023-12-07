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
