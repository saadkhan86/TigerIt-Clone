import mongoose from 'mongoose'
import type { IUser } from '../Interfaces/IUser'

const { Schema, model } = mongoose

const UserSchema = new Schema<IUser.Doc>(
	{
		fbid: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			required: [true, 'contact number is required'],
			trim: true,
			match: [/^\+?[1-9]\d{7,14}$/, 'Invalid phone number'],
		},
		name: {
			type: String,
			default: 'TigerIt User',
		},
		gender: {
			type: String,
		},
		dob: {
			type: Date,
		},
		deliveryAddress: {
			type: String,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		profileImage: {
			type: String,
			default:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFpMZnvOyb9sdqE7jmOL5PaBa83i0cSuH6Qw&s',
		},
		wallet: {
			balance: {
				amount: {
					type: Number,
					default: 0,
				},
				currency: {
					type: String,
					default: 'USD',
				},
			},
		},
	},
	{ timestamps: true }
)
const UserModel = model<IUser.Doc>('User', UserSchema)
export default UserModel
