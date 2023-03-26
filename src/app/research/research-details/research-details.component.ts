import { Component } from '@angular/core';
import { CommentTypes, ResearchTypes } from 'src/app/types/research';

@Component({
  selector: 'app-research-details',
  templateUrl: './research-details.component.html',
  styleUrls: ['./research-details.component.css']
})
export class ResearchDetailsComponent {
  research : ResearchTypes = {
    id : 1,
    title : 'Test Research Capsule',
    uploadedBy : 'Frank Bueno',
    reviewers : 'Frank, Codrops, Angel',
    attachment : '',
    status : 'unassigned'
  }

  comments : CommentTypes[] = [
    {
      id : 1,
      date : '08/28/1999 01:03',
      email : 'Frank@gmail.com',
      comment : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores perspiciatis minima nesciunt vero illo! Autem consectetur quod quos excepturi quae earum facere illo culpa voluptas asperiores, illum esse nobis optio.'
    },
    {
      id : 2,
      date : '01/28/1999 01:03',
      email : 'Bueno@gmail.com',
      comment : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores perspiciatis minima nesciunt vero illo! Autem consectetur quod quos excepturi quae earum facere illo culpa voluptas asperiores, illum esse nobis optio.'
    },
    {
      id : 3,
      date : '06/28/1999 01:03',
      email : 'Codrops@gmail.com',
      comment : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores perspiciatis minima nesciunt vero illo! Autem consectetur quod quos excepturi quae earum facere illo culpa voluptas asperiores, illum esse nobis optio.'
    }
  ]

  newComment : string = ''

  addComment() : void {
      if(this.newComment.trimStart() === '') return

      this.comments.unshift({
        id : 4,
        email : 'Franky@example.com',
        comment : this.newComment.trimStart(),
        date : new Date().toDateString()
      })

      this.newComment = ''
  }
}
