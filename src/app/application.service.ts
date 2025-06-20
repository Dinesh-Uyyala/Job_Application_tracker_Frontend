import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  api = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getApplications() {
  return this.http.get<any[]>(`${this.api}/applications`, { headers: this.authHeader() });
}
apply(jobId: number) {
  return this.http.post<any>(`${this.api}/applications`, { jobId }, { headers: this.authHeader() });
}
authHeader() {
  return { Authorization: 'Bearer ' + localStorage.getItem('token') };
}
}