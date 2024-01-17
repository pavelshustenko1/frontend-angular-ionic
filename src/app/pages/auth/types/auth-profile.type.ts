export class AuthProfile {
  accessToken: string = '';
  expirationTime: string = '';

  constructor(fields?: Partial<AuthProfile>) {
    Object.assign(this, fields);
  }
}
