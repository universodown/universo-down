/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Gender } from '../../model/enum/gender'

export class AssistedCreate {

    name: string
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
    hasBenefits: boolean
    naturalness: string
    nationality: string
    occupation: string
    nationalIdentity: string
    active: boolean
    additionalInformation: string
    photo: string
    benefits: string
    socialIdentificationNumber: string
    organizationId?: number

}

export function isAssistedCreate(obj: any): obj is AssistedCreate {
    return obj.name !== undefined
        && obj.birthday !== undefined
        && obj.identification !== undefined
        && obj.address !== undefined
        && obj.phone !== undefined
        && obj.city !== undefined
        && obj.state !== undefined
        && obj.nationality !== undefined
        && obj.nationalIdentity !== undefined
        && obj.indentification !== undefined
}

export class AssistedUpdate {

    id: number
    name?: string
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
    hasBenefits?: boolean
    naturalness?: string
    nationality?: string
    occupation?: string
    nationalIdentity?: string
    active?: boolean
    additionalInformation?: string
    photo?: string
    benefits?: string
    socialIdentificationNumber?: string
    organizationId?: number

}

export function isAssistedUpdate(obj: any): obj is AssistedUpdate {
    return true
}
