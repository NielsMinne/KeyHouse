import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { UPLOAD_FOLDER } from "../../constants";
import NotFoundError from "../../errors/NotFoundError";
import AgencyService from "./Agency.service";
import { AgencyBody } from "./Agency.types";

// if avatar passed, move to uploads folder and save path
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

export default class AgencyController {
    private agencyService: AgencyService;

    constructor() {
        this.agencyService = new AgencyService();
    }

    all = async (req: Request, res: Response, next: NextFunction) => {
        const agencies = await this.agencyService.all();
        return res.json(agencies);
    };

    find = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const agency = await this.agencyService.findOne(
            parseInt(req.params.id)
        );
        if (!agency) {
            next(new NotFoundError());
            return;
        }
        return res.json(agency);
    };

    create = async (
        req: Request<{}, {}, AgencyBody>,
        res: Response,
        next: NextFunction
    ) => {
        const avatar = getAvatar(req);
        if (avatar) {
            req.body.avatar = avatar;
        }
        const agency = await this.agencyService.create(req.body);
        return res.json(agency);
    };

    update = async (
        req: Request<{ id: string }, {}, AgencyBody>,
        res: Response,
        next: NextFunction
    ) => {
        const avatar = getAvatar(req);
        if (avatar) {
            req.body.avatar = avatar;
        }
        const agency = await this.agencyService.update(
            parseInt(req.params.id),
            req.body
            );
        
        if (!agency) {
            next(new NotFoundError());
            return;
        }
        return res.json(agency);
    };

    delete = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const agency = await this.agencyService.delete(parseInt(req.params.id));
        if (!agency) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };
}
