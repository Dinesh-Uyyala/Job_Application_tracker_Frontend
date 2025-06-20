import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html'
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];
  filterStatus = '';
  statuses = ['Applied', 'Interview', 'Rejected', 'Offered', 'On Hold'];
  columns = ['title', 'companyName', 'status', 'actions'];
  role = localStorage.getItem('role');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/jobs`).subscribe(jobs => this.jobs = jobs);
  }

  get filteredJobs() {
    return this.filterStatus ? this.jobs.filter(j => j.status === this.filterStatus) : this.jobs;
  }

  apply(jobId: number) {
    this.http.post(`${environment.apiUrl}/applications`, { jobId }, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe({
      next: () => alert('Application submitted!'),
      error: err => alert(err.error.message || 'Error applying')
    });
  }

  delete(jobId: number) {
    this.http.delete(`${environment.apiUrl}/jobs/${jobId}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(() => this.ngOnInit());
  }
}