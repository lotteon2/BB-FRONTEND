export interface signinDto {
  email: string;
  password: string;
}

export interface settlementItem {
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
