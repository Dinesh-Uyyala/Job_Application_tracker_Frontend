import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  columns = ['email', 'role', 'created_at'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/admin/users', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(users => this.users = users);
  }
}