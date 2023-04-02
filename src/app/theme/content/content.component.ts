import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  // themes
  isThemeLoaded: boolean = false
  BodyBackgroundColor: string = ''
  MenuColor: string = ''
  HeaderColor: string = ''
  TitleColor: string = ''  //Title color of the App
  PrimaryColor: string = '' //more on background of the content
  AppTitle: string = ''

  vision: string = ''
  mission: string = ''
  goals: string = ''
  objectives: string = ''
  appLogo: any = null

  constructor(
    private themeService: ThemeService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.BodyBackgroundColor = this.themeService.BodyBackgroundColor
    this.MenuColor = this.themeService.MenuColor
    this.HeaderColor = this.themeService.HeaderColor
    this.TitleColor = this.themeService.TitleColor
    this.PrimaryColor = this.themeService.PrimaryColor
    this.AppTitle = this.themeService.AppTitle
    
    this.vision = this.themeService.vision
    this.goals = this.themeService.goals
    this.mission = this.themeService.mission
    this.objectives = this.themeService.objectives
    this.appLogo = this.themeService.appLogo
  }

  async update(queryName: string, target: string): Promise<void> {
    const form : any = new FormData()
    form.append(queryName.toString(), target)

    const f = await fetch(`${environment.API_HOST}/api/content/update.php`, {
      method: 'POST',
      body : form
    })
    const res = await f.json()
    if (!res?.status) this.toaster.error(res?.message || "Something went wrong.")
    this.toaster.success("System Content/Theme Updated!")
  }

  getHeaderColor(): string {
    return this.themeService.HeaderColor
  }

  onFileSelected(event: any): void {
    const file: File = event?.target?.files[0] || null;

    if (file) this.appLogo = file;
  }

  async setVision(): Promise<void> {
    await this.update('vision', this.vision)

    this.themeService.setVision(this.vision)
  }

  async setMision(): Promise<void> {
    await this.update('mission', this.mission)

    this.themeService.setMision(this.mission)
  }

  async setGoals(): Promise<void> {
    await this.update('goals', this.goals)

    this.themeService.setGoals(this.goals)
  }

  async setObjectives(): Promise<void> {
    await this.update('objectives', this.objectives)

    this.themeService.setObjectives(this.objectives)
  }

  async setAppLogo(): Promise<void> {
    await this.update('appLogo', this.appLogo)

    this.themeService.setAppLogo(this.appLogo)
  }

  async setBodyBackgroundColor(): Promise<void> {
    await this.update('BodyBackgroundColor', this.BodyBackgroundColor.replace('#',''))

    this.themeService.setBodyBackgroundColor(this.BodyBackgroundColor)
  }

  async setAppTitle(): Promise<void> {
    await this.update('AppTitle', this.AppTitle)

    this.themeService.setAppTitle(this.AppTitle)
  }

  async setMenuColor(): Promise<void> {
    await this.update('MenuColor', this.MenuColor.replace('#',''))

    this.themeService.setMenuColor(this.MenuColor)
  }

  async setHeaderColor(): Promise<void> {
    await this.update('HeaderColor', this.HeaderColor.replace('#',''))

    this.themeService.setHeaderColor(this.HeaderColor)
  }

  async setTitleColor(): Promise<void> {
    await this.update('TitleColor', this.TitleColor.replace('#',''))

    this.themeService.setTitleColor(this.TitleColor)
  }

  async setPrimaryColor(): Promise<void> {
    await this.update('PrimaryColor', this.PrimaryColor.replace('#',''))

    this.themeService.setPrimaryColor(this.PrimaryColor)
  }
}
