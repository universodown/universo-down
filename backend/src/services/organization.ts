import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import OrganizationRepository from '../repositories/organization'
import { cryptPassword } from '../fns/crypt-password'
import { OrganizationCreate, OrganizationUpdate } from '../api/dto/organization'
import { Organization } from '../model/organization'
import { AdminRole } from '../model/enum/admin-role'
import { UserRole } from '../model/enum/user-role'
import { Gender } from '../model/enum/gender'

@Service()
export default class OrganizationService {

    @InjectRepository(OrganizationRepository)
    private readonly repository: OrganizationRepository

    async create(organizationInfo: OrganizationCreate): Promise<Organization> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(OrganizationRepository)
            const password = await cryptPassword('123456')

            const organization = await repository.save({
                ...organizationInfo,
                users: [{
                    firstName: 'Admin',
                    lastName: 'org',
                    email: 'email@domain.com',
                    password,
                    adminRole: AdminRole.Owner,
                    userRole: UserRole.Secretary,
                    birthday: new Date(),
                    gender: Gender.NotInformed,
                    identification: '',
                    generalRegistration: '',
                    issue: new Date(),
                    issuer: '',
                    zipCode: '',
                    address: '',
                    number: '',
                    neighborhood: '',
                    city: '',
                    state: '',
                    phone: '',
                    nationalIdentity: ''
                }]
            })

            return organization
        })
    }

    async update(organizationInfo: OrganizationUpdate): Promise<Organization> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(OrganizationRepository)
            const organization = await repository
                .findById(organizationInfo.id, db)

            return repository.save({
                ...organization,
                ...organizationInfo
            })
        })
    }

    async delete(id: number): Promise<Organization> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(OrganizationRepository)
            const organization = await repository.findById(id, db)

            return repository.remove(organization)
        })
    }

    async find(id: number): Promise<Organization | undefined> {
        return this.repository.findById(id)
    }

    async findAll(): Promise<Organization[]> {
        return this.repository.findAll()
    }

}
