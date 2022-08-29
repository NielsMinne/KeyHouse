import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";

import { BaseEntity } from "../BaseEntity";
import { IsDefined } from "class-validator";
import Property from "../Property/Property.entity";


@Entity()
export default class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column()
    name: string;

    @OneToMany(() => Property, (property) => property.category)
    properties: Property[];
}
