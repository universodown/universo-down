/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Status } from "../../model/enum/status"

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class SchoolRequestCreate {

    status: Status
    assistedId: number
}

export function isSchoolRequestCreate(obj: any): obj is SchoolRequestCreate {
    return obj.status !== undefined
        && obj.assistedId !== undefined
       
}

export class SchoolRequestUpdate {
    
    status?: Status
    responseDate?: Date
    
}

export function isSchoolRequestUpdate(obj: any): obj is SchoolRequestUpdate {
    return obj.status !== undefined
        || obj.responseDate !== undefined
}