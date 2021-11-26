import {
    runInTransaction,
    initialiseTestTransactions,
} from 'typeorm-test-transactions'
import Container from 'typedi'

import UserService from '../src/services/user'
import { AdminRole } from '../src/model/enum/admin-role'
import { UserRole } from '../src/model/enum/user-role'
import { Gender } from '../src/model/enum/gender'
import { Context } from '../src/api/dto/context'
import { verifyUser } from '../src/fns/crypt-password'
import connection from './connection'

initialiseTestTransactions()

describe("Users tests", () => {
    beforeAll(async () => {
        await connection.create()
    })
    
    afterAll(async ()=>{
        await connection.close()
    })
    it(
        'should create an user',
        runInTransaction(async () => {
            const birthday = new Date("2000-12-16T00:00:00.000Z")
            const issue = new Date("2015-07-18T00:00:00.000Z")
            const userService = Container.get(UserService)
            const user = await userService.create({
                firstName: "Yago Ian",
                lastName: "Peixoto",
                email: "yagoianpeixoto_@a-qualitybrasil.com.br",
                plainPassword: "123456",
                plainPasswordConfirmation: "123456",
                organizationId: 21,
                adminRole: AdminRole.Member,
                userRole: UserRole.Professional,
                birthday,
                gender: Gender.Male,
                identification: "550.444.186-25",
                generalRegistration: "45741",
                issue,
                issuer: "SSP/SC",
                zipCode: "64025-196",
                address: "Avenida Marechal Juarez Távora",
                number: "847",
                neighborhood: "Parque Piauí",
                city: "Teresina",
                state: "PI",
                phone: "(86) 3738-1836",
                nationalIdentity: "20.410.453-1"
            })
            expect(user.organizationId).toEqual(21)
            expect(user.firstName).toEqual("Yago Ian")
            expect(user.lastName).toEqual("Peixoto")
            expect(user.email).toEqual("yagoianpeixoto_@a-qualitybrasil.com.br")
            expect(user.adminRole).toEqual(AdminRole.Member)
            expect(user.userRole).toEqual(UserRole.Professional)
            expect(user.birthday).toEqual(birthday)
            expect(user.gender).toEqual(Gender.Male)
            expect(user.identification).toEqual("550.444.186-25")
            expect(user.generalRegistration).toEqual("45741")
            expect(user.issue).toEqual(issue)
            expect(user.issuer).toEqual("SSP/SC")
            expect(user.zipCode).toEqual("64025-196")
            expect(user.address).toEqual("Avenida Marechal Juarez Távora")
            expect(user.number).toEqual("847")
            expect(user.neighborhood).toEqual("Parque Piauí")
            expect(user.city).toEqual("Teresina")
            expect(user.state).toEqual("PI")
            expect(user.phone).toEqual( "(86) 3738-1836")
            expect(user.nationalIdentity).toEqual( "20.410.453-1")
        })
    )

    it(
        'shouldn\'t create an user with difference in password',
        runInTransaction(async () => {
            const birthday = new Date("2000-12-16T00:00:00.000Z")
            const issue = new Date("2015-07-18T00:00:00.000Z")
            const userService = Container.get(UserService)
            await expect(
                userService.create({
                    firstName: "Renan Antonio",
                    lastName: "Novaes",
                    email: "renan.novaes@acampe.com.br",
                    plainPassword: "123456",
                    plainPasswordConfirmation: "abcdef",
                    organizationId: 21,
                    adminRole: AdminRole.Member,
                    userRole: UserRole.Professional,
                    birthday,
                    gender: Gender.Male,
                    identification: "550.444.186-25",
                    generalRegistration: "45741",
                    issue,
                    issuer: "SSP/SC",
                    zipCode: "64025-196",
                    address: "Avenida Marechal Juarez Távora",
                    number: "847",
                    neighborhood: "Parque Piauí",
                    city: "Teresina",
                    state: "PI",
                    phone: "(86) 3738-1836",
                    nationalIdentity: "20.410.453-1"
                })
            ).rejects.toThrow('As senhas não são iguais.')
        })
    )

    it(
        'shouldn\'t create an user with empty password',
        runInTransaction(async () => {
            const birthday = new Date("2000-12-16T00:00:00.000Z")
            const issue = new Date("2015-07-18T00:00:00.000Z")
            const userService = Container.get(UserService)
            await expect(
                userService.create({
                    firstName: "Renan Antonio",
                    lastName: "Novaes",
                    email: "renan.novaes@acampe.com.br",
                    plainPassword: "",
                    plainPasswordConfirmation: "",
                    organizationId: 21,
                    adminRole: AdminRole.Member,
                    userRole: UserRole.Professional,
                    birthday,
                    gender: Gender.Male,
                    identification: "550.444.186-25",
                    generalRegistration: "45741",
                    issue,
                    issuer: "SSP/SC",
                    zipCode: "64025-196",
                    address: "Avenida Marechal Juarez Távora",
                    number: "847",
                    neighborhood: "Parque Piauí",
                    city: "Teresina",
                    state: "PI",
                    phone: "(86) 3738-1836",
                    nationalIdentity: "20.410.453-1"
                })
            ).rejects.toThrow('A senha não pode ser vazia.')
        })
    )

    it(
        'shouldn\'t create an user without password confirmation',
        runInTransaction(async () => {
            const birthday = new Date("2000-12-16T00:00:00.000Z")
            const issue = new Date("2015-07-18T00:00:00.000Z")
            const userService = Container.get(UserService)
            await expect(
                userService.create({
                    firstName: "Renan Antonio",
                    lastName: "Novaes",
                    email: "renan.novaes@acampe.com.br",
                    plainPassword: "123456",
                    plainPasswordConfirmation: "",
                    organizationId: 21,
                    adminRole: AdminRole.Member,
                    userRole: UserRole.Professional,
                    birthday,
                    gender: Gender.Male,
                    identification: "550.444.186-25",
                    generalRegistration: "45741",
                    issue,
                    issuer: "SSP/SC",
                    zipCode: "64025-196",
                    address: "Avenida Marechal Juarez Távora",
                    number: "847",
                    neighborhood: "Parque Piauí",
                    city: "Teresina",
                    state: "PI",
                    phone: "(86) 3738-1836",
                    nationalIdentity: "20.410.453-1"
                })
            ).rejects.toThrow('Para criação de uma senha é necessário informar sua confirmação.')
        })
    )

    it (
        'should find user by email and login in a user',
        runInTransaction(async () => {
            const userService = Container.get(UserService)
            const user = await userService.findByEmail('admin@acampe.com.br')
            expect(await verifyUser(user, '123456')).toEqual(true)
        })
    )

    it(
        'should update an user',
        runInTransaction(async () => {
            const date = new Date()
            const userService = Container.get(UserService)
            const user = await userService.update({
                id: 22,
                firstName: "Vera",
                lastName: "Costa",
            })
            expect(user.organizationId).toEqual(21)
            expect(user.firstName).toEqual("Vera")
            expect(user.lastName).toEqual("Costa")
        })
    )

    it(
        'should delete an user',
        runInTransaction(async () => {
            const date = new Date()
            const userService = Container.get(UserService)
            await userService.delete(23)

            const user = await userService.find(23)

            expect(user).toBeUndefined()
        })
    )

    it(
        'should find an user',
        runInTransaction(async () => {
            const userService = Container.get(UserService)
            const user = await userService.find(24)

            expect(user.firstName).toEqual('Teresinha')
            expect(user.lastName).toEqual('Conceição')
            expect(user.email).toEqual('teresinha.conceicao@acampe.com.br')
            expect(user.organizationId).toEqual(21)
            expect(user.adminRole).toEqual(AdminRole.Member)
            expect(user.userRole).toEqual(UserRole.Professional)
            expect(new Date(user.birthday)).toEqual(new Date('1952-06-13'))
            expect(user.gender).toEqual(Gender.Female)
            expect(user.identification).toEqual('536.400.759-60')
            expect(user.generalRegistration).toEqual('1241')
            expect(new Date(user.issue)).toEqual(new Date('1980-10-27'))
            expect(user.issuer).toEqual('SSP/SC')
            expect(user.zipCode).toEqual('89251-560')
            expect(user.address).toEqual('Rua Severino Schiochet')
            expect(user.number).toEqual('952')
            expect(user.neighborhood).toEqual('Centro')
            expect(user.city).toEqual('Jaraguá do Sul')
            expect(user.state).toEqual('SC')
            expect(user.phone).toEqual('(47) 3556-8750')
            expect(user.nationalIdentity).toEqual('31.090.489-4')
        })
    )

    it(
        'should find all users',
        runInTransaction(async () => {
            const context = { organization: { id: 21 } } as Context
            const userService = Container.get(UserService)
            const users = await userService.findAll(context)

            expect(users.length).toBeGreaterThanOrEqual(2)
        })
    )
})