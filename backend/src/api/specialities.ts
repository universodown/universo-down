import { Response } from 'express'
import * as core from 'express-serve-static-core'
import Container from 'typedi'

import { verifyJWT } from '../fns/verify-jwt'
import { UserRole } from '../model/enum/user-role'
import SpecialitiesService from '../services/specialities'

import { isSpecialitiesCreate } from './dto/specialities'
import { RequestWithUser } from './user'

export class SpecialitiesRoutes {

    public static specialitiesRoutes(app: core.Express) {
        const baseUrl = '/api/v1/specialities'

        app.get(
            `${baseUrl}/user/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Profissional )}'
                        })

                        return
                    }

                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Necessário informar o ID }'
                        })

                        return
                    }

                    const id = Number(request.params.id)
                    const specialitiesService = Container
                        .get(SpecialitiesService)
                    const specialities = await specialitiesService
                        .findAll(context, id)

                    response.status(200).json(specialities)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.get(
            `${baseUrl}/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Profissional )}'
                        })

                        return
                    }

                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Necessário informar o ID }'
                        })

                        return
                    }

                    const id = Number(request.params.id)
                    const specialitiesService = Container
                        .get(SpecialitiesService)
                    const specialities = await specialitiesService.findById(id)
                    if (!specialities) {
                        response.status(404).json({
                            error: 'Especialista não encontrado.'
                        })

                        return
                    } else if (
                        specialities.organization
                            .id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Especialista não encontrado.'
                        })

                        return
                    }

                    response.status(200).json(specialities)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.post(
            baseUrl,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Profissional )}'
                        })

                        return
                    }

                    const body = request.body
                    if (!isSpecialitiesCreate(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
                        })

                        return
                    }
                    const specialitiesService
                    = Container.get(SpecialitiesService)
                    const specialities = await specialitiesService
                        .create(context, body)

                    response.status(201).json(specialities)
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
                    const context = request.context

                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Profissional )}'
                        })

                        return
                    }

                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Necessário informar o ID }'
                        })

                        return
                    }

                    const id = Number(request.params.id)
                    const specialitiesService
                    = Container.get(SpecialitiesService)
                    const specialities = await specialitiesService
                        .findById(id)
                    if (!specialities) {
                        response.status(404).json({
                            error: 'Especialista não encontrado.'
                        })

                        return
                    } else if (
                        specialities.organization
                            .id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Especialista não encontrado.'
                        })

                        return
                    }
                    await specialitiesService
                        .delete(id)

                    response.status(200).json(specialities)
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
