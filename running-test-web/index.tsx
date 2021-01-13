import React from 'react'
import ReactDOM from 'react-dom'

import User from './bridges/User'

Object.assign( window, { User } )

const App = () => {
  React.useEffect( () => {
    User.find( {
      where: {
        firstName: User.op.In( [ 'Tony', 'Jô' ] )
      }
    } ).then( console.log )
  }, [] )

  return null
}

const app = document.createElement( 'div' )

app.setAttribute( 'id', 'app' )

document.body.append( app )

ReactDOM.render( <App />, app )
