<template>
	<!-- <bar></bar> -->
	<view class="">
		<!-- 搜索 -->
		<view class="cu-bar search bg-white" id="TabCurTab" style="position: fixed;top:88rpx;z-index: 99;width: 100%;">
			<view class="action text-cut locaWidth">

				<text style="font-size: 20rpx;" @click="quanguo">{{region}}</text>
				<text style="margin-left: 5rpx;" class="cuIcon-triangledownfill"></text>
			</view>
			<view class="search-form round" bindtap='toSearch'>
				<text class="cuIcon-search"></text>
				<input type="text" v-model="search" placeholder="请输入内容" confirm-type="search" @confirm='sousuo'></input>
			</view>
			<view class="action">
				<button style="background-color: #007AFF;color: #FFFFFF;" class="cu-btn  shadow-blur round"
					@click="sousuo">搜索</button>
			</view>
		</view>
		<!-- 搜索end -->


		<!-- 轮播图 -->
		<swiper class="screen-swiper square-dot " :indicator-dots="true" :circular="true" :autoplay="true"
			interval="5000" duration="500" style="margin-top: 120rpx;">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill"></image>
				<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover"
					v-if="item.type=='video'"></video> -->
			</swiper-item>
		</swiper>
		<!-- 轮播图end -->

		<!--头条滚动区域-->
		<!-- <swiper class="swiperitem margin-top solid-bottom" autoplay="true" vertical="true" circular="true">
			<block v-for="(item,index) in Headlines" :key="index">
				<swiper-item>
					<view class="cu-bar bg-white">
						<view class='action'>
							<text class="cuIcon-triangledownfill text-orange"></text>
							<text>头条：{{item.title}}</text>
						</view>
					</view>
				</swiper-item>
			</block>
		</swiper> -->
		<!-- end -->
		<view style="width: 100%;height: 30rpx;"></view>
		<!-- 宫格列表 -->
		<view class="cu-list no-border grid  card-menu " :class="['col-' + gridCol]">
			<view class="cu-item" v-for="(item,id) in iconList" :key="item.id">
				<view :data-value='item.name' hover-class='none' @click="iconClick(item.id)">
					<image :src="item.image" mode="" style="width: 50rpx;height: 50rpx;"></image>
					<text>{{item.name}}</text>
				</view>

			</view>
			<view class="all cu-item" @click="iconClick(0)">
				<image src="../../static/icon.jpg" mode=""></image>
				<text>全部分类</text>
			</view>
		</view>
		<!-- 宫格列表end -->

		<!-- 导航条 -->
		<!-- <TopBar @click="tabSelect" :TabCur="TabCur" :dataList="tablist"></TopBar> -->
		<!-- 导航条 -->
		<!-- 点击回到顶部 -->
		<view class='goTop'>
			<image src='../../static/img/top_top.png' v-if="!showTop" @click='goTop'></image>
		</view>
		<!-- end -->



		<!-- 内容 -->
		<view class='card-menu container margin-top ' v-for="(item,index) in commoditys" :key="index">
			<view hover-class='none' @click="details(item.commodity_category_id)">
				<view class='container_img'>
					<image :src='item.commodity_image'></image>
				</view>
				<!-- item.commodity_name -->
				<view class='container_text'><text class=''>{{item.commodity_name}}</text></view>
				<view class='container_price'>
					<text class='container_price_text_0'><span>￥{{item.commodity_price}}</span></text>
				</view>
			</view>
			<view style="width: 100%;height: 200rpx;"></view>
		</view>

		<!-- 内容end -->
		<view>
		</view>
	</view>
</template>

