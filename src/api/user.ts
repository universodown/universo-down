import { Request, Response } from 'express'
import * as core from 'express-serve-static-core'
import Container from 'typedi'
import { verifyUser } from '../fns/crypt-password'
import UserService from '../services/user'
import * as jwt from 'jsonwebtoken'
import { isUserCreate, isUserLogin, isUserUpdate, UserCreate } from './dto/user'
import config from '../config'
import { verifyJWT } from '../fns/verify-jwt'
import { getContext } from './context'
import { UserRole } from '../model/enum/user-role'

export type RequestWithUser = Request & { userId: number }

export class UserRoutes {

    public static userRoutes(app: core.Express) {

        app.get("/user", verifyJWT, async (request: RequestWithUser, response: Response) => {
            try{
                const context = await getContext(request.userId)
                if (context.user.role === UserRole.Member) {
                    response.status(400).json({ error: 'Usuário não possui permissão para esta ação.' })
                    return
                }

                const userService = Container.get(UserService)
                const users = await userService.findAll(context)
                
                response.status(200).json(users)    
            } catch (e) {
                response.status(500).json({ error: e})
            }
            
        })
        
        app.get("/user/:id", verifyJWT, async (request: RequestWithUser, response: Response) => {
            try{
                if(!('params' in request) || !('id' in request.params)) {
                    response.status(400).json({ error: 'Necessário informar o ID.' })
                    return
                }
                const context = await getContext(request.userId)
                const id = Number(request.params.id)
                const userService = Container.get(UserService)
                const user = await userService.find(id)
                
                if (!user) {
                    response.status(400).json({ error: 'Usuário não encontrado.' })
                    return
                } else if (user.organization.id !== context.organization.id) {
                    response.status(400).json({ error: 'Usuário não encontrado.' })
                    return
                } else if (
                    context.user.role === UserRole.Member 
                    && context.user.id !== user.id
                ) {
                    response.status(400).json({ error: 'Usuário não encontrado.' })
                    return
                }

                response.status(200).json(user)    
            } catch (e) {
                response.status(500).json({ error: e})
            }

        })
        
        app.post("/user", verifyJWT, async (request: RequestWithUser, response: Response) => {
            try{
                const userService = Container.get(UserService)
                const body = request.body
                if(!isUserCreate(body)) {
                    response.status(400).json({ error: 'Estrutura da requisição inválida.' })
                    return
                }

                const context = await getContext(request.userId)

                if (context.user.role === 'member') {
                    response.status(400).json({ error: 'Usuário não possui permissão para esta ação.' })
                    return
                }

                userService.create({ 
                    ...body,
                    organizationId: context.organization.id
                })
                    .then(user => response.status(200).json(user))
                    .catch(e => response.status(400).json({ error: e }))
            } catch (e) {
                response.status(500).json({ error: e})
            }
        })
        
        app.put("/user/:id", verifyJWT, async (request: RequestWithUser, response: Response) => {
            try{
                if(!('params' in request) || !('id' in request.params)) {
                    response.status(400).json({ error: 'Necessário informar o ID.' })
                    return
                }
                
                const id = Number(request.params.id)
                const userService = Container.get(UserService)
                const body = request.body

                if(!isUserUpdate(body)) {
                    response.status(400).json({ error: 'Estrutura da requisição inválida.' })
                    return
                }

                const context = await getContext(request.userId)
                const user = await userService.find(id)

                if (!user) {
                    response.status(400).json({ error: 'Usuário não encontrado.' })
                    return
                } else if (user.organizationId !== context.organization.id) {
                    response.status(400).json({ error: 'Usuário não possui permissão para esta ação.' })
                    return
                } else if (context.user.role === 'member') {
                    response.status(400).json({ error: 'Usuário não possui permissão para esta ação.' })
                    return
                }

                userService.update({ 
                    ...user,
                    ...body
                })
                    .then(user => response.status(200).json(user))
                    .catch(e => response.status(400).json({ error: e }))
            } catch (e) {
                response.status(500).json({ error: e})
            }
        })
        
        app.delete("/user/:id", verifyJWT, async (request: RequestWithUser, response: Response) => {
            try{
                if(!('params' in request) || !('id' in request.params)) {
                    response.status(400).json({ error: 'Necessário informar o ID.' })
                    return
                }
                const id = Number(request.params.id)
                const userService = Container.get(UserService)
                const context = await getContext(request.userId)
                const user = await userService.find(id)
                
                if (!user) {
                    response.status(400).json({ error: 'Usuário não encontrado.' })
                    return
                } else if (user.organizationId !== context.organization.id) {
                    response.status(400).json({ error: 'Usuário não possui permissão para esta ação.' })
                    return
                } else if (context.user.role === 'member') {
                    response.status(400).json({ error: 'Usuário não possui permissão para esta ação.' })
                    return
                }

                userService.delete(id)
                response.status(200).json(user)    
            } catch (e) {
                response.status(500).json({ error: e})
            }
        })

        app.post('/login', async (request: Request, response: Response) => {
            try {
                const body = request.body
                if (!isUserLogin(body)) {
                    response.status(400).json({ error: 'Estrutura da requisição inválida.' })
                    return
                }
                const userService = Container.get(UserService)

                const user = await userService.findByEmail(body.email)
                if (!user) {
                    response.status(400).json({ error: 'Usuário não encontrado.' })
                    return
                }
                const isUser = await verifyUser(user, body.plainPassword)
                if (!isUser) {
                    response.status(400).json({ error: 'Usuário não encontrado.' })
                    return
                }

                const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: 86400 })
                response.status(200).json({ auth: true, token })
            } catch (e) {
                response.status(500).json({ error: e})
            }
        })

        app.post('/logout', async (_: Request, response: Response) => {
            try {
                response.status(200).json({ auth: false, token: null })
            } catch (e) {
                response.status(500).json({ error: e})
            }
        })
    }

}