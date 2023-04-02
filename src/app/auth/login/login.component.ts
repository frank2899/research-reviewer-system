import { Component } from '@angular/core';
import { AuthFormTypes } from 'src/app/types/auth';
import { AuthService } from '../auth.service';
import { ThemeService } from 'src/app/theme/theme.service';

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
    private authService : AuthService,
    private themeService: ThemeService
  ){}

  submit() : void {
    this.authService.login(this.form)
  }

  getPrimaryColor(): string {
      return this.themeService.PrimaryColor
  }
  getHeaderColor(): string {
      return this.themeService.HeaderColor
  }
}
