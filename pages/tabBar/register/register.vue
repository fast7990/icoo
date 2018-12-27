<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section uni-column">
				<view class="justify-center toplogo">
					<image src="../../../static/img/icoologo.png" mode="" style="width: 138upx;height: 138upx;"></image>
				</view>
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
					<button type="primary" class="primary" @tap="bindLogin" hover-class="uni-list-cell-hover" :disabled="submit_status">注册并登录</button>
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
				submit_status: true,
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
		onLoad: function() {
			let that = this;
			this.getUserInfofs(function() {
				that.submit_status = false;
			});
		},
		methods: {
			getUserInfofs: function(callback) {
				let that = this;
				wx.getUserInfo({
					success: function(res) {
						console.log('已授权获取用户信息', res);
						that.encryptedData = res.encryptedData;
						that.iv = res.iv;
						that.userInfo = res.userInfo;
						wx.login({
							success: function(res) {
								console.log(res)
								that.code = res.code; //登录凭证
								console.log('code码', res.code);
								callback();
							}
						})
					}
				});
			},
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
				let register_data = {
					code: this.code,
					mobile: this.mobile,
					verifyCode: this.verifyCode,
					encryptedData: this.encryptedData,
					iv: this.iv,
					parentCode: this.$store.state.shareFriendCode
				}
				console.log(register_data);
				wx.request({
					url: this.$globalData.urlPath + '/app/wx/xcxRegistlogin',
					data: register_data,
					method: 'POST',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: function(res) {
						console.log(res)
						if (res.data.status == 1) {
							that.$store.commit('set_userCode', res.data.userCode);
							that.$store.commit('set_invitationCode', res.data.invitationCode);
							that.$store.commit('set_token', res.data.token);
							that.$store.commit('set_score', res.data.score);
							uni.showToast({
								icon: 'success',
								title: '注册成功',
								success: function() {
									uni.switchTab({
										url: '../home/home'
									})
								}
							});
						} else if (res.data.status == 0) {
							uni.showToast({
								icon: 'none',
								title: res.data.msg
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: '注册失败'
							});
						}
					},
					fail: function(err) {
						console.log('err', err)
					}
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
