import express from 'express'
import WishListController from '../Controllers/WishListController'
import Passport from '../Middlewares/Passport'
const WishListRouter = express.Router()
WishListRouter.use(Passport.auth)
WishListRouter.post('/:id', WishListController.create)
WishListRouter.get('/', WishListController.query)
WishListRouter.delete('/:id', WishListController.delete)

export default WishListRouter
