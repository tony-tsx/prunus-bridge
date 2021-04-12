import { Command } from 'commander'

import { AnyBridge } from '../typings/bridge'

class CustomBridgeCommand<T extends AnyBridge> extends Command {
  constructor( public bridge: T, name?: string ) {
    super( name )
  }
}

export { CustomBridgeCommand }
