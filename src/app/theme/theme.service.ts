import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  BodyBackgroundColor: string = '#f6f9ff'
  MenuColor: string = '#ffffff' //
  HeaderColor: string = '#012970'
  TitleColor: string = '#012970'  //Title color of the App
  PrimaryColor: string = '#ffffff' //more on background of the content

  AppTitle: string = 'R.C SYSTEM'

  vision: string = ''
  mission: string = ''
  goals: string = ''
  objectives: string = ''
  appLogo: any = null

  constructor() { }

  setVision(vision: string) : void {
    this.vision = vision
  }

  setMision(mission: string) : void {
    this.mission = mission
  }

  setGoals(goals: string) : void {
    this.goals = goals
  }

  setObjectives(objectives: string) : void {
    this.objectives = objectives
  }

  setAppLogo(appLogo: any) : void {
    this.appLogo = appLogo
  }

  setBodyBackgroundColor(color: string) : void {
    this.BodyBackgroundColor = color
  }

  setAppTitle(title: string) : void {
    this.AppTitle = title
  }

  setMenuColor(color: string) : void {
    this.MenuColor = color
  }

  setHeaderColor(color: string) : void {
    this.HeaderColor = color
  }

  setTitleColor(color: string) : void {
    this.TitleColor = color
  }

  setPrimaryColor(color: string) : void {
    this.PrimaryColor = color
  }
}
