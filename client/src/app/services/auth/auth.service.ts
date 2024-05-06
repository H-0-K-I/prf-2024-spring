import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  login(username: string, password: string) {
    const body = {
      username,
      password,
    };

    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.post('http://localhost:5000/api/users/login', body, {
      headers,
      withCredentials: true,
    });
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ) {
    const body = {
      firstName,
      lastName,
      email,
      username,
      password,
    };

    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.post(
      'http://localhost:5000/api/users/register',
      JSON.stringify(body),
      {
        headers,
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
