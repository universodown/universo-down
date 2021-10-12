import { NextFunction, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import { getContext } from '../api/context'
import { RequestWithUser } from '../api/user'
import config from '../config'

export function verifyJWT(
    request: RequestWithUser,
    response: Response,
    next: NextFunction
): Response {
    const token = request.headers['x-access-token']
    if (!token || typeof token !== 'string') {
        return response.status(401).json({
            error: 'Usuário não possui permissão para esta ação.'
                + '{ (Nenhum token fornecido.) }'
        })
    }

    jwt.verify(token, config.jwtSecret, function (err, decoded) {
        if (err) {
            return response.status(500).json({
                error: 'Falha na autenticação do Token.'
            })
        }
        const decodedId: number = decoded.id as number
        getContext(decodedId)
            .then(context => {
                if (context.user) {
                    request.context = context
                    next()
                } else {
                    response.status(500).json({
                        error: 'Falha na autenticação do Token.'
                    })
                }
            })
            .catch(_ => {
                response.status(500).json({
                    error: 'Falha na autenticação do Token.'
                })
            })
    })
}
