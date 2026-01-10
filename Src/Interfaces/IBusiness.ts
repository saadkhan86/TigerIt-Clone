import { Document, Types } from 'mongoose'

namespace IBusiness {
  export interface Doc extends Document {
    approvalStatus: 'pending' | 'approved' | 'rejected'
    businessOwner: Types.ObjectId | string
    businessName: string
    businessAddress: string
    businessContact: string
    businessEmail: string
    businessImage: string
    businessCoverImage: string
    businessDescription: string
  }

  export interface create {
    businessOwner: Types.ObjectId | string
    businessName: string
    businessAddress: string
    businessContact: string
    businessEmail: string
    businessImage: string
    businessCoverImage: string
    businessDescription: string
  }
  export interface update {
    businessOwner: Types.ObjectId | string
    businessName?: string
    businessAddress?: string
    businessContact?: string
    businessEmail?: string
    businessImage?: string
    businessCoverImage?: string
    businessDescription?: string
  }
  export interface query {
    search?: string
    businessOwner?: Types.ObjectId | string
    businessName?: string
    businessAddress?: string
    businessContact?: string
    businessEmail?: string
    limit?: number
    page?: number
  }
}

export default IBusiness
