<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section">
				<view class="user-list panel uni-column">
					<view class="top uni-column align-center">
						<view class="left" style="">
							<image :src="headpicUrl?headpicUrl:noneimg" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="right uni-column align-center">
							<text style="font-size: 26upx;">{{nickName?nickName:''}}</text>
							<text style="font-size: 24upx;">--每天吸爱氪电子烟{{my_data.targetPuffsTime}}口</text>
						</view>
					</view>
					<view class="user-card">
						<view class="user-card-list" style="flex: 1;">
							<view class="list">
								<text>挑战金</text>
								<text>{{my_data.pledgeSocre}}积分</text>
							</view>
							<view class="list">
								<text>坚持天数</text>
								<text>{{my_data.seriesDays}}/7</text>
							</view>
							<view class="list">
								<text>围观</text>
								<text>{{my_data.supportTotalNum}}</text>
							</view>
						</view>
					</view>
					<view class="last">
						<text>Tips：挑战成功将获得{{my_data.targetScore}}积分</text>
						<text @tap="tryAgain">{{activeStatusInfo}}</text>
					</view>
				</view>
			</view>
			<view class="page-section uni-column" style="height: 80%;overflow-y: auto;">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				 @scroll="scroll">
					<view class="uni-column" style="width: 100%;">
						<view class="list-msg justify-center" v-for="(item,index) in list_msg" :key="index">
							<view class="align-center" style="flex: 9;">
								<text>{{"挑战开始时间" + item.statisticsDate + " 挑战" + (item.dayStatus == 0 ? "失败" : "成功" + item.puffsTime + "口")}}</text>
							</view>
							<view class="uni-column align-center" style="flex: 1;">
								<image src="../../../static/img/dianzan.png" mode="" style="width: 45upx;height: 45upx;"></image>
								<text style="font-size: 17upx;color: #5e9196;">{{item.supportNum}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="align-center uni-column" v-if="list_msg.length==0">
					<image src="../../../static/img/nomoredata.jpg" mode="" style="width: 200upx;height: 130upx;margin-top: 100upx;"></image>
					<text style="font-size: 24upx;margin-top: 50upx;">暂无更多数据</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noneimg: '../../../static/img/nopicture.png',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				headpicUrl: '',
				nickName: '',
				activeStatusInfo: '',
				my_data: {
					activeStatus: 0,
					endDate: 0,
					pledgeSocre: 0,
					seriesDays: 0,
					startDate: 0,
					supportTotalNum: 0,
					targetDays: 7,
					targetPuffsTime: 0,
					targetScore: 0
				},
				list_msg: []
			};
		},
		onLoad: function() {
			this.headpicUrl = this.$store.state.headpicUrl;
			this.nickName = this.$store.state.nickName;
		},
		onShow: function() {
			this.initData();
		},
		methods: {
			initData() {
				let that = this;
				this.$api.activePage({
					userCode: this.$store.state.userCode,
					token: this.$store.state.token
				}, function(res) {
					console.log(res);
					if (res.data.status == 1) {
						that.setChallengeData(res.data.data);
					}
				}, function(err) {
					console.log(err)
				});
			},
			setChallengeData(value) {
				if (typeof value === 'object') {
					this.my_data = value;
					// 活动状态（ 0-失败 1-进行中 2-成功 3-已领取奖励）
					switch (this.my_data.activeStatus) {
						case 0:
							this.activeStatusInfo = '挑战失败-点击重新挑战';
							break;
						case 1:
							this.activeStatusInfo = '挑战进行中';
							break;
						case 2:
							this.activeStatusInfo = '挑战成功-点击领取奖励';
							break;
						case 3:
							this.activeStatusInfo = '已领取奖励';
							break;
						default:
							break;
					}
				}
				if (Array.isArray(value.puffsList)) {
					this.list_msg = value.puffsList;
				}
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				})
			},
			tryAgain: function() {
				let that = this;
				if (this.my_data.activeStatus == 2) {
					this.$api.getActiveReward({
						userCode: this.$store.state.userCode,
						token: this.$store.state.token,
					}, function(res) {
						if (res.data.status == 1) {
							uni.showToast({
								title: '领取成功获得积分' + res.data.data,
								icon: 'success',
								mask: false,
								duration: 1500
							});
							that.my_data.activeStatus = 3;
						} else {
							uni.showToast({
								title: res.data.msg,
								mask: false,
								duration: 1500
							});
						}
					}, function(err) {
						console.log(err)
					});
				} else if (this.my_data.activeStatus == 0) {
					uni.navigateTo({
						url: '../challengeTarget/challengeTarget'
					});
				}
			}
		},
	}
</script>

<style scoped>
	page,
	view {
		display: flex;
	}

	.page,
	.page-body {
		height: 100%;
		overflow: hidden;
	}

	.page-body {
		padding: 60upx 30upx 0;
	}

	text {
		color: #17393C;
	}

	.page-body,
	.page-section {
		box-sizing: border-box;
	}

	.panel {
		background: #FFFFFF;
		padding: 0 0 40upx;
	}

	.panel .top {
		position: relative;
		margin-bottom: 40upx;
	}

	.panel .top .left {
		position: absolute;
		top: -50upx;
		width: 124upx;
		height: 124upx;
		border-radius: 100%;
		overflow: hidden;
	}

	.panel .top .right {
		padding-top: 80upx;
	}

	.top,
	.last {
		padding: 0 60upx;
	}

	.last {
		justify-content: space-between;
	}

	.last text {
		font-size: 24upx;
	}

	.user-card-list {
		padding: 20upx 0;
	}

	.user-card-list .list {
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.user-card-list .list:nth-child(2) {
		border-left: solid 1upx #5e9196;
		border-right: solid 1upx #5e9196;
	}

	.user-card-list .list text:nth-child(1) {
		font-size: 24upx;
		line-height: 48upx;
	}

	.user-card-list .list text:nth-child(2) {
		font-size: 30upx;
		line-height: 60upx;
	}

	.list-msg {
		padding: 40upx 0 20upx;
		border-bottom: 1upx solid #d8d8d8;
	}

	.list-msg view:nth-child(1) text {
		color: #17393c;
		font-size: 26upx;
	}
</style>
