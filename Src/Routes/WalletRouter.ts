import express from "express";
import WalletController from "../Controllers/WalletController";
import Passport from "../Middlewares/Passport";
const WalletRouter = express.Router();
WalletRouter.get("/", Passport.auth,WalletController.query);
export default WalletRouter;
