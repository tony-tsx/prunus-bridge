import * as Yup from 'yup'

import { AnyBridge } from '../typings/bridge'
import { createStandardBridgeEntitySchema } from './createStandardBridgeEntitySchema'
import { getBridgeOptions } from './getBridgeOptions'

const getBridgeEntitySchema = async <T extends AnyBridge>( bridge: T ) => {
  const options = getBridgeOptions( bridge )
  if ( options.schema )
    if ( options.schema instanceof Yup.ObjectSchema )
      options.schema = Yup.mixed()
        .when( {
          is: ( v: any ) => typeof v === 'object' && !Array.isArray( v ),
          then: options.schema
        } )
        .when( {
          is: ( v: any ) => typeof v === 'object' && Array.isArray( v ),
          then: Yup.array().of( options.schema )
        } )

    else return options.schema

  const schema = await createStandardBridgeEntitySchema( bridge )

  return options.schema = Yup.mixed()
    .when( {
      is: ( v: any ) => typeof v === 'object' && !Array.isArray( v ),
      then: schema
    } )
    .when( {
      is: ( v: any ) => typeof v === 'object' && Array.isArray( v ),
      then: Yup.array().of( schema )
    } )
}

export { getBridgeEntitySchema }
