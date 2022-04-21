<template>
	<view>
		<view class='pages bg-white'>
		  <!-- 头部 -->
		  <view class='head'>
		    <image class='head_img' src='http://img.52z.com/upload/news/image/20181108/20181108204521_83402.jpg'></image>
		    <label class='head_name'>已签收</label>
		    <label class='head_title'>圆通速递：8889993221341234</label>
		    <label class='head_tel_name'>官方客服:95559</label>
		    <label class="head_tell">物流客服</label>
		  </view>
		</view>
		
		<!-- 物流跟踪 -->
		
		  <view class="kuaidi_follow">
		
		    <view class="follow_title"></view>
		
		    <view class="follow_satus">
		
		      <view class="follow_address">
		
		        <view class="label default"></view>
		
		        <view class="address default">上海市|签收|上海市【宝山顾村】，拍照签收 已签收</view>
		
		        <view class="date">2016-08-30 <text class="time">11:31:44</text></view>
		
		      </view>
		
		      <view class="follow_address">
		
		        <view class="label"></view>
		
		        <view class="address">上海市|派件|上海市【宝山顾村】，【冯师傅/18917596580】正在派件</view>
		
		        <view class="date">2016-08-30 <text class="time">11:31:44</text></view>
		
		      </view>
		
		      <view class="follow_address">
		
		        <view class="label"></view>
		
		        <view class="address">上海市|发件|上海市【上海转运中心】，正发往【上海嘉定转运中心】</view>
		
		        <view class="date">2016-08-30 <text class="time">11:31:44</text></view>
		
		      </view>
		
		      <view class="follow_address">
		
		        <view class="label"></view>
		
		        <view class="address">上海市|发件|上海市【上海转运中心】，正发往【上海嘉定转运中心】</view>
		
		        <view class="date">2016-08-30 <text class="time">11:31:44</text></view>
		
		      </view>
		
		    </view>
		
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 列表数据
				    list: [{
				      // 状态
				      id: 0,
				      // title
				      name: "客户签收人:徐剑 已签收 感谢使用圆通快递",
				      // 时间
				      dates: "2016-08-30"
				    }, {
				      id: 1,
				      name: "北京市通州区梨园公司北京市通州区梨园公司北京市通州区梨园公司北京市通州区梨园公司",
				      dates: "2016-08-30"
				    }, {
				      id: 2,
				      name: "【北京市通州区梨园公司】已收入【北京市通州区梨园公司】已收入",
				      dates: "2016-08-30"
				    }
				
				      , {
				      id: 3,
				      name: "北京朝阳区十里堡公司】取件人：小四 已收件",
				      dates: "2016-08-30"
				    }
				
				
				    ]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
.head{
  position: relative;
  width: 100%;
  height: 230rpx;
  border-bottom: 6rpx solid #ebebeb;
  /* background-color: red; */
}
/* 收货图片 */
.head_img{
  position: absolute;
  width: 144rpx;
  height: 144rpx;
  left: 60rpx;
  top: 45rpx;
}
/* 快递状态 */
.head_name{
  position: absolute;
  left: 230rpx;
  font-size: 40rpx;
  top: 36rpx;
}
/* 快递编号 */
.head_title{
position: absolute;
font-size: 30rpx;
left: 230rpx;
top: 100rpx;
color: #333;
}
/* 官方客服 */
.head_tel_name{
  position: absolute;
font-size: 30rpx;
left: 230rpx;
top: 150rpx;
color: #333;
}
/* 客服按钮 */
.head_tell{
  position: absolute;
  font-size: 28rpx;
  right: 60rpx;
  bottom: 40rpx;
  font-family: PingFangSC-Regular;
color: #AAAAAA;
letter-spacing: 0;
}
 /*物流信息*/

page{

background: #f3f3f3;

}

.kuaidiInfo{

background: #fff;
width: 100%;

height:220rpx;

margin-top: 30rpx;

}

.kuaidiInfo .kuaidiIcon{

float: left;

width: 120rpx;

height: 120rpx;

margin: 50rpx;

}

.kuaidiInfo .kuaidiIcon image{

width: 100%;

height: 100%;

}

.kuaidiInfo .kuaidiDetails{

float: left;

margin-top: 33rpx;

}

.kuaidiInfo .kuaidiDetails .company{

line-height: 100upx;

}

.kuaidiInfo .kuaidiDetails .satus{

color: #f23b4d;

}

.xbq-bar{

width: 100%;

height: 20rpx;

background: #f3f3f3;

}

/*物理跟踪*/

.kuaidi_follow{

width: 100%;
height: 80vh;

background: #fff;

padding: 20rpx 50rpx;

box-sizing: border-box;

}

.kuaidi_follow .follow_satus{

border-left: 1rpx solid #d5d5d5;

}

.kuaidi_follow .follow_satus .follow_address{

border-bottom: 1rpx solid #d5d5d5;

margin: 0 20upx;

margin-top: 50upx;

padding-bottom: 60upx;

position: relative;

line-height: 60upx;

}



.kuaidi_follow .follow_satus .follow_address .label{

width: 25rpx;

height: 25rpx;

border-radius: 50%;

position: absolute;

left: -30rpx;

top: -5rpx;

background: #d5d5d5;

}

.kuaidi_follow .follow_satus .follow_address .label.default{

background: #f23b4d;

}



</style>
