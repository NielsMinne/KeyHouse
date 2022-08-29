import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import PropertyService from "../Property/Property.service";
import UserService from "../User/User.service";
import MessageService from "./Message.service";
import { MessageBody } from "./Message.types";

export default class MessageController {
    private messageService: MessageService;
    private propertyService: PropertyService;
    private userService: UserService;

    constructor() {
        this.messageService = new MessageService();
        this.propertyService = new PropertyService();
        this.userService = new UserService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const messages = req.user.isAdmin()
            ? await this.messageService.all()
            : await this.messageService.allForUser(req.user.id);
        return res.json(messages);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const message = req.user.isAdmin()
            ? await this.messageService.findOne(parseInt(req.params.id))
            : await this.messageService.findOneForUser(
                  parseInt(req.params.id),
                  req.user.id
              );
        if (!message) {
            next(new NotFoundError());
            return;
        }
        return res.json(message);
    };

    create = async (
        req: AuthRequest<{}, {}, MessageBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        if (!req.user.isAdmin()) {
            body.userId = req.user.id;
        }
        // check relations
        if (body.userId) {
            body.user = await this.userService.findOne(body.userId);
        }
        if (body.projectId) {
            body.property = await this.propertyService.findOne(body.projectId);
        }
        // create project
        const message = await this.messageService.create(body);
        return res.json(message);
    };

    update = async (
        req: AuthRequest<{ id: string }, {}, MessageBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        if (!req.user.isAdmin()) {
            body.userId = req.user.id;
        }
        // check relations
        if (body.userId) {
            body.user = await this.userService.findOne(body.userId);
        }
        if (body.projectId) {
            body.property = await this.propertyService.findOne(body.projectId);
        }
        // update project
        const message = req.user.isAdmin()
            ? await this.messageService.update(parseInt(req.params.id), body)
            : await this.messageService.updateForUser(
                  parseInt(req.params.id),
                  body,
                  req.user.id
              );
        if (!message) {
            next(new NotFoundError());
            return;
        }
        return res.json(message);
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const message = req.user.isAdmin()
            ? await this.messageService.delete(parseInt(req.params.id))
            : await this.messageService.deleteForUser(
                  parseInt(req.params.id),
                  req.user.id
              );
        if (!message) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };
}
