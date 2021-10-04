export class UserCreate {
    firstName: string
    lastName: string
    email: string
    plainPassword: string
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
}

export function isUserUpdate(obj: any): obj is UserUpdate {
    return obj.id !== undefined 
}