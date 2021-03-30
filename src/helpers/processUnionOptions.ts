import { create } from '@cookiex/deep'

import { FindConditions, FindOneOptions, FindManyOptions } from 'typeorm'
import { FindOptionsUtils } from 'typeorm/find-options/FindOptionsUtils'

const deep = create( {
  ignoreConflictType: true,
  typeResolveArray: 'concat'
} )

interface processUnionOptions {
  (
    a?: FindConditions<any> | FindOneOptions<any> | null | undefined,
    b?: FindConditions<any> | FindOneOptions<any> | null | undefined,
  ): FindOneOptions<any>
  (
    a?: FindConditions<any> | FindManyOptions<any> | null | undefined,
    b?: FindConditions<any> | FindManyOptions<any> | null | undefined,
  ): FindManyOptions<any>
}

const processUnionOptions: processUnionOptions = ( a: any = {}, b: any = {} ) => {
  if ( FindOptionsUtils.isFindOneOptions( a ) )
    if ( FindOptionsUtils.isFindOneOptions( b ) )
      return deep( a, b )
    else return deep( a, { where: b } )
  else if ( FindOptionsUtils.isFindOneOptions( b ) )
    return deep( { where: a }, b )
  if ( FindOptionsUtils.isFindManyOptions( a ) )
    if ( FindOptionsUtils.isFindManyOptions( b ) )
      return deep( a, b )
    else return deep( a, { where: b } )
  else if ( FindOptionsUtils.isFindManyOptions( b ) )
    return deep( { where: a }, b )
  else return { where: deep( a, b ) }
}

export { processUnionOptions }
