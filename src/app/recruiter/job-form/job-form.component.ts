import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent {
  jobId: string | null = null;

  statuses = ['Open', 'Closed', 'Paused'];
  workModes = ['Onsite', 'Remote', 'Hybrid'];

  job = {
    title: '',
    description: '',
    companyName: '',
    location: '',
    vacancies: 1,
    logo: '',
    package: '',
    experience: '',
    workMode: '',
    status: 'Open'
  };
loading = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
  this.jobId = this.route.snapshot.paramMap.get('id');
  console.log(this.jobId);
  if (this.jobId) {
    this.loading = true;
    this.http.get<any>(`http://localhost:3000/api/jobs/${this.jobId}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(data => {
      this.job = {
        title: data.title || '',
        description: data.description || '',
        companyName: data.companyName || '',
        location: data.location || '',
        vacancies: data.vacancies || 1,
        logo: data.logo || '',
        package: data.package || '',
        experience: data.experience || '',
        workMode: data.workMode || '',
        status: data.status || 'Open'
      };
      this.loading = false;
    });
  }
}


  save() {
    const url = this.jobId
      ? `http://localhost:3000/api/jobs/edit/${this.jobId}`
      : 'http://localhost:3000/api/jobs/create';

    const method = this.jobId ? 'put' : 'post';

    this.http[method](url, this.job, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(() => {
      this.router.navigate(['/recruiter']);
    });
  }
}
