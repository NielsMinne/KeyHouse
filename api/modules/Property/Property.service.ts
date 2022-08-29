import { AppDataSource } from "../../database/DataSource";
import { Repository } from "typeorm";
import Property from "./Property.entity";
import { PropertyBody } from "./Property.types";
import Agency from "../Agency/Agency.entity";
import { SaleOrRent } from "./Property.constants";

export default class PropertyService {
    private propertyRepository: Repository<Property>;
    private agencyRepository: Repository<Agency>

    constructor() {
        this.propertyRepository = AppDataSource.getRepository(Property);
        this.agencyRepository = AppDataSource.getRepository(Agency);
    }

    all = async () => {
        const properties = await this.propertyRepository.find({
            relations: ["agency", "messages","category", "messages.property", "messages.user"],
            order: {
                name: "ASC",
            },
        });
        return properties;
    };

    allById = async (id:number) => {
        // don't show password
        const agency = await this.agencyRepository.findOne({where: {id} , relations: ["properties"]});
        return agency.properties;
    };

    findByRent = async () => {
        const properties = await this.propertyRepository.find({
            relations: ["agency", "messages","category", "messages.property", "messages.user"],
            where:{
                saleOrRent: SaleOrRent.Rent,
            },
            order: {
                name: "ASC",
            },
        });
        return properties;
    };

    findBySale = async () => {
        const properties = await this.propertyRepository.find({
            relations: ["agency", "messages","category", "messages.property", "messages.user"],
            where:{
                saleOrRent: SaleOrRent.Sale,
            },
            order: {
                name: "ASC",
            },
        });
        return properties;
    };



    findOne = async (id: number) => {
        const property = await this.propertyRepository.findOne({
            where: { id },
            relations: ["agency", "messages", "messages.user", "messages.property"],
        });
        return property;
    };


    create = async (body: PropertyBody) => {
        const property = await this.propertyRepository.save(
            this.propertyRepository.create(body)
        );
        return property;
    };

    update = async (id: number, body: PropertyBody) => {
        let property = await this.findOne(id);
        if (property) {
            property = await this.propertyRepository.save({
                ...property,
                ...body,
            });
        }
        return property;
    };

    delete = async (id: number) => {
        let property = await this.findOne(id);
        if (property) {
            await this.propertyRepository.softRemove(property);
        }
        return property;
    };
}
