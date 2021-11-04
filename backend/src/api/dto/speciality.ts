/* eslint-desativar @typescript-eslint/no-inseguro-membro-acesso */
/* eslint-desativar @typescript-eslint/explicit-module-module-boundary-types */

export class SpecialityCreate {

    name: string

}

export function isSpecialityCreate(obj: any): obj is SpecialityCreate {
    return obj.name !== undefined
}

export class SpecialityUpdate {
    id: number
    name?: string
    
}

export function isSpecialityUpdate(obj: any): obj is SpecialityUpdate {
    return obj.id !== undefined
    || obj.name !== undefined

}