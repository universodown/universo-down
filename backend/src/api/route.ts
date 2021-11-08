import * as core from 'express-serve-static-core'
import { Request, Response } from 'express'

import { NeedSpecialityRoutes } from './need-speciality'
import { SpecialityRoutes } from './speciality'
import { OrganizationRoutes } from './organization'
import { RelatedRoutes } from './related'
import { UserRoutes } from './user'
import { AssistedRoutes } from './assisted'

export class Route {

    public static getRoutes(app: core.Express): void {
        app.route('/v1/health-check')
            .get((_: Request, response: Response) => {
                response.status(200).send({ healthcheck: 'OK' })
            })

        UserRoutes.userRoutes(app)
        OrganizationRoutes.organizationRoutes(app)
        RelatedRoutes.relatedRoutes(app)
        SpecialityRoutes.specialityRoutes(app)
        AssistedRoutes.assistedRoutes(app)
        NeedSpecialityRoutes.needSpecialityRoutes(app)
    }

}
