import mongoose, { PipelineStage, QueryFilter, Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import IBusiness from '../Interfaces/IBusiness'
import IVerification from '../Interfaces/IVerification'
import BusinessModel from '../Models/Business.Model'
import UserModel from '../Models/User.Model'
import VerificationModel from '../Models/Verification.Model'
import ValidatorUtils from '../Utile/Validator.Util'

class VerificationRepo {
  public async create(data: IVerification.create) {
    const user = await UserModel.findById(data.user)
    if (!user) {
      throw new ErrorHandler(404, 'User Not Found')
    }
    data.user = user._id
    if (data.docFrontImage && data.docBackImage) {
      var url = await ValidatorUtils.convertToUrl(data.docFrontImage)
      if (url) {
        data.docFrontImage = url
      }
      url = await ValidatorUtils.convertToUrl(data.docBackImage)
      if (url) {
        data.docBackImage = url
      }
    }
    const verification = await VerificationModel.create(data)
    return verification
  }
  public async buyerUpdate(id: Types.ObjectId | string, query: string) {
    var user: any = {}
    var verification: any = {}
    verification = await VerificationModel.findById(id)
    if (!id || !verification) {
      throw new ErrorHandler(
        404,
        'Either a wrong verification id or user not found'
      )
    }
    if (query === 'approved') {
      verification = await VerificationModel.findByIdAndUpdate(
        id,
        { status: 'approved' },
        { new: true }
      ).populate('User')
      user = await UserModel.findByIdAndUpdate(
        verification.user._id,
        { isVerified: true },
        { new: true }
      )
    }
    if (query === 'rejected') {
      verification = await VerificationModel.findByIdAndUpdate(
        id,
        { status: 'rejected' },
        { new: true }
      ).populate('User')
    }
    return verification
  }
  public async buyerQuery(data: IVerification.buyerQuery) {
    const _query: QueryFilter<IVerification.Doc> = {}
    const { limit = 20, page = 1 } = data
    if (data.approvalStatus) {
      _query.approvalStatus = data.approvalStatus
    }
    if (data.user) {
      _query.user = data.user
    }
    const verifications = await VerificationModel.find(_query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean()
    return verifications
  }
  public async businessUpdate(
    businessId: Types.ObjectId | string,
    status: 'pending' | 'approved' | 'rejected'
  ) {
    var business: IBusiness.Doc | null
    business = await BusinessModel.findById(businessId)
    if (!business) {
      throw new ErrorHandler(404, 'Business Not Found')
    }
    business.approvalStatus = status
    return await business.save()
  }
  public async businessQuery(data: IVerification.businessQuery) {
    var _query: QueryFilter<IBusiness.Doc> = {}
    if (data.search) {
      _query.$or = [
        { approvalStatus: { $regex: data.search, $options: 'i' } },
        { businessName: { $regex: data.search, $options: 'i' } },
        { businessEmail: { $regex: data.search, $options: 'i' } },
      ]
    }
    if (data.businessOwner) {
      let cid =
        typeof data.businessOwner === 'string'
          ? new mongoose.Types.ObjectId(data.businessOwner)
          : data.businessOwner
      _query.customer = cid
    }

    if (data.approvalStatus) {
      _query.approvalStatus = data.approvalStatus
    }

    if (data.businessName) {
      _query.businessName = data.businessName
    }
    if (data.businessEmail) {
      _query.businessEmail = data.businessEmail
    }

    let limit = data.limit || 100
    let page = data.page || 1
    let skip = (page - 1) * limit

    return await BusinessModel.find(_query)
  }
}

export default new VerificationRepo()
