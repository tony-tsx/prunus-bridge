/* eslint-disable @typescript-eslint/no-unused-vars */
import { Delete as DeleteInteractive } from './Delete'
import { Insert as InsertInteractive } from './Insert'
import { Interactive as AbstractInteractive } from './Interactive'
import { Update as UpdateInteractive } from './Update'

namespace Interactive {
  export import Interactive = AbstractInteractive

  export import Insert = InsertInteractive
  export import Update = UpdateInteractive
  export import Delete = DeleteInteractive

  export const call = Interactive.call
}

export { Interactive }
