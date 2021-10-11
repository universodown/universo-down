import { NextFunction, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import Container from 'typedi'
import { getContext } from '../api/context'
import { RequestWithUser } from '../api/user'
import config from '../config'
import UserService from '../services/user'

export function verifyJWT(request: RequestWithUser, response: Response, next: NextFunction) {
    const token = request.headers['x-access-token']
    if (!token || typeof token !== 'string') {
        return response.status(401).json({ error: 'Usuário não possui permissão para esta ação. { (Nenhum token fornecido.) }' })
    }

    jwt.verify(token, config.jwtSecret, function (err, decoded) {
        if (err) {
            return response.status(500).json({ error: 'Falha na autenticação do Token.' })
        }
        const user = getContext(decoded.id)
            .then(context => {
                if (context.user){
                    request.context = context
                    next()
                } else {
                    response.status(500).json({ error: 'Falha na autenticação do Token.' })
                }
            })
            .catch(e => {
                response.status(500).json({ error: 'Falha na autenticação do Token.' })
            })
    })
}