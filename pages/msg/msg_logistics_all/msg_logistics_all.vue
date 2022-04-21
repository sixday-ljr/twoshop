<template>
	<view>
		<!-- 内容 -->
		<view class='pg'>
		
		<view class='container shadow-warp bg-white' v-for="(item,index) in 6" :key="index">
		<view class='container-1'><image src='https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1560593578&di=c63122f96fa12927ad3e1fa3cd0c7768&src=http://hbimg.b0.upaiyun.com/a7cc4caad8efd98b9d318c7c17da9bf621c7fc286912c-XTy19U_fw658'></image></view>
		<view class='container-2'>
		<view class='container-2_1 text-cut'><text>AmbitionAmbitionAmbition</text></view>
		<view class='container-2_2'><text class='text-red container-2_2_price text-price'>12.0</text>
		<text class='text-black  text-sm'>数量:x1</text>
		</view>
		</view>
		<view class='padding cu-tag line-black' @tap='toLogistics'>查看物流</view>
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
			  // 跳转物流到详细
		toLogistics:function(){
			uni.navigateTo({
			  url: '/pages/msg/message_logistics/message_logistics',
			  success: function(res) {},
			  fail: function(res) {},
			  complete: function(res) {},
			})
			  },
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
  height: 200rpx;
  padding: 20rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20rpx;
}
.container-1 image{
  width: 120rpx;
  height: 120rpx;
}
.container-2_2_price{
  padding-right: 50%;
}
.container-2_1 {
  margin-bottom: 30rpx;
  font-weight: 600;
  font-size: 30rpx;
  width: 95%;
}
.container-2_2{
  font-size: 28rpx;
  font-weight: 500rpx;
}
.container-2{
  width: 70%;
  margin-left: 20rpx;
}
/* end */
</style>
