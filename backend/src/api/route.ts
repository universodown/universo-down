import * as core from 'express-serve-static-core'
import { Request, Response } from 'express'

import { OrganizationRoutes } from './organization'
import { UserRoutes } from './user'
import { SchoolRequestRoutes } from './school_request'

export class Route {

    public static getRoutes(app: core.Express): void {
        app.route('/v1/health-check')
            .get((_: Request, response: Response) => {
                response.status(200).send({ healthcheck: 'OK' })
            })

        UserRoutes.userRoutes(app)
        OrganizationRoutes.organizationRoutes(app)
        SchoolRequestRoutes.SchoolRequestRoutes(app)
    }

}