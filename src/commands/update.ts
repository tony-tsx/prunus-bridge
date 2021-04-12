import { BridgeCommand } from './BridgeCommand'
import { parseWhere } from './helpers'
import { Interactive } from './interactive'

class UpdateCommand extends BridgeCommand {
  constructor() {
    super( 'update' )
    this.option( '-w, --where <predicate>', '', parseWhere )
    this.option( '-y, --yes', '', false )
    this.action( async () => {

      const opts = this.opts()
      if ( opts.yes ) {
        const result = await this.bridge.update( opts.where, this.unknowArgs )
        console.log( result.affected > 1 ? 'one record updated' : `${result.affected} records updateds` )
      } else {
        const entities = await this.bridge.find( opts.where )
        await this.interactive( Interactive.Update, entities, this.unknowArgs )
      }
    } )
  }
}

export { UpdateCommand }
