import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    // get loggedin from auth service
    this.isLoggedIn = this.authService.isLoggedIn;
  } 
  user = localStorage.getItem('user');
  userData = this.user ? JSON.parse(this.user) : {};
  token = localStorage.getItem('token');
  role = localStorage.getItem('role');
  // if (!token) {
  //     this.router.navigateByUrl('/');
  //   }
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
  register(){
    this.router.navigateByUrl('/register');
  }
}