import webpack from 'webpack'

export class TypeORMBridgeWebpackPlugin {
  constructor(
    isServer?: boolean,
    bridgesPaths?: string | RegExp | ( string | RegExp )[],
    entitiesImportChecker?: RegExp
  )
  apply( compiler: webpack.Compiler ): void
}

export const noPrase: string[]

export const nextJsWebpack: (
  webpack: webpack.Configuration,
  bridgesPaths?: string | RegExp | ( string | RegExp )[],
  entitiesImportChecker?: RegExp
) => void
