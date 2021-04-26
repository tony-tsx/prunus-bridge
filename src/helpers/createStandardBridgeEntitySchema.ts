import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata'
import * as Yup from 'yup'
import { ObjectShape } from 'yup/lib/object'

import { AnyBridge } from '../typings/bridge'
import { getBridgeMetadata } from './getBridgeMetadata'

const createStandardEntityColumnTypeSchema = ( column: ColumnMetadata ): Yup.BaseSchema<any, any, any> => {
  switch ( column.type ) {
    case Date:
    case 'date':
    case 'datetime':
    case 'time':
    case 'timetz':
    case 'time with time zone':
    case 'time without time zone':
    case 'timestamp':
    case 'timestamptz':
    case 'timestamp with time zone':
    case 'timestamp without time zone':
      return Yup.date()
    case 'uuid': return Yup.string()
      .matches( /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i )
    case 'character':
    case 'char': {
      if ( column.length )
        return Yup.string().min( Number( column.length ) ).max( Number( column.length ) )
      return Yup.string()
    }
    case String:
    case 'character varying':
    case 'varchar':
    case 'string':
    case 'text':
    case 'tinytext': {
      if ( column.propertyName === 'email' ) return Yup.string().email()
      return Yup.string()
    }
    case 'int': return Yup.number()
    case 'numeric': return Yup.number()
    case Number:
    case 'number': return Yup.number()
    case 'json': return Yup.object()
    case 'simple-array':
    case 'array': return Yup.array()
    default: throw new Error( `${column.type}` )
  }
}

const createStandardBridgeEntitySchema = async <T extends AnyBridge>( bridge: T ) => {
  const metadata = await getBridgeMetadata( bridge )
  const shape = metadata.columns.reduce( ( shape, column ) => {
    const property = column.propertyName

    const schema = createStandardEntityColumnTypeSchema( column )

    const required = !column.isNullable && !column.default && !column.isGenerated

    if ( required ) return { ...shape, [property]: schema.required() }
    else return { ...shape, [property]: schema.notRequired() }
  }, {} as ObjectShape )

  return Yup.object().shape( shape )
}

export { createStandardBridgeEntitySchema, createStandardEntityColumnTypeSchema }
