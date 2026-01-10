import { uploadToCloudinaryBuffer } from '../Services/Cloudinary.service'

const ValidatorUtils = {
	isValidUrl: (url?: string) => {
		try {
			if (!url || url.trim() === '') return false
			new URL(url)
			return true
		} catch (error) {
			return false
		}
	},
	isValidBase64Image: (image?: string) => {
		if (!image || image.trim() === '') return false
		const base64Regex = /^data:image\/\w+;base64,/
		return base64Regex.test(image)
	},
	convertToUrl: async (file: string) => {
		if (ValidatorUtils.isValidBase64Image(file)) {
			let uploaded = await uploadToCloudinaryBuffer(file)
			return uploaded
		} else if (ValidatorUtils.isValidUrl(file)) {
			return file
		} else {
			return null
		}
	},
}
export default ValidatorUtils
