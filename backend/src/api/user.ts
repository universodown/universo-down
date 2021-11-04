import { Request, Response } from 'express'
import * as core from 'express-serve-static-core'
import Container from 'typedi'
import * as jwt from 'jsonwebtoken'

import { verifyUser } from '../fns/crypt-password'
import UserService from '../services/user'
import config from '../config'
import { verifyJWT } from '../fns/verify-jwt'
import { AdminRole } from '../model/enum/admin-role'
import { UserRole } from '../model/enum/user-role'

import { isUserCreate, isUserLogin, isUserUpdate } from './dto/user'
import { Context } from './dto/context'

export type RequestWithUser = Request & { context: Context }

export class UserRoutes {

    public static userRoutes(app: core.Express): void {
        const baseUrl = '/api/v1/user'

        app.get(
            baseUrl,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context
                    if (context.user.adminRole === AdminRole.Member) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' esta ação. { (Função: Membro) }'
                        })

                        return
                    }

                    const userService = Container.get(UserService)
                    const users = await userService.findAll(context)

                    response.status(200).json(users)
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
                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Necessário informar o ID }'
                        })

                        return
                    }
                    const context = request.context
                    const id = Number(request.params.id)
                    const userService = Container.get(UserService)
                    const user = await userService.find(id)

                    if (!user) {
                        response.status(404).json({
                            error: 'Usuário não encontrado.'
                        })

                        return
                    } else if (
                        user.organization.id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Usuário não encontrado.'
                        })

                        return
                    } else if (
                        context.user.adminRole === AdminRole.Member
                    && context.user.id !== user.id
                    ) {
                        response.status(404).json({
                            error: 'Usuário não encontrado.'
                        })

                        return
                    }

                    response.status(200).json(user)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
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
                    const userService = Container.get(UserService)
                    const user = await userService.findByIdentification(
                        identification
                    )

                    response.status(200).json(user)
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
                    const userService = Container.get(UserService)
                    const body = request.body
                    if (!isUserCreate(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
                        })

                        return
                    }

                    const context = request.context

                    if (context.user.adminRole === 'member') {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para esta'
                            + ' ação. { (Função: Membro) }'
                        })

                        return
                    }

                    await userService.create({
                        ...body,
                        organizationId: context.organization.id
                    })
                        .then(user => response.status(201).json(user))
                        .catch(e => response.status(500).json({
                            error: 'O servidor encontrou uma situação com a'
                            + ` qual não sabe lidar. {${e}}` }))
                } catch (e) {
                    response.status(500).json({ error:
                        'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}}` })
                }
            }
        )

        app.put(
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

                    const id = Number(request.params.id)
                    const userService = Container.get(UserService)
                    const body = request.body

                    if (!isUserUpdate(body) || id !== body.id) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
                        })

                        return
                    }

                    const context = request.context
                    const user = await userService.find(id)

                    if (!user) {
                        response.status(404).json({
                            error: 'Usuário não encontrado.'
                        })

                        return
                    } else if (
                        user.organizationId !== context.organization.id
                    ) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação.'
                        })

                        return
                    } else if (
                        context.user.adminRole === 'member'
                        && context.user.id !== user.id
                    ) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para esta'
                                + ' ação.'
                        })

                        return
                    }

                    userService.update({
                        ...user,
                        ...body
                    })
                        .then(user => response.status(200).json(user))
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
                    const id = Number(request.params.id)
                    const userService = Container.get(UserService)
                    const context = request.context
                    const user = await userService.find(id)

                    if (!user) {
                        response.status(404).json({
                            error: 'Usuário não encontrado.'
                        })

                        return
                    } else if (
                        user.organizationId !== context.organization.id
                    ) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para esta'
                                + ' ação.'
                        })

                        return
                    } else if (
                        context.user.adminRole === 'member'
                        || context.user.id === user.id
                    ) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para esta'
                                + ' ação.'
                        })

                        return
                    }

                    userService.delete(id)
                        .then(user => response.status(200).json(user))
                        .catch(e => response.status(400).json({ error: e }))
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.post(
            '/api/v1/login',
            async (request: Request, response: Response) => {
                try {
                    const body = request.body
                    if (!isUserLogin(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
                        })

                        return
                    }
                    const userService = Container.get(UserService)

                    const user = await userService.findByEmail(body.email)
                    if (!user) {
                        response.status(404).json({
                            error: 'Usuário não encontrado.'
                        })

                        return
                    }
                    const isUser = await verifyUser(user, body.plainPassword)
                    if (!isUser) {
                        response.status(404).json({
                            error: 'Usuário não encontrado.'
                        })

                        return
                    }

                    const token = jwt.sign(
                        { id: user.id },
                        config.jwtSecret,
                        { expiresIn: 86400 } // Expira em 24hrs
                    )
                    response.status(201).json({ auth: true, token })
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                            + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.post(
            '/api/v1/logout',
            verifyJWT,
            async (_: Request, response: Response) => {
                try {
                    response.status(200).json({ auth: false, token: null })
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
