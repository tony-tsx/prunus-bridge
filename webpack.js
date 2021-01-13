const webpack = require( 'webpack' )

module.exports.TypeORMBridgeWebpackPlugin = class TypeORMBridgeWebpackPlugin extends webpack.ContextReplacementPlugin {
  constructor() {
    super(
      /typeorm-bridge\/dist\/helpers/,
      data => {
        data.dependencies.forEach( dependency => delete dependency.critical )
        return data
      }
    )
  }
}

module.exports.noParse = [ require.resolve( 'typeorm' ) ]

module.exports.nextJsWebpack = ( webpack ) => {
  if ( !webpack.plugins ) webpack.plugins = []
  webpack.plugins.push( new module.exports.TypeORMBridgeWebpackPlugin() )
  if ( !webpack.module.noParse ) webpack.module.noParse = []
  webpack.module.noParse.push( ...module.exports.noParse )
}
