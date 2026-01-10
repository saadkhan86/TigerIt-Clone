import { Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import ICheckout from '../Interfaces/ICheckout'
import ProductModel from '../Models/Product.Model'
import UserModel from '../Models/User.Model'
import WalletRepo from './WalletRepo'

class CheckoutRepo {
  public async create(data: ICheckout.Create) {
    let totalCheckoutAmount = 0

    const productsId = data.items.map((item) => item.product)

    const products = await ProductModel.find({
      _id: { $in: productsId },
    })
    if (products.length !== productsId.length) {
      throw new ErrorHandler(404, 'One or more products not found')
    }

    const hasAdultProduct = products.some((p) => p.forAdult)
    if (hasAdultProduct) {
      const user = await UserModel.findById(data.customerId)
      if (!user || !user.isVerified) {
        throw new ErrorHandler(
          401,
          'Adult products are not allowed for this user'
        )
      }
    }
    for (const item of data.items) {
      const product = products.find(
        (p) => p._id.toString() === item.product.toString()
      )
      if (!product) continue

      const variant = product.variants.find((v) => v.title === item.title)
      if (!variant) {
        throw new ErrorHandler(
          404,
          `Variant "${item.title}" not found for product "${product.description}"`
        )
      }
      const price: number = variant.price.amount
      totalCheckoutAmount += price * item.quantity
    }

    if (data.tip) totalCheckoutAmount += data.tip
    totalCheckoutAmount += data.deliveryFee + data.serviceFee

    const userWallet = await WalletRepo.query(data.customerId)
    const userWalletAmount = userWallet?.wallet?.balance.amount ?? 0

    const checkoutResult = {
      userWalletAmount,
      totalCheckoutAmount,
      remainingBalance: userWalletAmount - totalCheckoutAmount,
    }

    return checkoutResult
  }
}

export default new CheckoutRepo()
