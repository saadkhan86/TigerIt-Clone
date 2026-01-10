import type { QueryFilter, Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import IBusiness from '../Interfaces/IBusiness'
import IUser from '../Interfaces/IUser'
import IWishList from '../Interfaces/IWishList'
import BusinessModel from '../Models/Business.Model'
import UserModel from '../Models/User.Model'
import WishListModel from '../Models/WishList.Model'

class WishListRepo {
  public async create(data: {
    userId: Types.ObjectId | string
    businessId: Types.ObjectId | string
  }) {
    var checkUser: IUser.Doc | null
    var checkBusiness: IBusiness.Doc | null
    checkUser = await UserModel.findById(data.userId)
    if (!checkUser) {
      throw new ErrorHandler(404, 'User Not Found')
    }
    checkBusiness = await BusinessModel.findById(data.businessId)
    if (!checkBusiness) {
      throw new ErrorHandler(404, 'Business Not Found')
    }
    const wish = await WishListModel.create({
      uid: data.userId,
      bid: data.businessId,
    })
    return wish
  }
  public async query(data: IWishList.query) {
    const _query: QueryFilter<IWishList.Doc> = {}
    if (data.id) {
      _query._id = data.id
    }
    if (data.userId) {
      _query.uid = data.userId
    }
    if (data.businessId) {
      _query.bid = data.businessId
    }
    let limit = data.limit || 10
    let page = data.page || 1
    let skip = (page - 1) * limit

    return await WishListModel.find(_query)
      .skip(skip)
      .limit(limit)
      .populate(_query.uid ? 'uid' : 'bid')
      .sort({ createdAt: -1 })
      .lean()
  }
  public async delete(businessId: Types.ObjectId | string) {
    return await WishListModel.findByIdAndDelete(businessId)
  }
}
export default new WishListRepo()
