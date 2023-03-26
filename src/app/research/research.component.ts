import { Component } from '@angular/core';
import { FilterTypes } from '../types/table';
import { ResearchTypes } from '../types/research';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent {

  filters: FilterTypes = {
    page: 1,
    search: '',
  }
  isLoading : boolean = false
  totalPage: number = 5
  list : ResearchTypes[]= [
    {
      id : 1,
      title : 'Sample title 1',
      uploadedBy : 'Frank',
      reviewers : 'Angel, Codrops, Frank',
      attachment : '',
      status : 'completed'
    },
    {
      id : 2,
      title : 'Sample title 2',
      uploadedBy : 'Angel',
      reviewers : 'Codrops, Frank',
      attachment : '',
      status : 'unassigned'
    },
    {
      id : 3,
      title : 'Sample title 3',
      uploadedBy : 'Angel',
      reviewers : 'Codrops, Frank',
      attachment : '',
      status : 'under revision'
    },
  ]

  onChangePage(page : number) : void {
    if(this.isLoading) return

    this.isLoading = true
    this.filters.page = page
    this.isLoading = false
  }
}
