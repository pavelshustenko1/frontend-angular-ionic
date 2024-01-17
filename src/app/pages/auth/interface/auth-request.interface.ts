export interface RequestSignup {
  readonly email: string;
  readonly password: string;
}

export interface RequestSignin extends RequestSignup {}
