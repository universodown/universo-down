/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class NeedSpecialityCreate {

    evolutionRecordId: number
    specialityId: number

}

export function isNeedSpecialityCreate(obj: any): obj is NeedSpecialityCreate {
    return obj.evolutionRecordId !== undefined && obj.specialityId !== undefined
}
