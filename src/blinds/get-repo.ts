import getTypeORM from '../helpers/get-typeorm'
import Config from '../types/config'
import { AnyTarget } from '../types/helpers'

const getRepo = async function( this: Config<any, any, any> ) {
  if ( typeof window !== 'undefined' ) return Promise.reject( new Error() )
  const TypeORM = await getTypeORM()
  const target = await this.target()
  const repo = TypeORM.getRepository( target as AnyTarget )
  return repo
}

export default getRepo
