import * as express from "express"
import { Request, Response } from "express"
import { Route } from "./api/route"
import config from './config'
import dbConnection from "./database"

// create and setup express app
console.info(`Process id: ${process.pid}`)
const app = express()
app.use(express.json())

// register routes
Route.getRoutes(app)

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