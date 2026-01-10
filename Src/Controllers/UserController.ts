import type { Request, Response } from 'express'
import UserRepo from '../Repositories/UserRepo'
const UserController = {
	query: async (req: Request, res: Response, next: Function) => {
		try {
			const user = await UserRepo.query(req.query)
			res.status(200).json({ success: true, user: user })
		} catch (error: any) {
			return next(error, req, res)
		}
	},
	update: async (req: Request, res: Response, next: Function) => {
		try {
			const user = await UserRepo.update(req.params.id, { ...req.body })
			res.status(200).json({ success: true, user: user })
		} catch (error: any) {
			return next(error, req, res)
		}
	},
}
export default UserController
