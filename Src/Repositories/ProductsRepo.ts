import { QueryFilter, Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import IProduct from '../Interfaces/IProduct'
import BusinessModel from '../Models/Business.Model'
import ProductModel from '../Models/Product.Model'
import ValidatorUtils from '../Utile/Validator.Util'

class ProductRepo {
  public async create(data: IProduct.create) {
    const business = await BusinessModel.findOne({
      businessOwner: data.createdBy,
      approvalStatus: 'approved',
    })
    if (!business) {
      throw new ErrorHandler(
        404,
        'Business Not Found OR Business Not Approved Yet'
      )
    }
    if (data.image) {
      const url = await ValidatorUtils.convertToUrl(data.image)
      if (url) {
        data.image = url
      }
    }
    const product = new ProductModel({ ...data })
    return await product.save()
  }
  public async update(pid: Types.ObjectId | string, data: IProduct.update) {
    if (!data.uid) {
      throw new ErrorHandler(400, 'User Id Required')
    }
    var product = await ProductModel.findOne({ pid, uid: data.uid })
    if (!product) {
      throw new ErrorHandler(404, 'product not found')
    }
    if (data.forAdult !== undefined) {
      product.forAdult = data.forAdult
    }
    if (data.description) {
      product.description = data.description
    }
    if (data.image) {
      const url = await ValidatorUtils.convertToUrl(data.image)
      if (url) {
        product.image = url
      }
    }
    if (data.variants) {
      product.variants = data.variants
    }

    return product.save()
  }
  public async query(data: IProduct.query) {
    var _query: QueryFilter<IProduct.Doc> = {}
    const { search, limit = 20, page = 1 } = data
    if (data.productId) {
      _query._id = data.productId
    }
    if (search && search.trim() !== '') {
      _query.$or = [
        { 'variants.title': { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }
    const products = await ProductModel.find(_query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .lean()
    return products
  }
  public async delete(data: {
    createdBy: Types.ObjectId | string
    productId: Types.ObjectId | string
  }) {
    const product = await ProductModel.findOneAndDelete({
      _id: data.productId,
      createdBy: data.createdBy,
    })

    if (!product) {
      throw new ErrorHandler(404, 'Product not found or unauthorized')
    }

    return product
  }
}
export default new ProductRepo()
