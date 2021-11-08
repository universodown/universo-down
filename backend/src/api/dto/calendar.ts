/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Weekday } from '../../model/enum/weekday'

export class CalendarCreate {

    userId: number
    dayOfWeek: Weekday
    startHour: string
    endHour: string

}

export function isCalendarCreate(obj: any): obj is CalendarCreate {
    return obj.userId !== undefined
        && obj.dayOfWeek !== undefined
        && obj.startHour !== undefined
        && obj.endHour !== undefined
}

export class CalendarUpdate {

    dayOfWeek?: Weekday
    startHour?: string
    endHour?: string

}

export function isCalendarUpdate(obj: any): obj is CalendarUpdate {
    return obj.dayOfWeek !== undefined
        || obj.startHour !== undefined
        || obj.endHour !== undefined
}
