import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { LocalStorageAuthName } from "./constants";

@Component({
    selector : 'app-root',
    templateUrl : 'app.component.html'
})
export class AppComponent implements OnInit {
    constructor(
        private router: Router,
        private authService: AuthService
    ){}

    ngOnInit(): void {
        if(localStorage.getItem(LocalStorageAuthName)) {
            this.authService.isAuthenticated = true
            this.authService.authCredentials = JSON.parse(localStorage.getItem(LocalStorageAuthName) as string)
        }
    }

    hasAuth() : boolean {
        return this.authService.isAuthenticated
    }

    AuthRole() : string {
        return this.authService.authCredentials.role
    }

    signOut() : void {
        this.authService.logout()
    }
}