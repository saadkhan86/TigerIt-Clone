import express from 'express'
import BusinessRouter from './BusinessRouter'
import CheckoutRouter from './CheckoutRouter'
import OrderRouter from './OrderRouter'
import ProductRouter from './ProductsRouter'
import TransactionRouter from './TransactionRouter'
import UserRouter from './ProfileRouter'
import VerificationRouter from './VerificationRouter'
import WalletRouter from './WalletRouter'
import WishListRouter from './WishListRouter'
const Router = express.Router()
Router.use('/api/v1/profile', UserRouter)
Router.use('/api/v1/product', ProductRouter)
Router.use('/api/v1/wishList', WishListRouter)
Router.use('/api/v1/checkout', CheckoutRouter)
Router.use('/api/v1/order', OrderRouter)
Router.use('/api/v1/business', BusinessRouter)
Router.use('/api/v1/wallet', WalletRouter)
Router.use('/api/v1/verification', VerificationRouter)
Router.use('/api/v1/verification/admin', VerificationRouter)
Router.use('/api/v1/transactions', TransactionRouter)
export default Router
