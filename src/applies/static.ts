import _delete from '../static-methods/delete/delete'
import findAndDelete from '../static-methods/delete/findAndDelete'
import findAndSoftDelete from '../static-methods/delete/findAndSoftDelete'
import findByIdsAndDelete from '../static-methods/delete/findByIdsAndDelete'
import findByIdsAndSoftDelete from '../static-methods/delete/findByIdsAndSoftDelete'
import findOneAndDelete from '../static-methods/delete/findOneAndDelete'
import findOneAndSoftDelete from '../static-methods/delete/findOneAndSoftDelete'
import findOneOrFailAndDelete from '../static-methods/delete/findOneOrFailAndDelete'
import findOneOrFailAndSoftDelete from '../static-methods/delete/findOneOrFailAndSoftDelete'
import softDelete from '../static-methods/delete/softDelete'
import find from '../static-methods/find/find'
import findAndCount from '../static-methods/find/findAndCount'
import findByIds from '../static-methods/find/findByIds'
import findOne from '../static-methods/find/findOne'
import findOneOrFail from '../static-methods/find/findOneOrFail'
import insert from '../static-methods/insert/insert'
import insertAndFind from '../static-methods/insert/insertAndFind'
import insertOne from '../static-methods/insert/insertOne'
import insertOneAndFind from '../static-methods/insert/insertOneAndFind'
import clear from '../static-methods/tools/clear'
import count from '../static-methods/tools/count'
import decrement from '../static-methods/tools/decrement'
import increment from '../static-methods/tools/increment'
import findAndRestore from '../static-methods/update/findAndRestore'
import findAndUpdate from '../static-methods/update/findAndUpdate'
import findByIdsAndRestore from '../static-methods/update/findByIdsAndRestore'
import findByIdsAndUpdate from '../static-methods/update/findByIdsAndUpdate'
import findOneAndRestore from '../static-methods/update/findOneAndRestore'
import findOneAndUpdate from '../static-methods/update/findOneAndUpdate'
import findOneOrFailAndRestore from '../static-methods/update/findOneOrFailAndRestore'
import findOneOrFailAndUpdate from '../static-methods/update/findOneOrFailAndUpdate'
import restore from '../static-methods/update/restore'
import update from '../static-methods/update/update'
import BridgeStatic from '../types/bridge-static'
import { AnyTarget } from '../types/helpers'

const statics = {
  find,
  findByIds,
  findOne,
  findOneOrFail,
  findAndCount,

  update,
  findAndUpdate,
  findByIdsAndUpdate,
  findOneAndUpdate,
  findOneOrFailAndUpdate,

  restore,
  findAndRestore,
  findByIdsAndRestore,
  findOneAndRestore,
  findOneOrFailAndRestore,

  delete: _delete,
  findAndDelete,
  findByIdsAndDelete,
  findOneAndDelete,
  findOneOrFailAndDelete,

  softDelete,
  findAndSoftDelete,
  findByIdsAndSoftDelete,
  findOneAndSoftDelete,
  findOneOrFailAndSoftDelete,

  insert,
  insertOne,
  insertAndFind,
  insertOneAndFind,

  count,
  increment,
  decrement,
  clear
}

const applyStatic = <E extends AnyTarget, S, I>( bridge: BridgeStatic<E, S, I> ) => {
  Object.assign( bridge, statics )
}

export default applyStatic
