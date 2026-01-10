import type { Request, Response } from 'express'
import CheckoutRepo from '../Repositories/CheckoutRepo'
import { Types } from 'mongoose'

const CheckoutController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const order = await CheckoutRepo.create({
        customerId: new Types.ObjectId(req.user?._id),
        tip: req.body.tip,
        serviceFee: req.body.serviceFee,
        deliveryFee: req.body.deliveryFee,
        items: req.body.items,
      })
      res.status(200).json({ success: true, order: order })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
}
export default CheckoutController
