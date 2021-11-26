import * as core from 'express-serve-static-core'
import { Request, Response } from 'express'

import { NeedSpecialityRoutes } from './need-speciality'
import { SpecialityRoutes } from './speciality'
import { OrganizationRoutes } from './organization'
import { SpecialitiesRoutes } from './specialities'
import { RelatedRoutes } from './related'
import { UserRoutes } from './user'
import { ProfessionalAttendaceRoutes } from './professional-attendance'
import { AssistedRoutes } from './assisted'
import { EvolutionRecordRoutes } from './evolution-record'
import { CalendarRoutes } from './calendar'
import { SchoolRequestRoutes } from './school-request'
import { TransportRequestRoutes } from './transport-request'

export class Route {

    public static getRoutes(app: core.Express): void {
        app.route('/v1/health-check')
            .get((_: Request, response: Response) => {
                response.status(200).send({ healthcheck: 'OK' })
            })

        UserRoutes.userRoutes(app)
        OrganizationRoutes.organizationRoutes(app)
        ProfessionalAttendaceRoutes.professionalAttendaceRoutes(app)
        SpecialitiesRoutes.specialitiesRoutes(app)
        RelatedRoutes.relatedRoutes(app)
        SpecialityRoutes.specialityRoutes(app)
        AssistedRoutes.assistedRoutes(app)
        NeedSpecialityRoutes.needSpecialityRoutes(app)
        EvolutionRecordRoutes.evolutionRecordRoutes(app)
        CalendarRoutes.calendarRoutes(app)
        SchoolRequestRoutes.schoolRequestRoutes(app)
        TransportRequestRoutes.transportRequestRoutes(app)
    }

}
