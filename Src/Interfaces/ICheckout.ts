import { Types } from 'mongoose'

export namespace ICheckout {
  export interface Item {
    product: Types.ObjectId | string
    title: string
    price: number
    quantity: number
  }
  export interface Create {
    customerId: Types.ObjectId | string
    tip?: number
    serviceFee: number
    deliveryFee: number
    items: Item[]
  }
}
export default ICheckout
