import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  applications: any[] = [];
  columns = ['job_title', 'status'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/jobseeker/applications', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(apps => this.applications = apps);
  }
}