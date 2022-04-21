<template>
	<view>
		<!-- 商品标题 -->
		<view class="title bg-white">
			<text>{{commodity_name}}</text>
		</view>

		<!-- 商品内容 -->
		<view class='contanier bg-white padding-sm '>
			<view class='price'>
				<text class='price-symbol'>￥</text>
				<text class='price-size'>{{commodity_price}}</text>
			</view>

			<view class='bg-white top-20 font-size'>
				<text style="color: #333333;">
					{{commodity_content}}
				</text>
			</view>
			<!-- 图片位置 -->
			<block v-for="item in commodity_image" :key="item.id">
				<image class='img' :src='item'></image>
			</block>
			<!--图片位置end  -->

		</view>
		<!-- 商品内容end -->
		<!-- 操作选项卡 -->
		<view class="shop fixation bot">
			<view class="phone" @tap="callPhone(tel)">拨打电话</view>
			<view class="buys" @tap="buy()">立即购买</view>
		</view>
		<!-- end -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
				shopId: {
					"goods_id": "",
				},
				commodity_name: '',
				commodity_content: '',
				commodity_price: '',
				commodity_image: [],
				tel: '',
			}
		},
		onLoad(options) {
			this.shopId.goods_id = options.id
			this.shopDetail()
		},
		methods: {
			// 点击跳转订单详细页面
			buy() {
				const header = {
					token: uni.getStorageSync("token")
				}
				uni.navigateTo({
					url: '/pages/home/confirm_order/confirm_order?shopId=' + this.shopId.goods_id + '&token=' +
						header.token + '&commodity_name=' + this.commodity_name + '&commodity_price=' + this
						.commodity_price + '&commodity_image=' + this.commodity_image
				});
			},
			//商品详情页请求
			shopDetail() {
				// const shopId = {
				// 	goods_id:"1"
				// }

				this.$request('goods/info', this.shopId, 'POST').then(res => {
					console.log(res)
					if (res.code == 1) {
						this.commodity_name = res.data.commodity_name
						this.commodity_content = res.data.commodity_content
						this.commodity_price = res.data.commodity_price
						this.commodity_image = res.data.commodity_image
						this.tel = res.data.tel
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
			callPhone(tel) {

				uni.makePhoneCall({
					phoneNumber: tel,
				})
			}
		}
	}
</script>

<style scoped>
	/* 商品标题*/
	.title {}

	.title text {
		display: block;
		color: #333333;
		font-size: 44rpx;
		width: 682rpx;
		margin: 0 auto;
		padding-top: 30rpx;
	}

	/* end */
	/* 商品内容 */
	.top-20 {
		margin-top: 20rpx;
	}

	.price-size {
		font-size: 50rpx;
		color: #F76E00;
	}

	.price-symbol {
		font-size: 20rpx;
		color: #F76E00;
	}


	.font-size text {
		font-size: 35rpx;
		color: #333333;
	}


	.img {
		margin-top: 10rpx;
		width: 100%;
		height: 800rpx;
		display: block;
	}



	.browse {
		display: flex;
		justify-content: space-between;
	}

	.browse-tiem {
		font-size: 23rpx;
		color: gray;
	}

	.padding-browse {
		padding: 10rpx;
	}

	/* 商品内容end */

	/* 底部操作选项卡 */
	.bot {
		display: flex;
		justify-content: space-around;
	}

	.fixation {
		position: fixed;
		bottom: 28rpx;
		width: 100%;
	}

	.phone,
	.buys {
		background-color: #F9AD1B;
		color: #ffffff;
		width: 332rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 34rpx;
		border-radius: 44px;

	}

	.buys {
		background-color: #F76E00;
	}

	.margin-rigth-20 {
		margin-right: 20rpx;
	}

	/* end */
</style>
