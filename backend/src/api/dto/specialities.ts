/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class SpecialitiesCreate {

  userId: number;
  specialityId: number;

}
export function isSpecialitiesCreate(obj: any): obj is SpecialitiesCreate {
    return obj.userId !== undefined && obj.specialityId !== undefined
}

export class SpecialitiestRequestUpdate {

  userId: number;
  specialityId: number;

}

export function isSpecialitiestRequestUpdate(
    obj: any
): obj is SpecialitiestRequestUpdate {
    return obj.userId !== undefined && obj.specialityId !== undefined
}

