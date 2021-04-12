import { BridgeCommand } from './BridgeCommand'
import { Interactive } from './interactive'

class InsertCommand extends BridgeCommand {
  constructor() {
    super( 'insert' )
    this.option( '-y, --yes', '', false )
    this.action( async () => {
      const opts = this.opts()

      if ( opts.yes )
        console.log( await this.bridge.insertAndFind( this.unknowArgs ) )

      else await this.interactive( Interactive.Insert, this.unknowArgs )
    } )
  }
}

export { InsertCommand }
