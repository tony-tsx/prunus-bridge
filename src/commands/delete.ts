import { BridgeCommand } from './BridgeCommand'
import { parseWhere } from './helpers'
import { Interactive } from './interactive'

class DeleteCommand extends BridgeCommand {
  constructor() {
    super( 'delete' )
    this.option( '-w, --where <predicate>', '', parseWhere )
    this.option( '-s, --soft', '', false )
    this.option( '-y, --yes', '', false )
    this.action( async () => {
      const opts = this.opts()
      if ( !opts.where && opts.yes ) return console.log( 'not possible combine delete flag yes without where' )
      if ( opts.yes )
        await ( opts.soft ? this.bridge.softDelete( opts.where ) : this.bridge.delete( opts.where ) )
          .then( result => {
            console.log( result.affected > 1 ? 'one record deleted' : `${result.affected} records deleted` )
          } )
      else {
        const entities = await this.bridge.find( opts.where )
        await this.interactive( Interactive.Delete, entities )
      }
    } )
  }
}

export { DeleteCommand }
