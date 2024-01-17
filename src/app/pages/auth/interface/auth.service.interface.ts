import { RequestSignin, RequestSignup } from './auth-request.interface';
import { AuthProfile } from '../types/auth-profile.type';
import { Observable } from 'rxjs';

export interface AuthService {
  signin(credentials: RequestSignin): Observable<AuthProfile>;
  signup(data: RequestSignup): Observable<AuthProfile>;
}
