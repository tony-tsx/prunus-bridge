import humps from 'humps'

import { getCommander } from '../../helpers/internals/getCommander'
import { getMainCommand } from '../../helpers/internals/getMainCommand'
import { AnyBridge } from '../../typings/bridge'

const factoryCommand = ( bridge: AnyBridge, name?: string ) => {

  const { Command } = getCommander.sync()
  const command = new Command( name )

  command.arguments( '<id> [method]' )

  command.action( async ( identifier: any, method ) => {
    const entity = await bridge.findOne( identifier )
    if ( !entity ) return console.log( `not find ${bridge.name} with ${identifier}` )
    switch ( method ) {
      case undefined:
      case 'find': return console.log( entity )
      case 'remove':
        await entity.remove()
        return console.log( 'removed' )

      case 'softRemove':
        await entity.softRemove()
        return console.log( 'removed' )

      case 'save':
        for( let i = 0; i < command.args.length; i++ )
          if ( command.args[i].startsWith( '--' ) )
            entity[humps.camelize( command.args[i].replace( '--', '' ) )] = command.args[++i]
        return console.log( await entity.save( { reload: true } ) )

      default: return console.log( 'method now allowed' )
    }
  } )

  Object.values( getMainCommand.sync() ).forEach( Command => {
    const cmd = new Command()
    cmd.setBridge( bridge )
    command.addCommand( cmd )
  } )

  return command
}

namespace factoryCommand {}

export { factoryCommand }
