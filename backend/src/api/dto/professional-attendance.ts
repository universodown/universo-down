/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class ProfessionalAttendanceCreate {

    date: Date
    result: string
    quantify: number
    evolutionRecordId: number

}

export function isProfessionalAttendanceCreate(obj: any)
    : obj is ProfessionalAttendanceCreate {
    return obj.date !== undefined
        && obj.result !== undefined
        && obj.quantify !== undefined
}

export class ProfessionalAttendanceUpdate {

    date?: Date
    result?: string
    quantify?: number

}

export function isProfessionalAttendanceUpdate(obj: any)
    : obj is ProfessionalAttendanceUpdate {
    return obj.date !== undefined
        || obj.result !== undefined
        || obj.quantify !== undefined
}
