import mongoose from 'mongoose'
import IAdmin from '../Interfaces/IAdmin'
const Schema = mongoose.Schema
const AdminSchema = new Schema<IAdmin.Doc>({
	name: {
		type: String,
		required: true,
	},

	phone: {
		type: String,
		required: [true, 'contact number is required'],
		trim: true,
		match: [/^\+?[1-9]\d{7,14}$/, 'Invalid phone number'],
	},
	email: {
		type: String,
		required: true,
	},
	fbid: {
		type: String,
		required: true,
	},
})
export default mongoose.model<IAdmin.Doc>('Admin', AdminSchema)
