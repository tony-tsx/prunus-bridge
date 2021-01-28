import create from './create-bridge'
import { _require } from './helpers/_import'

const createHandler = ( { static: _static = false }: Configuration = {} ) => {
  type Express = typeof import( 'express' )
  type createHandle = typeof import( './handlers' )

  const { Router } = _require<
    Express>( 'express' )
  const createRouter = _require<createHandle>( './handlers', __dirname ).default
  const handler = Router()

  create.list
    .filter( bridge => bridge.config.handler ?? true )
    .forEach( bridge => handler.use( createRouter( bridge ) ) )

  if ( !_static )
    create.on( bridge => ( bridge.config.handler ?? true ) && handler.use( createRouter( bridge ) ) )

  return handler
}

export interface Configuration {
  static?: boolean
}

export default createHandler
