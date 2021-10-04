import * as dotenv from 'dotenv'

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
    port: number,
    database: Database
    jwtSecret: string
}

const defaultConfig: Config = {
    port: Number(process.env.PORT) || 3000,
    jwtSecret: process.env.SECRET || 'universodown',
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
    }

    return {}
}
const config = {
    ...defaultConfig,
    ...overrideConfig(process.env.NODE_ENV)
}

console.info(`Using config: ${JSON.stringify(config)}`)

export default config