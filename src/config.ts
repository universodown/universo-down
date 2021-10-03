import * as dotenv from 'dotenv'

dotenv.config()

const defaultConfig = {
    port: Number(process.env.PORT) || 3000
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

console.log(`Using config: ${JSON.stringify(config)}`)

export default config