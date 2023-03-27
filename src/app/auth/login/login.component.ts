import { Component } from '@angular/core';
import { AuthFormTypes } from 'src/app/types/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: AuthFormTypes = {
    email: '',
    password: ''
  }

  constructor(
    private authService : AuthService
  ){}

  submit() : void {
    this.authService.login(this.form)
  }
}
