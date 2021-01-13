import { AnyTarget, Extract } from '../types/helpers'
import { _import, _require } from './_import'

type TypeORM = typeof import( 'typeorm' )

const getTypeORM = () => _import<TypeORM>( 'typeorm' )

getTypeORM.sync = () => _require<TypeORM>( 'typeorm' )

const getTypeORMRepository = <E extends AnyTarget>( target: Extract.Entity<E> ) =>
  getTypeORM().then( typeorm => typeorm.getRepository<any>( target as any ) )

getTypeORMRepository.sync = <E extends AnyTarget>( target: E ) =>
  getTypeORM.sync().getRepository<any>( target as any )

getTypeORM.repository = getTypeORMRepository

export default getTypeORM
