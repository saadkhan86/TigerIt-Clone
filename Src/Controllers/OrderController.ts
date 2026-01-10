import type { Request, Response } from 'express'
import OrderRepo from '../Repositories/OrderRepo'
const OrderController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const order = await OrderRepo.create({
        customerId: req.user!._id,
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
  query: async (req: Request, res: Response, next: Function) => {
    try {
      const order = await OrderRepo.query(req.query)
      res.status(200).json({ success: true, product: order })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
}
export default OrderController
