import { Component } from '@angular/core';
import { AuthFormTypes } from 'src/app/types/auth';
import { AuthService } from '../auth.service';
import { ThemeService } from 'src/app/theme/theme.service';

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
    private authService : AuthService,
    private themeService: ThemeService
  ) {}

  submit() : void {
    this.authService.register(this.form)
  }

  getHeaderColor(): string {
      return this.themeService.HeaderColor
  }

  getPrimaryColor(): string {
      return this.themeService.PrimaryColor
  }
}
