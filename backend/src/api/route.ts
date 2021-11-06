import { Request, Response } from 'express'
import * as core from 'express-serve-static-core'

import { SpecialityRoutes } from './speciality'
import { OrganizationRoutes } from './organization'
import { UserRoutes } from './user'

export class Route {

    public static getRoutes(app: core.Express): void {
        app.route('/v1/health-check')
            .get((_: Request, response: Response) => {
                response.status(200).send({ healthcheck: 'OK' })
            })

        UserRoutes.userRoutes(app)
        OrganizationRoutes.organizationRoutes(app)
        SpecialityRoutes.specialityRoutes(app)
    }

}
