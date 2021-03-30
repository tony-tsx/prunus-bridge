import { factoryBridge } from '.'
import { AnyBridge } from '../../typings/bridge'

const list: records.Record[] = []

const records = () => list

records.find = ( identify: keyof any ): records.Record | undefined =>
  list.find( record => record.identify === identify )

records.register = ( record: Omit<records.Record, 'identify'>, identify?: keyof any | null | undefined ) => {
  if ( !identify ) identify = Symbol()
  list.push( { ...record, identify } )
  return identify
}

declare namespace records {
  export interface Record {
    identify: keyof any
    bridge: AnyBridge
    options: factoryBridge.Options<any, any, any>
  }
}

export { records }
