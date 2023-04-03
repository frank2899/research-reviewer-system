import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ThemeService } from 'src/app/theme/theme.service';
import { FacultyTypes } from 'src/app/types/faculty';
import { CommentTypes, IDetailedResearchTypes, SubmittedGrades } from 'src/app/types/research';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-research-details',
  templateUrl: './research-details.component.html',
  styleUrls: ['./research-details.component.css']
})

export class ResearchDetailsComponent implements OnInit {
  @ViewChild('closeReviewersModalBtn') closeReviewersModalBtn: any;
  @ViewChild('closeGradingModalBtn') closeGradingModalBtn: any;

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
  imageUrl: string = environment.API_HOST + '/api/assets/'
  uploadedFile: any = null
  isReUploading: boolean = false

  newComment: string = ''
  routeParamId: string = ''
  isLoadingComment: boolean = true
  reviewers: FacultyTypes[] = []
  selectedReviewers: string[] = []
  isAdmin: boolean = this.authService.authCredentials.role === 'admin'
  isReviewer: boolean = false
  isUploader: boolean = false
  gradeGiven: number = 0 // grade that YOU given
  gradeInput: number = 0
  allSubmittedGrades: SubmittedGrades[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private themeService: ThemeService,
    private toaster: ToastrService
  ) { }

  async ngOnInit(): Promise<void> {
    this.routeParamId = this.activatedRoute.snapshot.paramMap.get('id') || ''

    await this.loadData()
    await this.loadComments()
    if (this.authService.authCredentials.role === 'admin') {
      await this.loadReviewers()
      await this.loadAllSubmittedGrades()
    }
    if (this.isReviewer) await this.loadGivenGrade()
  }

  getHeaderColor(): string {
    return this.themeService.HeaderColor
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
        dateCreated: res?.dateCreated ? `${new Date(res.dateCreated).toDateString()} ${new Date(res.dateCreated).toLocaleTimeString()}` : ''
      }
    }

    this.isReviewer = this.research.reviewersId.indexOf(this.authService.authCredentials.id.toString()) !== -1
    this.isUploader = this.authService.authCredentials.id.toString() === this.research.uploadedById.toString()
  }

  onFileSelected(event: any): void {
    const file: File = event?.target?.files[0] || null;

    if (file) this.uploadedFile = file;
  }

  async reupload(): Promise<void> {
    this.isReUploading = true
    const formData = new FormData();
    formData.append('attachment', this.uploadedFile);
    formData.append('research_id', this.routeParamId);

    const f = await fetch(`${environment.API_HOST}/api/research/reupload.php`, {
      method: 'POST', body: formData
    })
    const res = await f.json()
    if (res?.status) {
      this.loadData()
      this.uploadedFile = null
      this.toaster.success("Attachment Updated!")
    }
    else this.toaster.error(res?.message || "Something went wrong.")
    this.isReUploading = false
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

  async markAsCompleted(): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/research/complete.php?researchId=${this.routeParamId}`, {
      method: 'GET'
    })
    const res = await f.json()
    if (res?.status) {
      this.toaster.success("Marked as Completed")
      this.loadData()
    }
    else this.toaster.error(res?.message || "Something went wrong.")
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
    if (res?.status) {
      this.toaster.success("Reviewers Updated!")
      this.closeReviewersModalBtn.nativeElement.click()
      this.loadData()
    }
    else this.toaster.error(res?.message || "Something went wrong.")
  }

  async loadGivenGrade(): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/grades/gave.php?researchId=${this.routeParamId}&userId=${this.authService.authCredentials.id}`, {
      method: 'GET'
    })
    const res = await f.json()
    if (res?.status) this.gradeGiven = Number(res.grade)
  }

  async updateGrade(): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/grades/add.php`, {
      method: 'POST',
      body: JSON.stringify({
        researchId: this.routeParamId,
        userId: this.authService.authCredentials.id,
        grade: this.gradeInput
      })
    })
    const res = await f.json()
    if (res?.status) {
      this.gradeInput = 0
      this.closeGradingModalBtn.nativeElement.click()
      await this.loadGivenGrade()
    }
    else this.toaster.error(res?.message || "Something went wrong.")
  }

  async loadAllSubmittedGrades(): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/grades/all-submitted-grades.php?researchId=${this.routeParamId}`, {
      method: 'GET'
    })
    const res = await f.json()
    if (res?.status) this.allSubmittedGrades = res.results.map((e: any) => {
      return { userId: e.userId, grade: e.grade, email: e.email }
    })
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
    if (res?.status) {
      this.newComment = ''
      setTimeout(() => this.loadComments(), 1000)
    }
    else this.toaster.error(res?.message || "Something went wrong.")
  }

  async loadComments(): Promise<void> {
    const f = await fetch(`${environment.API_HOST}/api/comment/view.php?researchId=${this.routeParamId}`, {
      method: 'GET'
    })
    const res = await f.json()
    if (res?.status) {
      this.comments = res?.data.map((e: any) => {
        return {
          id: e.id,
          comment: e.comment,
          date: e.dateCreated ? `${new Date(e.dateCreated).toDateString()} ${new Date(e.dateCreated).toLocaleTimeString()}` : '-',
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
