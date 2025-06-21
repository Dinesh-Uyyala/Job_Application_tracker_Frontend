import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('user');
    if (user) this.currentUserSubject.next(JSON.parse(user));
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify({ id: res.id, role: res.role }));
        localStorage.setItem('role', res.role);
        this.currentUserSubject.next({ id: res.id, role: res.role });
        this.isLoggedIn$.next(true);
      })
    );
  }

  register(name: string, mobile: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { name, mobile, email, password, role });
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  get token() { return localStorage.getItem('token'); }
  get currentUser() { return this.currentUserSubject.value; }
  get isLoggedIn() { return !!this.token; }
  get role() { return this.currentUser?.role || localStorage.getItem('role'); }
}