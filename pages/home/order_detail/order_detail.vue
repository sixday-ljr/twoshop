<template>
	<view>
		<!-- 步骤条 -->
		<view class="bg-white padding-sm ">
			<view class="cu-steps">
				<view class="cu-item " :class="index>orders.status?'':'text-yellow'" v-for="(item,index) in basicsList"
					:key="index">
					<text class="cuIcon-roundcheckfill"></text> {{item.name}}
					<!-- :class=" 'cuIcon-' + index>basics?'title': item.icon " -->
				</view>
			</view>
		</view>
		<!-- end -->


		<!-- 价钱 -->
		<view class='price bg-white'>

			<view class='price-item'>
				<view><text class='text-sl text-red text-uni'>{{commodity.commodity_price}}</text></view>
				<view class='price-explain'><text>钱已经打入卖家账户</text></view>
				<!-- <view class='price-explain-1'><text><text class='text-red'>9</text><text
							class='text-black'>天</text><text class='text-red'>2</text><text
							class='text-black'>小时</text><text class='text-red'>21</text><text
							class='text-black'>分后</text></text></view>
				<view class='price-explain-1s'><text>买家任未确定收货,系统会自动确任,欠款会打到您的微信账户中</text></view> -->
			</view>
		</view>
		<!-- end -->

		<!-- 分离线 -->
		<view class='line'></view>
		<!-- end -->

		<!-- 物流描述 -->

		<!-- <view class='logistics padding bg-white'>
		<view><text class='text-black'>见面交易，无需物流</text></view>
		<view><text class='text-blue text-weight' bindtap='toLogisticsDetails'>物流详情</text></view>
		</view> -->
		<!-- end -->


		<!-- 分离线 -->
		<view class='line'></view>
		<!-- end -->


		<!-- 商品描述 -->
		<view class='shoppin_detail bg-white'>
			<view class='shoppin_detail_img'>
				<image :src='commodity.commodity_image'>
				</image>
			</view>

			<view class='shopping_detail '>
				<view class='shopping_detail_title'>
					<view class='shopping_detail_title_1 text-cut'><text
							class='text-black text-black'>{{commodity.commodity_name}}</text></view>
					<text class='text-blue text-yellow' @tap="call(orders.tel)">联系买家</text>
				</view>
				<view class='shopping_detail-2'><text class='text-black'>数量 X1</text></view>

			</view>
		</view>
		<!-- end -->

		<!-- 分离线 -->
		<view class='line'></view>
		<!-- end -->

		<!-- 交易信息 -->
		<view class='shopping bg-white'>

			<view class='shopping_desc margin-bottom-xs-15'>
				<text>买家昵称</text>
				<text>{{orders.name}}</text>
			</view>

			<view class='shopping_desc margin-bottom-xs-15'>
				<text>订单编号</text>
				<text>{{orders.order_id}}</text>
			</view>

			<!-- <view class='shopping_desc margin-bottom-xs-15'>
		<text>微信交易号</text>
		<text>213423421342142134234324213</text>
		</view> -->

			<view class='shopping_desc '>
				<text>交易时间</text>
				<text>{{orders.newtime}}</text>
			</view>

		</view>
		<!-- end -->

		<!-- 分离线 -->
		<view class='line'></view>
		<!-- end -->


		<!-- 确定按钮 -->
		<view class='comfirm bg-white' v-if="orders.status == 1">
			<button class='bg-yellows cu-btn margin-tb-sm comfirm_button lg' @click="scene">现场交易</button>
			<button class='bg-green cu-btn margin-tb-sm comfirm_button lg' @click="send">发快递</button>
		</view>
		<!-- end -->

		<!-- 输入框示例 -->
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="输入内容" value="对话框预置提示内容!" placeholder="请输入内容"
				@confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				basics: 0, //控制步骤条状态
				// 步骤条
				basicsList: [{
					icon: 'roundcheckfill',
					name: '已拍下'
				}, {
					icon: 'roundcheckfill',
					name: '已付款'
				}, {
					icon: 'roundcheckfill',
					name: '已发货'
				}, {
					icon: 'roundcheckfill',
					name: '交易成功'
				}],
				commodity: {}, //买卖进度
				orders: {}, //买家信息
				type: 'center',

			}
		},
		
		methods: {
			//获取卖家买卖进度详细
			getVieworder: function() {
				let data = {
					commodity_id: this.commodity_id
				}

				this.$request('secondhand/vieworder', data).then(res => {
					if (res.code == 1) {
						this.commodity = res.data.commodity
						this.orders = res.data.orders
						// this.basics = this.PayInfo.orders.status
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
					} else if (res.code == 0) {
						this.emptyMsg = res.msg
						this.emptyFlag = true
					}
				}).catch((err) => {
					uni.showToast({
						title: err.msg,
						icon: 'error',
						duration: 2000
					});
				});
			},
			call(phoneNumber) { //打电话
				uni.makePhoneCall({
					phoneNumber
				});
			},
			send() {
				this.$refs.inputDialog.open()
			},
			//去发货
			delivery() { //type 1 是发快递
				let data = {
					order_id: this.orders.id,
					type: 1
				}
				//this.buyErsorderType(data)
			},
			scene() { //现场交易
				let data = {
					order_id: this.orders.order_id,
				}
				this.buyErsorderType(data)
			},
			buyErsorderType(data) { //更改买卖进度状态
				this.$request('secondhand/buyersordertype', data).then(res => {
					console.log(res);
					if (res.code == 1) {
						this.getVieworder()
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
					} else if (res.code == 0) {
						this.emptyMsg = res.msg
						this.emptyFlag = true
					}
				}).catch((err) => {
					uni.showToast({
						title: err.msg,
						icon: 'error',
						duration: 2000
					});
				});
			},
			dialogInputConfirm(val) {
				let data = {
					order_id: this.orders.order_id,
					type: 1,
					courier_company: val.company,
					courier_number: val.order
				}
				this.buyErsorderType(data)
			},
		},
		onLoad(options) {
            this.commodity.commodity_image = options.commodity_image
			this.commodity_id = options.id
			this.getVieworder()
			this.orders.name = options.user_name
			console.log(options.user_name)
			this.orders.order_id = options.order_id
			this.orders.newtime = options.createtime

		}
	}
