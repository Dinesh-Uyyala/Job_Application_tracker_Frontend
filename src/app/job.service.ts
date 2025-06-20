import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobService {
  api = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getJobs() {
  return this.http.get<any[]>(`${this.api}/jobs`);
}
getJob(id: string) {
  return this.http.get<any>(`${this.api}/jobs/${id}`);
}
createJob(job: any) {
  return this.http.post<any>(`${this.api}/jobs`, job, { headers: this.authHeader() });
}
updateJob(id: string, job: any) {
  return this.http.put<any>(`${this.api}/jobs/${id}`, job, { headers: this.authHeader() });
}
deleteJob(id: string) {
  return this.http.delete<any>(`${this.api}/jobs/${id}`, { headers: this.authHeader() });
}
authHeader() {
  return { Authorization: 'Bearer ' + localStorage.getItem('token') };
}
}