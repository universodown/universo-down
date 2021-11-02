/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class EvolutionRecordCreate {

    date: Date

}

export function isEvolutionRecordCreate(obj: any): obj is EvolutionRecordCreate {
    return obj.date !== undefined
}

export class EvolutionRecordUpdate {

    date: Date

}

export function isEvolutionRecordUpdate(obj: any): obj is EvolutionRecordUpdate {
    return true
}
