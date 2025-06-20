import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  api = environment.apiUrl;
  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
  return this.http.post<any>(`${this.api}/auth/login`, { email, password });
}
register(data: any) {
  return this.http.post<any>(`${this.api}/auth/signup`, data);
}
}