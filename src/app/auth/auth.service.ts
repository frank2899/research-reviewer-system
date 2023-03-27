import { Injectable } from '@angular/core';
import { AuthCredsTypes, AuthFormTypes } from '../types/auth';
import { LocalStorageAuthName } from '../constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isAuthenticated: boolean = false
  authCredentials: AuthCredsTypes = {
    token: '',
    id: '',
    email: '',
    role: ''
  }

  constructor(private router: Router) { }

  login(form: AuthFormTypes): void {
    this.authCredentials = {
      token: '123xxxxx',
      id: '1',
      email: form.email,
      role: 'faculty'
    }

    this.isAuthenticated = true

    localStorage.setItem(
      LocalStorageAuthName,
      JSON.stringify(this.authCredentials)
    )

    this.router.navigate(['/app'])
  }

  register(form: AuthFormTypes): void {
    console.log(form)
    alert("REGISTERED")
    this.router.navigate(['/login'])
  }

  logout(): void {
    localStorage.clear()
    this.isAuthenticated = false
    this.router.navigate(['/login'])
  }
}
