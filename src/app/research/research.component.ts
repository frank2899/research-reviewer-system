import { Component, OnInit } from '@angular/core';
import { FilterTypes } from '../types/table';
import { ResearchTypes } from '../types/research';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  filters: FilterTypes = {
    page: 1,
    search: '',
  }
  isLoading: boolean = false
  totalPage: number = 5
  list: ResearchTypes[] = []

  uploadedFile: any = null
  title: string = ''

  constructor(
    private authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loadData()
  }

  async loadData(page: number = 1, search: string = ''): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/research/paginate.php?page=${page}&q=${search}`, {
      method: 'GET'
    })
    const res = await f.json()
    console.log(res)
    if (res?.status) {
      this.totalPage = Number(res.totalPages) === 0 ? 1 : Number(res.totalPages)
      this.filters.page = Number(page)
      this.list = res.results.map((e: any) => {
        return { ...e, reviewers: e.reviewers || [] }
      })
    }
  }

  onFileSelected(event: any): void {
    const file: File = event?.target?.files[0] || null;

    if (file) this.uploadedFile = file;
  }

  async newResearch(): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/research/save.php`, {
      method: 'POST',
      body: JSON.stringify({
        title: this.title,
        attachment: this.uploadedFile,
        id: this.authService.authCredentials.id
      })
    })
    const res = await f.json()

    if (res?.status) {
      this.loadData(this.filters.page, this.filters.search)
      this.uploadedFile = null
      this.title = ''
    }
    else alert(res?.message || "Something went wrong.")
  }

  async onSearch(): Promise<void> {
    if (this.isLoading) return
    this.isLoading = true
    await this.loadData(1, this.filters.search)
    this.isLoading = false
  }

  async onChangePage(page: number): Promise<void> {
    if (this.isLoading) return

    this.isLoading = true
    await this.loadData(page, this.filters.search)
    this.isLoading = false
  }
}
