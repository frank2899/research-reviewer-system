import { Injectable } from '@angular/core';
import { AuthCredsTypes, AuthFormTypes } from '../types/auth';
import { LocalStorageAuthName } from '../constants';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isAuthenticated: boolean = false
  authCredentials: AuthCredsTypes = {
    token: '',
    id: '',
    email: '',
    role: '',
    name: '',
    profile: '',
    age: '',
    address: '',
    employeeNumber: '',
    department: 'BSIT',
  }
  imageUrl: string = environment.API_HOST+'/api/assets/'

  constructor(private router: Router, private toaster: ToastrService) { }

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
        role: res.role,
        name: res.name,
        profile: res.profile && (this.imageUrl + res.profile),
        age: res.age,
        address: res.address,
        employeeNumber: res.employeeNumber,
        department: res.department,
      }

      localStorage.setItem(
        LocalStorageAuthName,
        JSON.stringify(this.authCredentials)
      )

      this.router.navigate(['/app'])
    }
    else this.toaster.error(res?.message || "Something went wrong.")
  }

  async register(form: AuthFormTypes): Promise<void> {
    const formData = new FormData();
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('repassword', form.repassword || '');
    formData.append('name', form.name || '');
    formData.append('profile', form.profile || '');
    formData.append('age', form.age || '');
    formData.append('address', form.address || '');
    formData.append('employeeNumber', form.employeeNumber || '');
    formData.append('department', form.department || '');
    
    const f = await fetch(`${environment.API_HOST}/api/users/register.php`, {
      method: 'POST',
      body: formData,
    });
    

    const res = await f.json()
    if (res?.status) {
      this.toaster.success('Registered! Waiting for approval. ')
      this.router.navigate(['/login'])
    }
    else this.toaster.error(res?.message || "Something went wrong.")
  }

  logout(): void {
    localStorage.clear()
    this.isAuthenticated = false
    this.router.navigate(['/login'])
  }
}
