import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html'
})
export class ApplicationListComponent implements OnInit {
  applications: any[] = [];
  columns = ['title', 'status'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/applications`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(apps => this.applications = apps);
  }
}