import { Component } from '@angular/core';
import { AuthFormTypes } from 'src/app/types/auth';

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

  submit() : void {
    console.log(this.form)
  }
}
