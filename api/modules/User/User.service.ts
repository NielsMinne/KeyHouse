import { AppDataSource } from "../../database/DataSource";
import User from "./User.entity";
import { Repository } from "typeorm";
import { UserBody } from "./User.types";
import Agency from "../Agency/Agency.entity";

export default class UserService {
    private repository: Repository<User>;
    private agencyRepository: Repository<Agency>;

    constructor() {
        const repository = AppDataSource.getRepository(User);
        this.repository = repository;
        this.agencyRepository = AppDataSource.getRepository(Agency)
    }

    all = async () => {
        // don't show password
        const users = await this.repository.find({relations: ["agency"]});
        return users;
    };

    allById = async (id:number) => {
        // don't show password
        const agency = await this.agencyRepository.findOne({where: {id} , relations: ["users"]});
        return agency.users;
    };

    findOne = async (id: number) => {
        const user = await this.repository.findOne({ where: {id} , relations: ["agency"]});
        return user;
    };

    findOneBy = async (options: object) => {
        const user = await this.repository.findOneBy(options);
        return user;
    };

    findByEmailWithPassword = async (email: string) => {
        const user = await this.repository
            .createQueryBuilder("user")
            .where("user.email = :email", { email })
            .select("user.password")
            .getOne();
        return user;
    };

    create = async (body: UserBody) => {
        const user = await this.repository.save(this.repository.create(body));
        return user;
    };

    update = async (id: number, body: UserBody) => {
        let user = await this.findOne(id);
        if (user) {
            user = await this.repository.save({ ...user, ...body });
        }
        return user;
    };

    delete = async (id: number) => {
        let user = await this.findOne(id);
        if (user) {
            await this.repository.softDelete({ id });
        }
        return user;
    };
}
