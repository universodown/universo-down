import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { RequestWithUser } from '../api/user';

export function verifyJWT(request: RequestWithUser, response: Response, next: NextFunction) {
    const token = request.headers['x-access-token'];
    if (!token || typeof token !== 'string') {
        return response.status(401).json({ auth: false, message: 'Nenhum token fornecido.' })
    }

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
            return response.status(500).json({ auth: false, message: 'Falha na autenticação do Token.' })
        }
        request.userId = decoded.id;
        next();
    });
}