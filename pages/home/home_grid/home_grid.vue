<template>
	<view class="">

		<!-- 导航条 -->
		<!-- <TopBar :TabCur="TabCur" :dataList="2" @tap="tabSelect"></TopBar> -->

		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="id_tab==item.id?'text-orange cur':''"
					v-for="(item,index) in tablist" :key="item.id" @click="tabSelect(item.id)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- end -->
        <view class="other" style="height: 74rpx;"></view>
		<!-- 内容 -->
		<view class='card-menu container margin-top' v-for="(item,index) in shopList" :key="item.id">
			<view hover-class='none' @click="goNext(item.id)">
				<view class='container_img'>
					<image :src='item.commodity_image'></image>
				</view>
				<view class='container_text'><text class=''>{{item.commodity_name}}</text></view>
				<view class='container_price'>
					<text class='container_price_text_0'>易货价<span>￥{{item.commodity_price}}</span></text>
					<!-- <text class='container_price_text_1'>11人想要</text> -->
					<!-- <view class="cu-tag line-orange">全新</view> -->
				</view>
				<!-- <view class='container_line'></view> -->
				<!-- <view class='container_user'> -->
				<!-- <image src='http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg'></image> -->
				<!-- <text class="user" style="margin: 0 auto;">Amibition</text> -->
				<!-- </view> -->
			</view>
		</view>
		<!-- 内容end -->

	</view>
</template>

<script>
	import foldSwiper from "../../component/foldSwiper.vue";
	// import TopBar from "../../component/topTab.vue";
	export default {
		data() {
			return {
				TabCur: '0', //导航条初始位置0
				id_tab: '', //导航条id
				// 九宫格
				// 宫格列表
				tablist: [],
				shopList: [],
				shopId: '',
				gridCol: 5,
				// 宫格列表end
				// end
				page: 1, //第一页
				limit: 6, //每页显示的条数
				// total: '', //总页数
				loading: true, // 是否正在加载数据
				listTip: '上拉获取更多', // 提示文字
				count: '', // 列表数据总数
				finished: false, // 是否已加载所有数据

			}
		},

		components: {
			foldSwiper,
		},
		onLoad(options) {
			this.id_tab = options.id
			this.header = options.token
			this.tabList()
			this.shopLists(options.id)
			// this.allShop()
		},
		onShow: function() {

		},
		methods: {
			//导航条列表
			tabList() {
				this.$request('index/goodsCategory').then(res => {
					this.tablist = res.data
				})
			},
			// 导航条点击
			tabSelect(id_shop) {
				this.id_tab = id_shop
				this.shopLists(id_shop)
			},
			//导航栏对应的商品列表
			shopLists(id_shop) {
				console.log(id_shop,'===是不是1===')
				if(id_shop==0){
					this.page=1
					const shopsList = { 
						token:uni.getStorageSync('token'),
						city:'全国',
						page:this.page,
						num:this.limit
					}
					this.$request('index/index', shopsList).then(res => {
						console.log(res)
						this.shopList = res.data.data
					})
				}else{
					this.page=1
					const shopsList = { //导航栏对应的商品列表必传参数
						commodity_category_id: id_shop,
						page: this.page, //页数
						num: this.limit //显示条数
					}
					console.log(shopsList)
					this.$request('index/goods', shopsList).then(res => {
						console.log(res)
						if(res.code==1){
							this.shopList = res.data.data
						}else{
							this.shopList=[]
						}
						
					})
				}
				

			},
			//所有商品列表
		  
			//进入下一页
			goNext(id) {
				uni.navigateTo({
					url: '../home_detail/home_detail?id=' + id
				})
			}
		},
		onPullDownRefresh: function() {
			this.shopLists(this.id_tab)
			uni.stopPullDownRefresh()
		},
		onReachBottom: function() {
			if(this.id_tab==0){
				uni.showLoading({
					title: '加载中'
				});
				
				this.page++
				const shopsList = {
					token:uni.getStorageSync('token'),
					city:'全国',
					page:this.page,
					num:this.limit
				}
				this.$request('index/index', shopsList).then(res => {
					console.log(res)
					if(res.code==1){
						uni.hideLoading();
						this.shopList.push(...res.data.data)
					}else{
						uni.hideLoading();
						uni.showToast({
							title:'到底了...',
							icon:'none'
						})
					}
					
				})
			}else{
				uni.showLoading({
					title: '加载中'
				});
				
				this.page++
				let shopsList={
					commodity_category_id:this.id_tab ,
					page: this.page, //页数
					num: this.limit //显示条数
				}
				this.$request('index/goods', shopsList).then(res=>{
					if(res.code==1){
						uni.hideLoading();
						this.shopList.push(...res.data.data)
					}else{
						uni.hideLoading();
						uni.showToast({
							title:'到底了...',
							icon:'none'
						})
					}
					
				})
			}
			
			
		},
	}
</script>

<style>
	/* 内容 */
	.container {
		margin-left: 29rpx;
		margin-right: 20rpx;
		float: left;
		height: 460rpx;
		width: 43%;
		background: white;
		margin-bottom: 20rpx;
		border-radius: 21rpx;
	}

	.container_img image {
		height: 300rpx;
		width: 100%;
	}

	.container_text {
		color: black;
		padding: 10rpx;
		font-size: 23rpx;
	}

	.container_price {
		display: flex;
		justify-content: space-between;
		padding-left: 8rpx;
		padding-right: 8rpx;
	}

	.container_price_text_0 {
		color: red;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	}

	.container_price_text_1 {
		font-size: 22rpx;
	}

	.container_line {
		width: 100%;
		background: gainsboro;
		height: 1rpx;
		margin-top: 10rpx;
	}

	.container_user {
		margin-top: 20rpx;
		display: flex;
		line-height: 50rpx;
	}

	.container_user image {
		margin-left: 10rpx;
		margin-right: 50rpx;
		height: 50rpx;
		width: 50rpx;
	}

	/* end */

	/* 吸附置顶 */
	.nav {
		position: fixed;
		z-index: 999;
		top: 74rpx;
	}

	/* end */
</style>
