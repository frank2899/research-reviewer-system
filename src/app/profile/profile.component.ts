import { Component } from '@angular/core';
import { ProfileTypes } from '../types/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent {
  form: ProfileTypes = {
    email : 'test@gmail.com',
    newpassword : '123',
    oldpassword : '123'
  }

  updateEmail() : void {
    console.log(this.form.email)
  }

  updatePassword() : void {
    console.log(this.form.newpassword)
    console.log(this.form.oldpassword)
  }
}
