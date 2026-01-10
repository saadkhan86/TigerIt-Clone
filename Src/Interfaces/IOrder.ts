import { Document, Types } from 'mongoose'

export namespace IOrder {
  export interface Item {
    product: Types.ObjectId | string
    title: string
    price: number
    quantity: number
  }
  export interface Doc extends Document {
    customer: Types.ObjectId | string
    tip?: number
    serviceFee: number
    deliveryFee: number
    items: Item[]
    status: 'inProgress' | 'delivered' | 'cancelled'
  }
  export interface Create {
    customerId: Types.ObjectId | string
    tip?: number
    deliveryFee: number
    serviceFee: number
    items: Item[]
  }
  export interface query {
    limit?: number
    page?: number
    product?: Types.ObjectId | string
    status?: 'inProgress' | 'delivered' | 'cancelled'
    customer?: Types.ObjectId | string
  }
}
