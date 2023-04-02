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
  }

  async update(queryName: string, target: string): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/content/update.php?${queryName}=${target}`, {
      method: 'GET'
    })
    const res = await f.json()
    if (!res?.status) this.toaster.error(res?.message || "Something went wrong.")
  }

  getHeaderColor(): string {
    return this.themeService.HeaderColor
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
