import express from 'express'
import ProductController from '../Controllers/ProductController'
import Passport from '../Middlewares/Passport'
const ProductRouter = express.Router()

ProductRouter.post('/', Passport.auth, ProductController.create)
ProductRouter.get('/', ProductController.query)
ProductRouter.patch('/:id', Passport.auth, ProductController.update)
ProductRouter.delete('/:id', Passport.auth, ProductController.delete)
export default ProductRouter
