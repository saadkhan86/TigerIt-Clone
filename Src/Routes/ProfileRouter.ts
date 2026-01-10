import express from "express";
import Passport from "../Middlewares/Passport";
import UserController from "../Controllers/UserController";
const UserRouter = express.Router();
UserRouter.use(Passport.auth);
UserRouter.get("/", UserController.query);
UserRouter.patch("/:id", UserController.update);
export default UserRouter;
