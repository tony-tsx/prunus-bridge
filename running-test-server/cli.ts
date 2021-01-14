import commander from 'commander'

import TypeORMBridge from '../src'
import User from './bridges/User'

commander.addCommand( TypeORMBridge.command( User ).alias( 'user' ) )

commander.parse( process.argv )
