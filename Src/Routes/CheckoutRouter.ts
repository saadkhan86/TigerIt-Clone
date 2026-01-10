import express from 'express'
import CheckoutController from '../Controllers/CheckoutController'
import Passport from '../Middlewares/Passport'
const CheckoutRouter = express.Router()
CheckoutRouter.use(Passport.auth)
CheckoutRouter.post('/', CheckoutController.create)
export default CheckoutRouter
