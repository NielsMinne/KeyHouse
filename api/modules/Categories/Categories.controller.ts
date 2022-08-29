import { NextFunction, Request, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import CategoryService from "./Categories.service";
import { CategoryBody } from "./Categories.types";

export default class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        // don't show password
        const categories = await this.categoryService.all();
        return res.json(categories);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const category = await this.categoryService.findOneBy({ id: req.params.id });
        if (!category) {
            next(new NotFoundError());
        }
        return res.json(category);
    };

    create = async (
        req: AuthRequest<{}, {}, CategoryBody>,
        res: Response,
        next: NextFunction
    ) => {
        const category = await this.categoryService.create(req.body);
        return res.json(category);
    };

    update = async (
        req: AuthRequest<{ id: string }, {}, CategoryBody>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const category = await this.categoryService.update(
                parseInt(req.params.id),
                req.body
            );
            if (!category) {
                next(new NotFoundError());
            }
            return res.json(category);
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
            const category = await this.categoryService.delete(parseInt(req.params.id));
            if (!category) {
                next(new NotFoundError());
            }
            return res.json({});
        } catch (err) {
            next(err);
        }
    };
}
