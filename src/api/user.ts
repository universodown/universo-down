import { Request, Response } from 'express'
import * as core from 'express-serve-static-core'
import Container from 'typedi'
import UserService from '../services/user'
import { isUserCreate, isUserUpdate, UserCreate } from './dto/user'

export class UserRoutes {

    public static userRoutes(app: core.Express) {

        app.get("/users", async (_: Request, response: Response) => {
            try{
                const userService = Container.get(UserService)
                const users = await userService.findAll()
                
                response.status(200).json(users)    
            } catch (e) {
                response.status(500)
            }
            
        })
        
        app.get("/users/:id", async (request: Request, response: Response) => {
            try{
                if(!('params' in request) || !('id' in request.params)) {
                    response.status(400).json({ error: 'Necessário informar o ID' })
                    return
                }
                const id = Number(request.params.id)
                const userService = Container.get(UserService)
                const user = await userService.find(id)
                
                if (!user) {
                    response.status(400).json({ error: 'Usuário não encontrado' })
                    return
                }

                response.status(200).json(user)    
            } catch (e) {
                response.status(500)
            }

        })
        
        app.post("/users", async (request: Request, response: Response) => {
            try{
                const userService = Container.get(UserService)
                const body = request.body
                console.log(`get body ${JSON.stringify(body)}`)
                if(!isUserCreate(body)) {
                    response.status(400).json({ error: 'Estrutura da requisição inválida' })
                    return
                }
                console.log(`API Body ${body}`)
                const users = await userService.create(body)
                
                response.status(200).json(users)
            } catch (e) {
                response.status(500)
            }
        })
        
        app.put("/users/:id", async (request: Request, response: Response) => {
            try{
                if(!('params' in request) || !('id' in request.params)) {
                    response.status(400).json({ error: 'Necessário informar o ID' })
                    return
                }
                const id = Number(request.params.id)
                const userService = Container.get(UserService)
                const body = request.body

                if(!isUserUpdate(body)) {
                    response.status(400).json({ error: 'Estrutura da requisição inválida' })
                    return
                }
                const user = await userService.find(id)
                
                if (!user) {
                    response.status(400).json({ error: 'Usuário não encontrado' })
                    return
                }

                const users = await userService.update({ 
                    ...user,
                    ...body
                })
                
                response.status(200).json(users)
            } catch (e) {
                response.status(500)
            }
        })
        
        app.delete("/users/:id", async (request: Request, response: Response) => {
            try{
                if(!('params' in request) || !('id' in request.params)) {
                    response.status(400).json({ error: 'Necessário informar o ID' })
                    return
                }
                const id = Number(request.params.id)
                const userService = Container.get(UserService)
                const user = await userService.find(id)
                
                if (!user) {
                    response.status(400).json({ error: 'Usuário não encontrado' })
                    return
                }

                userService.delete(id)
                response.status(200).json(user)    
            } catch (e) {
                response.status(500)
            }
        })
    }

}