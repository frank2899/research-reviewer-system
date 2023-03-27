export interface AuthFormTypes {
    email: string
    password: string
    repassword?: string
}

export interface ProfileTypes {
    email?: string
    newpassword?: string
    oldpassword?: string
}

export interface AuthCredsTypes {
    token : string
    id : string | number
    email : string
    role : 'faculty' | 'admin' | ''
}