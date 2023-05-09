import { Component, OnInit } from "@angular/core";
import { Event, NavigationEnd, NavigationStart, Router, RouterOutlet } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { LocalStorageAuthName } from "./constants";
import { routeAnimate } from "./animation";
import { ThemeService } from "./theme/theme.service";
import { environment } from "src/environments/environment";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    animations: [routeAnimate]
})
export class AppComponent implements OnInit {

    isPageLoading: boolean = false
    sidebarToggle: boolean = false
    currentRoute: string = ''
    isDropdownHeaderOpen: boolean = false
    // themes
    isThemeLoaded: boolean = false

    constructor(
        private router: Router,
        private authService: AuthService,
        private themeService: ThemeService
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

    async ngOnInit(): Promise<void> {
        if (localStorage.getItem(LocalStorageAuthName)) {
            this.authService.isAuthenticated = true
            this.authService.authCredentials = JSON.parse(localStorage.getItem(LocalStorageAuthName) as string)
        }
        await this.loadContentTheme()
    }

    getBodyBackgroundColor(): string {
        return this.themeService.BodyBackgroundColor
    }

    getMenuColor(): string {
        return this.themeService.MenuColor
    }

    getTitleColor(): string {
        return this.themeService.TitleColor
    }

    getPrimaryColor(): string {
        return this.themeService.PrimaryColor
    }

    getHeaderColor(): string {
        return this.themeService.HeaderColor
    }

    getAppTitle(): string {
        return this.themeService.AppTitle
    }

    getAppLogo(): string {
        return this.themeService.appLogo ? `${environment.API_HOST}/api/assets/${this.themeService.appLogo}` : '../assets/three-stars.png'
    }

    async loadContentTheme(): Promise<void> {
        this.isThemeLoaded = false
        const f = await fetch(`${environment.API_HOST}/api/content/get.php`, {
            method: 'GET'
        })
        const res = await f.json()
        if (res?.status) {
            this.themeService.setBodyBackgroundColor(res.result.bodyBackgroundColor)
            this.themeService.setMenuColor(res.result.menuColor)
            this.themeService.setHeaderColor(res.result.headerColor)
            this.themeService.setTitleColor(res.result.titleColor)
            this.themeService.setPrimaryColor(res.result.primaryColor)
            this.themeService.setAppTitle(res.result.appTitle)

            this.themeService.setVision(res.result.vision)
            this.themeService.setGoals(res.result.goals)
            this.themeService.setMision(res.result.mission)
            this.themeService.setObjectives(res.result.objectives)
            this.themeService.setAppLogo(res.result.appLogo)
            this.themeService.setRubriks(res.result.rubriks)
            this.themeService.setBackgroundImage(res.result.backgroundImage)
        }

        setTimeout(() => this.isThemeLoaded = true, 1500)
    }

    prepareRoute(outlet: RouterOutlet) {
        if (outlet.isActivated) return outlet.activatedRoute.snapshot.url

        return outlet
    }

    hasAuth(): boolean {
        return this.authService.isAuthenticated
    }

    AuthRole(): string {
        return this.authService.authCredentials.role
    }

    AuthEmail(): string {
        return this.authService.authCredentials.email
    }

    AuthProfile(): string {
        // console.log(this.authService.authCredentials.profile)
        return this.authService.authCredentials.profile || 'https://img.freepik.com/free-icon/user_318-563642.jpg'
    }

    signOut(): void {
        this.authService.logout()
    }
}