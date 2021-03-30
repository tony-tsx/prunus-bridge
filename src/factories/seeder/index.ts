/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
import { InsertResult } from 'typeorm'

import { AnyBridge, Bridge } from '../../typings/bridge'

type SeederPropertyString = string | ( ( index: number, count: number ) => string )
type SeederPropertyNumber = number | ( ( index: number, count: number ) => number )
type SeederPropertyBoolean = boolean | ( ( index: number, count: number ) => boolean )
type SeederPropertyObject<T> = object | ( ( index: number, count: number ) => object )

type SeederModel<T extends AnyBridge> = {
  [K in keyof Bridge.Extractors.Entity<T>]?:
    Bridge.Extractors.Entity<T>[K] extends string ? SeederPropertyString :
    Bridge.Extractors.Entity<T>[K] extends String ? SeederPropertyString :
    Bridge.Extractors.Entity<T>[K] extends number ? SeederPropertyNumber :
    Bridge.Extractors.Entity<T>[K] extends Number ? SeederPropertyNumber :
    Bridge.Extractors.Entity<T>[K] extends BigInt ? SeederPropertyNumber :
    Bridge.Extractors.Entity<T>[K] extends bigint ? SeederPropertyNumber :
    Bridge.Extractors.Entity<T>[K] extends boolean ? SeederPropertyBoolean :
    Bridge.Extractors.Entity<T>[K] extends Boolean ? SeederPropertyBoolean :
    Bridge.Extractors.Entity<T>[K] extends object ? SeederPropertyObject<Bridge.Extractors.Entity<T>[K]> :
    Bridge.Extractors.Entity<T>[K] extends object ? SeederPropertyObject<Bridge.Extractors.Entity<T>[K]> :
    never
}

const constructor = ( name: string ) => {
  return `( function() {
    return function ${name}Seeder() {}
  } )()`
}

const factorySeeder = <T extends AnyBridge, S extends SeederModel<any> = SeederModel<T>>( bridge: T, model: S ) => {
  const seeder = eval( constructor( bridge.name ) ) as factorySeeder.SeederConstructor<S>
  seeder.populate = async count => {
    const seeds = Array( count ).fill( model ).map( ( model, i, models ) => {
      return Object.fromEntries(
        Object.entries( model )
          .map( ( [ key, property ] ) => {
            if ( typeof property === 'function' )
              return [ key, property( i, models.length ) ]
            else if ( typeof property === 'string' )
              return [ key, eval( `${property}` ) ]
            return [ key, property ]
          } )
      )
    } )
    return bridge.insert( seeds )
  }
  return seeder
}

declare namespace factorySeeder {
  export interface Seeder {}
  export interface SeederConstructor<M extends SeederModel<any>> {
    populate( count: number ): Promise<InsertResult>
  }
}

export { factorySeeder }
