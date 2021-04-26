import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
class User {
  @PrimaryGeneratedColumn( 'uuid' ) id: string

  @Column() name: string
  @Column() email: string

  @CreateDateColumn( { type: 'timestamp with time zone' } ) createdAt: Date
  @UpdateDateColumn( { type: 'timestamp with time zone' } ) updatedAt: Date
  @DeleteDateColumn( { type: 'timestamp with time zone' } ) deletedAt: Date
}

export { User }
