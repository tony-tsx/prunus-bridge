import commander from 'commander'

import Bridge from '../types/bridge'
import _delete from './delete/delete'
import find from './find/find'
import insert from './insert/insert'
import update from './update/update'

class Command extends commander.Command {
  constructor( bridge: Bridge<any> ) {
    super( bridge.name )
    this.addCommand( find( bridge ) )
    this.addCommand( update( bridge ) )
    this.addCommand( insert( bridge ) )
    this.addCommand( _delete( bridge ) )
  }
}

export default Command
