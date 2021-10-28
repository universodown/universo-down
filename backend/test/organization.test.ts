import {
    runInTransaction,
    initialiseTestTransactions,
} from 'typeorm-test-transactions'
import Container from 'typedi'

import OrganizationService from '../src/services/organization'
import connection from './connection'

initialiseTestTransactions()

describe("Organization tests", () => {    
    beforeAll(async () => {
        await connection.create()
    })
    
    afterAll(async ()=>{
        await connection.close()
    })
    it(
        'should create an organization with user',
        runInTransaction(async () => {
            const date = new Date()
            const organizationService = Container.get(OrganizationService)
            const organization = await organizationService.create({
                description: 'Acolhimento para Pessoas em Situação de Risco',
                domain: 'lar.luz.com',
                name: 'Lar de Luz'
            })

            expect(organization.name).toEqual('Lar de Luz')
            expect(organization.description).toEqual('Acolhimento para Pessoas em Situação de Risco')
            expect(organization.domain).toEqual('lar.luz.com')
            expect(organization.users.length).toEqual(1)
            const adminUser = organization.users[0]

            expect(adminUser.firstName).toEqual('Administrador')
            expect(adminUser.lastName).toEqual('')
            expect(adminUser.email).toEqual('admin@lar.luz.com')
            expect(adminUser.adminRole).toEqual('owner')
            expect(adminUser.userRole).toEqual('secretary')
            expect(adminUser.birthday.getTime()).toBeGreaterThan(date.getTime())
            expect(adminUser.gender).toEqual('not-informed')
            expect(adminUser.identification).toEqual('')
            expect(adminUser.generalRegistration).toEqual('')
            expect(adminUser.issue.getTime()).toBeGreaterThan(date.getTime())
            expect(adminUser.issuer).toEqual('')
            expect(adminUser.zipCode).toEqual('')
            expect(adminUser.address).toEqual('')
            expect(adminUser.number).toEqual('')
            expect(adminUser.neighborhood).toEqual('')
            expect(adminUser.city).toEqual('')
            expect(adminUser.state).toEqual('')
            expect(adminUser.phone).toEqual('')
            expect(adminUser.nationalIdentity).toEqual('')
        })
    )

    it(
        'should update an organization',
        runInTransaction(async () => {
            const organizationService = Container.get(OrganizationService)  
            await organizationService.update({
                id: 18,
                description: 'Acolhimento para Idosos',
                name: 'Lar de Idosos com Necessidades Especiais'
            })


            const organization = await organizationService.find(18)
            
            expect(organization.name).toEqual('Lar de Idosos com Necessidades Especiais')
            expect(organization.users.length).toEqual(1)
        })
    )

    it(
        'should delete an organization',
        runInTransaction(async () => {
            const organizationService = Container.get(OrganizationService)  
            await organizationService.delete(19)
            const organization = await organizationService.find(19)

            expect(organization).toBeUndefined()
        })
    )

    it(
        'should find an organization',
        runInTransaction(async () => {
            const organizationService = Container.get(OrganizationService)  
            const organization = await organizationService.find(20)

            expect(organization.name).toEqual('Lar Abdon Batista',)
            expect(organization.description).toEqual('Atender crianças e adolescentes em situação de vulnerabilidade social, proporcionando-lhes um ambiente familiar acolhedor, com base em valores cristãos, transformando pequenas vidas em cidadãos conscientes de seus deveres e direitos, e aptos a assumirem suas responsabilidades na sociedade.',)
            expect(organization.domain).toEqual('larabdonbatista.com.br')
            expect(organization.users.length).toEqual(1)
            const adminUser = organization.users[0]

            expect(adminUser.id).toEqual(21)
            expect(adminUser.firstName).toEqual('Administrador')
            expect(adminUser.lastName).toEqual('')
            expect(adminUser.password).toEqual('$2b$10$5f/X.eOWYXCgnnzK4D9/g.qyX7DQhaFi75h5EpZrxL1/PLR8I3tDq')
            expect(adminUser.email).toEqual('admin@larabdonbatista.com.br')
            expect(adminUser.organizationId).toEqual(20)
            expect(adminUser.adminRole).toEqual('owner')
            expect(adminUser.userRole).toEqual('secretary')
            expect(adminUser.birthday).toEqual('2021-10-27')
            expect(adminUser.gender).toEqual('not-informed')
            expect(adminUser.identification).toEqual('')
            expect(adminUser.generalRegistration).toEqual('')
            expect(adminUser.issue).toEqual('2021-10-27')
            expect(adminUser.issuer).toEqual('')
            expect(adminUser.zipCode).toEqual('')
            expect(adminUser.address).toEqual('')
            expect(adminUser.number).toEqual('')
            expect(adminUser.neighborhood).toEqual('')
            expect(adminUser.city).toEqual('')
            expect(adminUser.state).toEqual('')
            expect(adminUser.phone).toEqual('')
            expect(adminUser.nationalIdentity).toEqual('')
        })
    )

    it(
        'should find all organizations',
        runInTransaction(async () => {
            const organizationService = Container.get(OrganizationService)  
            const organizations = await organizationService.findAll()

            expect(organizations.length).toBeGreaterThanOrEqual(3)
        })
    )
})