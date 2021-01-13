import isClientSide from '../../helpers/is-client-side'
import BridgeStatic from '../../types/bridge-static'
import { FindManyOptions } from '../../types/bridge-static-find'
import { AnyTarget, Extract } from '../../types/helpers'

const method = 'findAndCount' as const

const findAndCount = async function<E extends AnyTarget, S = {}, I = {}>(
  this: BridgeStatic<E, S, I>,
  options: FindManyOptions<E>
) {
  if ( isClientSide( this ) ) {
    const axios = await this.getAxios()
    const params = { options, method }
    const response = await axios.get<[ Extract.Entity<E>[], number ]>( this.uri, { params } )
    const [ entities, count ] = response.data
    return [ this( entities ), count ] as const
  }
  const repo = await this.getRepo()
  const [ entities, count ] = await repo.findAndCount( options )
  return [ this( entities ), count ] as const
}

export default findAndCount
