import type { Request, Response } from 'express'
import VerificationRepo from '../Repositories/VerificationRepo'
const VerificationController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const verification = await VerificationRepo.create({
        user: req.user?._id,
        ...req.body,
      })
      res.status(200).json({ success: true, verification: verification })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
  buyerUpdate: async (req: Request, res: Response, next: Function) => {
    try {
      if (typeof req.query.verification !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid verification value',
        })
      }
      const userVerification = await VerificationRepo.buyerUpdate(
        req.params.id,
        req.query.verification.toLowerCase()
      )
      res.status(200).json({ success: true, verification: userVerification })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
  buyerQuery: async (req: Request, res: Response, next: Function) => {
    try {
      const Verifications = await VerificationRepo.buyerQuery(req.query)
      res.status(200).json({ success: true, Verifications: Verifications })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
  businessUpdate: async (req: Request, res: Response, next: Function) => {
    try {
      if (typeof req.body.approvalStatus !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid verification value',
        })
      }
      const businessVerification = await VerificationRepo.businessUpdate(
        req.params.id,
        req.body.approvalStatus.toLowerCase()
      )
      res
        .status(200)
        .json({ success: true, verification: businessVerification })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
  businessQuery: async (req: Request, res: Response, next: Function) => {
    try {
      const Verifications = await VerificationRepo.businessQuery(req.query)
      res.status(200).json({ success: true, Verifications: Verifications })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
}
export default VerificationController
