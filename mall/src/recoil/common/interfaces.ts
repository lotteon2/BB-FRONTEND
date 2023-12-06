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
