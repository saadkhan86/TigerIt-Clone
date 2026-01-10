import { v2 as cloudinary } from 'cloudinary'
import env from 'dotenv'
env.config()
cloudinary.config({
	cloud_name:
		process.env.CLOUDINARY_NAME ||
		'mediaflows_c2772ec6-ddd8-4ab7-8909-86f372fb1c43',
	api_key: process.env.CLOUDINARY_API_KEY || '744715348469891',
	api_secret:
		process.env.CLOUDINARY_API_SECRET || 'Ls1S4dEhyVeE_nlQ8QvrQwc4FxI',
})
export async function uploadToCloudinaryBuffer(logo: string, folder?: string) {
	try {
		const base64String = logo.replace(/^data:image\/[a-z]+;base64,/, '')
		const result = await cloudinary.uploader.upload(
			`data:image/png;base64,${base64String}`,
			{
				folder: folder || 'TigerIt',
			}
		)
		return result?.secure_url
	} catch (error) {
		throw Error(
			'Error Uploading file to cloudinary' + JSON.stringify(error, null, 2)
		)
	}
}
