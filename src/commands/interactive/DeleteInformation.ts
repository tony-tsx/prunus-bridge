import { AnyBridgeInstance } from '../../typings/bridge'
import { Delete } from './Delete'
import { Interactive } from './Interactive'

class DeleteInformation extends Interactive {
  constructor( private entities: AnyBridgeInstance[] ) {
    super()
  }
  public question = async () => {
    console.log( JSON.stringify( this.entities, null, 2 ) )
    return new Delete( this.entities )
  }
}

export { DeleteInformation }
