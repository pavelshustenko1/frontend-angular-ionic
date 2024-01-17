import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../interface/auth.service.interface';
import {
  RequestSignin,
  RequestSignup,
} from '../interface/auth-request.interface';
import { Observable } from 'rxjs';
import { AuthProfile } from '../types/auth-profile.type';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthServiceImpl implements AuthService {
  constructor(private httpClient: HttpClient) {}

  signin(credentials: RequestSignin): Observable<AuthProfile> {
    return this.httpClient.post<AuthProfile>(
      `${environment.baseUrl}/auth/signin`,
      credentials
    );
  }

  signup(data: RequestSignup): Observable<AuthProfile> {
    return this.httpClient.post<AuthProfile>(
      `${environment.baseUrl}/auth/signup`,
      data
    );
  }
}
