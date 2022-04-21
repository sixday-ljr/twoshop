<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-yellow title_top" isBack>
			<block slot="content">编辑地址</block>
			<block slot="right">
				<text class="text-white" @click="keeps()">保存</text>
			</block>
		</bar-title>

		<!--表单-->
		<view class="cu-form-group margin-top">
			<view class="title">收货人名</view>
			<input v-model="model.name" placeholder="您的姓名" />

		</view>
		<view class="cu-form-group">
			<view class="title">手机号码</view>
			<input v-model="model.tel" placeholder="卖家和快递员联系您的方式" type="number" />

		</view>
		<view class="cu-form-group">
			<view class="title">邮政编码</view>
			<input placeholder="" v-model="model.code" type="number" />

		</view>
		<view class="cu-form-group">
			<view class="title">所在地区</view>
			<view class="picker" @click="quanguo">
				<!-- <pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
					{{regionName}}
				</pick-regions> -->
				{{region}}
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">详细地址</view>
			<input placeholder="请输入详细的地址信息" v-model="model.location" />
		</view>
		<!-- 
		<view class="cu-list menu margin-top">
			<view class="cu-item">
				<view class="content">
					<text class="text-red">删除地址</text>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import barTitle from '../component/zaiui-common/basics/bar-title.vue';
	import pickRegions from '../../components/pick-regions/pick-regions.vue'
	import _tool from '../../static/zaiui/util/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
			pickRegions
		},
		data() {
			return {
				model: {},
				region: '全国', //市名称d
				deregion: [{
					name: '全国'
				}, {
					name: '全国'
				}, {
					name: '全国'
				}],
				defaultRegion: ['广东省', '广州市', '番禺区'],
				defaultRegionCode: '00',


			}
		},
		onLoad() {
			
		},
		onShow() {
			this.region = uni.getStorageSync('cityName');
		},
		// computed: {
		// 	regionName() {
		// 		// 转为字符串
		// 		return this.region.map(item => item.name).join(' ')
		// 	}
		// },
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
           
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},

			// // 获取选择的地区
			// handleGetRegion(region) {
			// 	this.region = region
			// },
			quanguo() {
				uni.navigateTo({
					url: '../home/citySelect/citySelect'
				})
			},
			//保存提交
			keeps() {
				const user_input = {
					phone: this.model.tel,
					name: this.model.name,
					token:uni.getStorageSync('token'),
					address: this.model.location,
					province: 1,
					city: this.region,
					area: 1
				}
				// console.log(user_input)
				this.$request('user/addressadd', user_input).then(res => {
					if (res.code == 1) {
						this.model = {}
						uni.setStorageSync("cityName", '全国')
						
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					} else if(res.code ==0) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})

			}
		},

	}
</script>

<style lang="scss" scoped>
	.wecanui-footer-fixed .flex-direction {
		padding: 18.18rpx;
	}
</style>
