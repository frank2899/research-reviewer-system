import { Component } from '@angular/core';
import { AuthFormTypes } from 'src/app/types/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form : AuthFormTypes = {
    email : '',
    password  : '',
    repassword : ''
  }

  constructor(
    private authService : AuthService
  ) {}

  submit() : void {
    this.authService.register(this.form)
  }
}
