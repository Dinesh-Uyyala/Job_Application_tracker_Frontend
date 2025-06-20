import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  api = environment.apiUrl;
  constructor(private http: HttpClient) {}
  
  getUsers() {
  return this.http.get<any[]>(`${this.api}/users`, { headers: this.authHeader() });
}
authHeader() {
  return { Authorization: 'Bearer ' + localStorage.getItem('token') };
}
}