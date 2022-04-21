<template>
	<view>
		<!-- 内容 -->
		<view class='pg'>
			<view class='container bg-white'>
				<view class='container-top'>
					<image :src='commodity_image'> </image>
				</view>

				<view class='container-top_rigth'>
					<view class='container-top_rigth_1'><text>{{commodity_name}}</text></view>
					<view class='container-top_rigth_2'>
						<view class='container-top_rigth_2_1'><text
								class='text-price text-red text-xl'>{{commodity_price}}</text></view>
						<!-- <view class='container-top_rigth_2_2'><text class='text-price'>4.3</text></view> -->
					</view>
				</view>

			</view>

			<!-- 地址 -->

			<view class='container-address bg-white' @tap="addressTap()">

				<view class='container-address-1'><text>收货地址</text></view>
				<view class='container-address-2'>
					<view class='container-address-2_1'><text>{{user_name}}</text><text>{{user_tel}}</text></view>
					<view class='container-address-2_2'><text>{{city}}{{user_address}}</text></view>
				</view>
				<view class='container-address-3'><text class='cuIcon-right lg text-gray'></text></view>

			</view>

			<!-- <view class='freight bg-white'>
		  <view class='line-freight'></view>
		
		    <view class='freight-price'>
		      <view class='freight-price-1'>运费</view>
		      <view ><text class='text-price text-red freight-price-1'>0.0</text></view>
		    </view>
		
		</view> -->
		</view>
		<!-- end -->

		<!-- 底部操作栏 -->

		<view class='foot bg-white'>
			<view class='foot-1'><text class='foot-1_1'>实付款:</text><text
					class='text-price text-red foot-1_2'>{{commodity_price}}</text></view>
			<view class='foot-2' @tap="confim()"><text>确定</text></view>
		</view>

		<!-- end -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				commodity_name: '',
				commodity_content: '',
				commodity_price: '',
				commodity_image: '',
				user_name: '',
				user_tel: '',
				user_address: '',
				location_id: '',
				province: '',
				city: '',
				area: '',
				shop_id: '',
				type: "0",
				order_id: '',
				createtime: '',
			}
		},
		onLoad(options) {
			this.shop_id = options.shopId
			console.log(this.shop_id)
			this.commodity_name = options.commodity_name
			this.commodity_content = options.commodity_content
			this.commodity_price = options.commodity_price
			this.commodity_image = options.commodity_image
			console.log()
			this.one_loaction()
			// this.confim()
		},
		onShow() {
			// uni.$on("handle", res => {
			// 	this.commodity_name = res.name;
			// 	this.commodity_price = res.commodity_price;
			// 	this.commodity_image = res.commodity_image;
			// 	// 清除监听
			// 	uni.$off('handle');
			// 	console.log(this.commodity_name)
			// 	console.log(this.commodity_price)
			// 	console.log(this.commodity_image)
			// })
			this.one_loaction()
		},
		methods: {
			/**
			 * 确定订单
			 */
			confim() {
				//发起支付 支付成功跳转 订单详细页面  失败着提示

				let pay = {
					telephone: this.user_tel,
					commodity_id: this.shop_id,
					address_id: this.location_id,
					price: this.commodity_price,
					name: this.user_name,
					address: this.user_address,
					token: uni.getStorageSync('token')

				}
				console.log(pay)
				this.$request('secondhand/buyersorderadd', pay).then(res => {
					console.log(res)
					this.order_id = res.data.order_id
					res.data.createtime
					// console.log(this.order_id)
					this.createtime = this.$mUtils.formatTime(res.data.createtime, 'Y-M-D h:m:s')
					// console.log( this.$mUtils.formatTime(res.data.createtime, 'Y-M-D h:m:s'))
					//跳转订单页面
					uni.navigateTo({
						url: '/pages/home/order_detail/order_detail?commodity_image=' + this
							.commodity_image + '&order_id=' + this.order_id + '&createtime=' + this
							.createtime + '&user_name=' + this.user_name
					})
				})


			},
            //添加地址
			addressTap() {
				uni.navigateTo({
					url: "/pages/setting/address?commodity_image=" + this.commodity_image + '&commodity_name=' +
						this.commodity_name + '&commodity_price=' + this.commodity_price + '&shop_id=' + this.shop_id
				});
			},
			//收货地址
			one_loaction() {
				let user = {
					token: uni.getStorageSync('token')
				}
				this.$request('user/addressdefault', user).then(res => {
					console.log(res)
					if (res.data != null) {
						this.user_name = res.data.name
						this.user_tel = res.data.phone
						this.user_address = res.data.address
						this.province = res.data.province
						this.city = res.data.city
						this.area = res.data.area
						this.location_id = res.data.id

					} else {
						uni.navigateTo({
							url: "/pages/setting/address?commodity_image=" + this.commodity_image +
								'&commodity_name=' + this.commodity_name + '&commodity_price=' + this
								.commodity_price
						});
					}
				})


			},
		}
	}
</script>

<style>
	/* 内容 */
	.pg {
		padding: 20rpx;
	}

	.container {
		padding: 20rpx;
		height: 280rpx;
		width: 100%;
		display: flex;

	}

	.container-top image {
		height: 240rpx;
		width: 230rpx;
	}

	.container-top_rigth {
		margin-left: 20rpx;
	}

	.container-top_rigth_2 {
		display: flex;
		align-items: center;
		margin-top: 110rpx;
	}

	.container-top_rigth_2_2 text {
		margin-left: 20rpx;
		text-decoration: line-through;
		padding-left: 5rpx;
		padding-right: 5rpx;
	}

	.container-top_rigth_1 text {
		font-size: 30rpx;
		font-weight: 550;
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

	}

	/* end */

	/* 地址位置 */
	.container-address {
		height: 200rpx;
		width: 100%;
		margin-top: 30rpx;
		padding: 20rpx;
		display: flex;
		align-items: center;
	}

	.container-address-1 {
		width: 20%;
	}

	.container-address-1 text {
		font-weight: 600;
	}

	.container-address-2 {
		width: 55%;
		margin-right: 20rpx;
		margin-left: 100rpx
	}

	.container-address-2_1 {
		direction: rtl;
		margin-bottom: 10rpx;
	}

	.container-address-2_1 text {
		font-weight: 550;
	}

	.container-address-2_2 {
		direction: rtl;
	}

	.container-address-2_2 text {
		font-size: 25rpx;
		font-weight: 550;

	}

	.freight {
		height: 100rpx;
		width: 100%;
		padding: 20rpx;
	}

	.line-freight {
		width: 100%;
		height: 2rpx;
		background: gainsboro;
	}

	.freight-price {
		display: flex;
		justify-content: space-between;
		margin-top: 25rpx;
	}

	.freight-price-1 {
		font-weight: 600;
	}

	/* end */

	/* 底部栏 */
	.foot {
		position: fixed;
		bottom: 0;
		display: flex;
		width: 100%;
		height: 100rpx;

	}

	.foot-1 {
		width: 70%;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
	}

	.foot-2 {
		background: red;
		width: 30%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.foot-2 text {
		color: white;
	}

	.foot-1_1 {
		font-weight: 600;
		color: black;
	}

	.foot-1_2 {
		padding-left: 10rpx;
		font-weight: 550;
	}

	/* end */
</style>
