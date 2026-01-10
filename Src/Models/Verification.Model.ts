import mongoose, { Types } from 'mongoose'
import IVerification from '../Interfaces/IVerification'

const { Schema, model } = mongoose

const VerificationSchema = new Schema<IVerification.Doc>(
	{
		user: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
		},
		approvalStatus: {
			type: String,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending',
		},
		name: {
			type: String,
			required: true,
		},
		dob: {
			type: Date,
			required: true,
		},
		documentType: {
			type: String,
			enum: ['passport', 'driverLicense', 'nationalId'],
			required: true,
		},
		docFrontImage: {
			type: String,
			required: true,
		},
		docBackImage: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)
const VerificationModel = model<IVerification.Doc>(
	'Verification',
	VerificationSchema
)
export default VerificationModel
