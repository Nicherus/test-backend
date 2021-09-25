import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

@Entity()
export class Contact extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar",
        length: 150,
    })
    name: string;

    @Column()
    email: string;

    @Column()
    phone: number;

    @Column()
    userId: string;
}