<template>
	<view>
		<view v-if="show">
			<form @submit="formSubmit" @reset="" enctype="multipart/form-data">
				<!-- 标题 -->
				<view class="cu-form-group margin-top">
					<view class="title">商品名称</view>
					<input bindinput="getTitleValue" name="title" v-model="InfoList.commodity_name"
						placeholder="请输入商品名称"></input>
				</view>
				<!-- end -->

				<!-- 图片 -->
				<view class="cu-bar bg-white margin-top">
					<view class="action">
						商品图片
					</view>
					<view class="action">
						{{imgList.length}}/5
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
							:data-url="imgList[index]">
							<image :src="imgList[index]" mode='aspectFill'></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class="cuIcon-close"></text>
							</view>
						</view>

						<view class="solids" @tap="ChooseImage" v-if="imgList.length < 5">
							<input type="text" value="" />
							<text class="cuIcon-cameraadd"></text>
						</view>


					</view>
				</view>
				<!-- end -->


				<!-- 内容 -->
				<view class="cu-form-group margin-top">
					<view class="title">简介</view>
					<textarea name="content" maxlength="1000" v-model="InfoList.commodity_content"
						placeholder="请输入商品描述"></textarea>
				</view>
				<!-- end -->

				<!-- 地址选择 -->
				<view class="cu-form-group">
					<view class="title">地址选择</view>
					<view class="picker" @click="quanguo">
						<!-- <pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
							{{regionName}}
						</pick-regions> -->
						{{region}}
					</view>
				</view>
				<!-- end -->

				<!-- 价钱 -->
				<view class="cu-form-group margin-top">
					<view class="title">价格</view>
					<input type="digit" v-model="InfoList.commodity_price" placeholder="请输入价钱" maxlength='7'
						name="newPrice"></input>
				</view>
				<!-- end -->

				<!-- 联系电话 -->
				<view class="cu-form-group margin-top">
					<view class="title">联系电话</view>
					<input bindinput="getTitleValue" name="title" v-model="InfoList.tel" placeholder="请输入手机号码"
						type="number"></input>
				</view>
				<!-- end -->
				<!-- 选择分类  -->

				<view class="cu-form-group">
					<view class="title">分类:</view>
					<input disabled="true" name="classify" :value='InfoList.category_name'></input>
					<button class="cu-btn  bg-yellow" role="button" aria-disabled="false" @tap="showModal"
						data-target="DrawerModalL">选择</button>
				</view>
				<!-- end -->
				<!-- 订单号 -->
				<!-- <view class="cu-form-group margin-top">
					<view class="title">(选填)订单号</view>
					<input bindinput="getTitleValue" name="title" v-model="InfoList.receipt" placeholder="请输入订单号"
						type="number"></input>
				</view> -->
				<!-- end -->


				<!-- 确定发布 -->
				<view class="padding flex flex-direction">
					<button class="cu-btn  margin-tb-sm lg fabu" form-type="submit">发布商品</button>
				</view>
				<!-- end -->
			</form>

		</view>



		<!-- 发布成功页面 -->
		<view class="success" v-else>
			<image src="../../../static/success.png" mode=""></image>
			<text>{{msg}}</text>

			<!-- 查看信息 -->
			<view class="look_messige" @tap="myIssue()">查看信息({{countdownTime}}s)</view>
			<!-- end -->
		</view>
		<view @touchmove.stop="modeMove" class=" cu-modal drawer-modal justify-start "
			:class=" modalName == 'DrawerModalL'?'show':'' " @tap="hideModal">
			<scroll-view scroll-with-animation='true' scroll-y='true' class="cu-dialog basis-lg">
				<view class="cu-list menu text-left">
					<view class="cu-item " v-for=" (item,index) in  pickers" :key="index"
						@tap="getClassify(item.id,item.name)" :data-name="item.name" :data-value="item.id">
						<view class="content">
							<view>{{item.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import pickRegions from '../../../components/pick-regions/pick-regions.vue'
	// import uploadOSS from '../../unitl/uploadOSS.js'
	import OSS from 'ali-oss'
	export default {
		components: {

			pickRegions
		},
		data() {
			return {
				countdownTime: 5, //倒计时
				region: '全国', //市名称
				defaultregion: [{
					name: '全国'
				}, {
					name: '全国'
				}, {
					name: '全国'
				}],
				modalName: '', //模态框开关
				pickers: [
					// {classify_id:1,classify_name:'手机'},
				],
				classify: '', //分类选择默认
				defaultRegion: ['广东省', '广州市', '番禺区'],
				defaultRegionCode: '00',

				imgList: [], //图片上传
				show: true,
				shop_all: {},
				msg: '',
				InfoList: {}
			}
		},
		// computed: {
		// 	regionName() {
		// 		// 转为字符串
		// 		return this.region.map(item => item.name).join(' ')
		// 	}
		// },
		methods: {

			// 选择地址
			// 获取选择的地区
			// handleGetRegion(region) {
			// 	this.region = region
			// },
			// end
			quanguo() {
				console.log('全国')
				uni.navigateTo({
					url: '../../home/citySelect/citySelect'
				})
			},
			thisTime() {
				let len = 32
				var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
				var maxPos = chars.length
				var pwd = ''
				for (let i = 0; i < len; i++) {
					pwd += chars.charAt(Math.floor(Math.random() * maxPos))
				}

				return pwd
			},


			// 图片上传
			ChooseImage() {
				uni.chooseImage({
					count: 5, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						let client = new OSS({
							region: 'oss-cn-beijing',
							success_action_status: '200', // 默认200
							accessKeyId: 'LTAI5tCePnicpEFgTZhr5uv2',
							accessKeySecret: 'rXkIFkwRBzBKqGOnKshCVjofwjIEZ2',
							bucket: 'zmhx', // OSS仓库名
						});
						let curTime = new Date();
						let year = curTime.getFullYear();
						let month = curTime.getMonth() + 1;
						let day = curTime.getDate();
						let dir = 'api/images/' + year + '/' + (month < 10 ? '0' + month : month) + '-' + (
							day < 10 ? '0' + day : day) + '/';
						// client.multipartUpload(dir+this.thisTime(), res.tempFiles[0]).then(ress=>{
						//   console.log(ress);//此处就已经上传成功了
						//    this.imgList.push(ress.res.requestUrls[0])
						// })
						// console.log(this.imgList)
						if (res.tempFilePaths.length <= 5) {
							for (var i = 0; i < res.tempFilePaths.length; i++) {
								client.multipartUpload(dir + this.thisTime(), res.tempFiles[i]).then(ress => {
									console.log(ress); //此处就已经上传成功了	
									let imgUrl = ress.res.requestUrls[0].split('?')
									this.imgList.push(imgUrl[0])
								})
							}

						} else {
							uni.showToast({
								title: '做多五张图片',
							})
						}

					},

				})

			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			// 删除照片
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除这个照片吗？',
					cancelText: '再看看',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1);
							this.imgList = this.imgList
						}
					}
				})
			},

			//限制只能到小数点2位
			moneyInput: function(e) {
				var money;
				if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
					money = e.detail.value;
				} else {
					money = e.detail.value.substring(0, e.detail.value.length - 1);
				}
				this.money = money;
			},
			// 拦截模态框滚动事件
			modeMove: function() {

			},
			// 获取分类
			classShop() {
				this.$request('index/goodsCategoryAll').then(res => {
					console.log(res)
					this.pickers = res.data
				})
			},

			// 显示分类模态框
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			// 隐藏分类模态框
			hideModal(e) {
				this.modalName = null
			},
			// 得到分类的值
			getClassify(id, name) {


				this.InfoList.commodity_category_id = id
				this.InfoList.category_name = name,
					// 	this.classify_id = e.currentTarget.dataset.value
					this.hideModal();
			},
			//确定发布
			formSubmit() {
				if (!this.InfoList.tel) { //判断如果手机号为空，提示用户输入手机号
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				} else if (!this.InfoList.commodity_name) {
					uni.showToast({
						title: '请输入商品简介',
						icon: 'none'
					})
					return
				} else if (!this.InfoList.commodity_content) {
					uni.showToast({
						title: '请输入商品简介',
						icon: 'none'
					})
					return
				} else if (!this.InfoList.commodity_price) {
					uni.showToast({
						title: '请输入商品价格',
						icon: 'none'
					})
					return
				}
				// this.show = false
				let submit = {
					id: this.InfoList.id,
					commodity_category_id: this.InfoList.commodity_category_id,
					commodity_name: this.InfoList.commodity_name,
					commodity_num: this.InfoList.commodity_name, /////////
					commodity_image: this.imgList.join(','),
					commodity_price: this.InfoList.commodity_price,
					commodity_content: this.InfoList.commodity_content,
					tel: this.InfoList.tel,
					///省市区
					receipt: this.InfoList.dingdan,
					province: 1,
					city: this.region,
					area: 1
				}
				console.log(submit)

				this.$request('secondhand/edit', submit).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.show = false
						this.shop_all = {}
						this.imgList = []
						this.region = uni.getStorageSync("cityName", '全国')
						this.msg = res.msg
						this.classify = ''
						console.log(this.msg)
					}
				})


				this.countdownTime = 5
				let timer = setInterval(() => {
					this.countdownTime--;
					if (this.countdownTime < 1) {
						clearInterval(timer)
						this.countdownTime = 0
						this.show = true
					}
				}, 1000)

			},
			myIssue() {
				uni.navigateTo({
					url: '../my/my_issue/my_issue'
				})
			},
			getSecondHandList(ids) { //获取发布商品的详情
				this.$request('secondhand/getone', {
					id: ids
				}).then(res => {
					if (res.code == 1) {
						this.InfoList = res.data
						this.imgList = this.InfoList.commodity_image
						this.classify = this.InfoList
						this.region = this.InfoList.city
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
					uni.showToast({
						title: err.msg,
						icon: 'error',
						duration: 2000
					});
				});
			}
		},
		onLoad(options) {
			this.classShop() //获取分类
			this.getSecondHandList(options.id)

		},
		onShow() {
			this.region = uni.getStorageSync('cityName');
		},
		onHide() {

		},
		// 出发下拉刷新
		onPullDownRefresh() {
			// 模拟刷新完成
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		}
	}
</script>

<style lang="scss" scoped>
	.rule {
		display: flex;
		justify-content: space-between;
	}

	.margin-top-xl-170 {
		margin-top: 170rpx;
	}

	.fabu {
		background: linear-gradient(90deg, #FCAB1D, #FC8321);
		color: #FFFFFF;
		font-size: 36rpx;
	}

	.success {
		padding-top: 120rpx;

		image {
			width: 207rpx;
			height: 207rpx;
			display: block;
			margin: 0 auto;
		}

		text {
			display: block;
			text-align: center;
			margin-top: 78rpx;
			font-size: 46rpx;
			font-weight: 400;
		}

		.look_messige {
			width: 673rpx;
			height: 95rpx;
			background-image: url(../../../static/lookbgc.png);
			background-size: 673rpx 95rpx;
			background-repeat: no-repeat;
			text-align: center;
			color: #FFFFFF;
			line-height: 95rpx;
			font-size: 36rpx;
			margin: 0 auto;
			margin-top: 143rpx;
		}
	}
</style>
