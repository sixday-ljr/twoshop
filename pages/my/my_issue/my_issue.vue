<template>
	<view>
		<!-- 内容 -->
		<view class='pa'>

			<view class='contianer shadow-warp bg-white padding-sm' v-for="(item,index) in releaseList" :key="index">

				<view class='contianer-title'>
					<view class='contianer-title_1 text-cut'><text class='text-cut'>{{item.commodity_name}}</text>
					</view>
					<!-- <view class='contianer-title_2 text-cut'><text  class='text-cut'>1小时前来过</text></view> -->
				</view>


				<view class='item-inline-1_1'><text decode='true'>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</text></view>
				<scroll-view scroll-x="true" style=" white-space: nowrap; display: flex" class='top-20'>
					<block v-for="(url,index) in item.commodity_image" :key="index">
						<view class='item-inlines'>
							<navigator url='' hover-class='none'>
								<view class="item-inline bg-img padding-top-xl flex align-end"
									:style=" 'background-image: url(' +url +');' ">
								</view>
							</navigator>
						</view>
					</block>
				</scroll-view>

				<view class='container-price_desc'>
					<view class="cu-capsule round view-width">
						<view class="cu-tag bg-red ">
							价钱
						</view>
						<view class="cu-tag line-red">
							{{item.commodity_price}}
						</view>
					</view>
				</view>


				<view class='container-compile'>
					<!-- <view class="cu-tag line-yellow" @tap='show_model'>降价</view> -->
					<!-- {{item.commodity_status}}
					<view class="cu-tag line-yellow" @tap='toIssue' v-if="item.commodity_status=2">已售出</view>
					<view class="" v-else> -->
					<view class="cu-tag line-yellow" @tap='actionSheetTap(item.id)'>
						{{shelves_status[item.commodity_status]}}
					</view>
					<view class="cu-tag line-yellow" @tap='toIssue(item.id)'>编辑</view>
				</view>

				<view class='container-line'></view>

			</view>
		</view>
		<luanqing-empty :show="emptyFlag" :text="emptyMsg" textColor="#C0C0C0"></luanqing-empty>

		<!-- end -->

		<!-- 自定义弹窗 降价-->
		<view class='showModel bg-white' @touchmove.stop='pageModel' v-if="show_model_state">

			<view class='model' @touchmove.stop='model_page'>

				<view class='model-close' @tap='close_Model'>
					<text class='cuIcon-roundclose text-df text-gray'></text>
				</view>

				<view class='model-title_desc'>

					<view class='model-title_desc-1'>
						<image src='https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'></image>
					</view>
					<view class='model-title_desc-2'>

						<view class='model-title_desc-2_1'><text class='model-title_desc-2_1_text'>现价</text><text
								class='text-price text-red' style='font-weight: 600;'>2000</text></view>
						<view class='model-title_desc-2_2'><text class='model-title_desc-2_2_1_text'>降价至</text><text
								class='text-price model-title_desc-2_2_text'>{{dep_price}}</text></view>

					</view>
				</view>

				<view class='slect_model'>
					<!-- #ifndef APP-PLUS -->
					<view class="modle-select " :class="item.checked == true ? 'select_state' : '' "
						v-for=" (item,index) in re_price" :key=" 'idA'+ index" @tap='select_price'
						:data-price='item.price' :data-id='index'>
						<!-- #endif -->

						<!-- #ifdef MP -->
						<view class="modle-select " :class="item.checked == true ? 'select_state' : '' "
							v-for=" (item,index) in re_price" :key="index" @tap='select_price' :data-price='item.price'
							:data-id='index'>
							<!-- #endif -->

							<view class='modle-select-1'><text class='text-price text-red'>{{item.price}}</text></view>
							<view class='modle-select-2'><text>{{item.desc}}</text></view>
						</view>

					</view>

					<button class="cu-btn bg-green button-confirm ">确定</button>


				</view>

			</view>
			<!-- end -->

		</view>
</template>

