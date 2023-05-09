import { Component } from '@angular/core';
import { AuthFormTypes } from 'src/app/types/auth';
import { AuthService } from '../auth.service';
import { ThemeService } from 'src/app/theme/theme.service';
import { environment } from 'src/environments/environment';

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
  getBGImage(): any {
    console.log(this.themeService.backgroundImage ? `${environment.API_HOST}/api/assets/${this.themeService.backgroundImage}` : null)
    return this.themeService.backgroundImage ? `${environment.API_HOST}/api/assets/${this.themeService.backgroundImage}` : null
  }
}
