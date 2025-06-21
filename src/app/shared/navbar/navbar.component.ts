import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = '';
  userData: any = {};
  token: any = '';
  role: any = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(val => {
      this.isLoggedIn = val;
      this.user = localStorage.getItem('user');
      this.userData = this.user ? JSON.parse(this.user) : {};
      this.token = localStorage.getItem('token');
      this.role = localStorage.getItem('role');
    });
  }

  logout() {
    this.authService.logout();
  }

  register() {
    this.router.navigateByUrl('/register');
  }
  login() {
    this.router.navigateByUrl('/login');
  }
}