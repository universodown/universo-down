/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CivilStatus } from '../../model/enum/civil-status'
import { Gender } from '../../model/enum/gender'
import { Relationship } from '../../model/enum/relationship'
import { Scholarity } from '../../model/enum/scholarity'

export class RelatedCreate {

    name: string
    birthday: Date
    gender: Gender
    civilStatus: CivilStatus
    identification: string
    relationship: Relationship
    generalRegistration: string
    issue: string
    issuer: string
    zipCode: string
    address: string
    number: string
    neighborhood: string
    city: string
    state: string
    phone: string
    naturalness: string
    nationality: string
    scholarity: Scholarity
    revenue: number
    professionalSituation: string
    occupation: string
    nationalIdentity: string
    responsible: boolean
    assistedId: number

}

export function isRelatedCreate(obj: any): obj is RelatedCreate {
    return obj.name !== undefined
        && obj.birthday !== undefined
        && obj.gender !== undefined
        && obj.civilStatus !== undefined
        && obj.identification !== undefined
        && obj.relationship !== undefined
        && obj.generalRegistration !== undefined
        && obj.issue !== undefined
        && obj.issuer !== undefined
        && obj.zipCode !== undefined
        && obj.address !== undefined
        && obj.number !== undefined
        && obj.neighborhood !== undefined
        && obj.city !== undefined
        && obj.state !== undefined
        && obj.phone !== undefined
        && obj.naturalness !== undefined
        && obj.nationality !== undefined
        && obj.scholarity !== undefined
        && obj.revenue !== undefined
        && obj.professionalSituation !== undefined
        && obj.occupation !== undefined
        && obj.nationalIdentity !== undefined
        && obj.responsible !== undefined
        && obj.assistedId !== undefined
}

export class  RelatedUpdate {

    name?: string
    birthday?: Date
    gender?: Gender
    civilStatus?: CivilStatus
    identification?: string
    relationship?: Relationship
    generalRegistration?: string
    issue?: string
    issuer?: string
    zipCode?: string
    address?: string
    number?: string
    neighborhood?: string
    city?: string
    state?: string
    phone?: string
    naturalness?: string
    nationality?: string
    scholarity?: Scholarity
    revenue?: number
    professionalSituation?: string
    occupation?: string
    nationalIdentity?: string
    responsible?: boolean
    assistedId?: number

}

export function isRelatedUpdate(obj: any): obj is RelatedUpdate {
    return obj.name !== undefined
        || obj.birthday !== undefined
        || obj.gender !== undefined
        || obj.civilStatus !== undefined
        || obj.identification !== undefined
        || obj.relationship !== undefined
        || obj.generalRegistration !== undefined
        || obj.issue !== undefined
        || obj.issuer !== undefined
        || obj.zipCode !== undefined
        || obj.address !== undefined
        || obj.number !== undefined
        || obj.neighborhood !== undefined
        || obj.city !== undefined
        || obj.state !== undefined
        || obj.phone !== undefined
        || obj.naturalness !== undefined
        || obj.nationality !== undefined
        || obj.scholarity !== undefined
        || obj.revenue !== undefined
        || obj.professionalSituation !== undefined
        || obj.occupation !== undefined
        || obj.nationalIdentity !== undefined
        || obj.responsible !== undefined
        || obj.assistedId !== undefined
}
