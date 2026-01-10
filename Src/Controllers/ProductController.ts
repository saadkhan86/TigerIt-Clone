import type { Request, Response } from 'express'
import ProductsRepo from '../Repositories/ProductsRepo'
const ProductController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const product = await ProductsRepo.create({
        createdBy: req.user!._id,
        ...req.body,
      })
      res.status(200).json({ success: true, product: product })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
  update: async (req: Request, res: Response, next: Function) => {
    try {
      const product = await ProductsRepo.update(req.params.id, {
        userRef: req.user!._id,
        ...req.body,
      })
      res.status(200).json({ success: true, product: product })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
  query: async (req: Request, res: Response, next: Function) => {
    try {
      const product = await ProductsRepo.query(req.query)
      res.status(200).json({ success: true, product: product })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
  delete: async (req: Request, res: Response, next: Function) => {
    try {
      const product = await ProductsRepo.delete({
        createdBy: req.user!._id,
        productId: req.params.id,
      })
      return res
        .status(200)
        .json({ success: true, message: 'product deleted successfully' })
    } catch (error: any) {
      return next(error, req, res)
    }
  },
}
export default ProductController
