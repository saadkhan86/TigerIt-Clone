import env from 'dotenv'
import mongoose from 'mongoose'
env.config()
const DB: string = process.env.MONGODB_URL!
const connetion = async () => {
	return await mongoose
		.connect(DB)
		.then(() => {
			console.log('mongo db connected')
		})
		.catch((e) => {
			console.log(e.message)
		})
}
export default connetion
