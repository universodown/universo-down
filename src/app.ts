import * as express from 'express'
import * as swaggerUi from 'swagger-ui-express'
import { apiDoc } from './api/docs/doc'

import { Route } from './api/route'
import config from './config'
import dbConnection from './database'

// create and setup express app
console.info(`Process id: ${process.pid}`)
const api = JSON.stringify(apiDoc)

const app = express()
app.use(express.json())
// register routes
Route.getRoutes(app)

app.use(
    '/',
    swaggerUi.serve,
    swaggerUi.setup(JSON.parse(api))
)

async function run() {
    await dbConnection
    
    // start express server
    app.listen(config.port)
    console.info(`Aplication Running on Port: ${config.port}`)
}

export default run().catch((err: Error) => {
    console.error(err)

    process.exit(1)
})