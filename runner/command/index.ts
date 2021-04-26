import commander from 'commander'
import * as Yup from 'yup'
import { createConnection, FindConditions, FindOperator, getConnectionOptions } from 'typeorm'
import Bridge from '../../src'

import { UserBrige } from '../bridges/User'
import { ObjectShape } from 'yup/lib/object'
import { createStandardEntityColumnTypeSchema } from '../../src/helpers'

commander.name( 'prunus-bridge' )

const command = Bridge.command( UserBrige, 'user' )

commander.command( 'test' )
  .action( async () => {
    await createConnection( await getConnectionOptions() )
    const metadata = await Bridge.Helpers.getBridgeMetadata( UserBrige )
    const schema = Yup.lazy( ( value: string | string[] | number | number[] | Date | Date[] | FindConditions<{[key: string]: any}> ) => {
      if ( typeof value === 'string' )
        return Yup.string()
      else if ( typeof value === 'number' )
        return Yup.number()
      else if (
        typeof value === 'string' && !isNaN( new Date( value ).getTime() )
          ||
        typeof value === 'object' && value instanceof Date
      ) return Yup.date()
      else if ( typeof value === 'object' && !Array.isArray( value ) )
        return Yup.object().shape( metadata.columns.reduce( ( shape, column ) => {
          return {
            ...shape,
            [column.propertyName]: Yup.mixed()
              .when( {
                is: ( value: any ) => typeof value === 'object' && value instanceof FindOperator,
                then: Yup.object()
              } )
              .when( {
                is: ( value: any ) => typeof value !== 'object' || !( value instanceof FindOperator ),
                then: createStandardEntityColumnTypeSchema( column )
              } )
          }
        }, {} as ObjectShape ) )
      else if ( Array.isArray( value ) )
        return Yup.array().of(
          Yup.mixed()
            .when( {
              is: ( value: any ) => typeof value === 'string',
              then: Yup.string()
            } )
            .when( {
              is: ( value: any ) => typeof value === 'number',
              then: Yup.number()
            } )
            .when( {
              is: ( value: any ) => typeof value === 'string' && !isNaN( new Date( value ).getTime() ) || typeof value === 'object' && value instanceof Date,
              then: Yup.date()
            } )
        )
    } )

    schema.validate( {
      name: true,
      createdAt: 'tony.js@zoho.eu'
    }, {}, console.log )
  } )

commander.addCommand( command )

commander.parse( process.argv )
