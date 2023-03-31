export enum ResearchStatus {
    UNASSIGNED = 'unassigned',
    UNDER_REVISION = 'under revision',
    COMPLETED = 'completed'
}

export interface ResearchTypes {
    id : number | string
    title : string
    uploadedBy : string
    reviewers : string[]
    attachment : any
    status : 'unassigned' | 'under revision' | 'completed'
}

export interface CommentTypes {
    id : number | string
    comment : string
    date : string | Date
    email : string
}


export interface IDetailedResearchTypes extends ResearchTypes {
    uploadedById : number | string
    reviewersId : string[]
    dateCreated : string
}
  