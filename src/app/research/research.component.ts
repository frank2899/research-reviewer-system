import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterTypes } from '../types/table';
import { ResearchTypes } from '../types/research';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { ThemeService } from '../theme/theme.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
  @ViewChild('closeResearchModalBtn') closeResearchModalBtn: any;

  filters: FilterTypes = {
    page: 1,
    search: '',
  }
  isLoading: boolean = false
  totalPage: number = 1
  list: ResearchTypes[] = []

  uploadedFile: any = null
  title: string = ''
  imageUrl: string = environment.API_HOST+'/api/assets/'

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private toaster: ToastrService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loadData()
  }

  async loadData(page: number = 1, search: string = ''): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/research/paginate.php?page=${page}&q=${search}&role=${this.authService.authCredentials.role}&id=${this.authService.authCredentials.id}`, {
      method: 'GET'
    })
    const res = await f.json()
    if (res?.status) {
      this.totalPage = Number(res.totalPages) === 0 ? 1 : Number(res.totalPages)
      this.filters.page = Number(page)
      this.list = res.results.map((e: any) => {
        return { ...e, reviewers: e?.reviewers || [] }
      })
    }
  }

  getHeaderColor(): string {
    return this.themeService.HeaderColor
  }

  onFileSelected(event: any): void {
    const file: File = event?.target?.files[0] || null;

    if (file) this.uploadedFile = file;
  }

  async newResearch(): Promise<void> {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('attachment', this.uploadedFile);
    formData.append('id', this.authService.authCredentials.id.toString());

    const f = await fetch(`${environment.API_HOST}/api/research/save.php`, {
      method: 'POST', body: formData
    })
    const res = await f.json()

    if (res?.status) {
      this.loadData(this.filters.page, this.filters.search)
      this.uploadedFile = null
      this.title = ''
      this.closeResearchModalBtn.nativeElement.click()
      this.toaster.success("New Research capsule added.")
    }
    else this.toaster.error(res?.message || "Something went wrong.")
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
