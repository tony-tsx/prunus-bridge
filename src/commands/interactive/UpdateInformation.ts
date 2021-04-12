import { AnyBridgeInstance } from '../../typings/bridge'
import { Interactive } from './Interactive'
import { Update } from './Update'

class UpdateInformation extends Interactive {
  constructor( private entities: AnyBridgeInstance[], private data: any ) {
    super()
  }
  public question = async () => {
    console.log( JSON.stringify( this.entities, null, 2 ) )
    return new Update( this.entities, this.data )
  }
}

export { UpdateInformation }
