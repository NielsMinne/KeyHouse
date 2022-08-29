import {
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

import { BaseEntity } from "../BaseEntity";
import { IsDefined } from "class-validator";
import Property from "../Property/Property.entity";
import User from "../User/User.entity";


@Entity()
export default class Favorite extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => User, (user) => user.favorites)
    // user: User;

    // @ManyToOne(() => Property, (property) => property.favorites)
    // property: Property;

}
