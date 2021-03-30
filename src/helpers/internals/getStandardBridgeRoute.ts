import { Router } from 'express'

import { statics, methods, identifier } from '../../handlers'
import { bridgeInstanceAttach } from '../../handlers/helpers'
import { createHandlerPaths as paths } from '../../helpers/createHandlerPaths'
import { delegateBridgeHandler as handler } from '../../helpers/delegateBridgeHandler'
import { getExpress } from '../../helpers/internals/getExpress'

let _standardRoute: Router | null = null

const getStandardBridgeRoute = () => {
  if ( _standardRoute ) return _standardRoute
  const router = getExpress.sync().Router()
  const key = 'identifier'

  router.get( paths( statics.find.name, '/' ), handler( statics.find ) )
  router.get( paths( statics.findAndCount.name, 'findCount' ), handler( statics.findAndCount ) )
  router.get( paths( statics.findByIds.name, 'ids' ), handler( statics.findByIds ) )
  router.get( paths( statics.findOne.name, 'one' ), handler( statics.findOne ) )
  router.get( paths( statics.findOneOrFail.name, 'oneFail' ), handler( statics.findOneOrFail ) )

  router.post( paths( statics.insert.name, '/' ), handler( statics.insert ) )
  router.post( paths( statics.insertOne.name, 'one' ), handler( statics.insertOne ) )
  router.post( paths( statics.insertAndFind.name, 'find' ), handler( statics.insertAndFind ) )
  router.post( paths( statics.insertOneAndFind.name, 'oneFind' ), handler( statics.insertOneAndFind ) )

  router.patch( paths( statics.update.name, '/' ), handler( statics.update ) )
  router.patch( paths( statics.restore.name ), handler( statics.restore ) )

  router.delete( paths( statics.delete.name, '/' ), handler( statics.delete ) )
  router.delete( paths( statics.softDelete.name, '/soft' ), handler( statics.softDelete ) )

  router.put( paths( methods.save.name, '/' ), handler( methods.save ) )
  router.patch( paths( methods.recover.name ), handler( methods.recover ) )
  router.delete( paths( methods.remove.name ), handler( methods.remove ) )
  router.delete( paths( methods.softRemove.name ), handler( methods.softRemove ) )

  router.get( paths( statics.count.name ), handler( statics.count ) )
  router.delete( paths( statics.clear.name ), handler( statics.clear ) )
  router.patch( paths( statics.increment.name ), handler( statics.increment ) )
  router.patch( paths( statics.decrement.name ), handler( statics.decrement ) )

  router.use( `/:${key}`, bridgeInstanceAttach( key ) )

  router.get( paths( `/:${key}`, `/:${key}/find` ), identifier.find )
  router.patch( paths( `/:${key}`, `/:${key}/update` ), identifier.update )
  router.delete( paths( `/:${key}`, `/:${key}/remove` ), identifier.remove )

  router.delete( paths( `/:${key}/softRemove`, `/:${key}/soft` ), identifier.softRemove )

  return _standardRoute = router
}

export { getStandardBridgeRoute }
