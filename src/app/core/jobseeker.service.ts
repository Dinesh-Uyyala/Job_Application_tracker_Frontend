import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class JobseekerService {
  api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get<any[]>(`${this.api}/jobseeker/stats`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
  }
}