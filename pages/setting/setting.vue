<template>
	<view>
		<!--标题栏-->

		
		<!--设置列表-->		
		<view class="cu-list menu sm-border margin-top">
			<view class="cu-item arrow" @tap="personalTap">
				<view class="content">个人资料</view>
			</view>
			<!-- <view class="cu-item arrow" @tap="realNameTap">
				<view class="content">实名认证</view>
			</view> -->
		</view>
		
		<!--按钮-->
		<view class="bg-white zaiui-footer-fixed zaiui-foot-padding-bottom" @tap="login">
			<view class="flex padding-sm flex-direction">
				<button class="cu-btn bg-red">退出登录</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				skin: true,
			}
		},
		onLoad() {
			
		},
		onReady() {
			
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			SwitchSex(e) {
				this.skin = e.detail.value
			},
			realNameTap() {
				uni.navigateTo({
					url: "/pages/real_name/index"
				});
			},
			personalTap() {
				uni.navigateTo({
					url: "/pages/setting/personal-data"
				});
			},
			login(){
				uni.reLaunch({
					url:'../login/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
