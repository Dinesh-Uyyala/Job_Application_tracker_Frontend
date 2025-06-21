import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RecruiterService {
  api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get<any[]>(`${this.api}/recruiter/stats`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
  }

  getMyJobs(recruiterId: number) {
    return this.http.get<any[]>(`${this.api}/jobs/recruiter/${recruiterId}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
  }
}