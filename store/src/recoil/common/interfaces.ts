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
