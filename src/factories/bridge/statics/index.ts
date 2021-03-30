import { _delete } from './delete'
import { find } from './find'
import { insert } from './insert'
import { tools } from './tools'
import { update } from './update'

const statics = {
  ...find,
  ...insert,
  ..._delete,
  ...update,
  ...tools
}

Object.keys( statics ).forEach( key => {
  Object.defineProperty( statics, key, {
    writable: false,
    enumerable: true,
    configurable: false
  } )
} )

export { statics }
