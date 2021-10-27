import { Request, Response } from 'express'
import * as core from 'express-serve-static-core'
import Container from 'typedi'

import { verifyJWT } from '../fns/verify-jwt'
import { AdminRole } from '../model/enum/admin-role'
import OrganizationService from '../services/organization'

import { isOrganizationCreate, isOrganizationUpdate } from './dto/organization'
import { RequestWithUser } from './user'

export class OrganizationRoutes {

    public static organizationRoutes(app: core.Express): void {
        const baseUrl = '/api/v1/organization'

        app.get(
            `${baseUrl}/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Necessário informar o ID }'
                        })

                        return
                    }
                    const context = request.context
                    if (context.user.adminRole === AdminRole.Member) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para esta'
                                + ' ação.'
                        })

                        return
                    }
                    const id = Number(request.params.id)
                    const organizationService = Container
                        .get(OrganizationService)
                    const organization = await organizationService.find(id)

                    if (!organization) {
                        response.status(404).json({
                            error: 'Organização não encontrada.'
                        })

                        return
                    }

                    response.status(200).json(organization)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                    + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.post(baseUrl, async (request: Request, response: Response) => {
            try {
                const organizationService = Container.get(OrganizationService)
                const body = request.body
                if (!isOrganizationCreate(body)) {
                    response.status(400).json({
                        error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
                    })

                    return
                }
                organizationService.create(body)
                    .then(organization => response.status(200)
                        .json(organization))
                    .catch(e => response.status(400).json({ error: e }))
            } catch (e) {
                response.status(500).json({
                    error: 'O servidor encontrou uma situação com a qual'
                    + ` não sabe lidar. {${e}}`
                })
            }
        })

        app.put(
            `${baseUrl}/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Necessário informar o ID }.'
                        })

                        return
                    }
                    const context = request.context
                    const id = Number(request.params.id)
                    const organizationService = Container
                        .get(OrganizationService)
                    const body = request.body

                    if (!isOrganizationUpdate(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
                        })

                        return
                    }
                    const organization = await organizationService.find(id)
                    if (!organization) {
                        response.status(404).json({
                            error: 'Organização não encontrada.'
                        })

                        return
                    }
                    if (
                        context.user.adminRole === AdminRole.Member
                    || context.user.organizationId !== organization.id
                    ) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para esta'
                                + ' ação.'
                        })

                        return
                    }

                    organizationService.update({
                        ...organization,
                        ...body
                    })
                        .then(organization => response.status(200)
                            .json(organization))
                        .catch(e => response.status(400).json({ error: e }))
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                    + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.delete(
            `${baseUrl}/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Necessário informar o ID }'
                        })

                        return
                    }
                    const context = request.context
                    const id = Number(request.params.id)
                    const organizationService = Container
                        .get(OrganizationService)
                    const organization = await organizationService.find(id)

                    if (!organization) {
                        response.status(404).json({
                            error: 'Organização não encontrada.'
                        })

                        return
                    }
                    if (
                        context.user.adminRole === AdminRole.Member
                    || context.user.organizationId !== organization.id
                    ) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para esta'
                                + ' ação.'
                        })

                        return
                    }

                    organizationService.delete(id)
                        .then(organization => response.status(200)
                            .json(organization))
                        .catch(e => response.status(400).json({ error: e }))
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                    + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )
    }

}
