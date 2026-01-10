import { PipelineStage, QueryFilter, Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import { IOrder } from '../Interfaces/IOrder'
import OrderModel from '../Models/Order.Model'
import ProductModel from '../Models/Product.Model'
import UserModel from '../Models/User.Model'
import WalletRepo from './WalletRepo'

class OrderRepo {
  public async create(data: IOrder.Create) {
    var totalPrice: number = 0
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
          400,
          `Variant "${item.title}" not found for product "${product.title}"`
        )
      }
      item.price = variant.price.amount
      totalPrice += item.price
    }
    if (data.tip) {
      totalPrice += data.tip
    }
    totalPrice += data.serviceFee + data.deliveryFee
    const userWallet = await WalletRepo.query(data.customerId)
    const userWalletAmount = userWallet?.wallet?.balance.amount
    if (userWalletAmount === undefined || totalPrice > userWalletAmount) {
      throw new ErrorHandler(400, 'Insuficient Balance')
    }
    const order = new OrderModel({
      customer: data.customerId,
      deliveryFee: data.deliveryFee,
      serviceFee: data.serviceFee,
      tip: data.tip ? data.tip : 0,
      items: data.items,
    })

    return await order.save()
  }

  public async query(data: IOrder.query) {
    let _query: QueryFilter<IOrder.Doc> = {}

    if (data.customer) {
      _query.user = data.customer
    }

    if (data.status) {
      _query.status = data.status
    }
    let limit = data.limit || 10
    let page = data.page || 1
    let skip = (page - 1) * limit

    return await OrderModel.find(_query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
  }
}

export default new OrderRepo()
