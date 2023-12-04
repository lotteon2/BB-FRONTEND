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
