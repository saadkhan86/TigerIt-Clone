import type { Document } from 'mongoose'

export namespace IAdmin {
	export interface Doc extends Document {
		phone: string
		fbid: string
		name: string
		email: string
	}
}
export default IAdmin