</script>

<style>
	/* 价钱 */
	.price {
		width: 100%;
		padding: 60rpx;
		height: 380rpx;
	}

	/* end */
	/* price */
	.price-item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.price-explain text {
		font-size: 32rpx;
		color: gray;
		font-weight: 55;
	}

	.price-explain-1 {
		width: 31%;
		margin-top: 20rpx;
		display: flex;
		align-content: center;
		align-items: center;
	}

	.price-explain-1 text {
		font-size: 25rpx;
		font-weight: 550;

	}

	.price-explain-1s text {
		font-size: 25rpx;
		color: black;
		font-weight: 550;

	}

	.price-explain-1s {
		width: 95%;
	}

	.line {
		width: 100%;
		height: 4rpx;
		background: gainsboro;
	}

	/* end */

	/* 物流信息 */
	.logistics {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 170rpx;
	}

	/* end */

	/* 商品描述 */
	.shoppin_detail {
		display: flex;
		padding: 20rpx;
		height: 250rpx;
		align-items: center;
	}

	.shoppin_detail_img image {
		height: 130rpx;
		width: 130rpx;
	}

	.shopping_detail {
		margin-left: 20rpx;
		width: 100%;
	}

	.shopping_detail-2 {
		margin-top: 20rpx;
	}

	.shopping_detail_title {
		display: flex;
		justify-content: space-between;
		width: 95%;
	}

	.shopping_detail_title_1 {
		width: 75%;
	}

	/* end */

	/* 交易信息 */
	.shopping {
		padding: 30rpx;
		height: 235rpx;
	}

	.shopping_desc {
		display: flex;
		justify-content: space-between;
	}

	.shopping text {
		font-size: 28rpx;
	}

	.margin-bottom-xs-15 {
		margin-bottom: 15rpx;
	}

	/* end */

	/* 确定 */
	.comfirm {
		width: 100%;
		height: 150rpx;
		padding: 20rpx;
	}

	.comfirm_button {
		width: 100%;
	}

	/* end */
</style>
