import { factoryBridge } from '.'
import { AnyBridge } from '../../typings/bridge'

const list: records.Record[] = []
const listeners: records.Listener[] = []
const records = () => list

records.find = ( identify: keyof any ): records.Record | undefined =>
  list.find( record => record.identify === identify )

records.register = ( record: Omit<records.Record, 'identify'>, identify?: keyof any | null | undefined ) => {
  if ( !identify ) identify = Symbol()
  const realRecord = { ...record, identify }
  list.push( realRecord )
  listeners.forEach( listener => listener( realRecord ) )
  return identify
}

records.off = ( fn: records.Listener ) => {
  listeners.splice( listeners.indexOf( fn ), 1 )
}
records.on = ( fn: records.Listener ) => {
  listeners.push( fn )
  return () => records.off( fn )
}

declare namespace records {
  export interface Listener {
    ( record: Record ): void
  }
  export interface Record {
    identify: keyof any
    bridge: AnyBridge
    options: factoryBridge.Options<any, any, any>
  }
}

export { records }
