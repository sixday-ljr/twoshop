<template>
	<view>
		<!-- 内容 -->
		<view class='pg'>
		
		<view class='container shadow-warp bg-white' v-for="(item,index) in 6" :key="index">
		<view class='container-1'><text>你收藏的宝贝降价了~~~</text></view>
		<view class='container-2'><text>主人，--帮你找到了哪些好宝贝，快看看把~~~</text></view>
		<view class='container-3'><image src='https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg'></image></view>
		
		<view class='contaniner-lines'></view>
		
		<view class='container-4'>
		<view><text class=' text-cyan text-weight'>点我看看</text></view>
		<view><text class="cuIcon-right lg text-gray"></text></view>
		</view>
		
		</view>
		
		</view>
		<!-- end -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.pg{
  padding: 20rpx;
}

/* 内容 */
.container{
  width: 100%;
  height: 570rpx;
  padding: 20rpx;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}
.container-3 image{
  height: 350rpx;
  width: 100%;
  border-radius: 10rpx;
}
.container-1 text{
  font-size: 30rpx;
  font-weight: 800rpx;
  color: black;
}
.container-2 text{
  font-size: 22rpx;
  color:gray;
}
.container-2{
  margin-top: 20rpx;
  margin-bottom: 10rpx;
}
.container-4{
  margin-top: 25rpx;
  display: flex;
  justify-content: space-between;
}
.text-weight{
  font-weight: 600rpx;
  font-size: 30rpx;
}
.contaniner-lines{
  height: 3rpx;
  width: 100%;
  background: gainsboro;
  margin-top: 20rpx;
}
/* end */
</style>
