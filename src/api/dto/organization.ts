export class OrganizationCreate {
    name: string
    description: string
    domain: string
}

export function isOrganizationCreate(obj: any): obj is OrganizationCreate {
    return obj.name !== undefined 
        && obj.description !== undefined
        && obj.domain !== undefined
}

export class OrganizationUpdate {
    id: number
    name?: string
    description?: string
}

export function isOrganizationUpdate(obj: any): obj is OrganizationUpdate {
    return obj.id !== undefined 
}