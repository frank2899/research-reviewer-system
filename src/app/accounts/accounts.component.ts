import { Component } from '@angular/core';
import { FilterTypes } from '../types/table';
import { FacultyTypes } from '../types/faculty';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  filters: FilterTypes = {
    page: 1,
    search: '',
  }
  isLoading : boolean = false
  totalPage: number = 5
  list: FacultyTypes[] = [
    {
      id: 1,
      email: 'test@gmail.com',
      isReviewer: false,
      isActive: false
    },
    {
      id: 2,
      email: 'dummy@gmail.com',
      isReviewer: true,
      isActive: false
    },
    {
      id: 3,
      email: 'johnDoe@gmail.com',
      isReviewer: false,
      isActive: true
    },
  ]

  onChangePage(page : number) : void {
    if(this.isLoading) return

    this.isLoading = true
    this.filters.page = page
    this.isLoading = false
  }

  onApprove(faculty : FacultyTypes) : void {
    this.list = this.list.map( (e) => {
      if(e.id === faculty.id){
        return { ...e, isActive : !e.isActive}
      }

      return e
    })
  }

  onUpdateRole(faculty : FacultyTypes) : void {
    this.list = this.list.map( (e) => {
      if(e.id === faculty.id){
        return { ...e, isReviewer : !e.isReviewer}
      }

      return e
    })
  }
}
