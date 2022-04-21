<template>
	<view>
		<!-- 头部解释 -->
		<view class='containers bg-white padding-sm'>
		
		<view class='container-1'>
		
		<view class='container-1_1'><image src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560330807954&di=bbac5a091acb632c9c0716d478f1a75f&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1209%2F26%2Fc0%2F14139494_1348624365103.jpg'></image></view>
		<view class='container-1_2'>
		<view class='container-1_2_1'><text>#家具</text></view>
		<view ><text>25310个宝贝</text></view>
		</view>
		</view>
		
		<view class='container-2'><text>闲置家用电器，好用价钱又划算</text></view>
		</view>
		<!-- end -->
		
		
		<!-- 导航条 -->
		<view id="navTab" class="bg-white margin-top  nav_list "  >
		<view :data-id='index' class="nav_item " :class="index==TabCur ? 'cur' : '' " v-for="(item,index) in TabList" :key="index" @tap='tabSelect'>
		<text>{{TabList[index]}}</text>
		<image :src="'../../../static/img/' + [imgState? 'top' : 'boutton'] + '.png' "   v-if="index == 2"></image>
		</view>
		<!-- :src=" '../../../static/img/' + imgState == true ? 'top':'boutton' + '.png ' -->
		</view>
		<!-- 导航条end -->
		
		<!-- 内容 -->
		<view class='bg-white'>
		<view class='container-flex '>
		<view class=' card-menu container   ' v-for="(item,index) in 10" :key="index">
		    <navigator url='/pages/home/home_detail/home_detail' hover-class='none'>
		  <view class='container_img'><image src='http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg'></image></view>
		  <view class='container_text'><text class=''>Huawei/华为Mate 20 Pro运气真好双卡双待全网通</text></view>
		  <view class='container_price'>
		  <text class='container_price_text_0'>￥980</text>
		  <!-- <text class='container_price_text_1'>11人想要</text> -->
		   <view class="cu-tag line-orange">全新</view>
		  </view>
		  <view class='container_line'></view>
		  <view class='container_user'>
		  <image src='http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg'></image>
		  <text>Amibition</text>
		  </view>
		  </navigator>
		</view>
		</view>
		</view>
		<!-- 内容end -->
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				   // 导航条
				    TabCur: 0,
				    TabList:["精选","附近","最新"],
				    imgState: true,
				    //记录点击次数 
				    clickNum : 0,
				  // 导航条end
			}
		},
		methods: {
			  // 导航条点击
			  tabSelect(e) {
			    
			    console.log(this.clickNum)
			    var idx = e.currentTarget.dataset.id;
			      this.TabCur = idx;
			
			    if(idx == 2 && this.imgState){
			        this.clickNum = this.clickNum + 1
			      if(this.clickNum > 1){
			          this.imgState = false,
			        uni.showToast({
			          title: '降序',
			          icon: 'none',
			          duration: 1000
			        })
			      }
			  
			    } else if (idx == 2 && !this.imgState ){
			        this.imgState = true
			      uni.showToast({
			        title: '升序',
			        icon: 'none',
			        duration: 1000
			      })
			    }
			
			    if(idx != 2){
			        this.clickNum = 0
			    }
			  
			  },
			  //  导航条点击end
		}
	}
</script>

<style>
/* 头部解释 */
.containers{
  width: 100%;
  height: 250upx;
}
.container-1{
  display: flex;
  margin-left: 20upx;
  margin-top: 30upx;
  /* align-items: center; */
 
}
.container-1_1 image{
  height: 120rpx;
  width: 120rpx;
  border-radius: 100%;
}
.container-1_2{
  margin-left: 20rpx;
  margin-top: 20rpx;
}
.container-1_2 text{
  color: black;
  font-size: 25rpx;
  padding: 10rpx;
}
.container-1_2_1{
  padding-bottom: 10rpx;
}
.container-2{
  margin-top: 20rpx;
  margin-left: 20rpx;
}
.container-2 text{
  color: gray;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 23rpx;
}
/* end */

/* 相似商品 */
.container{
  margin-left: 29rpx;
  margin-right: 20rpx;
  /* float: left; */
  height: 500rpx;
  width: 43%;
  background: white;
  margin-bottom: 60upx;
  
}
.container_img image{
  height: 300rpx;
  width: 100%;
}
.container_text{
  color: black;
  padding: 10rpx;
  font-size: 23rpx;
}
.container_price{
  display: flex;
  justify-content: space-between;
  padding-left: 8rpx;
  padding-right: 8rpx;
}
.container_price_text_0{
  color: red;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.container_price_text_1{
  font-size: 22rpx;
}
.container_line{
  width: 100%;
  background: gainsboro;
  height: 1rpx;
  margin-top: 10rpx;
}
.container_user{
  margin-top: 20rpx;
  display: flex;
  line-height:50rpx;
}
.container_user image{
  margin-left: 10rpx;
  margin-right: 50rpx;
  height: 50rpx;
  width: 50rpx;
}
.container-flex{
  display: flex;
  flex-wrap: wrap;
}
/* end */

/* 评价条件选择 */
.checked_parameter{
  background: rebeccapurple;
  padding: 3px;
  border-radius: 5px;
  color: #fff;
}
/* end */

/* 导航条 */
.nav_list{
  width: 100%;
  height: 100rpx;
  margin-bottom: 20rpx;
  display: flex;

}
.nav_item{
  height: 100rpx;
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav_item image{
  height: 45rpx;
  width: 45rpx;
}
.cur{
border-bottom: 2rpx solid;
color: orange;
}
/* end */

/* 吸附置顶 */
.navTab{
  position: fixed;
  z-index: 9999;
  top: 0;
}
/* end */






</style>
