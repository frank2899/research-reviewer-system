import { Component } from '@angular/core';
import { AuthFormTypes } from 'src/app/types/auth';

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

  submit() : void {
    console.log(this.form)
  }
}
