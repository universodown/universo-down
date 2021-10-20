import Container from 'typedi'

import { Context } from '../api/dto/context'
import logger from '../fns/logger'
import SpecialityService from '../services/speciality'

export async function createSpeciality() {
    const specialityServer = Container.get(SpecialityService)

    return specialityServer.create({
        organizationId: 2,
        description: 'Teste Especialidade'
    })
}

export async function updateSpeciality(id: number) {
    const specialityServer = Container.get(SpecialityService)

    await specialityServer.update({
        id,
        description: 'Teste Especialidade Alterado'
    })
}

export async function deleteSpeciality(id: number) {
    const specialityServer = Container.get(SpecialityService)

    await specialityServer.delete(id)
}

export async function findSpeciality(id: number) {
    const specialityServer = Container.get(SpecialityService)

    logger.info(JSON.stringify(await specialityServer.find(id)))
}

export async function findAllSpeciality() {
    const specialityServer = Container.get(SpecialityService)
    const context = { organization: { id: 2 } } as Context

    logger.info(JSON.stringify(await specialityServer.findAll(context)))
}
