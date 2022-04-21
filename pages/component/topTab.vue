<template>
	
	<scroll-view scroll-x  class="bg-white nav "  id="navTab"  >
	  <view class="flex text-center">
		<view class="cu-item flex-sub" :class="indexID==index?'text-orange cur':'' " v-for="(item,index) in tablist" :key ="index" @click="tabSelect"  :data-id="index">
		  {{item.name}}
		</view>
	  </view>
	</scroll-view>
	
</template>

<script>
	export default{
		data(){
			return{
				//导航条
				tablist:[],
				//end,
				indexID:0
			}
		},
		props:{
			TabCur:{//初始选择位置 0
				// type:Number,
				// default:'0'
			},
			dataList:{
				// type:String
			}//数据
		},
		
		mounted() {
			uni.getStorage({
				key: 'id',
				success: function (res) {
					console.log(res.data,'缓存获取的id')
					this.indexID = res.data
				}
			});
			console.log('=========')
			this.find()
		},
		created() {
		},
		methods:{
			find(){
				this.$request('index/goodsCategory', 'POST').then(res => {
					console.log(res)
					this.tablist = res.data
					// console.log(this.tablist)
				})
			},
		// 导航条点击
		  tabSelect(e) {
		   
		   this.$emit('click',e);//让父类使用改方法
		    
		  }
		}
	}
</script>

<style>
</style>
