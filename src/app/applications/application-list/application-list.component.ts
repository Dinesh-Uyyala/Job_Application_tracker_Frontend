import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
})
export class ApplicationListComponent implements OnInit {
  applications: any[] = [];
  columns = ['title', 'vacancies', 'location', 'status', 'view'];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/applications`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(
      apps => {
        this.applications = apps;
      },
      error => {
        console.error('Failed to fetch applications', error);
      }
    );
  }

  viewJob(jobId: number) {
    this.router.navigate(['/jobs', jobId]); // Make sure this route exists in your app
  }
}
