import { Types } from 'mongoose'
import PaymentModel from '../Models/Transaction.Model'

class TransactionRepo {
	public async create(paymentData: {
		user: Types.ObjectId | string
		provider: string
		paymentId: string
		amount: number
		currency: string
		status: 'SUCCESS' | 'FAILED'
	}) {
		return await PaymentModel.create(paymentData)
	}

	public async query(id: Types.ObjectId | string, limit: number = 10) {
		var payment: any
		payment = await PaymentModel.findById(id)
		if (!payment) {
			payment = await PaymentModel.find({ user: id }).sort({ createdAt: -1 })
		}
		return payment
	}
}

export default new TransactionRepo()
