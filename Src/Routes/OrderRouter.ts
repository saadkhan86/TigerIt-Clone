import express, { type Request, type Response } from "express";
import Passport from "../Middlewares/Passport";
import OrderController from "../Controllers/OrderController";
const OrderRouter = express.Router();
OrderRouter.use(Passport.auth);
OrderRouter.post("/", OrderController.create);
OrderRouter.get("/", OrderController.query);
export default OrderRouter;
