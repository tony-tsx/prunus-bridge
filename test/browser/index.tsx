import 'core-js/stable'
import 'regenerator-runtime/runtime'
// @ts-ignore
window.process = { env: { NODE_ENV: process.env.NODE_ENV } }

import { DataGrid } from '@material-ui/data-grid'
import React from 'react'
import ReactDOM from 'react-dom'

import { usePagination } from '../../src/hooks'
import User from '../common/bridges/User'

const App = () => {
  const pagination = usePagination( User, {} )

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={ pagination.entities } columns={ [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'age', headerName: 'Age', width: 90, type: 'number' },
      ] } checkboxSelection/>
    </div>
  )
}

const app = document.createElement( 'div' )

app.setAttribute( 'id', 'app' )

document.body.append( app )

ReactDOM.render( <App />, app )
