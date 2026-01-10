import { QueryFilter, Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import IBusiness from '../Interfaces/IBusiness'
import BusinessModel from '../Models/Business.Model'
import ValidatorUtils from '../Utile/Validator.Util'

class BusinessRepo {
  public async create(data: IBusiness.create) {
    const {
      businessOwner,
      businessName,
      businessAddress,
      businessContact,
      businessEmail,
      businessDescription,
      businessImage,
      businessCoverImage,
    } = data
    const payload: any = {
      businessOwner,
      businessName,
      businessAddress,
      businessContact,
      businessEmail,
      businessDescription,
    }
    if (businessCoverImage) {
      const coverUrl = await ValidatorUtils.convertToUrl(businessCoverImage)
      if (coverUrl) {
        payload.businessCoverImage = coverUrl
      }
    }

    if (businessImage) {
      const imageUrl = await ValidatorUtils.convertToUrl(businessImage)
      if (imageUrl) {
        payload.businessImage = imageUrl
      }
    }

    return await BusinessModel.create(payload)
  }

  public async update(bid: Types.ObjectId | string, data: IBusiness.update) {
    const {
      businessOwner,
      businessName,
      businessAddress,
      businessContact,
      businessEmail,
      businessDescription,
      businessImage,
      businessCoverImage,
    } = data

    const payload: any = {}

    if (businessName) payload.businessName = businessName
    if (businessAddress) payload.businessAddress = businessAddress
    if (businessContact) payload.businessContact = businessContact
    if (businessEmail) payload.businessEmail = businessEmail
    if (businessDescription) payload.businessDescription = businessDescription

    if (businessCoverImage) {
      const coverUrl = await ValidatorUtils.convertToUrl(businessCoverImage)
      if (coverUrl) {
        payload.businessCoverImage = coverUrl
      }
    }

    if (businessImage) {
      const imageUrl = await ValidatorUtils.convertToUrl(businessImage)
      if (imageUrl) {
        payload.businessImage = imageUrl
      }
    }

    const business = await BusinessModel.findOneAndUpdate(
      { _id: bid, businessOwner },
      { $set: payload },
      {
        new: true,
      }
    ).populate('businessOwner')

    if (!business) {
      throw new ErrorHandler(404, 'Business not found or unauthorized')
    }

    return business
  }

  public async query(data: IBusiness.query) {
    const _query: QueryFilter<IBusiness.Doc> = {}
    const { limit = 5, page = 1 } = data
    if (data.search) {
      _query.$or = [
        { businessName: { $regex: data.search, $options: 'i' } },
        { businessAddress: { $regex: data.search, $options: 'i' } },
      ]
    }
    if (data.businessOwner) {
      _query.businessOwner = data.businessOwner
    }
    if (data.businessEmail) {
      _query.businessEmail = data.businessEmail
    }
    if (data.businessContact) {
      _query.businessContact = data.businessContact
    }
    if (data.businessAddress) {
      _query.businessAddress = data.businessAddress
    }
    if (data.businessName) {
      _query.businessName = data.businessName
    }
    const business = await BusinessModel.find(_query)
      .sort({ createdAt: -1 })
      .skip(page * (limit - 1))
      .limit(limit)
      .lean()
    return business
  }
}

export default new BusinessRepo()
