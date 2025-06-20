import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  role:any = '';
  constructor(private http: HttpClient, private router: Router) {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      this.role= localStorage.getItem('role');
      this.router.navigateByUrl('/{{role}}');
    }
  }
  //   login(){
  //   this._loginService.login(this.loginForm.value).subscribe(
  //     (data:any)=>{
  //       console.log(data);
  //       alert("Login Successful😊");
  //       sessionStorage.setItem('token',data.token);
  //       this._router.navigateByUrl("/dashboard");
  //     },(err:any)=>{
  //       alert("Internal Server Error!")
  //     }
  //   )
  // }
  
  
  
  login() {
    this.http.post<any>(`${environment.apiUrl}/auth/login`, { email: this.email, password: this.password })
      .subscribe({
        next: (data: any) => {
          console.log(data);
          alert("Login Successful😊");
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', data);
          localStorage.setItem('role', data.role);
          this.role = data.role;
          this.router.navigateByUrl("/" + this.role);
        },
        error: (err: any) => {
          alert(err.error.message || "Internal Server Error!");
        }
      });
  }

  logout() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigateByUrl("/login");
  }
}