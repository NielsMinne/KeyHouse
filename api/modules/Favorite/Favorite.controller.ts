// import { NextFunction, Request, Response } from "express";
// import NotFoundError from "../../errors/NotFoundError";
// import { AuthRequest } from "../../middleware/auth/auth.types";
// import PropertyService from "../Property/Property.service";
// import UserService from "../User/User.service";
// import FavoriteService from "./Favorite.service";
// import { FavoriteBody } from "./Favorite.types";



// export default class FavoriteController {
//     private favoriteService: FavoriteService;
//     private userService: UserService;
//     private propertyService: PropertyService;

//     constructor() {
//         this.favoriteService = new FavoriteService();
//         this.userService = new UserService();
//         this.propertyService = new PropertyService();
//     }

//     all = async (req: AuthRequest, res: Response, next: NextFunction) => {
//         // don't show password
//         const favorites = await this.favoriteService.all();
//         return res.json(favorites);
//     };

//     findAllById = async (
//         req: AuthRequest<{ id: string }>,
//         res: Response,
//         next: NextFunction
//     ) => {
//         const favorites = await this.favoriteService.findAllById(parseInt(req.params.id));
//         if (!favorites) {
//             next(new NotFoundError());
//         }
//         return res.json(favorites);
//     };

//     find = async (
//         req: AuthRequest<{ id: string }>,
//         res: Response,
//         next: NextFunction
//     ) => {
//         const favorite = await this.favoriteService.findOne(
//             parseInt(req.params.id)
//         );
//         if (!favorite) {
//             next(new NotFoundError());
//             return;
//         }
//         return res.json(favorite);
//     };

//     create = async (
//         req: Request<{}, {}, FavoriteBody>,
//         res: Response,
//         next: NextFunction
//     ) => {
//         const { body } = req;

//         if(body.userId){
//             body.user = await this.userService.findOne(body.userId);
//         }

//         if(body.propertyId){
//             body.property = await this.propertyService.findOne(body.propertyId);
//         }
//         // check if clientId is passed, if so find client
//         // create project
//         const favorite = await this.favoriteService.create(body);
//         return res.json(favorite);
//     };

//     update = async (
//         req: Request<{ id: string }, {}, FavoriteBody>,
//         res: Response,
//         next: NextFunction
//     ) => {
//         const { body } = req;
    
//         const favorite = await this.favoriteService.update(
//             parseInt(req.params.id),
//             body
//         );
//         if (!favorite) {
//             next(new NotFoundError());
//             return;
//         }
//         return res.json(favorite);
//     };

//     delete = async (
//         req: AuthRequest<{ id: string }>,
//         res: Response,
//         next: NextFunction
//     ) => {
//         const favorite = await this.favoriteService.delete(
//             parseInt(req.params.id)
//         );
//         if (!favorite) {
//             next(new NotFoundError());
//             return;
//         }
//         return res.json({});
//     };
// }
