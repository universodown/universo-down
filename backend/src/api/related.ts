import { response, Response } from 'express'
import Container from 'typedi'
import * as core from 'express-serve-static-core'

import { verifyJWT } from '../fns/verify-jwt'
import RelatedService from '../services/related'
import { UserRole } from '../model/enum/user-role'

import { RequestWithUser } from './user'
import { isRelatedCreate, isRelatedUpdate } from './dto/related'

export class RelatedRoutes {

    public static relatedRoutes(app: core.Express) {
        const baseUrl = '/api/v1/related'

        app.get(
            `${baseUrl}/assisted/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação { (Função: Profissional) }'
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
                    const relatedService = Container.get(RelatedService)
                    const related = await relatedService.findAll(context, id)

                    response.status(200).json(related)
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
                                + ' esta ação. { (Função: Profissional) }'
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
                    const relatedService = Container.get(RelatedService)
                    const related = await relatedService.findById(id)

                    if (!related) {
                        response.status(404).json({
                            error: 'Familiar não encontrado.'
                        })

                        return
                    } else if (
                        related.organization.id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Familiar não encontrado.'
                        })

                        return
                    }

                    response.status(200).json(related)
                } catch (e) {
                    response.status(500).json({
                        error: 'O serviço encontrou uma situação com a qual'
                            + ` não sabe lidar. {${e}}`
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

                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Profissional) }'
                        })

                        return
                    }

                    if (
                        !('params' in request)
                        || !('identification' in request.params)
                    ) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                                + ' { Necessário informar o identification }'
                        })

                        return
                    }

                    const identification = request.params.identification
                    const relatedService = Container.get(RelatedService)
                    const related = await relatedService
                        .findByIdentification(context, identification)

                    if (!related) {
                        response.status(404).json({
                            error: 'Familiar não encontrado.'
                        })

                        return
                    } else if (
                        related.organization.id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Familiar não encontrado.'
                        })

                        return
                    }

                    response.status(200).json(related)
                } catch (e) {
                    response.status(500).json({
                        error: 'O serviço encontrou uma situação com a qual'
                            + ` não sabe lidar. {${e}}`
                    })
                }
            }

        )

        app.post(
            baseUrl,
            verifyJWT,
            async (request: RequestWithUser, reponse: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Profissional) }'
                        })

                        return
                    }

                    const body = request.body
                    if (!isRelatedCreate(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                                + ' { Corpo da manesagem incorreto }'
                        })

                        return
                    }

                    const relatedService = Container.get(RelatedService)
                    const related = await relatedService
                        .create(context, body)

                    reponse.status(201).json(related)
                } catch (e) {
                    reponse.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                            + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.put(
            `${baseUrl}/:id`,
            verifyJWT,
            async (request: RequestWithUser, reponse: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Profissional) }'
                        })

                        return
                    }

                    const body = request.body
                    if (!isRelatedUpdate(body)) {
                        reponse.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                                + ' { Corpo da mensagem incorreto }'
                        })

                        return
                    }

                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                                + '{ Necessário informar o ID }'
                        })

                        return
                    }

                    const id = Number(request.params.id)
                    const relatedService = Container.get(RelatedService)
                    const related = await relatedService.findById(id)

                    if (!related) {
                        response.status(404).json({
                            error: 'Familiar não encontrado.'
                        })

                        return
                    } else if (
                        related.organization.id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Familiar não encontrado.'
                        })

                        return
                    }

                    const savedRelated = await relatedService
                        .update(context, id, body)

                    reponse.status(200).json(savedRelated)
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
                                + ' esta ação. { (Função Profissional) }'
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
                    const relatedService = Container.get(RelatedService)
                    const related = await relatedService.findById(id)

                    if (!related) {
                        response.status(404).json({
                            error: 'Familiar não encontrado.'
                        })

                        return
                    } else if (
                        related.organization.id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Familiar não encontrado.'
                        })

                        return
                    }

                    await relatedService.delete(id)

                    response.status(200).json(related)
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
