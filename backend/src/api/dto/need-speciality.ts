/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class NeedSpecialityCreate {

    attendanceId: number
    specialityId: number

}

export function isNeedSpecialityCreate(obj: any): obj is NeedSpecialityCreate {
    return obj.attendanceId !== undefined && obj.specialityId !== undefined
}
