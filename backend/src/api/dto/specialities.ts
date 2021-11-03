/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class SpecialitiesCreate {

    name: string

}

export function isSpecialitiesCreate(obj: any): obj is SpecialitiesCreate {
    return obj.name !== undefined
}

export class SpecialitiesUpdate {
    id : number
    name?: string

}

export function isSpecialitiesUpdate(obj: any): obj is SpecialitiesUpdate {
    return obj.id !== undefined
}