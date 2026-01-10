import mongoose, { Types } from 'mongoose'
import IBusiness from '../Interfaces/IBusiness'

const BusinessSchema = new mongoose.Schema<IBusiness.Doc>(
	{
		approvalStatus: {
			type: String,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending',
		},
		businessOwner: {
			type: Types.ObjectId,
			ref: 'User',
			unique: true,
			required: true,
		},
		businessName: {
			type: String,
			required: true,
		},
		businessAddress: {
			type: String,
			required: true,
		},
		businessContact: {
			type: String,
			required: true,
		},
		businessEmail: {
			type: String,
			required: true,
		},
		businessImage: {
			type: String,
			default:
				'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500',
			required: true,
		},
		businessCoverImage: {
			type: String,
			default:
				'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500',
			required: true,
		},
		businessDescription: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const BusinessModel = mongoose.model<IBusiness.Doc>('Business', BusinessSchema)
export default BusinessModel
