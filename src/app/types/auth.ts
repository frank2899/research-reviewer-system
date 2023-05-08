export interface AuthFormTypes {
    email: string
    name?: string
    profile?: any
    age?: string
    address?: string
    employeeNumber?: string
    department?: string
    password: string
    repassword?: string
}

export interface ProfileTypes {
    email?: string
    name?: string
    profile?: any
    age?: string
    address?: string
    employeeNumber?: string
    department?: string
    newpassword?: string
    oldpassword?: string
}

export interface AuthCredsTypes {
    token ?: string
    id : string | number
    email : string
    name?: string
    profile?: any
    age?: string
    address?: string
    employeeNumber?: string
    department?: string
    role : 'faculty' | 'admin' | ''
}