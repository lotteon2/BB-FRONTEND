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
