<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section justify-center">
				<text style="font-size:50upx ;color: #FFFFFF;margin: 70upx 0;">爱氪科技</text>
			</view>
			<view class="page-section">
				<view class="fix uni-column align-center">
					<view class="uni-column align-center justify-center">
						<text style="font-size: 24upx;">您的专属邀请码</text>
						<text style="font-size: 74upx;">{{invitationCode}}</text>
						<view>
							<button class="share" type="primary" open-type="share">分享好友</button>
						</view>
						<text style="font-size: 26upx;margin-top:20upx;">邀请好友加入爱氪科技</text>
					</view>
					<view class="align-center">
						<view class="banjiao" style="left: -12upx;"></view>
						<view class="xuxian"></view>
						<view class="banjiao" style="right: -12upx;"></view>
					</view>
					<view class="justify-center">
						<view class="uni-column align-center">
							<view class="qrcode">
								<!-- <image src="../../../static/img/qrcode.jpg" mode=""></image>
								 -->
								<qrcode :val="qrval" :size="qrsize" ref="qrcode"></qrcode>
							</view>
							<text>扫码下载APP</text>
						</view>
					</view>
					<view class="justify-center" style="margin-top: 30upx;">
						<navigator url="../../tabBar/login/login">立即登录小程序</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import qrcode from '../../../components/qrcode/qrcode.vue'
	export default {
		data() {
			return {
				invitationCode: '',
				baseurl: 'https://www.icoo.tech',
				qrval: '',
				qrsize: 100,
			};
		},
		onLoad: function(option) {
			this.invitationCode = this.$store.state.invitationCode;
			this.qrval = this.baseurl + '/app/member/inviteRegister?code=' + this.invitationCode;
		},
		onReady: function() {
			this.creatQrcode();
		},
		onShareAppMessage: function() {
			let that = this;
			return {
				title: '分享给好友',
				path: '/pages/tabBar/login/login?shareFriendCode=' + that.invitationCode,
				desc: '转发小程序分享给好友',
				// imageUrl:'../../../static/clock.png',
				success: function(res) {
					console.log(res)
				}
			}
		},
		methods: {
			creatQrcode() {
				this.$refs.qrcode.creatQrcode();
			},
		},
		components: {
			qrcode
		}
	}
</script>

<style scoped="scoped">
	page,
	view {
		display: flex;
	}

	.page {
		flex: 1;
		height: 100%;
		background: #183b3e;
	}

	.page-body {
		box-sizing: border-box;
	}

	.fix {
		padding: 0 5%;
		box-sizing: border-box;
		width: 100%;
	}

	.fix>view {
		width: 660upx;
	}

	.fix>view:nth-child(1) {
		background: rgba(255, 255, 255, .3);
		border-top-left-radius: 30upx;
		border-top-right-radius: 30upx;
		padding: 80upx 0 45upx;
	}

	.fix>view:nth-child(2) {
		justify-content: space-between;
		background: rgba(255, 255, 255, .3);
	}

	.fix>view:nth-child(3) {
		background: rgba(255, 255, 255, .3);
		padding-bottom: 30upx;
		border-bottom-left-radius: 30upx;
		border-bottom-right-radius: 30upx;
	}

	.share {
		color: #FFFFFF;
		font-size: 30upx;
		border-radius: 50upx;
		background: #17393c;
		margin: 0;
	}

	.xuxian {
		height: 0;
		border-bottom: 2upx #000000 dashed;
		flex: 1;
	}

	.banjiao {
		width: 36upx;
		height: 36upx;
		background: #17393C;
		border-radius: 100%;
		position: relative;
	}

	.qrcode {
		margin-top: 40upx;
		margin-bottom: 30upx;
		padding: 10upx;
		background: #17393C;
	}

	.qrcode image {
		width: 255upx;
		height: 255upx;
	}
</style>
