import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity( 'users' )
export class User {
  @PrimaryGeneratedColumn() id: string
  @Column( { name: 'first_name' } ) firstName: string
  @Column( { name: 'last_name' } ) lastName: string
  @Column() email: string
  @Column( 'timestamp', { name: 'birth_date' } ) birthDate: Date
}
