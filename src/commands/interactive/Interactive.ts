/* eslint-disable class-methods-use-this */
import { getInquirer } from '../../helpers/internals/getInquirer'
import { AnyBridge } from '../../typings/bridge'

interface IInteractive {
  question(): Promise<void | IInteractive>
}

abstract class Interactive implements IInteractive {
  public static call = async <T extends Interactive>( interactive: T, bridge: AnyBridge ) => {
    interactive.bridge = bridge
    const response = await interactive.question()
    if ( response instanceof Interactive )
      return await Interactive.call( response, interactive.bridge )
    return response
  }

  protected get inquirer() { return getInquirer.sync() }
  private _bridge: AnyBridge | null = null
  protected get bridge() {
    if ( !this._bridge ) throw new Error( '' )
    return this._bridge
  }
  protected set bridge( bridge: AnyBridge ) {
    this._bridge = bridge
  }
  protected delegate = <T extends new ( ...args: any[] ) => Interactive>(
    Interactive: T,
    ...args: T extends new ( ...args: infer A ) => Interactive ? A : never
  ) => {
    const interactive = new Interactive( ...args )
    interactive.bridge = this.bridge
    return interactive
  }
  constructor() {}
  abstract question(): Promise<void | IInteractive>
}

namespace Interactive {}

export { Interactive }
