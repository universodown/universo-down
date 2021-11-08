import * as core from 'express-serve-static-core'
import Container from 'typedi'
import { Response } from 'express'

import { UserRole } from '../model/enum/user-role'
import { verifyJWT } from '../fns/verify-jwt'
import NeedSpecialityService from '../services/need-specialty'

import { RequestWithUser } from './user'
import { isNeedSpecialityCreate } from './dto/need-speciality'

export class NeedSpecialityRoutes {

    public static needSpecialityRoutes(app: core.Express) {
        const baseUrl = '/api/v1/need-speciality'

        app.get(
            `${baseUrl}/evolution-record/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão'
                            + 'para esta ação { {Função: Profissional} }'
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
                    const needSpecialityService = Container
                        .get(NeedSpecialityService)
                    const needSpeciality = await needSpecialityService
                        .findAll(context, id)

                    response.status(200).json(needSpeciality)
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
                            error: 'Usuário não possui permissão'
                            + 'para esta ação { {Função: Profissional} }'
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
                    const needSpecialityService = Container
                        .get(NeedSpecialityService)
                    const needSpeciality = await needSpecialityService
                        .findById(id)

                    if (!needSpeciality) {
                        response.status(404).json({
                            error: 'Necessidade não encontrada.'
                        })

                        return
                    } else if (
                        needSpeciality.organization
                            .id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Necessidade não encontrada.'
                        })

                        return
                    }

                    response.status(200).json(needSpeciality)
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
                            error: 'Usuário não possui permissão'
                            + 'para esta ação { {Função: Profissional} }'
                        })

                        return
                    }

                    const body = request.body
                    if (!isNeedSpecialityCreate(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                                + ' { Corpo da Mensagem incorreto }'
                        })

                        return
                    }

                    const needSpecialityService
                    = Container.get(NeedSpecialityService)
                    const needSpeciality
                    = await needSpecialityService.create(context, body)

                    response.status(201).json(needSpeciality)
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
                            error: 'Usuário não possui permissão'
                            + 'para esta ação { {Função: Profissional} }'
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
                    const needSpecialityService = Container
                        .get(NeedSpecialityService)
                    const needSpeciality = await needSpecialityService
                        .findById(id)

                    if (!needSpeciality) {
                        response.status(404).json({
                            error: 'Necessidade não encontrada.'
                        })

                        return
                    } else if (
                        needSpeciality.organization
                            .id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Necessidade não encontrada.'
                        })

                        return
                    }

                    await needSpecialityService.delete(id)

                    response.status(200).json(needSpeciality)
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
