import * as dotenv from 'dotenv'

import logger from './fns/logger'

dotenv.config()

type Database = {
    type: 'mysql'
    url: string
    port: number
    username: string
    password: string
    name: string
    pollSize: number
    connectionTimeoutMillis: number
}

type Config = {
    port: number
    database: Database
    jwtSecret: string
    logs: {
        color: boolean
        level: 'crit' | 'error' | 'warning' | 'info' | 'debug'
        db: boolean
    }
}

function getLogLevel(level?: string) {
    switch (level) {
        case 'crit':
        case 'error':
        case 'warning':
        case 'info':
            return level
        default:
            return 'debug'
    }
}

const logLevel = getLogLevel(process.env.LOG_LEVEL)

const defaultConfig: Config = {
    port: Number(process.env.PORT) || 3000,
    jwtSecret: process.env.SECRET || 'universodown',
    logs: {
        color: true,
        level: logLevel,
        db: logLevel === 'debug' && !process.env.OMIT_DB_LOGS
    },
    database: {
        type: 'mysql',
        url: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        name: 'test',
        pollSize: 20,
        connectionTimeoutMillis: 30000
    }
}

function overrideConfig(env: string) {
    switch (env) {
        case 'production':
            return {
                port: Number(process.env.PORT) || 80
            }
        default:
            return {}
    }
}
const config = {
    ...defaultConfig,
    ...overrideConfig(process.env.NODE_ENV)
}

logger.info(`Using config: ${JSON.stringify(config)}`)

export default config
