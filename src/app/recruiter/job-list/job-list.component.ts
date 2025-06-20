import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];
  columns = ['job_title', 'job_status', 'actions'];
  recruiterId: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const userStr = localStorage.getItem('user');

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.recruiterId = user?.id;
      } catch (e) {
        console.error('Invalid user object in localStorage:', e);
      }
    }

    if (!this.recruiterId) {
      console.error('Recruiter ID not found in localStorage');
      return;
    }

    this.http.get<any[]>(`http://localhost:3000/api/jobs/recruiter/${this.recruiterId}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(
      jobs => this.jobs = jobs,
      error => console.error('Error loading jobs', error)
    );
  }

  edit(job: any) {
    this.router.navigate(['/recruiter/job-form', job.id]);
  }

  delete(jobId: number) {
    if (confirm('Are you sure you want to delete this job?')) {
      this.http.delete(`http://localhost:3000/api/jobs/delete/${jobId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }).subscribe(() => this.ngOnInit());
    }
  }
}
