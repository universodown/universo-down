/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Status } from '../../model/enum/status'

export class SchoolRequestCreate {

    assistedId: number
    date: Date
    responseDate: Date
    observation?: string
    status: Status

}

export function isSchoolRequestCreate(obj: any): obj is SchoolRequestCreate {
    return obj.assistedId !== undefined
        && obj.date !== undefined
        && obj.responseDate !== undefined
        && obj.observation !== undefined
        && obj.status !== undefined
}

export class SchoolRequestUpdate {

    date?: Date
    responseDate?: Date
    observation?: string
    status?: Status

}

export function isSchoolRequestUpdate(obj: any): obj is SchoolRequestUpdate {
    return obj.date !== undefined
        || obj.responseDate !== undefined
        || obj.observation !== undefined
        || obj.status !== undefined
}
