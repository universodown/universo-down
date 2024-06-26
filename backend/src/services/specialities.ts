import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Context } from '../api/dto/context'
import {
    SpecialitiesCreate,
    SpecialitiestRequestUpdate
} from '../api/dto/specialities'
import SpecialitiesRepository from '../repositories/specialities'

@Service()
export default class SpecialitiesService {

  @InjectRepository(SpecialitiesRepository)
  private readonly repository: SpecialitiesRepository;

  async create(context: Context, specialitiesInfo: SpecialitiesCreate) {
      return getManager().transaction(async db => {
          const repository = db.getCustomRepository(SpecialitiesRepository)

          return repository.save({
              ...specialitiesInfo,
              organizationId: context.organization.id
          })
      })
  }

  async delete(id: number) {
      return getManager().transaction(async db => {
          const repository = db.getCustomRepository(SpecialitiesRepository)
          const specialities = await repository.findById(id)

          return repository.remove(specialities)
      })
  }

  async update(
      context: Context,
      id: number,
      specialitiestRequestInfo: SpecialitiestRequestUpdate
  ) {
      return getManager().transaction(async db => {
          const repository = db.getCustomRepository(SpecialitiesRepository)
          const specialitiesRequest = await repository
              .findByIdWithoutRelations(id)

          return repository.save({
              ...specialitiesRequest,
              ...specialitiestRequestInfo,
              organizationId: context.organization.id,
              id
          })
      })
  }

  async findById(id: number) {
      return this.repository.findById(id)
  }

  async findAll(context: Context, userId: number) {
      return this.repository.findAll(context, userId)
  }
  async findAllInfo(context: Context) {
      return this.repository.findAllInfo(context)
  }

}
