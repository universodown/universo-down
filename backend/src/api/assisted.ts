import { Response } from 'express'
import * as core from 'express-serve-static-core'
import Container from 'typedi'

import { verifyJWT } from '../fns/verify-jwt'
import { UserRole } from '../model/enum/user-role'
import AssistedService from '../services/assisted'

import { isAssistedCreate, isAssistedUpdate } from './dto/assisted'
import { RequestWithUser } from './user'

export class AssistedRoutes {

    public static assistedRoutes(app: core.Express) {
        const baseUrl = '/api/v1/assisted'

        app.get(
            baseUrl,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole === UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' está ação. { (Função: Secretária) }'
                        })

                        return
                    }
                    const assistedService = Container.get(AssistedService)
                    const assisted = await assistedService.findAll(context)

                    response.status(200).json(assisted)
                } catch (e) {
                    response.status(500).json({
                        error: 'O Servidor encontrou uma situação com a qual'
                        + `não sabe lidar. {${e}}`
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

                    if (context.user.userRole === UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' está ação. { (Função: Secrétaria) }'
                        })

                        return
                    }

                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Necessário informar o ID } '
                        })

                        return
                    }

                    const id = Number(request.params.id)
                    const assistedService = Container.get(AssistedService)
                    const assisted = await assistedService.findById(id)

                    response.status(200).json(assisted)
                } catch (e) {
                    response.status(500).json({
                        error: 'O Servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}} `
                    })
                }
            }
        )

        app.get(
            `${baseUrl}/identification/:identification`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole === UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' está ação. { (Função: Secrétaria) }'
                        })

                        return
                    }

                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Necessário informar o ID } '
                        })

                        return
                    }

                    const identification = String(request.params.identification)
                    const assistedService = Container.get(AssistedService)
                    const assisted = await assistedService.findByIdentification(
                        identification
                    )

                    response.status(200).json(assisted)
                } catch (e) {
                    response.status(500).json({
                        error: 'O Servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}} `
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

                    if (context.user.userRole === UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Secretária)}'
                        })

                        return
                    }

                    const body = request.body
                    if (!isAssistedCreate(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
                        })

                        return
                    }

                    const assistedService = Container.get(AssistedService)
                    const assisted = await assistedService
                        .create(context, body)

                    response.status(201).json(assisted)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.put(
            `${baseUrl}/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole === UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Secretária )}'
                        })

                        return
                    }

                    const body = request.body
                    if (!isAssistedUpdate(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
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
                    const assistedService = Container.get(AssistedService)
                    const assisted = await assistedService
                        .update(context, id, body)

                    response.status(200).json(assisted)
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

                    if (context.user.userRole === UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Secretária )}'
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
                    const assistedService = Container.get(AssistedService)
                    const assisted = await assistedService
                        .delete(id)

                    response.status(200).json(assisted)
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
