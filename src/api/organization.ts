import { Request, Response } from 'express'
import * as core from 'express-serve-static-core'
import Container from 'typedi'
import { verifyJWT } from '../fns/verify-jwt'
import { UserRole } from '../model/enum/user-role'
import OrganizationService from '../services/organization'
import { getContext } from './context'
import { isOrganizationCreate, isOrganizationUpdate, OrganizationCreate } from './dto/organization'
import { RequestWithUser } from './user'

export class OrganizationRoutes {

    public static organizationRoutes(app: core.Express) {
        
        app.get("/organization/:id", verifyJWT, async (request: RequestWithUser, response: Response) => {
            try{
                if(!('params' in request) || !('id' in request.params)) {
                    response.status(400).json({ error: 'Necessário informar o ID.' })
                    return
                }
                const context = await getContext(request.userId)
                if (context.user.role === UserRole.Member) {
                    response.status(400).json({ error: 'Usuário não possui permissão para esta ação.' })
                    return
                }
                const id = Number(request.params.id)
                const organizationService = Container.get(OrganizationService)
                const organization = await organizationService.find(id)
                
                if (!organization) {
                    response.status(400).json({ error: 'Usuário não encontrado.' })
                    return
                }

                response.status(200).json(organization)    
            } catch (e) {
                response.status(500)
            }

        })
        
        app.post("/organization", async (request: Request, response: Response) => {
            try{
                const organizationService = Container.get(OrganizationService)
                const body = request.body
                if(!isOrganizationCreate(body)) {
                    response.status(400).json({ error: 'Estrutura da requisição inválida' })
                    return
                }
                organizationService.create(body)
                    .then(organization => response.status(200).json(organization))
                    .catch(e => response.status(400).json({ error: e }))
            } catch (e) {
                response.status(500)
            }
        })
        
        app.put("/organization/:id", verifyJWT, async (request: RequestWithUser, response: Response) => {
            try{
                if(!('params' in request) || !('id' in request.params)) {
                    response.status(400).json({ error: 'Necessário informar o ID.' })
                    return
                }
                const context = await getContext(request.userId)
                if (context.user.role === UserRole.Member) {
                    response.status(400).json({ error: 'Usuário não possui permissão para esta ação.' })
                    return
                }
                const id = Number(request.params.id)
                const organizationService = Container.get(OrganizationService)
                const body = request.body

                if(!isOrganizationUpdate(body)) {
                    response.status(400).json({ error: 'Estrutura da requisição inválida' })
                    return
                }
                const organization = await organizationService.find(id)
                
                if (!organization) {
                    response.status(400).json({ error: 'Usuário não encontrado.' })
                    return
                }

                organizationService.update({ 
                    ...organization,
                    ...body
                })
                    .then(organization => response.status(200).json(organization))
                    .catch(e => response.status(400).json({ error: e }))
            } catch (e) {
                response.status(500)
            }
        })
        
        app.delete("/organization/:id", verifyJWT, async (request: RequestWithUser, response: Response) => {
            try{
                if(!('params' in request) || !('id' in request.params)) {
                    response.status(400).json({ error: 'Necessário informar o ID.' })
                    return
                }
                const context = await getContext(request.userId)
                if (context.user.role === UserRole.Member) {
                    response.status(400).json({ error: 'Usuário não possui permissão para esta ação.' })
                    return
                }
                const id = Number(request.params.id)
                const organizationService = Container.get(OrganizationService)
                const organization = await organizationService.find(id)
                
                if (!organization) {
                    response.status(400).json({ error: 'Usuário não encontrado.' })
                    return
                }

                organizationService.delete(id)
                response.status(200).json(organization)    
            } catch (e) {
                response.status(500)
            }
        })
    }

}