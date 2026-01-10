import express from "express";
import BusinessController from "../Controllers/BusinessController";
import Passport from "../Middlewares/Passport";
const BusinessRouter = express.Router();
BusinessRouter.post("/", Passport.auth, BusinessController.create);
BusinessRouter.patch("/:id", Passport.auth, BusinessController.update);
BusinessRouter.get("/", BusinessController.query);
export default BusinessRouter;
