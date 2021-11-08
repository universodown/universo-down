/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class SpecialityCreate {

    name: string

}

export function isSpecialityCreate(obj: any): obj is SpecialityCreate {
    return obj.name !== undefined
}

export class SpecialityUpdate {

    name?: string

}

export function isSpecialityUpdate(obj: any): obj is SpecialityUpdate {
    return obj.name !== undefined
}
