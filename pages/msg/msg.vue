<template>
	<view>

		<!-- 自定义导航栏 -->
		<!-- <cu-custom   bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">毕节职业技术学院</block></cu-custom> -->
		<!-- end -->

		<!-- 头部消息 -->
		<view class='bc '>
			<text class='txt_1'></text>
			<view class='kuai'>
				<view class='interactive'>
					<image class='imgs' src='../../static/img/e1.png'></image>
					<text>互动消息</text>
		 	</view>
		 	<view class='notice' @tap='notice'>
					<image class='imgs' src='../../static/img/e1.png'></image>
					<text>通知消息</text>
				</view>
				<view class='logistics' @tap='toLogistics'>
					<image class='imgs' src='../../static/img/e1.png'></image>
					<text>交易物流</text>
				</view>
			</view>
		</view>
		<!-- 头部消息end -->


		<!-- 聊天消息 -->
		<view class="cu-list menu-avatar  card-menu martop">
			<view class="cu-item" @tap="toMsgChat">
				<view class="cu-avatar round lg" style="background-image:url(../../static/img/e1.png);"></view>
				<view class="content">
					<view class="text-grey">用户1</view>
					<view class="text-gray text-sm flex">
						<text class="text-cut">
							<text class="cuIcon-infofill text-red  margin-right-xs"></text>
							
						</text>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cu-tag round bg-grey sm">5</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="cu-avatar round lg"
					style="background-image:url(../../static/img/e1.png);">
					<view class="cu-tag badge">99+</view>
				</view>
				<view class="content">
					<view class="text-grey">
						<text class="text-cut">用户2</text>
						<view class="cu-tag round bg-orange sm">战士</view>
					</view>
					<view class="text-gray text-sm flex">
						<text
							class="text-cut"></text>
					</view>
		 	</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cuIcon-notice_forbid_fill text-gray"></view>
				</view>
			</view>

		 <view class="cu-item ">
				<view class="cu-avatar radius lg"
					style="background-image:url(../../static/img/e1.png);"></view>
				<view class="content">
					<view class="text-pink">
						<text class="text-cut">用户3</text>
					</view>
					<view class="text-gray text-sm flex">
						<text class="text-cut"></text>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cu-tag round bg-red sm">5</view>
				</view>
			</view>

			<view class="cu-item grayscale">
				<view class="cu-avatar radius lg"
					style="background-image:url(../../static/img/e1.png);">
				</view>
				<view class="content">
					<view>
						<text class="text-cut">用户4</text>
						<view class="cu-tag round bg-orange sm">断开连接...</view>
					</view>
					<view class="text-gray text-sm flex">
						<text class="text-cut"></text>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cu-tag round bg-red sm">5</view>
				</view>
			</view>
			
		</view>
		<!-- 聊天消息end -->


	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			// 跳转到聊天界面
			toMsgChat: function(e) {
				uni.navigateTo({
					url: "/pages/msg/msg_chat/msg_chat"
				})
			},
			// 通知消息点击
			notice: function() {
				uni.navigateTo({
					url: "/pages/msg/msg_inform/msg_inform"
				})
			},
			// 跳转交易物流详细页面
			toLogistics: function() {
				uni.navigateTo({
					url: "/pages/msg/msg_logistics_all/msg_logistics_all"
				})
			}
		}
	}
</script>

<style>
	/* pages/message/message.wxss */
	/* <!-- 头部消息 --> */
	.bc {
		width: 100%;
		height: 200rpx;
		background: linear-gradient(10deg, #ffe1ff, #1cbbb4);
	}

	.txt_1 {
		margin-left: 30rpx;
		color: white;
	}

	.kuai {
		width: 700rpx;
		height: 200rpx;
		background-color: white;
		margin-top: 50rpx;
		margin-left: 25rpx;
		border-radius: 50rpx;
		box-shadow: 3rpx 3rpx 3rpx 3rpx rgba(128, 128, 128, 0.384);
		display: flex;
		flex-direction: row;
	}

	.interactive {
		display: flex;
		flex-direction: column;
		font-size: 30rpx;
		color: black;
		width: 130rpx;
		height: 150rpx;
		margin-top: 60rpx;
		margin-left: 100rpx;
	}

	.imgs {
		margin-left: 10rpx;
		width: 80rpx;
		height: 80rpx;
	}

	.notice {
		display: flex;
		flex-direction: column;
		font-size: 30rpx;
		color: black;
		width: 130rpx;
		height: 150rpx;
		margin-top: 60rpx;
		margin-left: 100rpx;
	}

	.logistics {
		display: flex;
		flex-direction: column;
		font-size: 30rpx;
		color: black;
		width: 130rpx;
		height: 150rpx;
		margin-top: 60rpx;
		margin-left: 80rpx;
	}

	/* <!-- 头部消息end --> */


	/* 聊天消息 */
	.martop {
		margin-top: 115rpx;
	}

	/* 聊天消息end */
</style>
