import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name = '';
  mobile = '';
  email = '';
  password = '';
  role = 'jobseeker';
  constructor(private http: HttpClient, private router: Router) {}
  register() {
    this.http.post<any>(`${environment.apiUrl}/auth/signup`, {
      name: this.name,
      mobile: this.mobile,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => alert(err.error.message || 'Registration failed')
    });
  }
}