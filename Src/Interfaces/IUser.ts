import type { Document, Types } from 'mongoose'

export namespace IUser {
	export interface Doc extends Document {
		phone: string
		fbid: string
		name: string
		gender: string
		dob: Date
		deliveryAddress: string
		profileImage: string
		isVerified: boolean
		wallet: {
			balance: {
				amount: number
				currency: string
			}
		}
	}
	export interface create {
		phone: string
		fbid: string
	}
	export interface update {
		name: string
		gender: string
		dob: Date
		deliveryAddress: string
		profileImage: string
	}
	export interface query {
		search?: string
		limit?: number
		page?: number
		userId?: Types.ObjectId | string
	}
}
export default IUser
