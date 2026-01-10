import mongoose, { Types } from 'mongoose'
import { IOrder } from '../Interfaces/IOrder'

const OrderSchema = new mongoose.Schema<IOrder.Doc>(
	{
		customer: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
		},
		serviceFee: {
			type: Number,
			required: true,
			default: 0,
		},
		deliveryFee: {
			type: Number,
			required: true,
			default: 0,
		},
		tip: {
			type: Number,
			default: 0,
		},
		items: [
			{
				product: {
					type: Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				title: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				quantity: {
					type: Number,
					default: 1,
					required: true,
				},
			},
		],
		status: {
			type: String,
			enum: ['inProgress', 'delivered', 'cancelled'],
			default: 'inProgress',
		},
	},
	{ timestamps: true }
)

export default mongoose.model<IOrder.Doc>('Order', OrderSchema)
