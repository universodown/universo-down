import dbConnection from '../src/database'
import { getConnection } from "typeorm"

const connection = {
    async create() {
        await dbConnection
    },

    async close() {
        await getConnection().close()
    },

    async clear() {
        const connection = getConnection()
        const entities = connection.entityMetadatas

        entities.forEach(async (entity) => {
            const repository = connection.getRepository(entity.name)
            await repository.query(`DELETE FROM ${entity.tableName}`)
        })
    },

    async getContext() {
        
    }
}

export default connection
