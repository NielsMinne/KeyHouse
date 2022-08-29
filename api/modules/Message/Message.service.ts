import { AppDataSource } from "../../database/DataSource";
import { Repository } from "typeorm";
import { MessageBody } from "./Message.types";
import Message from "./Message.entity";

export default class MessageService {
    private messageRepository: Repository<Message>;

    constructor() {
        this.messageRepository = AppDataSource.getRepository(Message);
    }

    all = async () => {
        const messages = await this.messageRepository.find({
            relations: ["user", "property"],
            order: { date: "ASC" },
        });
        return messages;
    };

    allForUser = async (userId: number) => {
        const messages = await this.messageRepository.find({
            relations: ["user", "property"],
            where: { user: { id: userId } },
            order: { date: "ASC" },
        });
        return messages;
    };

    findOne = async (id: number) => {
        const message = await this.messageRepository.findOne({
            where: { id },
            relations: ["user", "property"],
        });
        return message;
    };

    findOneForUser = async (id: number, userId: number) => {
        const message = await this.messageRepository.findOne({
            where: { id, user: { id: userId } },
            relations: ["user", "property"],
        });
        return message;
    };

    create = async (body: MessageBody) => {
        const message = await this.messageRepository.save(
            this.messageRepository.create(body)
        );
        return message;
    };

    update = async (id: number, body: MessageBody) => {
        let message = await this.findOne(id);
        if (message) {
            message = await this.messageRepository.save({
                ...message,
                ...body,
            });
        }
        return message;
    };

    updateForUser = async (id: number, body: MessageBody, userId: number) => {
        let message = await this.findOneForUser(id, userId);
        if (message) {
            message = await this.messageRepository.save({
                ...message,
                ...body,
            });
        }
        return message;
    };

    delete = async (id: number) => {
        let message = await this.findOne(id);
        if (message) {
            await this.messageRepository.softRemove(message);
        }
        return message;
    };

    deleteForUser = async (id: number, userId: number) => {
        let message = await this.findOneForUser(id, userId);
        if (message) {
            await this.messageRepository.softRemove(message);
        }
        return message;
    };
}
