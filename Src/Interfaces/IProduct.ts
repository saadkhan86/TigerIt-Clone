import { Document, Types } from 'mongoose'

export namespace IProduct {
  export interface variants {
    title: string
    price: {
      amount: number
      currency: string
    }
    _id: Types.ObjectId | string
  }
  export interface Doc extends Document {
    createdBy: Types.ObjectId | string
    forAdult: boolean
    title: string
    variants: variants[]
    description: string
    image: string
  }
  export interface create {
    createdBy: Types.ObjectId | string
    title: string
    forAdult: boolean
    variants: variants[]
    size: string
    description: string
    image: string
  }
  export interface update {
    uid: Types.ObjectId | string
    forAdult?: boolean
    price?: {
      amount?: number
      currency?: string
    }
    variants?: variants[]
    description?: string
    image?: string
  }
  export interface query {
    productId?: Types.ObjectId | string
    search?: string
    page?: number
    limit?: number
  }
}
export default IProduct
