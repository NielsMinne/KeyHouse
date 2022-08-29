import { IsDefined } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Property from "../Property/Property.entity";
import User from "../User/User.entity";

@Entity()
export default class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column()
    description: string;

    @IsDefined({ always: true })
    @Column("date")
    date: string;

    @IsDefined({ always: true })
    @Column("int")
    time: number;

    @ManyToOne(() => Property, (property) => property.messages)
    property: Property;

    @ManyToOne(() => User, (user) => user.messages)
    user: User;
}
