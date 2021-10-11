export class UserCreate {
    firstName: string
    lastName: string
    email: string
    plainPassword: string
    plainPasswordConfirmation: string
    organizationId?: number
}

export function isUserCreate(obj: any): obj is UserCreate {
    return obj.firstName !== undefined 
        && obj.lastName !== undefined
        && obj.email !== undefined
        && obj.plainPassword !== undefined 
}

export class UserUpdate {
    id: number
    firstName?: string
    lastName?: string
    email?: string
    plainPassword?: string
    plainPasswordConfirmation?: string
}

export function isUserUpdate(obj: any): obj is UserUpdate {
    return obj.id !== undefined 
}

export class UserLogin {
    email: string
    plainPassword: string
}

export function isUserLogin(obj: any): obj is UserLogin {
    return obj.email !== undefined
        && obj.plainPassword !== undefined 
}