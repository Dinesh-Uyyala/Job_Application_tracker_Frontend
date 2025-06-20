import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html'
})
export class JobFormComponent implements OnInit {
  jobId: string | null = null;
  title = '';
  description = '';
  companyName = '';
  location = '';
  vacancies = 1;
  status = 'Applied';
  statuses = ['Applied', 'Interview', 'Rejected', 'Offered', 'On Hold'];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.jobId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.jobId) {
      this.http.get<any>(`${environment.apiUrl}/jobs/${this.jobId}`).subscribe(job => {
        this.title = job.title;
        this.description = job.description;
        this.companyName = job.companyName;
        this.location = job.location;
        this.vacancies = job.vacancies;
        this.status = job.status;
      });
    }
  }

  save() {
    const job = {
      title: this.title,
      description: this.description,
      companyName: this.companyName,
      location: this.location,
      vacancies: this.vacancies,
      status: this.status
    };
    if (this.jobId) {
      this.http.put(`${environment.apiUrl}/jobs/${this.jobId}`, job, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }).subscribe(() => this.router.navigate(['/jobs']));
    } else {
      this.http.post(`${environment.apiUrl}/jobs`, job, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }).subscribe(() => this.router.navigate(['/jobs']));
    }
  }
}