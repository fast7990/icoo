<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section uni-column" style="margin-top: 200upx;">
				<view class="input-group uni-column align-center">
					<view class="input-row align-center">
						<image src="../../../static/img/login/name.png" mode=""></image>
						<input type="text" v-model="mobile" placeholder="请输入手机号" style="width: 100%;">
					</view>
					<view class="input-row align-center">
						<image src="../../../static/img/login/shoujiyanzheng.png" mode=""></image>
						<input type="text" v-model="verifyCode" placeholder="请输入验证码" style="flex: 1;">
						<view class="code justify-center" @tap="getVerifyCode" style="height: 2em;width: auto;">
							点击获取验证码
						</view>
					</view>
				</view>
			</view>
			<view class="page-section justify-center" style="margin-top: 150upx;">
				<view class="btn-row">
					<button type="primary" class="primary" @tap="bindLogin" hover-class="uni-list-cell-hover">确定</button>
				</view>
			</view>
		</view>
		<view class="imgbg">
			<image src="../../../static/img/login/bglogin.jpg" mode=""></image>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				bgimgsrc: 'http://hashcredit.io/html/img/loginbg.png',
				userInfo: '',
				mobile: '',
				verifyCode: '',
				encryptedData: '',
				iv: '',
				code: '',
				losetime: 0,
			};
		},
		computed: {
			...mapState({ //这里的...不是省略号了,是对象扩展符
				$globalData: 'globalData'
			})
		},
		methods: {
			bindLogin() {
				let that = this;
				if (this.mobile.length < 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号输入错误'
					});
					return;
				}
				if (this.verifyCode.length < 4) {
					uni.showToast({
						icon: 'none',
						title: '验证码错误'
					});
					return;
				}
				let data = {
					userCode: this.$store.state.userCode,
					token: this.$store.state.token,
					mobile: this.mobile,
					verificationCode: this.verifyCode,
				}
				console.log(data);
				this.$api.updateMobile(data, function(res) {
					console.log(res);
					if (res.data.status == 1) {
						uni.showToast({
							title: '更新成功',
							mask: false,
							duration: 1500,
							success: function() {
								uni.switchTab({
									url: '../../tabBar/my/my'
								});
							}
						});
					} else {
						uni.showToast({
							title: res.data.msg,
							mask: false,
							icon: 'none',
							duration: 1500
						});
					}
				}, function(err) {
					console.log(err);
				});
			},
			getVerifyCode() {
				let that = this;
				let time = new Date().getTime();
				if (this.losetime > time) {
					let t = parseInt((this.losetime - time) / 1000);
					uni.showToast({
						icon: 'none',
						title: '请等待' + t + '秒后重发'
					});
					return;
				}
				if (this.mobile.length < 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号输入错误'
					});
					return;
				}
				let data = {
					mobile: this.mobile
				}
				this.$api.sendVerifyCode(data, function(res) {
					console.log(res);
					if (res.data.status == 1) {
						let newtime = new Date().getTime();
						that.losetime = newtime + 30000;
						uni.showToast({
							icon: 'success',
							title: '验证码已发送'
						});
					}
				}, function(err) {
					console.log(err);
				});
			}
		},
	}
</script>

<style scoped>
	page,
	view {
		display: flex;
		/* uni-app默认使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。若不需要flex布局可删除本行*/
	}

	.page,
	.page-body {
		width: 100%;
		height: 100%;
	}

	.page-body {
		position: relative;
		left: 0;
		top: 0;
		z-index: 3;
	}

	.page {
		position: relative;
	}

	.imgbg {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 1;
	}

	.imgbg image {
		width: 100%;
		height: 100%;
	}

	.input-row {
		width: 480upx;
		padding: 0 20upx;
		border-radius: 10upx;
		background: rgba(255, 255, 255, 0.5);
		margin: 22upx 0;
	}

	.input-row image {
		width: 32upx;
		height: 34upx;
		margin-right: 15upx;
	}

	.input-row input {
		padding: 22upx 0;
		font-size: 26upx;
		color: #000000;
	}

	input:-webkit-input-placeholder {
		/* WebKit browsers */
		color: #000000;
	}

	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #000000;
	}

	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #000000;
	}

	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #000000;
	}

	.toplogo {
		margin: 150upx 0 125upx;
	}

	.code {
		font-size: 24upx;
		line-height: 48upx;
		padding: 0 20upx;
		border-radius: 50upx;
		background: #19595b;
		color: #FFFFFF;
	}

	.btn-row button {
		font-size: 26upx;
		line-height: 1em;
		background: #35737a;
		color: #FFFFFF;
		padding: 30upx 130upx;
		border-radius: 50upx;
	}
</style>
