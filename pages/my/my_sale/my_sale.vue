<template>
	<view>
		<!-- 内容 -->
		<view class='pa'>

			<view class='container bg-white shadow-warp' v-for="(item,index) in saleList" :key="index">

				<view class='container-top'>
					<view class='container-top-1'>
						<image :src='item.commodity_image'></image>
					</view>
					<view class='container-top-2'>
						<view class='container-top-2_1 text-cut'>
							<text>{{item.commodity_name}}</text>
						</view>
						<view class='container-top-2_2'><text
								class='text-price text-sm text-red'>{{item.commodity_price}}</text></view>
						<view><text class='cuIcon-time lg text-gray'></text><text
								class='text-xxm'>{{item.commodity_status==2?'交易完成':'买家已购买，请在24小时内发货'}}</text></view>
					</view>
				</view>

				<view class='container-line'></view>
				<view class='container-under'>
					<view class='container-under-1'><text class='cuIcon-message font-size-lg text-yellow '></text><text
							class='text-sm text-yellow' @tap="dial(item.tel)">联系买家</text></view>
					<view class='container-under-2' v-if="item.commodity_status==3">
						<view class="cu-tag line-black padding" @tap="send_out(item.id)">去发货</view>
					</view>
					<!-- <view><view class="cu-tag line-black padding">…</view></view> -->
				</view>

			</view>
			<luanqing-empty :show="emptyFlag" :text="emptyMsg" textColor="#C0C0C0"></luanqing-empty>

		</view>

		<!-- end -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				saleList: [], //我的卖出列表
				emptyFlag: false, //数据为空暂未图
				emptyMsg: '',
				pageSet: 0 ,//分页
				datas:{
					page: 1,
					num: 5
				}
			}
		},
		onLoad(option) {
			this.getMySellList()
		},
		//上拉刷新
		onReachBottom: function() {
			console.log("出发上拉刷新事件");
			this.pageSet = 1
			this.getMySellList()
		},
		methods: {
			getMySellList() {
				if (this.pageSet == 1) {
					this.datas.page++;
				}
				this.$request('secondhand/sale',this.datas).then(res => {
					if (res.code == 1) {
						if (this.pageSet == 1) {
							this.saleList.push(...res.data.data)
						} else {
							this.saleList = res.data.data
						}
						// this.saleList = res.data.data
					} else if (res.code == 0) {
						this.emptyMsg = res.msg
						this.emptyFlag = true
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
				}).catch((err) => {
					uni.showToast({
						title: err.msg,
						icon: 'error',
						duration: 2000
					});
				});
			},
			//拨打电话
			dial(phoneNumber) {
				uni.makePhoneCall({
					phoneNumber
				});
			},
			//去发货
			send_out(id) {
				uni.navigateTo({
					url:'../../home/order_detail/order_detail?id='+id
				})
			}
		}
	}
</script>

<style scoped>
	/* pages/my/my_sale/my_sale.wxss */

	.pa {
		padding: 20rpx;
	}

	/* 内容 */
	.container {
		padding: 20rpx;
		height: 300rpx;
		width: 100%;
		margin-bottom: 20rpx;
	}

	.container-top-2 {
		margin-left: 20rpx;
		width: 120%;

	}

	.container-top-1 image {
		width: 150rpx;
		height: 150rpx;
	}

	.container-top {
		display: flex;
		align-items: center;

	}

	.container-top-2_1 {
		margin-bottom: 20rpx;
		width: 50%;
	}

	.container-top-2_1 text {
		font-weight: 600;
	}

	.container-top-2_2 {
		margin-bottom: 20rpx;
	}

	.container-top-2_2 text {
		font-size: 25rpx;
		font-weight: 750;
	}

	.text-xxm {
		font-size: 22rpx;
		color: gray;
		padding-left: 10rpx;
	}

	.container-line {
		width: 95%;
		height: 3rpx;
		background: gainsboro;
		margin-top: 25rpx;
	}

	.container-under {
		display: flex;
		margin-top: 25rpx;
		align-items: center;
	}

	.font-size-lg {
		font-size: 35rpx;
		padding-right: 10rpx;

	}

	.container-under-1 {
		width: 80%;
	}

	/* .container-under-2 {
		 margin-right: 20rpx; 
	} */

	/* end */
</style>
