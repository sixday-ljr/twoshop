<template>
	<view>
		
		<!-- 搜索 -->
		  <view class="cu-bar search bg-white"  v-if="false">
		    <view class="search-form round">
		      <text class="cuIcon-search"></text>
		      <input type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
		    </view>
		    <view class="action">
		      <button class="cu-btn bg-green shadow-blur round">搜索</button>
		    </view>
		  </view>
		<!-- 搜索end -->
		
		<!-- left -->
		<view class='container'>
		<view class='classify' >
			<!-- style=' height: screenHeightpx;' -->
		<scroll-view scroll-y>
		<view class="classify-classify  " :class=" index == sss ? 'select  text-green ' : '' " v-for="(item,index) in classinfy" :key="index" @tap='showClassify' :data-title='item.title'   :data-id='index'><text>{{item.title}}</text></view>
		</scroll-view>
		</view>
		
		<!-- rigth -->
		<view class='rigth animation-reverse  ' :class=" 'animation-' + animation" >
		  <view class='rigth-image'><image src='https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'></image></view>
		
		<view class='items'>
		<view class='item_item' v-for=" (item,index) in 10" :key="index" @tap='toDetail'>
		<view class='item_item_image'><image src='https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'></image></view>
		<view><text>手机</text></view>
		</view>
		
		</view>
		
		</view>
		
		<!-- end -->
		
		</view>
		<!-- end -->
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sss:0,//默认选择位置Left
				animation:'',//动画样式
				 // 垂直导航
				    classinfy: [
				      { id: 0, title: '手机' },
				      { id: 1, title: '电商' },
				      { id: 2, title: '衣服' },
				      { id: 3, title: '裤子' },
				      { id: 4, title: '书本' },
				      { id: 5, title: '鞋包' },
				      { id: 6, title: '装饰品' },
				      { id: 7, title: '电子' },
				
				    ],

			}
		},
		methods: {
			// 得到分类详细
			  showClassify: function (e) {
			
			    var that = this;
			      that.sss = e.currentTarget.dataset.id
			
			      that.animation = 'shake'
			    setTimeout(function () {
			       that.animation =  ''
			    }, 400)
			
			  },
			  
			  //跳转到详细页面
			    toDetail:function(e){
			      console.log(e)
			      uni.navigateTo({
			        url: '/pages/classify/classify_detail/classify_detail',
			        success: function(res) {},
			        fail: function(res) {},
			        complete: function(res) {},
			      })
			    },
		}
	}
</script>

<style>

.classify{
 
  width:20%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;

}
.container{
  display: flex;
  margin-top: 10rpx;
}
.classify-classify text{
  font-size: 30rpx;
  font-weight: 600;
  
}
.classify-classify{
width: 100%;
height: 120rpx;
display:flex;
justify-content: center;
align-items: center;
}


/* 选择状态 */
.select{
  margin-bottom: 10rpx;
  background: ghostwhite;
  border-left: 10rpx seagreen solid;

}

/* end */


/* rigth */

.rigth{
 
  width: 78%;
  background: white;
  margin-left: 30rpx;
  padding: 20rpx;
}
.rigth-image image{
  width: 100%;
  height: 150rpx;
  border-radius: 10rpx;
}
.scroll-rigth{
  width: 100%;
}
.item_item_image{
  margin-bottom: 10rpx;
}
.item_item_image image{
  height: 100rpx;
  width: 100rpx;
  border-radius: 100%;
  
}
.item_item{
  margin-top: 20rpx
}
.item_item{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 33%;
  margin-bottom: 20rpx;
}
.items{
  display: flex;
  flex-wrap: wrap;
}
/* end */
</style>
