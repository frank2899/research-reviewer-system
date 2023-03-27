import { Component, OnInit } from '@angular/core';
import { ProfileTypes } from '../types/auth';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {
  form: ProfileTypes = {
    email : '',
    newpassword : '',
    oldpassword : ''
  }

  constructor(private authService : AuthService) {}

  ngOnInit(): void {
    this.form.email = this.authService.authCredentials.email
  }

  updateEmail() : void {
    console.log(this.form.email)
  }

  updatePassword() : void {
    console.log(this.form.newpassword)
    console.log(this.form.oldpassword)
  }
}
