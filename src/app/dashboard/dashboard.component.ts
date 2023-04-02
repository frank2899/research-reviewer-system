import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { convertToMonth } from '../utils';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cards = {
    unassigned: 0,
    completed: 0,
    underrevision: 0,
    uploaded: 0
  }

  month: number = new Date().getMonth() + 1
  year: number = new Date().getFullYear()

  chart: any;
  showChart: boolean = false
  showPieChart: boolean = false
  showCards: boolean = false

  chartOptions = {
    animationEnabled: true,
    theme: "light2",
    axisX: {
      valueFormatString: "D MMM"
    },
    axisY: {
      title: `${convertToMonth(Number(this.month))} - ${this.year}`
    },
    toolTip: {
      shared: true
    },
    data: [{
      type: "column",
      name: "Uploaded Research Counts",
      xValueFormatString: "MMM DD, YYYY",
      dataPoints: []
    }]
  }

  pieChartOptions = {
    animationEnabled: true,
    theme: "light2",
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      dataPoints: [] as any
    }]
  }

  constructor(private themeService: ThemeService) { }

  async ngOnInit(): Promise<void> {
    await this.loadResearchStatusCounts()
    await this.graphMonthlyUploadCounts()
    await this.chartFacultyCounts()
  }

  getPrimaryColor(): string {
    return this.themeService.PrimaryColor
  }

  getHeaderColor(): string {
    return this.themeService.HeaderColor
  }

  getMission(): string {
    return this.themeService.mission.replaceAll('\n', '<br/>')
  }

  getVision(): string {
    return this.themeService.vision.replaceAll('\n', '<br/>')
  }

  getObjectives(): string {
    return this.themeService.objectives.replaceAll('\n', '<br/>')
  }

  getGoals(): string {
    return this.themeService.goals
  }

  async loadResearchStatusCounts(): Promise<void> {
    this.showCards = false
    const f = await fetch(`${environment.API_HOST}/api/dashboard/research-status.php`, {
      method: 'GET'
    })
    const res = await f.json()
    if (res?.status) {
      this.cards.unassigned = res.unassigned
      this.cards.underrevision = res.under_revision
      this.cards.completed = res.completed
      this.cards.uploaded = res.uploaded
    }
    this.showCards = true
  }

  async graphMonthlyUploadCounts(): Promise<void> {
    this.showChart = false
    const f = await fetch(`${environment.API_HOST}/api/dashboard/monthly-upload-counts.php?month=${this.month}&year=${this.year}`, {
      method: 'GET'
    })
    const res = await f.json()
    this.chartOptions.data[0].dataPoints = res.labels.map((e: any, i: any) => {
      return {
        x: new Date(Number(this.year), Number(this.month - 1), Number(e)),
        y: Number(res.values[i])
      }
    })
    this.showChart = true
  }
  async chartFacultyCounts(): Promise<void> {
    this.showPieChart = false
    const f = await fetch(`${environment.API_HOST}/api/dashboard/faculty-counts.php`, {
      method: 'GET'
    })
    const res = await f.json()
    console.log(res)
    if (res.status) {
      this.pieChartOptions.data[0].dataPoints = [
        { y: res.reviewers, name: "Reviewers" },
        { y: res.active, name: "Active" },
        { y: res.inactive, name: "Inactive" },
      ]
    }
    this.showPieChart = true
  }
}
