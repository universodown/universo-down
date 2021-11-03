/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class NeedSpecialityCreate {
    name: string
}

export function isNeedSpecialityCreate(obj: any): obj is NeedSpecialityCreate {
    return obj.name !== undefined
}

export class NeedSpecialityUpdate {
    id: number
    name?: string
}

export function isNeedSpecialityUpdate(obj: any): obj is NeedSpecialityUpdate {
    return true
}
