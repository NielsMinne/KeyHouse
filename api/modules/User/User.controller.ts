import { NextFunction, Request, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import AgencyService from "../Agency/Agency.service";
import UserService from "./User.service";
import { UserBody } from "./User.types";

export default class UserController {
    private userService: UserService;
    private agencyService: AgencyService;

    constructor() {
        this.userService = new UserService();
        this.agencyService = new AgencyService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        // don't show password
        const users = await this.userService.all();
        return res.json(users);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const user = await this.userService.findOneBy({ id: req.params.id });
        if (!user) {
            next(new NotFoundError());
        }
        return res.json(user);
    };

    findAllById = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const users = await this.userService.allById(parseInt(req.params.id));
        if (!users) {
            next(new NotFoundError());
        }
        return res.json(users);
    };

    findCurrentUser = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        const user = await this.userService.findOne(req.user.id);
        if (!user) {
            next(new NotFoundError());
        }
        return res.json(user);
    };

    create = async (
        req: AuthRequest<{}, {}, UserBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        if (body.agencyId) {
            body.agency = await this.agencyService.findOne(body.agencyId);
        }
        const user = await this.userService.create(req.body);
        return res.json(user);
    };

    update = async (
        req: AuthRequest<{ id: string }, {}, UserBody>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.userService.update(
                parseInt(req.params.id),
                req.body
            );
            if (!user) {
                next(new NotFoundError());
            }
            return res.json(user);
        } catch (err) {
            next(err);
        }
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.userService.delete(parseInt(req.params.id));
            if (!user) {
                next(new NotFoundError());
            }
            return res.json({});
        } catch (err) {
            next(err);
        }
    };
}
