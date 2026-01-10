import type { Document, Types } from 'mongoose'

export namespace IVerification {
  export interface Doc extends Document {
    user: Types.ObjectId | string
    approvalStatus: 'pending' | 'approved' | 'rejected'
    name: string
    dob: Date
    documentType: 'passport' | 'driverLicense' | 'nationalId'
    docFrontImage: string
    docBackImage: string
  }
  export interface create {
    user: Types.ObjectId | string
    name: string
    dob: Date
    documentType: 'passport' | 'driverLicense' | 'nationalId'
    docFrontImage: string
    docBackImage: string
  }
  export interface buyerQuery {
    approvalStatus?: string
    user?: Types.ObjectId | string
    limit?: number
    page?: number
  }
  export interface businessQuery {
    search?: string
    approvalStatus?: string
    businessOwner?: Types.ObjectId | string
    businessName?: string
    businessEmail?: string
    limit?: number
    page?: number
  }
}
export default IVerification
