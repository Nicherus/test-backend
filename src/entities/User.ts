import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar",
        length: 150,
        unique: true,
    })
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    phone: number;

}