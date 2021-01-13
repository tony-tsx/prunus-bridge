import webpack from 'webpack'

export class TypeORMBridgeWebpackPlugin extends webpack.ContextReplacementPlugin {}

export const noPrase: string[]

export const nextJsWebpack: ( webpack: webpack.Configuration ) => void
