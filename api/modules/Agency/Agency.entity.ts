import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Property from "../Property/Property.entity";
import { IsDefined, IsEmail } from "class-validator";
import User from "../User/User.entity";

@Entity()
export default class Agency extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column()
    name: string;

    @IsDefined({ always: true })
    @IsEmail(undefined, { always: true })
    @Column()
    email: string;

    @IsDefined({ always: true })
    @Column()
    address: string;

    @IsDefined({ always: true })
    @Column()
    city: string;

    @IsDefined({ always: true })
    @Column()
    phone: string;

    @Column({ nullable: true })
    avatar: string;

    @OneToMany(() => Property, (property) => property.agency, {
        cascade: true,
    })
    properties: Property[];

    @OneToMany(() => User, (user) => user.agency, {
        cascade: true,
    })
    users: User[];
}
