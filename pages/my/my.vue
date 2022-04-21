<template>
	<view>
		<view class="UCenter-bg" catchtap='toMy_detail'>
			<!-- <image src="../../static/img/1.jpg" class="png"></image> -->
			<view class="text-xl">
				<text>{{mobile}}</text>
			</view>

			<!-- <image src="../../static/img/1.jpg" mode="scaleToFill" class="gif-wave"></image> -->
		</view>
		<!-- 用户信息end -->

		<!-- 设置详细 -->
		<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
			<view class="cu-item arrow">
				<view class="content" @tap="toIssue_page">
					<text class="cuIcon-moneybagfill text-red"></text>
					<text class="text-grey">我的发布</text>
					<!-- <text class='num'>19</text> -->
				</view>
			</view>

			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url='/pages/my/my_sale/my_sale'>
					<text class="cuIcon-titles text-green"></text>
					<text class="text-grey">我的卖出</text>
					<!-- <text class='num'>99</text> -->
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="/pages/my/my_buy/my_buy">
					<text class="cuIcon-formfill text-green"></text>
					<text class="text-grey">我买到的</text>
					<!-- <text class='num' >1</text> -->
				</navigator>
			</view>
			<view class="cu-item arrow" @tap="addressTap">
				<view class="content" bindtap="CopyLink" data-link="https://github.com/weilanwl/ColorUI">
					<text class="cuIcon-locationfill text-grey"></text>
					<text class="text-grey">收货地址</text>
				</view>
			</view>
			<!-- <view class="cu-item arrow" @tap="set">
				<view class="content" bindtap="toCollect">
					<text class="cuIcon-settingsfill text-red"></text>
					<text class="text-grey">设置</text>
				</view>
			</view> -->
		</view>
		<!-- 设置详细end -->
		<!--按钮-->
		<view class=" zaiui-footer-fixed zaiui-foot-padding-bottom" @tap="login">
			<view class="flex padding-sm flex-direction">
				<button class="cu-btn  bg-yellow btn" @tap="clearAllStore()">退出登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: uni.getStorageSync('mobile')
			}
		},
		methods: {
			// 清除全部缓存
			clearAllStore() {
				uni.clearStorageSync()
			},
			//收货地址
			addressTap() {
				uni.navigateTo({
					url: "/pages/setting/address"
				});
			},

			// 我的发布跳转
			toIssue_page: function() {
				uni.navigateTo({
					url: "/pages/my/my_issue/my_issue"
				})
			},
			login() {
				uni.reLaunch({
					url: '../login/login'
				})
			}
		},
		onLoad(options) {
			try {
				const value = uni.getStorageSync('token');
				if (value == '') {
					//请重新登录
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			} catch (e) {
				// error
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style>
	/* pages/my/my.wxss */
	/* 用户信息 */


	.UCenter-bg {
		background-image: url(../../static/img/deatil.png);
		background-size: cover;
		height: 300rpx;
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		width: 750rpx;
		height: 300rpx;
	}

	.text-xl {
		width: 400rpx;
		height: 70rpx;
		line-height: 70rpx;
		background: #fff;
		border-radius: 5px;
		text-align: center;
		color: #000000;
	}

	.text-xl image {
		height: 100rpx;
		width: 100rpx;
	}

	.png {

		border-radius: 100%;
	}


	.num {
		direction: rtl;
		margin-left: 58%;
		font-size: 25rpx;
	}

	.btn {
		color: #FFFFFF;
	}
</style>
