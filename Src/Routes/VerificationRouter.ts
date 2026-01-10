import express from 'express'
import VerificationController from '../Controllers/VerificationController'
import Passport from '../Middlewares/Passport'
const VerificationRouter = express.Router()

VerificationRouter.post('/', Passport.auth, VerificationController.create)
//admin approval for user
VerificationRouter.get(
	'/buyer',
	Passport.admin,
	VerificationController.buyerQuery
)
VerificationRouter.patch(
	'/buyer/:id',
	Passport.admin,
	VerificationController.buyerUpdate
)
//admin approval for business
VerificationRouter.get(
	'/business',
	Passport.admin,
	VerificationController.businessQuery
)
VerificationRouter.patch(
	'/business/:id',
	Passport.admin,
	VerificationController.businessUpdate
)
export default VerificationRouter
