import { Request, Response } from 'express'
import * as core from 'express-serve-static-core'
import Container from 'typedi'

import CalendarService from '../services/calendar'
import { verifyJWT } from '../fns/verify-jwt'
import { UserRole } from '../model/enum/user-role'

import { isCalendarCreate, isCalendarUpdate } from './dto/calendar'
import { Context } from './dto/context'

export type RequestWithCalendar = Request & { context: Context }

export class CalendarRoutes {

    public static calendarRoutes(app: core.Express): void {
        const baseUrl = '/api/v1/calendar'

        app.get(
            `${baseUrl}/user/:id`,
            verifyJWT,
            async (request: RequestWithCalendar, response: Response) => {
                try {
                    const context = request.context
                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Necessário informar o ID }'
                        })

                        return
                    }
                    const id = Number(request.params.id)
                    if (
                        context.user.userRole === UserRole.Profissional
                        && context.user.id !== id
                    ) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão'
                            + 'para esta ação { {Função: Profissional} }'
                        })

                        return
                    }
                    const calendarService = Container.get(CalendarService)
                    const calendar = await calendarService
                        .findByUser(context, id)

                    if (!calendar) {
                        response.status(404).json({
                            error: 'Calendário não encontrado.'
                        })

                        return
                    }

                    response.status(200).json(calendar)
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
            async (request: RequestWithCalendar, response: Response) => {
                try {
                    const context = request.context
                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Necessário informar o ID }'
                        })

                        return
                    }
                    const id = Number(request.params.id)
                    const calendarService = Container.get(CalendarService)
                    const calendar = await calendarService.find(id)

                    if (
                        context.user.userRole === UserRole.Profissional
                        && context.user.id !== calendar.userId
                    ) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão'
                            + 'para esta ação { {Função: Profissional} }'
                        })

                        return
                    }

                    if (!calendar) {
                        response.status(404).json({
                            error: 'Calendário não encontrado.'
                        })

                        return
                    } else if (
                        calendar.organization.id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Calendário não encontrado.'
                        })

                        return
                    }

                    response.status(200).json(calendar)
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
            async (request: RequestWithCalendar, response: Response) => {
                try {
                    const context = request.context
                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão'
                            + 'para esta ação { {Função: Profissional} }'
                        })

                        return
                    }
                    const calendarService = Container.get(CalendarService)
                    const body = request.body
                    if (!isCalendarCreate(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
                        })

                        return
                    }

                    await calendarService.create(context, {
                        ...body
                    })
                        .then(calendar => response.status(201).json(calendar))
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
            async (request: RequestWithCalendar, response: Response) => {
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
                    const calendarService = Container.get(CalendarService)
                    const body = request.body

                    if (!isCalendarUpdate(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
                        })

                        return
                    }

                    const calendar = await calendarService.find(id)

                    if (!calendar) {
                        response.status(404).json({
                            error: 'Calendário não encontrado.'
                        })

                        return
                    } else if (
                        calendar.organizationId !== context.organization.id
                    ) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação.'
                        })

                        return
                    }

                    calendarService.update(context, id, {
                        ...body
                    })
                        .then(calendar => response.status(200).json(calendar))
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
            async (request: RequestWithCalendar, response: Response) => {
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
                    const calendarService = Container.get(CalendarService)
                    const calendar = await calendarService.find(id)

                    if (!calendar) {
                        response.status(404).json({
                            error: 'Calendário não encontrado.'
                        })

                        return
                    } else if (
                        calendar.organizationId !== context.organization.id
                    ) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para esta'
                                + ' ação.'
                        })

                        return
                    }

                    calendarService.delete(id)
                        .then(calendar => response.status(200).json(calendar))
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