<script>
	export default {
		data() {
			return {
				emptyFlag: false, //数据为空暂未图
				emptyMsg: '',
				releaseList: [], //我的发布列表
				//降价Model状态
				show_model_state: false,
				//上架状态
				shelves_status: ["未上架", "已上架", "已售出"],
				// 降价选择数据
				re_price: [{
						id: 0,
						price: 186,
						desc: '打1折极速卖'
					},
					{
						id: 1,
						price: 168,
						desc: '打3折出手快'
					},
					{
						id: 2,
						price: 888,
						desc: '打5折有竞争力'
					},
					{
						id: 3,
						price: 6688,
						desc: '打8折'
					},
				],
				dep_price: '',
				pageSet: 0 ,//分页
				datas:{
					page: 1,
					num: 5
				}
			}
		},
		onLoad: (options) => {
			this.getreleaseList()
		},
		onShow() {
			this.getreleaseList()
		},
		//上拉刷新
		onReachBottom: function() {
			console.log("出发上拉刷新事件");
			this.pageSet = 1
			this.getreleaseList()
		},
		methods: {
			//我的发布列表
			getreleaseList: function() {
				if (this.pageSet == 1) {
					this.datas.page++;
				}
				this.$request('secondhand/release', this.datas).then(res => {
					if (res.code == 1) {
						if (this.pageSet == 1) {
							this.releaseList.push(...res.data.data)
						} else {
							this.releaseList = res.data.data
						}
					} else if (res.code == 5) {
						uni.removeStorage({
							key: 'token',
							success: function(res) {
								console.log('success remove token');
							}
						});
						//请重新登录
						uni.navigateTo({
							url: '/pages/login/login'
						})
					} else if (res.code == 0) {
						this.emptyMsg = res.msg
						this.emptyFlag = true
					}
				}).catch((err) => {
					console.log(err);
					uni.showToast({
						title: err.msg,
						icon: 'error',
						duration: 2000
					});
				});
			},
			// 跳转到编辑页面
			toIssue: function(id) {
				uni.navigateTo({
					url: '../../issue/issue_edit/issue_edit?id=' + id
				})

			},

			// 拦截弹窗 滚动
			pageModel: function(e) {

			},
			// 拦截弹窗 滚动
			model_page: function(e) {

			},

			// end

			// 点击选择
			select_price: function(e) {
				var that = this;
				var id = e.currentTarget.dataset.id;
				var re_priceList = that.re_price;
				for (var i = 0; i < re_priceList.length; i++) {
					if (re_priceList[i].id == id) {
						re_priceList[i].checked = true;
					} else {
						re_priceList[i].checked = false;
					}
				}
				this.re_price = re_priceList,
					this.dep_price = e.currentTarget.dataset.price

			},

			// 关闭降价Model
			close_Model: function(e) {
				var that = this;
				this.show_model_state = false

				var re_priceList = that.re_price;
				for (var i = 0; i < re_priceList.length; i++) {
					if (0 == i) {
						re_priceList[0].checked = true;
					} else {
						re_priceList[i].checked = false;
					}
				}

				this.re_price = re_priceList;

			},
			// end

			// 点击显示 降价弹窗
			show_model: function(e) {
				var that = this;

				this.re_price = that.re_price,
					this.dep_price = that.re_price[0].price
				//end

				this.show_model_state = true;
			},

			// 显示编辑
			actionSheetTap: function(id) {
				uni.showActionSheet({
					itemList: ['上架', '下架'],
					success: (e) => {
						let data = {
							id: id,
							commodity_status: e.tapIndex
						}
						this.setShelves(data)
						//console.log(e.tapIndex) //上架0   下架1
					}
				})
			},
			//商品上下架
			setShelves: function(data) {
				this.$request('secondhand/isShelve', data).then(res => {
					if (res.code == 1) {
						this.getreleaseList()
					}
				}).catch((err) => {
					uni.showToast({
						title: err.msg,
						icon: 'error',
						duration: 2000
					});
				});
			}


		},

		onLoad(optins) {
			var that = this;
			//降价选择第一个
			that.re_price[0].checked = true;
		}
	}
</script>

<style scoped>
	.pa {
		padding: 20rpx;
	}

	/* 内容 */
	.contianer {
		width: 100%;
		height: 400rpx;
		margin-bottom: 20rpx;

	}

	.contianer-title {
		display: flex;


	}

	.contianer-title_2 {
		margin-right: 20rpx;
	}

	.contianer-title_2 text {
		font-size: 25rpx;
		color: gray;
	}

	.contianer-title_1 {
		font-size: 32rpx;
		color: black;
		width: 75%;
		margin-left: 20rpx;
		margin-bottom: 30rpx;
	}

	.item-inline-1_1 {
		width: 300rpx;
	}

	.item-inlines {
		display: inline-block;
	}

	.item-inline {
		display: inline-block;
		margin-right: 10rpx;
		height: 150rpx;
		width: 230rpx;
	}

	.container-price_desc {
		display: flex;
		margin-top: 60rpx;
		align-items: center;
		float: left;
	}

	.view-width {
		width: 70%;
	}

	.margin-left {
		margin-left: 20rpx;
	}

	.container-compile {
		display: flex;
		margin-top: 60rpx;
		justify-content: flex-end;
	}

	/* .container-line{
  margin-top: 20rpx;
  width: 93%;
  height: 3rpx;
  background-color: gainsboro;
  margin-left: 20rpx
} */
	/* end */

	/* <!-- 自定义弹窗 --> */
	.showModel {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 10;
		/* display: none; */
	}

	.model {
		padding: 30rpx;
		position: fixed;
		top: 500rpx;
		margin-left: 7%;
		border-radius: 20rpx;
		height: 650rpx;
		width: 650rpx;
		background: white;
	}

	.model-close {
		margin-top: 20rpx;
		display: flex;
		justify-content: flex-end;
		margin-right: 30rpx;
	}

	.model-title_desc {
		display: flex;
		align-items: center;
	}

	.model-title_desc-1 image {
		height: 130rpx;
		width: 130rpx;
	}

	.model-title_desc-2 {
		margin-left: 30rpx;
	}

	.model-title_desc-2_1 {
		margin-bottom: 40rpx;
		color: black;
		display: flex;
		align-items: center;
	}

	.model-title_desc-2_2 {
		color: black;
	}

	.model-title_desc-2_1_text {
		width: 100rpx;
	}

	.model-title_desc-2_2 {
		display: flex;
		align-items: center;
	}

	.model-title_desc-2_2_text {
		color: black;
		padding: 20rpx;
		background: gainsboro;
		border-radius: 10rpx;
	}

	.model-title_desc-2_2_1_text {
		width: 100rpx;
	}

	.modle-select {
		margin-top: 20rpx;
		height: 130rpx;
		width: 43%;
		background: gainsboro;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 10rpx;
		margin: 20rpx;
	}

	.modle-select-1 text {
		font-size: 32rpx;
		font-weight: 600;

	}

	.modle-select-2 text {
		font-size: 20rpx;
	}

	.modle-select-1 {
		margin-bottom: 20rpx;
	}

	.slect_model {
		display: flex;
		flex-wrap: wrap;
	}

	.button-confirm {
		width: 98%;
	}

	/* end */

	/* 选择样式 */
	.select_state {
		background: #fef2ce;
	}

	/* end */
</style>
