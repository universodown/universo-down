import { EntityManager, EntityRepository, Repository } from "typeorm";
import { User } from "../model/user";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    async findById(id: number, db?: EntityManager): Promise<User | undefined> {
        const repository = db 
            ? db.getRepository(User)
            : this

        return repository.findOne({ where: { id }})
    }

    async findAll(): Promise<User[]> {
        return this.find()
    }
}