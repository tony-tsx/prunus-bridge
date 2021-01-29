import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity( { name: 'users' } )
export class User {
  @PrimaryGeneratedColumn( 'uuid' ) id: string

  @Column( { name: 'first_name' } ) firstName: string

  @Column( { name: 'last_name' } ) lastName: string

  @Column( { unique: true } ) email: string

  @Column() password: string

  @Column( { name: 'birth_date' } ) birthDate: Date

  @CreateDateColumn( { name: 'created_at' } ) createdAt: Date

  @UpdateDateColumn( { name: 'updated_at' } ) updatedAt: Date

  @DeleteDateColumn( { name: 'deleted_at' } ) deletedAt: Date
}
