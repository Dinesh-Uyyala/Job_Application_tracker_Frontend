import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {
    // Redirect if already logged in
    if (this.authService.isLoggedIn) {
      const role = this.authService.role;
      this.router.navigateByUrl('/' + role);
    }
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (data: any) => {
        alert("Login Successful😊");
        const role = data.role;
        this.router.navigateByUrl('/' + role);
      },
      error: (err: any) => {
        alert(err.error.message || "Internal Server Error!");
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}