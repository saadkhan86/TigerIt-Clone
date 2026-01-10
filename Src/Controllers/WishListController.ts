import type { Request, Response } from 'express'
import WishListRepo from '../Repositories/WishListRepo'
const WishListController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const wish = await WishListRepo.create({
        userId: req.user!._id,
        businessId: req.params!.id,
      })
      res.status(200).json({ success: true, wish: wish })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
  query: async (req: Request, res: Response, next: Function) => {
    try {
      const wish = await WishListRepo.query(req.query)
      res.status(200).json({ success: true, wish: wish })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
  delete: async (req: Request, res: Response, next: Function) => {
    try {
      const wish = await WishListRepo.delete(req.params.businessId)
      return res
        .status(200)
        .json({ success: true, message: 'Wish removed successfully' })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
}
export default WishListController
