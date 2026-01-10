import { Request, Response } from 'express'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import AdminModel from '../Models/AdminModel'
import UserModel from '../Models/User.Model'

const Passport = {
	auth: async (req: Request, res: Response, next: Function) => {
		try {
			// var token: string | null = null
			// if (
			// 	req.headers.authorization &&
			// 	req.headers.authorization.startsWith('Bearer')
			// ) {
			// 	token = req.headers.authorization.split(' ')[1]
			// }

			// if (!token) {
			// 	return res
			// 		.status(400)
			// 		.json({ success: false, message: 'Token Required' })
			// }

			// const decoded = await admin.auth().verifyIdToken(token)

			// if (!decoded) {
			// 	return res
			// 		.status(400)
			// 		.json({ success: false, message: 'Valid token required' })
			// }

			let existingUser = await UserModel.findOne({
				fbid: '12712735',
			})

			if (!existingUser) {
				existingUser = await UserModel.create({
					phone: '+923297681247',
					fbid: '12712735',
				})
			}
			req.user = existingUser
			return next()
		} catch (error: any) {
			throw new ErrorHandler(404, error.message)
		}
	},
	admin: async (req: Request, res: Response, next: Function) => {
		try {
			// let token: any
			// if (
			// 	req.headers.authorization &&
			// 	req.headers.authorization.startsWith('Bearer')
			// ) {
			// 	token = req.headers.authorization.split(' ')[1]
			// }

			// if (!token) {
			// 	throw new ErrorHandler(401, 'Access Denied. No token provided.')
			// }

			// const decoded = await admin.auth().verifyIdToken(token)

			let existingAdmin = await AdminModel.findOne({
				fbid: 'sk8613013',
			})
			console.log(existingAdmin)
			if (!existingAdmin) {
				throw new ErrorHandler(404, 'Admin Not Found')
			}

			req.admin = existingAdmin

			return next()
		} catch (error) {
			return next(error, req, res)
		}
	},
}
export default Passport
