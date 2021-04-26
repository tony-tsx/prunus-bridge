import { factoryHandler } from '.'
import { getExpress } from '../../helpers/internals'
import { records } from '../bridge/records'

const factoryAllBridgeHandler = () => {
  const { Router } = getExpress.sync()
  const route = Router()
  records().forEach( record => route.use( factoryHandler( record.bridge ) ) )
  records.on( record => route.use( factoryHandler( record.bridge ) ) )
  return route
}

export { factoryAllBridgeHandler }
