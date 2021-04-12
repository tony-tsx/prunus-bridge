import { AnyBridgeInstance } from '../../typings/bridge'
import { Interactive } from './Interactive'
import { UpdateDeleteField } from './UpdateDeleteField'
import { UpdateEdit } from './UpdateEdit'
import { UpdateInformation } from './UpdateInformation'
import { UpdateSelection } from './UpdateSelection'

class Update extends Interactive {
  public message: string
  public choices: any[]
  constructor( private entities: AnyBridgeInstance[], private data: any ) {
    super()
    this.message = this.entities.length > 1 ? `are you sure you want to update ${this.entities.length} records? ` : 'are you sure you want to update this record?'
    this.choices = [
      { name: 'Yes', value: 'yes', short: 'yes', key: 'y' },
      { name: 'No', value: 'no', short: 'no', key: 'n' },
      { type: 'separator' },
      { name: 'Edit, edit or add field to data', value: 'edit', short: 'edit', key: 'e' },
      Object.keys( this.data ).length ?
        { name: 'Delete, delete field from data', value: 'delete', short: 'delete', key: 'd' } : null,
      { type: 'separator' },
      {
        name: this.entities.length > 1 ? 'Info, show details about the records' : 'Info, show details about the record ',
        value: 'info',
        short: 'info',
        key: 'i',
      },
      this.entities.length > 1 ? { name: 'Select, select records to delete', value: 'select', short: 'select', key: 's' } : null,
    ].filter( Boolean )
  }
  public question = async () => {
    if ( !this.entities.length ) return console.log( 'no records to update' )
    console.log( this.data )
    const { option } = await this.inquirer.prompt( {
      type: 'expand',
      message: this.message,
      name: 'option',
      choices: this.choices
    } )
    if ( option === 'info' ) return new UpdateInformation( this.entities, this.data )
    if ( option === 'select' ) return new UpdateSelection( this.entities, this.data )
    if ( option === 'edit' ) return new UpdateEdit( this.entities, this.data )
    if ( option === 'delete' ) return new UpdateDeleteField( this.entities, this.data )
    if ( option === 'yes' ) {
      await Promise.all( this.entities.map( entity => Object.assign( entity, this.data ).save() ) )
    }
    if ( option === 'no' ) console.log( 'canceled' )
  }
}

namespace Update {}

export { Update }
