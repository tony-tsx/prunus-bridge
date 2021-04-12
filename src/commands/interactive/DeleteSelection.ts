import { AnyBridgeInstance } from '../../typings/bridge'
import { Delete } from './Delete'
import { Interactive } from './Interactive'

class DeleteSelection extends Interactive {
  constructor( private entities: AnyBridgeInstance[] ) {
    super()
  }
  public question = async () => {
    const { records } = await this.inquirer.prompt( {
      type: 'checkbox',
      message: 'Select records to delete',
      name: 'records',
      choices: this.entities.map( entity => ( {
        value: entity,
        name: JSON.stringify( entity, null )
      } ) )
    } )
    return new Delete( records )
  }
}

export { DeleteSelection }
