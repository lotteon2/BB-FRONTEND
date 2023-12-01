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
