import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/auth.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User | null> {
    return this.http
      .post<User>(`${environment.apiUrl}/bridge/login`, { email, password })
      .pipe(
        map((response) => {
          localStorage.setItem('userName', JSON.stringify(response));
          this.currentUserSubject.next(response);
          return response;
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('userName');
    this.currentUserSubject.next(null);

    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.getValue();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }
}