<script>
	import bar from "../component/bar.vue";
	import TopBar from "../component/topTab.vue";
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		components: {
			pickRegions
		},
		data() {
			return {
				page: 1,
				token: '',
				search: '', //搜索栏
				region: '全国', //市名称
				defaultRegion: ['全国', '全国', '全国'],
				defaultRegionCode: '00',
				// 导航条
				TabCur: '0',
				scrollLeft: 0,
				// 导航条end
				scrollTop: 0, //屏幕位置
				TabCurTab: 0, //吸附置顶的偏差值
				ceil_top: '', //导航条置顶高度
				// 轮播图
				cardCur: 0,
				swiperList: [],
				// 轮播图end
				// 宫格列表
				iconList: [],
				gridCol: 4,
				// 宫格列表end

				// 滚动title
				Headlines: [{
						id: 1,
						title: "老百姓那点事",
						type: 1
					},
					{
						id: 2,
						title: "挖坑埋土数个一二三四无",
						type: 2
					},
					{
						id: 3,
						title: "今天是个好日子",
						type: 3
					},
					{
						id: 4,
						title: "一女整倒整个金华市那点趣事",
						type: 4
					},
				],
				//end

				//导航条
				tablist: [],
				//end
				//显示异常屏幕回到初始化位置开关
				showTop: false, //异常
				commoditys: '', //商品

			}
		},
		components: {
			bar,
			TopBar
		},

		onLoad: function(options) {

			this.banner()
			this.shopList()
			this.commodity()
			this.locations()
		},
		onShow: function() {
			this.region = uni.getStorageSync('cityName');
			this.commodity()

		},
		//上拉刷新
		onPullDownRefresh: function() {
			//模拟加载完成
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		//上拉刷新
		onReachBottom() {
			if (this.search) {
				this.sousuoOnReach()
			} else {
				this.onReach()
			}
		},

		methods: {
			quanguo() {
				uni.navigateTo({
					url: 'citySelect/citySelect'
				})
			},

			details(id) {
				uni.navigateTo({
					url: 'home_detail/home_detail?id=' + id
				})
			},
			// 搜索
			sousuo() {
				this.page = 1
				let params = {
					city: this.region,
					title: this.search,
					page: this.page
				}
				this.$request('index/index', params).then(res => {
					this.commoditys = res.data.data
					this.page++
				})
			},
			// 上拉加载数据
			onReach() {
				uni.showLoading({
					title: '加载中'
				});
				let params = {
					city: this.region,
					page: this.page
				}
				this.$request('index/index', params).then(res => {
					if (res.code == 1) {
						uni.hideLoading();
						this.commoditys.push(...res.data.data)
						this.page++
					} else {
						uni.showToast({
							title: '到底了，别巴拉了',
							icon: 'none'
						})
					}
				})
			},
			// 搜索上拉加载数据
			sousuoOnReach() {
				uni.showLoading({
					title: '加载中'
				});
				let params = {
					city: this.region,
					title: this.search,
					page: this.page
				}
				this.$request('index/index', params).then(res => {
					if (res.code == 1) {
						uni.hideLoading();
						this.commoditys.push(...res.data.data)
						this.page++
					} else {
						uni.showToast({
							title: '到底了，别巴拉了',
							icon: 'none'
						})
					}
				})
			},
			// 获取选择的地区
			handleGetRegion(region) {
				this.region = region[1].name
				this.commodity()
				uni.setStorage({
					key: 'region',
					data: region[1].name,
					success: function() {
						console.log('存入', region[1].name);
					}
				});
			},
			//回传已选的省市区的值
			choseValue(res) {
				//res数据源包括已选省市区与省市区code
				console.log(res);
				this.lotusAddressData.visible = res.visible; //visible为显示与关闭组件标识true显示false隐藏
				//res.isChose = 1省市区已选 res.isChose = 0;未选
				if (res.isChose) {
					this.lotusAddressData.provinceName = res.province; //省
					this.lotusAddressData.cityName = res.city; //市
					this.lotusAddressData.townName = res.town; //区
					this.region = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值
					console.log(res.city, '------***')
				}
			},
			// 商品数据
			commodity() {
				this.page = 1
				let params = {
					city: this.region,
					page: this.page
				}
				this.$request('index/index', params).then(res => {

					if (res.code == 1) {
						this.commoditys = res.data.data
						this.page++
					} else {
						uni.setStorageSync('cityName','全国')
						uni.showToast({
							title: `${this.region} 没有商品，已为您选择全国`,
							icon: 'none'
						})
						this.region = '全国'
						this.country()
					}
				})
			},
			// 搜索全国数据
			country() {
				this.page = 1
				let params = {
					city: '全国',
					page: this.page
				}
				this.$request('index/index', params).then(res => {

					this.commoditys = res.data.data
				}).catch((err) => {
					uni.showToast({
						title: err.msg,
						icon: 'error',
						duration: 2000
					});
				});
			},
			//获取位置
			locations() {
				uni.getLocation({
					//默认wgs84返回gps坐标
					//gcj02返回国测局坐标,可以用于uni.openLocation的坐标
					type: 'gcj02',
					//解析地址
					geocode: true, //中文
					success: (data) => {

					},
					fail: (err) => {
						console.log(err)
						// this.$api.msg('获取位置失败!')
					}
				});

				// uni.chooseLocation({
				// 	success: function(res) {
				// 		console.log('位置名称：' + res.name);
				// 		console.log('详细地址：' + res.address);
				// 		console.log('纬度：' + res.latitude);
				// 		console.log('经度：' + res.longitude);
				// 	}
				// });
			},
			// 导航条点击
			tabSelect(e) {
				// console.log(e) ;

				this.TabCur = e.currentTarget.dataset.id

			},
			//  导航条点击end
			// 点击回到顶部
			onPageScroll: function(e) {
				// console.log(e)
				// this.setData({
				//   scrollTop: e.scrollTop
				// })
				this.scrollTop = e.scrollTop

				if (e.scrollTop > 500) {
					this.showTop = false;
				} else {
					this.showTop = true;
				}
			},
			goTop: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
			//end


			// 吸附自顶的高度
			SelectorQuery: function() {
				var that = this;
				const query = wx.createSelectorQuery()
				query.select('#navTab').boundingClientRect()
				query.selectViewport().scrollOffset()
				query.exec(function(res) {
					// ceil_top: res[0].top - res[0].height - res[0].height

				})
			},

			//搜索框的高度
			selectTab: function() {
				var that = this;
				const query = wx.createSelectorQuery()
				query.select('#TabCurTab').boundingClientRect()
				query.selectViewport().scrollOffset()
				query.exec(function(res) {
					console.log(res)
					this.TabCurTab = res[0].bottom - res[0].height - 4;
				})
			},
			//banner轮播图
			banner() {
				this.$request('index/banner').then(res => {
					this.swiperList = res.data
				})

			},
			// 商品分类
			shopList() {
				this.$request('index/goodsCategory').then(res => {
					this.iconList = res.data
				})
				// const newIconlist =this.iconList.filter()
			},
			//点击对应分类跳页
			iconClick(id) {
				uni.navigateTo({
					url: 'home_grid/home_grid?id=' + id 
				})
			},
		}
	}
