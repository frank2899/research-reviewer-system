import { Component, OnInit } from '@angular/core';
import { ProfileTypes } from '../types/auth';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { LocalStorageAuthName } from '../constants';
import { ThemeService } from '../theme/theme.service';
import { ToastrService } from 'ngx-toastr';
import { validateNistPassword } from '../utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {
  form: ProfileTypes = {
    email: '',
    newpassword: '',
    oldpassword: '',

    name: '',
    profile: '',
    age: '',
    address: '',
    employeeNumber: '',
    department: 'BSIT',
  }

  imageUrl: string = environment.API_HOST+'/api/assets/'

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private toaster: ToastrService
  ) { }

  onFileSelected(event: any): void {
    const file: File = event?.target?.files[0] || null;

    if (file) this.form.profile = file;
  }

  ngOnInit(): void {
    this.form.email = this.authService.authCredentials.email
    this.form.name = this.authService.authCredentials.name
    this.form.age = this.authService.authCredentials.age
    this.form.address = this.authService.authCredentials.address
    this.form.employeeNumber = this.authService.authCredentials.employeeNumber
    this.form.department = this.authService.authCredentials.department
  }

  getHeaderColor(): string {
    return this.themeService.HeaderColor
  }

  async updatePersonalInfo(): Promise<void> {
    const formData = new FormData()
    formData.append("name", this.form.name || '')
    formData.append("age", this.form.age || '')
    formData.append("address", this.form.address || '')
    formData.append("employeeNumber", this.form.employeeNumber || '')
    formData.append("department", this.form.department || '')
    formData.append("profile", this.form.profile || '')
    formData.append("id", this.authService.authCredentials.id as string)

    const f = await fetch(`${environment.API_HOST}/api/users/change-personal-info.php`, {
      method: 'POST',
      body: formData
    })

    const res = await f.json()
    if (res?.status) {
      this.toaster.success("Personal Information updated successfully")
      this.authService.authCredentials.age = this.form?.age
      this.authService.authCredentials.address = this.form?.address
      this.authService.authCredentials.employeeNumber = this.form?.employeeNumber
      this.authService.authCredentials.department = this.form?.department
      this.authService.authCredentials.profile = this.form?.profile && (this.imageUrl + this.form.profile)

      localStorage.setItem(
        LocalStorageAuthName,
        JSON.stringify(this.authService.authCredentials)
      )
    }
    else this.toaster.error(res?.message || "Something went wrong.")
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

  async updatePassword(): Promise<void | any> {

    const isValidPassFormat = validateNistPassword(this.form.newpassword || '')
    if(
      typeof isValidPassFormat === 'string'
    ) return this.toaster.error(isValidPassFormat)
    

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
