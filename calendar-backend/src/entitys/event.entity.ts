// src/events/event.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @ManyToOne(() => UserEntity, (user) => user.events)
  author: UserEntity;

  @ManyToMany(() => UserEntity, { cascade: true })
  @JoinTable()
  guests: UserEntity[];
}