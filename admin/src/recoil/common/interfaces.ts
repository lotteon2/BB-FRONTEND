export interface signinDto {
  id: string;
  password: string;
}

export interface settlementItem {
  key: number;
  storeName: string;
  settlementDate: string;
  totalAmountPerMonth: number;
  settlementAmount: number;
  bankName: string;
  accountNumber: string;
}

export interface registerRequestItemDto {
  key: number;
  storeManagerName: string;
  storeManagerPhoneNumber: string;
  storeManagerBusinessNumber: string;
  requestDate: string;
}

export interface storeStatusModifyDto {
  storeManagerId: number;
  status: string;
}

export interface storeItemDto {
  key: number;
  storeCode: string;
  storeName: string;
  phoneNumber: string;
  bank: string;
  accountNumber: string;
  averageRating: number;
  totalAmount: number;
  regDate: string;
}

export interface options {
  value: number;
  label: string;
}
