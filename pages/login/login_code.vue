<template>
	<view class="login">
		<view class="bgc">
			<view class=" from bg-white ">
				<text>手机快速注册</text>
			</view>
			<view class="user">
				<view class="phone">
					<image src="../../static/login/phone.png" mode=""></image>
					<input class="input" type="number"
						onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="codes.mobile"
						value="" placeholder="手机号码" />
					<text class="code" @click="checking" v-if="state===false">获取验证码</text>
					<view class="code time" v-if="state===true">倒计时{{ currentTime }}s</view>
				</view>
				<view class="pass">
					<image src="../../static/login/pass.png" mode=""></image>
					<input class="input" type="number"
						onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
						v-model="login_user.code" value="" placeholder="请输入短信验证码" />
				</view>
				<view class="denglu" @tap="logins">登录</view>
			</view>
			<view class="zhuce" @tap="zhuce()">已有账号!去登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: false, //是否开启倒计时
				totalTime: 60, //总时间，单位秒
				recordingTime: 0, //记录时间变量
				currentTime: 0, //显示时间变量

				codes: { //发送验证码

					"mobile": '',
					"type": "resiger"

				},
				login_user: { //发送登录

					"mobile": '',
					"type": 'login',
					"code": ""

				}
			}
		},
		onLoad() {},
		methods: {
			checking() {
				//把显示时间设为总时间
				this.currentTime = this.totalTime;
				//开始倒计时
				this.state = true;
				//执行倒计时
				this.checkingTime();
				this.login_user.mobile = this.codes.mobile
				this.$request('user/send_sms', this.codes, 'POST').then((res) => {
					if (res.code == 1) {
						uni.showToast({
							title: res.msg,
							type: "success"
						})
					} else {
						uni.showToast({
							title: res.msg,
							type: "error"
						})
					}
				})
			},
			checkingTime() {
				let that = this;
				//判断是否开启
				if (this.state) {
					//判断显示时间是否已到0，判断记录时间是否已到总时间
					if (this.currentTime > 0 && this.recordingTime <= this.totalTime) {
						//记录时间增加 1
						this.recordingTime = this.recordingTime + 1;
						//显示时间，用总时间 - 记录时间
						this.currentTime = this.totalTime - this.recordingTime;
						//1秒钟后，再次执行本方法
						setTimeout(() => {
							//定时器内，this指向外部，找不到vue的方法，所以，需要用that变量。
							that.checkingTime();
						}, 1000)
					} else {
						//时间已完成，还原相关变量
						this.state = false; //关闭倒计时
						this.recordingTime = 0; //记录时间为0
						this.currentTime = this.totalTime; //显示时间为总时间
					}
				} else {
					//倒计时未开启，初始化默认变量
					this.state = false;
					this.recordingTime = 0;
					this.currentTime = this.totalTime;
				}
			},


			//登录
			logins() {

				let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/ //正则表达式定义手机号正确格式


				if (!this.codes.mobile) { //判断如果手机号为空，提示用户输入手机号
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				} else if (!reg.test(this.codes.mobile)) { //判断手机号格式是否正确
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
					return
				}

				let code_numbers = / ^ [^\s?<>\'\"!@%#$~&*():;]* $ / //判断是否输入验证码
				if (!this.login_user.code) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
				} else {
					this.login_user.mobile = this.codes.mobile
					//发送请求
					this.$request('user/login', this.login_user, 'POST').then(res => {
						console.log(res)
						if (res.code == 1) {
							uni.reLaunch({
								url: '../home/home'
							})
						} else {
							uni.showToast({
								title: '验证码错误,登录失败!',
								icon: 'none'
							})
						}
						uni.setStorageSync('mobile', res.data.mobile)
						uni.setStorageSync("token", res.data.token)
					})
					setTimeout(() => {
						this.codes.mobile = ''
						this.login_user.code = ''
					}, 2000)

				}
			},
			zhuce() {
				uni.reLaunch({
					url: './login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
	}

	.login {
		width: 100%;
		height: 100%;
		background-image: url(../../static/login/loginbgc.png);
		display: flex;
		justify-content: center;
		align-items: center;

		.bgc {
			background-repeat: no-repeat;
			background-size: 100% auto;
			background-position: left;
			position: relative;

			.from {
				width: 676.4rpx;
				height: 656.1rpx;
				border-radius: 28rpx;

				text {
					display: block;
					text-align: center;
					padding-top: 77rpx;
					font-size: 32rpx;
					color: #333333;
					font-weight: bold;
				}
			}

			.user {
				position: absolute;
				top: 204rpx;
				left: 15rpx;
				width: 643rpx;

				.phone {
					display: flex;
					padding-bottom: 13rpx;
					border-bottom: 1rpx solid #EEEEEE;
					align-items: center;
					padding-left: 37rpx;

					image {
						display: block;
						width: 26rpx;
						height: 43rpx;
					}

					.input {
						padding-left: 30rpx;
						color: #999999;
						font-size: 23rpx;
					}

					.code {
						color: #999999;
						font-size: 20rpx;
						margin-left: 120rpx;
					}
				}

				.pass {
					display: flex;
					margin-top: 72rpx;
					padding-bottom: 21rpx;
					border-bottom: 1rpx solid #EEEEEE;
					padding-left: 37rpx;

					image {
						display: block;
						width: 26rpx;
						height: 33rpx;
					}

					.input {
						padding-left: 30rpx;
						color: #999999;
						font-size: 23rpx;
					}
				}

				.denglu {
					width: 594rpx;
					height: 77rpx;
					margin: 0 auto;
					text-align: center;
					margin-top: 94rpx;
					line-height: 77rpx;
					background-color: #FEC746;
					border-radius: 27rpx;
					color: #FFFFFF;
					font-size: 30rpx;
				}
			}

			.zhuce {
				text-align: center;
				margin-top: 66rpx;
				color: #333333;
				font-size: 24rpx;
			}
		}
	}
</style>