</script>

<style>
	/* 吸附置顶 */

	.navTab {
		position: fixed;
		z-index: 9999;
		top: 0;
	}

	/* end */

	/* 搜索 */

	.search_img {
		margin-right: 30rpx;
	}



	.locaWidth {
		width: 22%;
	}

	/* end */

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
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.container_text {
		color: black;
		padding: 10rpx;
		font-size: 23rpx;
		height: 80rpx;
		/* 		background-color: #007AFF;
 */
		display: -webkit-box;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: pre-line;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;


	}

	.container_price {
		/* background-color: #007AFF; */
		height: 60rpx;
		display: flex;
		align-items: center;
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



	/* 滚动的title */

	.swiperitem {
		background: #fff;
		height: 40px;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	/* end */

	.cu-list.grid.no-border {
		border-radius: 0rpx;
		margin-bottom: 30rpx;
	}

	/* 3布局 */


	.canui-xzwz {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}


	.canui-duotu {
		padding: 20rpx 30rpx;
		padding-left: 380rpx;
		padding-bottom: 30rpx;
		position: relative;
		display: flex;
	}

	.canui-dtimg-a {
		position: absolute;
		left: 30rpx;
		width: 344rpx;
		height: 348rpx;
	}

	.canui-dtimg-b {
		height: 348rpx;
		width: 100%;
	}

	.canui-dtimg-ba,
	.canui-dtimg-bb {
		height: 172rpx;
	}

	.canui-dtimg-bb {
		margin-top: 5rpx;
	}

	.canui-dtimg-content {
		position: relative;
	}

	.canui-dtimg-content,
	.canui-duotu image {
		width: 100%;
		height: 100%;
	}


	.canui-dtimg-text {
		position: absolute;
		bottom: 0px;
		background: rgba(0, 0, 0, 0.4);
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 15rpx;
	}

	.canui-dtimg-text .text-white {
		float: left;
		width: auto;
		max-width: 210rpx;
		margin-right: 10rpx;
		color: #aaa;
	}

	.canui-dtimg-text .text-price {
		float: right;
	}

	.canui-dtimg-a .canui-dtimg-text {
		border-radius: 0 0 0 10rpx;
	}

	.canui-dtimg-b .canui-dtimg-text .text-white {
		max-width: 150rpx;
	}

	.cu-card>.cu-item {
		margin-top: 0rpx;
	}

	.cu-card>.margin-top {
		margin-top: 30rpx;
	}

	/* end */

	/* 点击回到顶部 */

	.goTop image {
		height: 60rpx;
		width: 60rpx;
		border-radius: 100%;
		position: fixed;
		bottom: 150rpx;
		right: 60rpx;
		z-index: 10000;
	}

	/* end */

	/* 撑高线条 */
	.lines {
		display: flex;
		width: 100%;
		height: 150rpx;
	}

	/* end */

	/* 页脚 */
	.foot {
		display: flex;
		padding: 10rpx;
		align-items: center;
		justify-content: space-between;
	}

	.foot-1 {
		width: 35%;
		height: 1rpx;
		background: gainsboro;
	}

	/* end */

	/* 登陆按钮 */
	.loginButton {
		width: 100%;
	}

	/* end */

	.all {}

	.all image {
		width: 50rpx;
		height: 50rpx;
		display: block;
		margin: 0 auto;
		margin-bottom: 6rpx;
	}

	.all text {
		display: block;
	}
</style>
