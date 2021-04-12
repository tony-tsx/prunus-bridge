import { Command } from 'commander'

import { getTypeORM } from '../helpers/internals'
import { AnyBridge } from '../typings/bridge'
import { CustomBridgeCommand } from './CustomBridgeCommand'
import { parseUnknowArgs } from './helpers'
import { Interactive } from './interactive/Interactive'

class BridgeCommand extends Command {
  public static create = <T extends AnyBridge>( bridge: T, name?: string ) =>
    new CustomBridgeCommand( bridge, name )

  protected get unknowArgs() {
    return parseUnknowArgs( super.args )
  }

  protected interactive = <T extends new ( ...args: any[] ) => Interactive>(
    interactive: T,
    ...args: T extends new ( ...args: infer A ) => Interactive ? A : never
  ) => {
    return Interactive.call( new interactive( ...args ), this.bridge )
  }

  protected enableConnection: boolean = true

  private _bridge: AnyBridge

  protected get bridge() {
    if ( !this._bridge ) throw new Error( '' )
    return this._bridge
  }
  constructor( name: string ) {
    super( name )
    this.storeOptionsAsProperties( false )
  }
  public setBridge = ( bridge: AnyBridge ) => {
    this._bridge = bridge
    return this
  }
  public action = ( fn: ( ...args: any[] ) => void | Promise<void> ) => {
    super.action( async ( ...args ) => {
      if ( this.enableConnection ) {
        const { createConnection, getConnectionOptions } = getTypeORM.sync()
        await createConnection( await getConnectionOptions() )
      }

      await fn( ...args )

      if ( this.enableConnection ) {
        const { getConnectionManager } = getTypeORM.sync()
        await Promise.allSettled(
          getConnectionManager().connections.map( connection => connection.close() )
        )
      }

    } )
    return this
  }
}

export { BridgeCommand }
