import { Component, OnInit } from '@angular/core';
import { ProfileTypes } from '../types/auth';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { LocalStorageAuthName } from '../constants';
import { ThemeService } from '../theme/theme.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {
  form: ProfileTypes = {
    email: '',
    newpassword: '',
    oldpassword: ''
  }

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.form.email = this.authService.authCredentials.email
  }

  getHeaderColor(): string {
    return this.themeService.HeaderColor
  }

  async updateEmail(): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/users/change-email.php`, {
      method: 'POST',
      body: JSON.stringify({
        email: this.form.email,
        id: this.authService.authCredentials.id
      })
    })

    const res = await f.json()
    if (res?.status) {
      this.toaster.success("Email updated!")
      this.authService.authCredentials.email = res.email

      localStorage.setItem(
        LocalStorageAuthName,
        JSON.stringify(this.authService.authCredentials)
      )
    }
    else this.toaster.error(res?.message || "Something went wrong.")
  }

  async updatePassword(): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/users/change-password.php`, {
      method: 'POST',
      body: JSON.stringify({
        oldpassword: this.form.oldpassword,
        newpassword: this.form.newpassword,
        id: this.authService.authCredentials.id
      })
    })

    const res = await f.json()
    if (res?.status) {
      this.toaster.success("Password updated!")
      this.form.newpassword = ''
      this.form.oldpassword = ''
    }
    else this.toaster.error(res?.message || "Something went wrong.")
  }
}
