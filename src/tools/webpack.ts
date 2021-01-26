import path from 'path'
import webpack from 'webpack'

const removeCriticalImport = ( data: any ) => {
  data.dependencies.forEach( ( dependency: any ) => delete dependency.critical )
  return data
}

const criticalImportRegEx = /typeorm-bridge\/dist\/helpers/
const entitiesCheckRegEx = /entities/

type AnyWebpackCompilerPlugin = { apply( compiler: webpack.Compiler ): void }

type BridgesPaths = string | RegExp | ( string | RegExp )[]

export class TypeORMBridgeWebpackPlugin {
  private applies: AnyWebpackCompilerPlugin[] = []

  constructor(
    isServer = true,
    bridgesPaths: BridgesPaths = path.resolve( 'src', 'bridges' ),
    entitiesCheck = entitiesCheckRegEx
  ) {

    this.applies.push( new webpack.ContextReplacementPlugin( criticalImportRegEx, removeCriticalImport ) )

    if ( isServer ) return this

    const checkContext = ( context: string ) => {
      if ( Array.isArray( bridgesPaths ) )
        return bridgesPaths.some( bridgepath => {
          if ( typeof bridgepath === 'string' ) return bridgepath === context
          if ( typeof bridgepath === 'object' && bridgepath instanceof RegExp ) return bridgepath.test( context )
          return false
        } )
      if ( typeof bridgesPaths === 'string' ) return bridgesPaths === context
      if ( typeof bridgesPaths === 'object' && bridgesPaths instanceof RegExp ) return bridgesPaths.test( context )
      return false
    }
    
    this.applies.push(
      new webpack.IgnorePlugin( {
        checkResource: ( resource, context ) => checkContext( context ) && entitiesCheck.test( resource )
      } )
    )
  }

  apply = ( compiler: webpack.Compiler ) => {
    this.applies.forEach( plugin => plugin.apply( compiler ) )
  }
}

export const noParse = [ require.resolve( 'typeorm' ) ]

export const nextJsWebpack = (
  webpack: webpack.Configuration,
  bridgesPaths?: BridgesPaths,
  entitiesCheck?: RegExp
) => {
  ( webpack.plugins ??= [] ).push(
    new module.exports.TypeORMBridgeWebpackPlugin( webpack.target !== 'web', bridgesPaths, entitiesCheck )
  )
  if ( !webpack.module.noParse ) webpack.module.noParse = []
  if ( !Array.isArray( webpack.module.noParse ) ) webpack.module.noParse = [ webpack.module.noParse ]
  webpack.module.noParse.push( ...module.exports.noParse )
}
