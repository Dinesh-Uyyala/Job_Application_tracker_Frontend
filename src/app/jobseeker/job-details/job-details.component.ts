import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent {
  job: any= {};
  jobId: any = '';
  applicationStatus: string = '';
  role: string = '';
constructor(private activatedRoute:ActivatedRoute, private http: HttpClient) {
  // Get the job ID from the route parameters
  this.jobId = this.activatedRoute.snapshot.paramMap.get('id')!;
    console.log('Job ID:', this.jobId);
    this.role=localStorage.getItem('role') || '';
this.loadDetails();
}
  loadDetails() {
    this.http.get<any[]>(`http://localhost:3000/api/jobs/${this.jobId}`)
      .subscribe(
        data => this.job = data,
        err => console.error('Failed to load job details', err)
      );
  }
  applyForJob(id:number) {
    if (this.role === 'jobseeker') {
      this.http.post(`http://localhost:3000/api/jobs/${this.jobId}/apply`, {})
        .subscribe(
          response => {
            console.log('Application successful', response);
            this.applicationStatus = 'Applied';
          },
          error => {
            console.error('Application failed', error);
            this.applicationStatus = 'Failed to apply';
          }
        );
    } else {
      console.warn('Only jobseekers can apply for jobs');
    }
  }
}
