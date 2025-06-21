import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.css']
})
export class JobTableComponent implements OnInit {
  jobs: any[] = [];
  filteredJobsArray: any[] = [];
  filterStatus = '';
  statuses = ['Applied', 'Interview', 'Rejected', 'Offered', 'On Hold'];

  columns: string[] = [
    'title',
    'companyName',
    'location',
    'experience',
    'vacancies',
    'package',
    'workMode',
    'status'
  ];

  role: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Initialize role from localStorage safely
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        this.role= JSON.parse(userStr).role || '';
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
        this.role = '';
      }
    }

    // Add 'actions' column only if role is recruiter
  if (this.role === 'jobseeker') {
  this.columns.push('applyJob');
  // this.columns.push('actions');
}


    // Fetch jobs from API
    this.http.get<any[]>(`${environment.apiUrl}/jobs`).subscribe(
      (jobs) => {
        this.jobs = jobs;
        this.applyFilter();
      },
      (error) => {
        console.error('Failed to load jobs', error);
      }
    );
  }

  applyFilter() {
    this.filteredJobsArray = this.filterStatus
      ? this.jobs.filter((job) => job.status === this.filterStatus)
      : this.jobs;
  }

  editJob(id: number) {
    this.router.navigate(['/job-form', id]);
  }

  deleteJob(id: number) {
    if (confirm('Are you sure you want to delete this job?')) {
      this.http
        .delete(`${environment.apiUrl}/jobs/${id}`, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
        .subscribe(() => {
          this.jobs = this.jobs.filter((j) => j.id !== id);
          this.applyFilter();
        });
    }
  }
  applyJob(jobId: number) {
  this.router.navigate(['/jobseeker/job-details', jobId]);
}
}
