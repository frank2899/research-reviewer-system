import { Component, OnInit } from '@angular/core';
import { FilterTypes } from '../types/table';
import { FacultyTypes } from '../types/faculty';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  filters: FilterTypes = {
    page: 1,
    search: '',
  }
  isLoading: boolean = false
  totalPage: number = 1
  list: FacultyTypes[] = []

  async ngOnInit(): Promise<void> {
    this.loadData()
  }

  async loadData(page: number = 1, search: string = ''): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/users/paginate.php?page=${page}&q=${search}`, {
      method: 'GET'
    })
    const res = await f.json()

    if (res?.status) {
      this.totalPage = Number(res.totalPages) === 0 ? 1 : Number(res.totalPages)
      this.filters.page = Number(page)
      this.list = res.results.map((e: any) => {
        return {
          ...e,
          isReviewer: !!e.isReviewer,
          isActive: !!e.isActive,
        }
      })
    }
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

  async onApprove(faculty: FacultyTypes): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/users/update-status.php`, {
      method: 'POST',
      body: JSON.stringify({
        id: faculty.id
      })
    })

    const res = await f.json()
    if (!res?.status) alert(res?.message || "Something went wrong.")
    else this.loadData(this.filters.page, this.filters.search)
  }

  async onUpdateRole(faculty: FacultyTypes): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/users/update-faculty-role.php`, {
      method: 'POST',
      body: JSON.stringify({
        id: faculty.id
      })
    })

    const res = await f.json()
    if (!res?.status) alert(res?.message || "Something went wrong.")
    else this.loadData(this.filters.page, this.filters.search)
  }
}
