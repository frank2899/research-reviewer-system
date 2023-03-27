import { Component, OnInit } from "@angular/core";
import { Event, NavigationEnd, NavigationStart, Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { LocalStorageAuthName } from "./constants";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    isPageLoading: boolean = false

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {
        this.router.events.subscribe((routerEvent: Event) => {
            if (routerEvent instanceof NavigationStart) {
                this.isPageLoading = true
            }

            if (routerEvent instanceof NavigationEnd) {
                this.isPageLoading = false
            }
        })
    }

    ngOnInit(): void {
        if (localStorage.getItem(LocalStorageAuthName)) {
            this.authService.isAuthenticated = true
            this.authService.authCredentials = JSON.parse(localStorage.getItem(LocalStorageAuthName) as string)
        }
    }

    hasAuth(): boolean {
        return this.authService.isAuthenticated
    }

    AuthRole(): string {
        return this.authService.authCredentials.role
    }

    signOut(): void {
        this.authService.logout()
    }
}