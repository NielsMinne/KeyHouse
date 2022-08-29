import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { UPLOAD_FOLDER } from "../../constants";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import AgencyService from "../Agency/Agency.service";
import CategoryService from "../Categories/Categories.service";
import PropertyService from "./Property.service";
import { PropertyBody } from "./Property.types";

const getAvatar = (req: Request) => {
    if (req.files.avatar) {
        const avatar: UploadedFile = Array.isArray(req.files.avatar)
            ? req.files.avatar[0]
            : req.files.avatar;
        const path = `${UPLOAD_FOLDER}/${new Date().getTime()}_${avatar.name}`;
        avatar.mv(path);
        return path;
    }
    return null;
};

export default class PropertyController {
    private propertyService: PropertyService;
    private agencyService: AgencyService;
    private categoryService: CategoryService;

    constructor() {
        this.propertyService = new PropertyService();
        this.agencyService = new AgencyService();
        this.categoryService = new CategoryService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        // don't show password
        const properties = await this.propertyService.all();
        return res.json(properties);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const property = await this.propertyService.findOne(
            parseInt(req.params.id)
        );
        if (!property) {
            next(new NotFoundError());
            return;
        }
        return res.json(property);
    };

    findByRent= async (req: AuthRequest, res: Response, next: NextFunction) => {
        // don't show password
        const properties = await this.propertyService.findByRent();
        return res.json(properties);
    };

    findBySale= async (req: AuthRequest, res: Response, next: NextFunction) => {
        // don't show password
        const properties = await this.propertyService.findBySale();
        return res.json(properties);
    };


    findAllById = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const properties = await this.propertyService.allById(parseInt(req.params.id));
        if (!properties) {
            next(new NotFoundError());
        }
        return res.json(properties);
    };

    create = async (
        req: Request<{}, {}, PropertyBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        // check if clientId is passed, if so find client
        if (body.agencyId) {
            body.agency = await this.agencyService.findOne(body.agencyId);
        }
        if (body.categoryId){
            body.category = await this.categoryService.findOne(body.categoryId);
        }

        const avatar = getAvatar(req);
        if (avatar) {
            req.body.avatar = avatar;
        }
        // create project
        const property = await this.propertyService.create(body);
        return res.json(property);
    };

    update = async (
        req: Request<{ id: string }, {}, PropertyBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        // check if clientId is passed, if so find client
        if (body.agencyId) {
            body.agency = await this.agencyService.findOne(body.agencyId);
        }
        // update project
        const property = await this.propertyService.update(
            parseInt(req.params.id),
            body
        );
        if (!property) {
            next(new NotFoundError());
            return;
        }
        return res.json(property);
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const property = await this.propertyService.delete(
            parseInt(req.params.id)
        );
        if (!property) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };
}
