import { Injectable } from '@angular/core';
import { AuthCredsTypes, AuthFormTypes } from '../types/auth';
import { LocalStorageAuthName } from '../constants';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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

  async login(form: AuthFormTypes): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/users/login.php`, {
      method: 'POST',
      body: JSON.stringify({
        email: form.email,
        password: form.password
      })
    })

    const res = await f.json()
    if (res?.status) {
      this.isAuthenticated = true
      this.authCredentials = {
        id: res.id,
        email: res.email,
        role: res.role
      }

      localStorage.setItem(
        LocalStorageAuthName,
        JSON.stringify(this.authCredentials)
      )

      this.router.navigate(['/app'])
    }
    else alert(res?.message || "Something went wrong.")
  }

  async register(form: AuthFormTypes): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/users/register.php`, {
      method: 'POST',
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        repassword: form.repassword
      })
    })

    const res = await f.json()
    if (res?.status) {
      alert("REGISTERED")
      this.router.navigate(['/login'])
    }
    else alert(res?.message || "Something went wrong.")
  }

  logout(): void {
    localStorage.clear()
    this.isAuthenticated = false
    this.router.navigate(['/login'])
  }
}
