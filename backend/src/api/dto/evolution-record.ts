/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Status } from '../../model/enum/status'

export class EvolutionRecordCreate {

    date: Date
    status: Status
    weight: number
    height: number
    report: string
    assistedId: number

}

export function isEvolutionRecordCreate(
    obj: any
): obj is EvolutionRecordCreate {
    return obj.date !== undefined
        && obj.status !== undefined
        && obj.weight !== undefined
        && obj.height !== undefined
        && obj.report !== undefined
        && obj.assistedId !== undefined
}

export class EvolutionRecordUpdate {

    date?: Date
    status?: Status
    weight?: number
    height?: number
    report?: string

}

export function isEvolutionRecordUpdate(
    obj: any
): obj is EvolutionRecordUpdate {
    return obj.date !== undefined
        || obj.status !== undefined
        || obj.weight !== undefined
        || obj.height !== undefined
        || obj.report !== undefined
        || obj.assistedId !== undefined
}
