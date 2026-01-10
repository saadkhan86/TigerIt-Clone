import type { Request, Response } from 'express'
import { Types } from 'mongoose'
import BusinessRepo from '../Repositories/BusinessRepo'
const BusinessController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const business = await BusinessRepo.create({
        businessOwner: req.user?._id,
        ...req.body,
      })
      res.status(200).json({ success: true, business: business })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
  update: async (req: Request, res: Response, next: Function) => {
    try {
      const business = await BusinessRepo.update(req.params.id, {
        businessOwner: req.user?._id,
        ...req.body,
      })
      res.status(200).json({ success: true, business: business })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
  query: async (req: Request, res: Response, next: Function) => {
    try {
      const business = await BusinessRepo.query(req.query)

      res.status(200).json({ success: true, business })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
}
export default BusinessController
