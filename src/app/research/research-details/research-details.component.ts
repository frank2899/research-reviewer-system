import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FacultyTypes } from 'src/app/types/faculty';
import { CommentTypes, IDetailedResearchTypes } from 'src/app/types/research';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-research-details',
  templateUrl: './research-details.component.html',
  styleUrls: ['./research-details.component.css']
})

export class ResearchDetailsComponent implements OnInit {
  research: IDetailedResearchTypes = {
    id: '',
    title: '',
    uploadedBy: '',
    reviewers: [''],
    attachment: '',
    status: 'unassigned',
    uploadedById: '',
    reviewersId: [],
    dateCreated: ''
  }

  comments: CommentTypes[] = []

  newComment: string = ''
  routeParamId: string = ''
  isLoadingComment: boolean = true
  reviewers: FacultyTypes[] = []
  selectedReviewers: string[] = []
  isAdmin = this.authService.authCredentials.role === 'admin'

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    this.routeParamId = this.activatedRoute.snapshot.paramMap.get('id') || ''
    await this.loadData()
    await this.loadComments()
    await this.loadReviewers()
  }

  async loadData(): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/research/view.php?id=${this.routeParamId}`, {
      method: 'GET'
    })
    const res = await f.json()

    if (res?.status) {
      this.selectedReviewers = [...new Set(res.reviewers?.split(',') || [])] as string[]
      this.research = {
        id: res.id,
        title: res?.title?.toUpperCase(),
        reviewersId: res.reviewers?.split(',') || [],
        status: res.status,
        uploadedBy: res.email,
        attachment: res.attachment,
        uploadedById: res.uploadedBy,
        reviewers: res?.reviewersEmail?.filter((x: string | null) => x),
        dateCreated: res?.dateCreated ? new Date(res.dateCreated).toDateString() : ''
      }
    }
  }

  onSelect(e: any): void {
    const isChecked = e?.target.checked

    if (isChecked) this.selectedReviewers.push(e.target.value)
    else this.selectedReviewers = (this.selectedReviewers.map((el: string) => el === e.target.value ? false : el).filter(x => x)) as string[]
  }

  isChecked(id: string | undefined | number): boolean {
    if (this.selectedReviewers.indexOf(id as string) === -1) return false
    else return true
  }

  async assignReviewer(): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/research/update-reviewers.php`, {
      method: 'POST',
      body: JSON.stringify({
        reviewers: this.selectedReviewers.join(','),
        researchId: this.research.id
      })
    })
    const res = await f.json()
    console.log(res)
    if (res?.status) {
      alert("Reviewers Updated!")
      this.loadData()
    }
    else alert(res?.message || "Something went wrong.")
  }

  async addComment(): Promise<void> {
    if (this.newComment.trimStart() === '') return
    this.isLoadingComment = true
    const f = await fetch(`${environment.API_HOST}/api/comment/add-comment.php`, {
      method: 'POST',
      body: JSON.stringify({
        researchId: this.routeParamId,
        userId: this.authService.authCredentials.id,
        comment: this.newComment.trimStart()
      })
    })
    const res = await f.json()
    console.log(res)
    if (res?.status) {
      this.newComment = ''
      setTimeout(() => this.loadComments(), 1000)
    }
    else alert(res?.message || "Something went wrong.")
  }

  async loadComments(): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/comment/view.php?researchId=${this.routeParamId}`, {
      method: 'GET'
    })
    const res = await f.json()
    console.log(res)
    if (res?.status) {
      this.comments = res?.data.map((e: any) => {
        return {
          id: e.id,
          comment: e.comment,
          date: e.dateCreated ? new Date(e.dateCreated).toDateString() : '-',
          email: e.email
        }
      })
    }
    this.isLoadingComment = false
  }

  async loadReviewers(): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/users/reviewers.php`, {
      method: 'GET'
    })
    const res = await f.json()
    console.log(res)
    if (res?.status) {
      this.reviewers = res.reviewers.map((e: any) => {
        return {
          ...e,
          isReviewer: !!e.isReviewer,
          isActive: !!e.isActive,
        }
      })
    }
  }
}
