

export function uploadFile(url, filePath, name, formData = { openid: 'test'}) {
	return new Promise((resolve, reject) => {
		const tempObj = {
			url,
			filePath,
			name: 'video',
			formData
		}
		// let opts = { url, filePath, name, formData, header: { 'Content-Type': "multipart/form-data"}, success: resolve, fail: reject}
		uni.uploadFile(tempObj)
	})
}