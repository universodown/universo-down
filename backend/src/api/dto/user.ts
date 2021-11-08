/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { AdminRole } from '../../model/enum/admin-role'
import { Gender } from '../../model/enum/gender'
import { UserRole } from '../../model/enum/user-role'
export class UserCreate {

    firstName: string
    lastName: string
    email: string
    plainPassword: string
    plainPasswordConfirmation: string
    adminRole: AdminRole
    userRole:UserRole
    birthday: Date
    gender: Gender
    identification: string
    generalRegistration: string
    issue: Date
    issuer: string
    zipCode: string
    address: string
    number: string
    neighborhood: string
    city: string
    state: string
    phone: string
    nationalIdentity: string
    organizationId?: number

}

// eslint-disable-next-line complexity
export function isUserCreate(obj: any): obj is UserCreate {
    return obj.firstName !== undefined
        && obj.lastName !== undefined
        && obj.identification !== undefined
        && obj.birthday !== undefined
        && obj.zipCode !== undefined
        && obj.email !== undefined
        && obj.plainPassword !== undefined
        && obj.address !== undefined
        && obj.neighborhood !== undefined
        && obj.city !== undefined
        && obj.state !== undefined
        && obj.phone !== undefined
        && obj.number !== undefined
        && obj.adminRole !== undefined
        && obj.userRole !== undefined
        && obj.gender !== undefined
        && obj.generalRegistration !== undefined
}

export class UserUpdate {

    id: number
    firstName?: string
    lastName?: string
    email?: string
    plainPassword?: string
    plainPasswordConfirmation?: string
    adminRole?: AdminRole
    userRole?:UserRole
    birthday?: Date
    gender?: Gender
    identification?: string
    generalRegistration?: string
    issue?: Date
    issuer?: string
    zipCode?: string
    address?: string
    number?: string
    neighborhood?: string
    city?: string
    state?: string
    phone?: string
    nationalIdentity?: string
    organizationId?: number

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
