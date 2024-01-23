import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "./event.entity";

@Entity({name: 'user'})
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 20 })
    username: string;

    @Column({ type: 'text' })
    email: string;

    @Column({ type: 'text' })
    phone: string;

    @Column({select: false, type: 'text'})
    password: string;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @CreateDateColumn({ type: 'datetime' })
    updatedAt: Date;

    @OneToMany(() => EventEntity, (event) => event.author)
    events: EventEntity[];


}