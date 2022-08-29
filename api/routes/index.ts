import { NextFunction, Request, Response, Router } from "express";
import * as express from "express";
import NotFoundError from "../errors/NotFoundError";
import { authJwt, authLocal, withRole } from "../middleware/auth";
import AuthController from "../modules/User/Auth.controller";
import { UserRole } from "../modules/User/User.constants";
import UserController from "../modules/User/User.controller";
import * as path from "path";
import AgencyController from "../modules/Agency/Agency.controller";
import PropertyController from "../modules/Property/Property.controller";
import CategoryController from "../modules/Categories/Categories.controller";
import MessageController from "../modules/Message/Message.controller";

// catch error since Express doesn't catch errors in async functions
// this will catch the controller method + will send the error through next() method
// this way we don't have to do try/catch in every controller method
const useMethod =
    (func: (req: any, res: Response, next: NextFunction) => Promise<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next);
        } catch (err) {
            next(err);
        }
    };

const registerOnboardingRoutes = (router: Router) => {
    const authController = new AuthController();
    router.post("/login", authLocal, useMethod(authController.login));

    const userController = new UserController();
    router.post("/register", useMethod(userController.create));

    router.get('/', (req,res) => res.send('Welcome to the API'));
};

const registerAdminRoutes = (router: Router) => {
    const adminRouter = Router();


    const userController = new UserController();
    adminRouter.get("/users/:id", useMethod(userController.find));
    adminRouter.post("/users", useMethod(userController.create));
    adminRouter.patch("/users/:id", useMethod(userController.update));
    adminRouter.delete("/users/:id", useMethod(userController.delete));

    const agencyController = new AgencyController();
    adminRouter.post("/agencies", useMethod(agencyController.create));
    
    const categoryController = new CategoryController();
    adminRouter.get("/categories", useMethod(categoryController.all));
    adminRouter.post("/categories", useMethod(categoryController.create));
    adminRouter.get("/categories/:id", useMethod(categoryController.find));
    adminRouter.patch("/categories/:id", useMethod(categoryController.update));
    adminRouter.delete("/categories/:id", useMethod(categoryController.delete));

    router.use(withRole(UserRole.Admin), adminRouter);
};

const registerAuthenticatedRoutes = (router: Router) => {
    const authRouter = Router();

    const userController = new UserController();
    authRouter.get("/users", useMethod(userController.all));
    authRouter.get("/user/:id", useMethod(userController.find));
    authRouter.get("/currentUser", useMethod(userController.findCurrentUser));
    authRouter.get("/agencyUsers/:id", useMethod(userController.findAllById));
    authRouter.get("/agent/:id", useMethod(userController.find));
    authRouter.post("/users", useMethod(userController.create));
    authRouter.patch("/user/:id", useMethod(userController.update));
    
    const agencyController = new AgencyController();
    authRouter.get("/agencies", useMethod(agencyController.all));
    authRouter.get("/agencies/:id", useMethod(agencyController.find));
    authRouter.patch("/agencies/:id", useMethod(agencyController.update));
    authRouter.delete("/agencies/:id", useMethod(agencyController.delete));

    
    const propertyController = new PropertyController();
    authRouter.get("/agencyProperty/:id", useMethod(propertyController.findAllById));
    authRouter.get("/agencyProperty/detail/:id", useMethod(propertyController.find));
    authRouter.get("/properties", useMethod(propertyController.all));
    authRouter.get("/properties/:id", useMethod(propertyController.find));
    authRouter.post("/properties", useMethod(propertyController.create));
    authRouter.patch("/properties/:id", useMethod(propertyController.update));
    authRouter.delete("/properties/:id", useMethod(propertyController.delete));

    const messageController = new MessageController();
    authRouter.get("/messages", useMethod(messageController.all));
    authRouter.get("/messages/:id", useMethod(messageController.find));
    authRouter.post("/messages", useMethod(messageController.create));
    authRouter.patch("/messages/:id", useMethod(messageController.update));
    authRouter.delete("/messages/:id", useMethod(messageController.delete));

    const categoryController = new CategoryController();
    authRouter.get("/categories", useMethod(categoryController.all));

    registerAdminRoutes(authRouter);

    // authenticated routes use authJWT
    router.use(authJwt, authRouter);
};

const registerRoutes = (app: Router) => {
    // public folder
    app.use("/public", express.static(path.resolve(__dirname, "../public")));
    
    const propertyController = new PropertyController();
    app.get("/properties/rent", useMethod(propertyController.findByRent));
    app.get("/properties/sale", useMethod(propertyController.findBySale));
    app.get("/properties/detail/:id", useMethod(propertyController.find));

    // const favoriteController = new FavoriteController();
    // app.post("/favorites",useMethod(favoriteController.create));
    // app.get("/favorites/:id",useMethod(favoriteController.findAllById));
    // app.delete("/favorites/:id",useMethod(favoriteController.delete));
    // onboarding routes (login, ...)
    registerOnboardingRoutes(app);

    // authenticated routes (authentication required)
    registerAuthenticatedRoutes(app);

    // fallback route, return our own 404 instead of default
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new NotFoundError());
    });
};

export { registerRoutes };
