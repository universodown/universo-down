import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm'


@Entity({ name: 'assisteds' })
export class Assisted {

  @PrimaryGeneratedColumn()
  id: number

  @Column('text', { name: 'name' })
  name: string

  @Column('date')
  birthday: Date

  @Column('text')
  gender: Text

  @Column('text')
  identification: string

  @Column('text')
  general_registration: string

  @Column('date')
  issue: Date

  @Column('text')
  issuer: string

  @Column('text')
  zip_code: string

  @Column('text')
  address: string

  @Column('text')
  number: string

  @Column('text')
  neighborhood: string

  @Column('text')
  city: string

  @Column('text')
  state: string

  @Column('text')
  phone: string

  @Column('boolean')
  has_benefits: boolean

  @Column('blob')
  scholarity: Blob

  @Column('text')
  naturalness: string

  @Column('text')
  nationality: string

  @Column('text')
  occupation: string

  @Column('text')
  national_identity: string

  @Column('boolean')
  active: boolean

  @Column('text')
  additional_information: string

  @Column('blob')
  photo: Blob

  @Column('blob')
  benefits: Blob

  @Column('text')
  social_identification_number: string
  evolution_records: any

}