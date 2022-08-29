import "reflect-metadata";
import { DataSource } from "typeorm";
import Agency from "../modules/Agency/Agency.entity";
import Category from "../modules/Categories/Categories.entity";
import Favorite from "../modules/Favorite/Favorite.entity";
import Message from "../modules/Message/Message.entity";
import Project from "../modules/Property/Property.entity";
import User from "../modules/User/User.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Agency, User, Project, Message, Category], //favorite (issue)
    migrations: [],
    subscribers: [],
    ...(process.env.ENV === "production"
        ? {
              ssl: {
                  rejectUnauthorized: false,
              },
          }
        : {}),
});
