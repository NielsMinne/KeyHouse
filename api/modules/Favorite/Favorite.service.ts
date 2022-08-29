// import { AppDataSource } from "../../database/DataSource";
// import { Repository } from "typeorm";
// import Agency from "../Agency/Agency.entity";
// import Favorite from "./Favorite.entity";
// import { FavoriteBody } from "./Favorite.types";
// import { userInfo } from "os";

// export default class FavoriteService {
//     private favoriteRepository: Repository<Favorite>;


//     constructor() {
//         this.favoriteRepository = AppDataSource.getRepository(Favorite);
        
//     }

//     all = async () => {
//         const favorites = await this.favoriteRepository.find({
//             relations: ["property", "user"],
//         });
//         return favorites;
//     };

//     findAllById = async (id: number) => {
//         const favorites = await this.favoriteRepository.find({
//             relations: ["property", "user"],
//             where: { }
//         });
//         return favorites;
//     }

//     findOne = async (id: number) => {
//         const favorite = await this.favoriteRepository.findOne({
//             relations:["property","user"],
//             where: {  },
//         });
//         return favorite;
//     };

//     create = async (body: FavoriteBody) => {
//         const favorite = await this.favoriteRepository.save(
//             this.favoriteRepository.create(body)
//         );
//         return favorite;
//     };

//     update = async (id: number, body: FavoriteBody) => {
//         let favorite = await this.findOne(id);
//         if (favorite) {
//             favorite = await this.favoriteRepository.save({
//                 ...favorite,
//                 ...body,
//             });
//         }
//         return favorite;
//     };

//     delete = async (id: number) => {
//         let favorite = await this.findOne(id);
//         if (favorite) {
//             await this.favoriteRepository.softRemove(favorite);
//         }
//         return favorite;
//     };
// }
