import getTypeORM from '../helpers/get-typeorm'
import Config from '../types/config'

const getRepo = async function( this: Config<any, any, any> ) {
  if ( typeof window !== 'undefined' ) return Promise.reject( new Error() )
  const TypeORM = await getTypeORM()
  const target = await this.target()
  const repo = TypeORM.getRepository<any>( target, this.connection )
  return repo
}

export default getRepo
