const baseUrl = 'http://shop.com/api/'

const request = (url = '', datas = {}, type = 'POST',
	header = {
		'content-type': 'application/json',
	}) => {

	// console.log(type)

	datas.token = uni.getStorageSync('token')
	return new Promise((resolve, reject) => {
		uni.request({
			method: type,
			url: baseUrl + url,
			data: datas,
			header: header,
			dataType: 'json',
		}).then((response) => {
			setTimeout(function() {
				uni.hideLoading();
			}, 200);
			let [error, res] = response;
			resolve(res.data);
		}).catch(error => {
			let [err, res] = error;
			reject(err)
		})
	});
}
export default request
