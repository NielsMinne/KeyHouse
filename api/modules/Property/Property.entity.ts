import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Agency from "../Agency/Agency.entity";
import { IsDefined } from "class-validator";
import { SaleOrRent, SoldOrAvailable } from "./Property.constants";
import Message from "../Message/Message.entity";
import Category from "../Categories/Categories.entity";



@Entity()
export default class Property extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined()
    @Column()
    name: string;

    @IsDefined()
    @Column()
    address: string;

    @IsDefined()
    @Column()
    city: string;

    @IsDefined()
    @Column()
    price: number;

    @IsDefined()
    @Column()
    rooms: number;

    @IsDefined()
    @Column()
    bathrooms: number;

    @IsDefined()
    @Column()
    year: string;

    
    @IsDefined()
    @Column()
    square: number;

    @Column({
        nullable:true,
        type: "enum",
        enum: SoldOrAvailable,
    })
    soldOrAvailable: SoldOrAvailable;
    
    @Column({
        type: "enum",
        enum: SaleOrRent,
    })
    saleOrRent: SaleOrRent;


    @Column({ nullable: true })
    avatar: string;

    @ManyToOne(() => Agency, (agency) => agency.properties)
    agency: Agency;

    @ManyToOne(() => Category, (category) => category.properties)
    category: Category;

    @OneToMany(() => Message, (message) => message.property, {
        cascade: true,
    })
    messages: Message[];

    // @OneToMany(() => Favorite, (favorite) => favorite.property, {
    //     cascade: true,
    // })
    // favorites: Favorite[];
}
