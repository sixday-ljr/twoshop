<template>
	<view>
		<!--列表-->
		<view class="bg-white zaiui-address-card-view" v-for="item in addressList" :key="item.id">
			<view @tap="goback(item.id)">
				<view class="flex text-black text-lg">
					<view class="flex-sub text-left">{{item.name}}</view>
					<view class="flex-sub text-right">{{item.phone}}</view>
				</view>
				<view class="margin-tb-sm text-gray">
					{{item.province}}{{item.city}}{{item.area}}
				</view>
			</view>
			<view class="zaiui-line-view" />
			<view class="zaiui-right-view">
				<text class="cuIcon-write" @tap="editAddressTap(item.id)">编辑</text>
				<text class="cuIcon-delete" @tap="delLocation(item.id)">删除</text>
			</view>
		</view>

		<!--按钮-->
		<view class="bg-white wecanui-footer-fixed foot-pb">
			<view class="flex flex-direction">
				<button class="cu-btn bg-yellow" @tap="AddAddressTap">添加新地址</button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				addressList: [],
			}
		},
		onLoad(options) {
			this.commodity_name = options.commodity_name
			this.commodity_price = options.commodity_price
			this.commodity_image = options.commodity_image
			this.shopId = options.shop_id
			console.log(this.shop_id)
			this.location()
			// let pages = getCurrentPages(); //获取所有页面栈实例列表
			// let nowPage = pages[pages.length - 1]; //当前页页面实例
			// let prevPage = pages[pages.length - 2]; //上一页页面实例
		},
		onShow() {
			this.location()
		},
		onReady() {

			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			editAddressTap(id) {
				uni.navigateTo({
					url: '../my/edit-address?id=' + id
				});
			},
			AddAddressTap() {
				uni.navigateTo({
					url: '../my/add-address'
				});
			},
			//渲染地址列表

			location() {
				let location_body = {
					token: uni.getStorageSync('token')
				}
				console.log(location_body)
				this.$request('user/addresslist', location_body).then(res => {
					// console.log(res)
					if (res.code == 1) {
						this.addressList = res.data
						if (res.data.type == 1) {
							uni.setStorageSync('loaction_name', name)
							uni.setStorageSync('loaction_tel', tel)
							uni.setStorageSync('loaction_address', address)
							uni.setStorageSync('loaction_id', id)
							// console.log(id)
						}
					} else if (res.code == 5) {
						uni.removeStorage({
							key: 'token',
							success: function(res) {
								// console.log('success remove token');
							}
						});
						//请重新登录
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
				})
			},
			//删除地址
			delLocation(id, index) {
				let par = {
					token: uni.getStorageSync('token'),
					id: id
				}
				console.log(par)
				this.$request('user/addressdel', par, 'POST').then(res => {
					if (res.code == 1) {
						this.addressList.splice(index, 1)
					} else if (res.code == 5) {
						uni.removeStorage({
							key: 'token',
							success: function(res) {
								console.log('success remove token');
							}
						});
						//请重新登录
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}

				})
			},
			//设置默认收货地址
			// one_loaction(id){
			// 	let one = {
			// 		id:id,
			// 		token:uni.getStorageSync('token')
			// 	}
			// 	this.$request('user/addresstype',one).then(res=>{
			// 		console.log()
			// 	})
			// },
			goback(id, name, tel, address) {
				let one = {
					id: id,
					token: uni.getStorageSync('token')
				}
				this.$request('user/addresstype', one).then(res => {
					console.log(res)
					// uni.$emit("handle", {
					// 	name: name,
					// 	id:id,
					// 	tel:tel,
					// 	address: address,
					// }, ); //值传递

					uni.redirectTo({
						url: '../home/confirm_order/confirm_order?commodity_image=' + this
							.commodity_image + '&shopId=' + this.shopId + '&commodity_name=' +
							this.commodity_name + '&commodity_price=' + this.commodity_price 
							
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "@/colorui/main.css";
	@import "@/colorui/icon.css";
	@import "../../static/zaiui/style/app.scss";

	/* #endif */
	.zaiui-address-card-view {
		position: relative;
		margin: 36.36rpx 27.27rpx;
		border-radius: 10.9rpx;
		padding: 18.18rpx;

		.zaiui-line-view {
			position: relative;
			background: #f9f9f9;
			margin-bottom: 20rpx;
			height: 2rpx;
		}

		.zaiui-right-view {
			position: relative;
			text-align: right;

			text {
				&:before {
					margin-right: 5px;
				}
			}

			text+text {
				margin-left: 20px;
			}
		}
	}

	.wecanui-footer-fixed .flex-direction {
		padding: 18.18rpx;
	}
</style>
