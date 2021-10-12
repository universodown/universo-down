import { createConnection, useContainer } from 'typeorm'
import 'reflect-metadata'
import { Container } from 'typedi'

import config from './config'
import logger from './fns/logger'

const { logs, database } = config

useContainer(Container)

const entities = process.platform === 'win32'
    ? [`${__dirname}\\model\\*`]
    : [`${__dirname}/model/*`]

export default createConnection({
    entities,
    type: database.type,
    host: database.url,
    port: database.port,
    username: database.username,
    password: database.password,
    database: database.name,
    logging: logs.db ? 'all' : false,
    synchronize: true,
    extra: {
        max: database.pollSize,
        connectionTimeoutMillis: database.connectionTimeoutMillis
    }
}).then(connection => {
    const safeUrl = database.url.replace(/:.*@/, '@')
    logger.info(`Connected to ${safeUrl}`)

    return connection
}).catch(error => logger.error(error))
