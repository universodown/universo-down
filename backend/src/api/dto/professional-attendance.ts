/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class ProfessionalAttendanceCreate {

    organizationId?: number
    date: Date
    result: string
    quantity: number
    userId?: number
    evolutionRecordId?: number

}

export function isProfessionalAttendanceCreate(obj: any)
    : obj is ProfessionalAttendanceCreate {
    return obj.date !== undefined
        && obj.result !== undefined
        && obj.quantity !== undefined
}

export class ProfessionalAttendanceUpdate {

    id: number
    date?: Date
    result?: string
    quantity?: number
    userId?: number
    evolutionRecordId?: number

}

export function isProfessionalAttendanceUpdate(obj: any)
    : obj is ProfessionalAttendanceUpdate {
    return obj.id !== undefined
}
