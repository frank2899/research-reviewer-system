import { Component } from '@angular/core';
import { AuthFormTypes } from 'src/app/types/auth';
import { AuthService } from '../auth.service';
import { ThemeService } from 'src/app/theme/theme.service';
import { ToastrService } from 'ngx-toastr';
import { validateNistPassword } from 'src/app/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: AuthFormTypes = {
    email: '',
    name: '',
    profile: '',
    age: '',
    address: '',
    employeeNumber: '',
    department: 'BSIT',
    password: '',
    repassword: ''
  }

  page: number = 1

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private toaster: ToastrService
  ) { }

  onFileSelected(event: any): void {
    const file: File = event?.target?.files[0] || null;

    if (file) this.form.profile = file;
  }

  submit(): void | any {
    const isValidPassFormat = validateNistPassword(this.form.password)
    if(
      typeof isValidPassFormat === 'string'
    ) return this.toaster.error(isValidPassFormat)
    
    this.authService.register(this.form)
  }

  getHeaderColor(): string {
    return this.themeService.HeaderColor
  }

  getPrimaryColor(): string {
    return this.themeService.PrimaryColor
  }

  getBGImage(): any {
    return this.themeService.backgroundImage ? `${environment.API_HOST}/api/assets/${this.themeService.backgroundImage}` : null
  }
}
