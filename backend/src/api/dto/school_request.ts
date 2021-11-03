/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class SchoolRequestCreate {

    id: number
    assistedId: number
    date: Date
    responseDate: Date
    status: string
    organizationId?: number

}

export function isSchoolRequestCreate(obj: any): obj is SchoolRequestCreate {
    return obj.id !== undefined
        && obj.assistedId !== undefined
        && obj.date !== undefined
        && obj.responseDate !== undefined
        && obj.status !== undefined
        && obj.organizationId !== undefined
}

export class SchoolRequestUpdate {

    id: number
    assistedId?: number
    date?: Date
    responseDate?: Date
    status?: string

}

export function isSchoolRequestUpdate(obj: any): obj is SchoolRequestUpdate {
    return obj.id !== undefined
}
