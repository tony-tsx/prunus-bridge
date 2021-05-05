import { extractKeys } from "../../helpers/extractKeys"
import { METHODS_KEYS as INSTANCE_METHODS_KEYS } from "../bridge/methods"
import { statics } from "../bridge/statics"
export { METHODS_KEYS as INSTANCE_METHODS_KEYS } from "../bridge/methods"

export const STATIC_METHODS_KEYS = extractKeys( statics )

export const METHODS_KEYS = [ ...INSTANCE_METHODS_KEYS, ...STATIC_METHODS_KEYS ]

export const BASE_PATHS: typeof METHODS_KEYS = [ 'find', 'insert', 'update', 'delete', 'save' ]

export const HTTP_METHODS_MAP: {
  [K in 'get' | 'post' | 'patch' | 'delete' | 'put']: typeof METHODS_KEYS
} = {
  get: [ 'find', 'findOne', 'findAndCount', 'findByIds', 'findOneOrFail', 'count' ],
  delete: [ 'delete', 'softRemove', 'remove', 'softDelete', 'clear' ],
  patch: [ 'update', 'restore', 'recover', 'increment', 'decrement' ],
  post: [ 'insert', 'insertOne', 'insertAndFind', 'insertOneAndFind' ],
  put: [ 'save' ],
}

export const HTTP_METHODS_NAMES = extractKeys( HTTP_METHODS_MAP )