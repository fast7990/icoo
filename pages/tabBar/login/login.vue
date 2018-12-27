<template>
	<view v-if="canIUse">
		<view class='header'>
			<image src='../../../static/img/login/icoologo.png'></image>
		</view>
		<view class="page-section" style="text-align: center;margin-top: 50upx;" v-show="!show_status">
			<text style="font-size:36upx;">爱氪生活</text>
		</view>
		<view class="page-section grant" v-show="show_status">
			<view class='content'>
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像等)</text>
			</view>
			<button class='bottom' type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">
				授权登录
			</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				//判断小程序的API，回调，参数，组件等是否在当前版本可用。
				canIUse: wx.canIUse('button.open-type.getUserInfo'),
				show_status: false,
			}
		},
		computed: {
			...mapState({ //这里的...不是省略号了,是对象扩展符
				$globalData: 'globalData'
			}),
		},
		onLoad: function(option) {
			console.log('login', option);
			this.$store.commit('set_shareFriendCode', option.shareFriendCode);
			let homeTimer = this.$store.state.homeTimer;
			if (homeTimer != null) {
				clearInterval(homeTimer);
				this.$store.commit('set_homeTimer', null);
			}
			var that = this;
			// 查看是否授权
			wx.getSetting({
				success: function(res) {
					console.log('wxseting', res)
					if (res.authSetting['scope.userInfo']) {
						wx.getUserInfo({
							success: function(res) {
								console.log('已授权获取用户信息', res);
								that.$store.commit('set_globalData', {
									encryptedData: res.encryptedData,
									iv: res.iv,
									userInfo: res.userInfo
								});
								//用户已经授权过
								that.getlogin();
							}
						});
					} else {
						that.show_status = true;
					}
				}
			})
		},
		methods: {
			...mapMutations(['set_userCode', 'set_invitationCode', 'set_token', 'set_score', 'set_headpicUrl', 'set_nickName',
				'set_BLEDriverData'
			]),
			getlogin: function() {
				let that = this;
				wx.login({
					success(res) {
						let code = res.code; //登录凭证
						that.queryUserCode(code);
						console.log('code码', code);
					},
					fail(res) {
						console.log('err', res)
					}
				});
			},
			queryUserCode: function(code) {
				let that = this;
				wx.request({
					url: this.$globalData.urlPath + 'app/wx/xcxHasUserLogin',
					data: {
						code: code
					},
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success: function(res) {
						console.log(res);
						if (res.data.status == 1) {
							let result = res.data.data;
							that.loginHome(result);
						} else {
							uni.showToast({
								icon: 'none',
								title: '登录失败请重新验证',
								success: function() {
									uni.navigateTo({
										url: '../register/register'
									});
								}
							});
						}
					},
					fail: function(err) {
						console.log('err', err)
					}
				});
			},
			loginHome: function(result) {
				this.set_userCode(result.userCode);
				this.set_invitationCode(result.invitationCode);
				this.set_token(result.token);
				this.set_score(result.score);
				this.set_headpicUrl(result.headpicUrl);
				this.set_nickName(result.nickName);
				this.set_BLEDriverData('');
				setTimeout(function() {
					uni.switchTab({
						url: '../home/home',
					});
				}, 1500);
			},
			bindGetUserInfo: function(e) {
				console.log(e)
				var that = this;
				if (e.detail) {
					//用户按了允许授权按钮
					//首次授权成功后，跳转进入小程序注册页
					that.getlogin();
				} else {
					//用户按了拒绝按钮
					wx.showModal({
						title: '警告',
						content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
						showCancel: false,
						confirmText: '返回授权',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击了“返回授权”')
							}
						}
					})
				}
			},
			//获取用户信息接口
			queryUsreInfo: function() {
				let that = this;
				wx.request({
					url: this.$globalData.urlPath + 'hstc_interface/queryByOpenid',
					data: {
						openid: this.$globalData.openid
					},
					header: {
						'content-type': 'application/json'
					},
					success: function(res) {
						console.log(res.data);
						that.$store.commit('set_globalData', {
							userInfo: res.data
						});
					}
				});
			}
		},
	}
</script>

<style scoped="scoped">
	.header {
		margin: 90upx 0upx 0upx;
		text-align: center;
		width: 100%;
		height: 300upx;
		line-height: 450upx;
	}

	.header image {
		width: 138upx;
		height: 138upx;
	}

	.grant {
		border-top: 1px solid #ccc;
		padding-top: 90upx;
		margin: 0 auto;
		width: 95%;
	}

	.content {
		margin-left: 50upx;
		margin-bottom: 90upx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40upx;
	}

	.bottom {
		border-radius: 80upx;
		margin: 70upx 50upx;
		font-size: 35upx;
	}
</style>
