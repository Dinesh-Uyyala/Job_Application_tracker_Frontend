import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  job: any = {};
  jobId: string = '';
  applicationStatus: string = '';
  role: string = '';
  userId: string = '';
  showApplicationForm: boolean = false;

  applicationData: any = {
    name: '',
    email: '',
    phone: '',
    resumeLink: ''
  };

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.jobId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.role = localStorage.getItem('role') || '';
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user?.id || '';
    console.log(user);
    this.applicationData.name = user?.name || '';
    this.applicationData.email = user?.email || '';
    this.applicationData.phone = user?.phone || '';

    this.loadDetails();
    this.getAppliedStatus();
  }

  loadDetails(): void {
    this.http.get<any>(`http://localhost:3000/api/jobs/${this.jobId}`)
      .subscribe(data => this.job = data);
  }

  getAppliedStatus(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.get<{ status: string }>(`http://localhost:3000/api/jobs/${this.jobId}/status/${this.userId}`, { headers })
      .subscribe(
        res => this.applicationStatus = res.status,
        err => this.applicationStatus = 'Not Applied'
      );
  }

  toggleApplicationForm(): void {
    this.showApplicationForm = !this.showApplicationForm;
  }

  submitApplication(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const payload = {
      jobId: this.jobId,
      userId: this.userId,
      ...this.applicationData
    };

    this.http.post('http://localhost:3000/api/applications', payload, { headers })
      .subscribe(
        res => {
          alert('Application submitted successfully!');
          this.applicationStatus = 'Applied';
          this.showApplicationForm = false;
        },
        err => {
          console.error(err);
          alert('Failed to submit application');
        }
      );
  }
}
