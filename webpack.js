const path = require( 'path' )
const webpack = require( 'webpack' )

const removeCriticalImport = data => {
  data.dependencies.forEach( dependency => delete dependency.critical )
  return data
}

module.exports.TypeORMBridgeWebpackPlugin = class TypeORMBridgeWebpackPlugin {
  applies
  constructor( isServer = true, bridgesPaths = path.resolve( 'src', 'bridges' ), entitiesCheck = /entities/ ) {
    this.applies = []

    this.applies.push( new webpack.ContextReplacementPlugin( /typeorm-bridge\/dist\/helpers/, removeCriticalImport ) )

    if ( isServer ) return this

    const checkContext = context => {
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

  apply = ( compiler ) => {
    this.applies.forEach( plugin => plugin.apply( compiler ) )
  }
}

module.exports.noParse = [ require.resolve( 'typeorm' ) ]

module.exports.nextJsWebpack = ( webpack, bridgesPaths = undefined, entitiesCheck = undefined ) => {
  if ( !webpack.plugins ) webpack.plugins = []
  webpack.plugins.push(
    new module.exports.TypeORMBridgeWebpackPlugin( webpack.target !== 'web', bridgesPaths, entitiesCheck )
  )
  if ( !webpack.module.noParse ) webpack.module.noParse = []
  webpack.module.noParse.push( ...module.exports.noParse )
}
