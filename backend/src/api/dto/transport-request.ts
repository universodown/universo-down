/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Status } from '../../model/enum/status'

export class TransportRequestCreate {

    assistedId: number
    date: Date
    responseDate: Date
    observation?: string
    status: Status

}

export function isTransportRequestCreate(
    obj: any
): obj is TransportRequestCreate {
    return obj.assistedId !== undefined
        && obj.date !== undefined
        && obj.responseDate !== undefined
        && obj.observation !== undefined
        && obj.status !== undefined
}

export class TransportRequestUpdate {

    date?: Date
    responseDate?: Date
    observation?: string
    status?: Status

}

export function isTransportRequestUpdate(
    obj: any
): obj is TransportRequestUpdate {
    return obj.date !== undefined
        || obj.responseDate !== undefined
        || obj.observation !== undefined
        || obj.status !== undefined
}
