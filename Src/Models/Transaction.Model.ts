import mongoose, { Types } from 'mongoose'
import ITransaction from '../Interfaces/ITransaction'
const Schema = mongoose.Schema
const TransactionSchema = new Schema<ITransaction.Doc>(
	{
		user: { type: Types.ObjectId, ref: 'User', required: true },
		provider: { type: String, default: 'square' },
		paymentId: { type: String, required: true },
		amount: { type: Number, required: true },
		currency: { type: String, default: 'USD' },
		status: { type: String, enum: ['SUCCESS', 'FAILED'], required: true },
	},
	{ timestamps: true }
)
const TransactionModel = mongoose.model<ITransaction.Doc>(
	'Transaction',
	TransactionSchema
)
export default TransactionModel
