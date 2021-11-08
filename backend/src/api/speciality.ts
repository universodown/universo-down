import { Response } from 'express'
import * as core from 'express-serve-static-core'
import Container from 'typedi'

import { verifyJWT } from '../fns/verify-jwt'
import { UserRole } from '../model/enum/user-role'
import  SpecialityService  from '../services/speciality'

import { isSpecialityCreate, isSpecialityUpdate } from './dto/speciality'
import { RequestWithUser } from './user'

export class SpecialityRoutes {

    public static specialityRoutes(app: core.Express) {
        const baseUrl = '/api/v1/speciality'

        app.get(
            baseUrl,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole !== UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + 'esta ação. { (Função: Secretária)}'
                        })

                        return
                    }

                    const specialityService = Container.get(SpecialityService)
                    const speciality = await specialityService.findAll(context)

                    response.status(200).json(speciality)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}} `
                    })
                }
            }
        )

        app.get(
            `${baseUrl}/:id`, // BaseUrl + '/:id'
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context
                    if (context.user.userRole !== UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + 'esta ação. { (Função: Secretária)}'
                        })

                        return
                    }

                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida'
                                + ' { Necessátio informar o ID }'
                        })

                        return
                    }

                    const id = Number(request.params.id)
                    const specialityService = Container.get(SpecialityService)
                    const speciality = await specialityService.findById(id)

                    if (!speciality) {
                        response.status(404).json({
                            error: 'Especialidade não encontrada.'
                        })

                        return
                    } else if (
                        speciality.organization.id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Especialidade não encontrada.'
                        })

                        return
                    }

                    response.status(200).json(speciality)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                            + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.get(
            `${baseUrl}/name/:name`, // BaseUrl + '/:id'
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context
                    if (context.user.userRole !== UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + 'esta ação. { (Função: Secretária)}'
                        })

                        return
                    }

                    if (
                        !('params' in request)
                        || !('name' in request.params)
                    ) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida'
                                + ' { Necessátio informar o name }'
                        })

                        return
                    }

                    const name = request.params.name
                    const specialityService = Container.get(SpecialityService)
                    const speciality = await specialityService
                        .findByName(context, name)

                    response.status(200).json(speciality)
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

                    if (context.user.userRole !== UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Secretária )}'
                        })

                        return
                    }

                    const body = request.body
                    if (!isSpecialityCreate(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
                        })

                        return
                    }

                    const specialityService = Container.get(SpecialityService)
                    const speciality = await specialityService
                        .create(context, body)

                    response.status(201).json(speciality)
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

                    if (context.user.userRole !== UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Secretária )}'
                        })

                        return
                    }

                    const body = request.body
                    if (!isSpecialityUpdate(body)) {
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
                    const specialityService = Container.get(SpecialityService)
                    const speciality = await specialityService.findById(id)

                    if (!speciality) {
                        response.status(404).json({
                            error: 'Especialidade não encontrada.'
                        })

                        return
                    } else if (
                        speciality.organization.id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Especialidade não encontrada.'
                        })

                        return
                    }

                    const savedSpeciality = await specialityService
                        .update(context, id, body)

                    response.status(200).json(savedSpeciality)
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

                    if (context.user.userRole !== UserRole.Secretary) {
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
                    const specialityService = Container.get(SpecialityService)
                    const speciality = await specialityService.findById(id)

                    if (!speciality) {
                        response.status(404).json({
                            error: 'Especialidade não encontrada.'
                        })

                        return
                    } else if (
                        speciality.organization.id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Especialidade não encontrada.'
                        })

                        return
                    }

                    await specialityService.delete(id)

                    response.status(200).json(speciality)
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
