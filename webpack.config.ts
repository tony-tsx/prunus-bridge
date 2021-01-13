import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'

import { TypeORMBridgeWebpackPlugin } from './webpack'

interface Configuration extends webpack.Configuration {
  devServer?: webpackDevServer.Configuration
}

const config: Configuration = {
  entry: path.resolve( 'running-test-web', 'index.tsx' ),
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: [
          'babel-loader', {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.webpack.json'
            }
          } 
        ],
        exclude: [ path.resolve( 'node_modules' ), path.resolve( 'dist' ) ]
      }
    ],
    noParse: [ path.resolve( 'node_modules', 'typeorm' ) ]
  },
  plugins: [ new HtmlWebpackPlugin(), new TypeORMBridgeWebpackPlugin() ],
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx', '.json' ]
  }
}

export default config
