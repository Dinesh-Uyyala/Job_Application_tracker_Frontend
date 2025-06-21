import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  applications: any[] = [];
  columns = ['title', 'vacancies', 'location', 'status', 'view'];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/jobseeker/applications`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(
      apps => {
        this.applications = apps;
        console.log('Applications loaded:', this.applications);
      },
      error => {
        console.error('Failed to fetch applications', error);
      }
    );
  }

  viewJob(jobId: number) {
    this.router.navigate(['/jobseeker/job-details', jobId]);
  }
}
