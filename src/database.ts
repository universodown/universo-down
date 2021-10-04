import { createConnection, useContainer } from 'typeorm'
import 'reflect-metadata'
import { Container } from 'typedi'

import config from './config'

const { database } = config

useContainer(Container)

export default createConnection({
    entities: [
        `${__dirname}\\model\\*`
    ],
    type: database.type,
    host: database.url,
    port: database.port,
    username: database.username,
    password: database.password,
    database: database.name,
    logging: 'all',
    synchronize: true,
    extra: {
        max: database.pollSize,
        connectionTimeoutMillis: database.connectionTimeoutMillis
    }
}).then(connection => {
    const safeUrl = database.url.replace(/:.*@/, '@')
    console.info(`Connected to ${safeUrl}`)

    return connection
}).catch(error => console.error(error))