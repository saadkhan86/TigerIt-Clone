import express from 'express'
import PaymentController from '../Controllers/TransactionController'
import Passport from '../Middlewares/Passport'
const TransactionRouter = express.Router()

TransactionRouter.post(
	'/create-payment',
	Passport.auth,
	PaymentController.create
)
TransactionRouter.get('/transactions', Passport.auth, PaymentController.query)
export default TransactionRouter
