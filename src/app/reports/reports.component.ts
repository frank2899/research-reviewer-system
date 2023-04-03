import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FacultyTypes } from '../types/faculty';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  from: string = ''
  to: string = ''
  userId: string = ''
  result: any[] = []
  faculty: FacultyTypes[] = []

  constructor(private themeService: ThemeService) { }

  async ngOnInit(): Promise<void> {
    this.from = this.initialDate(1)
    this.to = this.initialDate(new Date().getDate() + 1)

    await this.loadReport()
    await this.loadReviewers()
  }

  getHeaderColor(): string {
    return this.themeService.HeaderColor
  }

  initialDate(day: number): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const initialD = new Date(year, month, day)

    const month1 = (initialD.getMonth() + 1).toString().padStart(2, '0');
    const day1 = (initialD.getDate()).toString().padStart(2, '0')

    return `${year}-${month1}-${day1}`
  }

  onChangeFacultySelect(e: any): void {
    this.userId = e.target.value
    this.loadReport()
  }

  onChangeDate(): void {
    this.loadReport()
  }

  async loadReport(): Promise<void> {
    const arrayOfFilter: string[] = []

    if (this.from) arrayOfFilter.push(`fromDate=${this.from}`)
    if (this.to) arrayOfFilter.push(`toDate=${this.to}`)
    if (this.userId) arrayOfFilter.push(`userId=${this.userId}`)

    const f = await fetch(`${environment.API_HOST}/api/reports.php?${[...new Set(arrayOfFilter)].join('&')}`, {
      method: 'GET'
    })
    const res = await f.json()
    if (res?.status) {
      this.result = res.result.map((e: any) => {
        return { ...e, dateCreated: `${new Date(e.dateCreated).toDateString()} ${new Date(e.dateCreated).toLocaleTimeString()}` }
      })
    }
  }

  async loadReviewers(): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/users/faculty.php`, {
      method: 'GET'
    })
    const res = await f.json()
    if (res?.status) {
      this.faculty = res.faculty.map((e: any) => {
        return {
          ...e,
          isReviewer: !!e.isReviewer,
          isActive: !!e.isActive,
        }
      })
    }
  }
}
