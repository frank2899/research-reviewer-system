import { Component, OnInit } from "@angular/core";
import { Event, NavigationEnd, NavigationStart, Router, RouterOutlet } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { LocalStorageAuthName } from "./constants";
import { routeAnimate } from "./animation";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    animations: [routeAnimate]
})
export class AppComponent implements OnInit {

    isPageLoading: boolean = false
    sidebarToggle: boolean = false
    currentRoute: string = ''

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
                this.currentRoute = routerEvent.url;
            }
        })
    }

    ngOnInit(): void {
        if (localStorage.getItem(LocalStorageAuthName)) {
            this.authService.isAuthenticated = true
            this.authService.authCredentials = JSON.parse(localStorage.getItem(LocalStorageAuthName) as string)
        }
    }

    prepareRoute(outlet: RouterOutlet) {
        if(outlet.isActivated) return outlet.activatedRoute.snapshot.url

        return outlet
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