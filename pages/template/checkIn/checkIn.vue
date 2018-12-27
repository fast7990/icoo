<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section" style="background: #17393c;">
				<view class="tabs" style="flex: 1;flex-wrap: wrap;justify-content: center;">
					<view class="checkin-tab uni-column" v-for="(item,index) in list" :key="index">
						<view class="label-view">
							<image :src="'../../../static/img/'+item.imgname+'.png'" v-if="item.state"></image>
							<image :src="'../../../static/img/'+item.imgname+'-1.png'" v-else></image>
						</view>
						<view class="justify-center">
							<text style="color: #FFFFFF;font-size: 22upx;">{{item.day}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section uni-column justify-center align-center checkin-log">
				<view class="uni-row" style="justify-content: space-between;margin-bottom: 20upx;">
					<text style="font-size:30upx;">11月</text>
					<text style="font-size:24upx;">已累计签到{{integral_day}}天</text>
				</view>
				<view class="uni-row" style="position: relative;">
					<view class="integral" v-for="(item,index) in list_day" :key="item">
						<view class="uni-column align-center">
							<view style="font-size: 16upx;color: #ea2022;align-items: center;line-height: 28upx;">
								<text style="font-size: 24upx;">{{item.day}}天</text>
							</view>
							<view class="uni-column justify-center align-center" style="margin-bottom: 10upx;margin-top: 10upx;">
								<image src="../../../static/img/bangbang.png" mode="" style="width: 25upx;height: 40upx;"></image>
								<image v-if="index===0" src="../../../static/img/tongpai.png" style="width: 50upx;height: 50upx;" mode=""></image>
								<image v-if="index===1" src="../../../static/img/yinpai.png" style="width: 50upx;height: 50upx;" mode=""></image>
								<image v-if="index===2" src="../../../static/img/jinpai.png" style="width: 50upx;height: 50upx;" mode=""></image>
							</view>
							<view>
								<text style="font-size: 26upx;line-height: 22upx;">{{item.integral}}积分</text>
							</view>
						</view>
					</view>
					<view class="integral-bg">
						<view :style="{width:speed_day}"></view>
					</view>
				</view>
				<view class="uni-row" style="padding: 120upx 0 126upx;">
					<button type="primary" class="user-btn" :class="signState==0?'':'checkInTure'" @tap="getReward" v-if="receivingState">{{signState==0?'领取奖励':'已领取'}}</button>
					<button type="primary" class="user-btn" :class="'checkInTure'" @tap="getReward" v-else>{{signState==0?'领取奖励':'已领取'}}</button>
				</view>
				<view class="uni-row justify-center">
					<navigator url="" style="color:#183b3e;font-size: 24upx;align-items: center;">查看规则说明<image src="../../../static/img/more2.png"
						 style="width: 13upx;height: 21upx;" mode=""></image>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		bluetoothKeepLive
	} from '../../../common/bluetoothKeepLive';
	export default {
		data() {
			return {
				checked_state: -1,
				today: -1,
				speed_day: 0,
				integral_day: 0,
				signState: 0,
				receivingState: false,
				list: [{
						day: '星期一',
						state: false,
						imgname: 'monday'
					},
					{
						day: '星期二',
						state: false,
						imgname: 'tuesday'
					}, {
						day: '星期三',
						state: false,
						imgname: 'wednesday'
					}, {
						day: '星期四',
						state: false,
						imgname: 'thursday'
					}, {
						day: '星期五',
						state: false,
						imgname: 'friday'
					}, {
						day: '星期六',
						state: false,
						imgname: 'saturday'
					}, {
						day: '星期日',
						state: false,
						imgname: 'sunday'
					}
				],
				list_day: [{
					day: 10,
					integral: 0,
				}, {
					day: 20,
					integral: 0,
				}, {
					day: 28,
					integral: 0,
				}]
			}
		},
		mixins: [bluetoothKeepLive],
		onLoad() {
			let that = this;
			let bluetoothKeepLiveState = that.$store.state.bluetoothKeepLiveState;
			this.integralDayComputer(this.integral_day);
			console.log(bluetoothKeepLiveState);
			if (bluetoothKeepLiveState) {
				this.uploadPuffsNum();
				wx.showLoading({
					title: '请稍后...'
				});
				setTimeout(function() {
					that.initData();
				}, 2000);
			} else {
				that.initData();
			}
			this.showReceivingState();
		},
		created() {
			this.today = new Date().getDay();
		},
		methods: {
			showReceivingState() {
				let dashboardValue = this.$store.state.globalData.dashboardValue;
				let sysPuffsNum = this.$store.state.globalData.sysPuffsNum;
				if (dashboardValue) {
					if (sysPuffsNum - dashboardValue < 0) {
						//可领取积分
						this.receivingState = true;
					}
				}
			},
			uploadPuffsNum() {
				let that = this;
				let bluetoothKeepLiveState = that.$store.state.bluetoothKeepLiveState;
				if (bluetoothKeepLiveState) {
					that.sendBLEValueChange(85);
				}
			},
			childPagPuffsLogUpdata(result) {
				let totalPuffsTime = this.$store.state.globalData.totalPuffsTime;
				let newPuffsTime = '';
				if (Array.isArray(result)) {
					newPuffsTime = parseInt(result[12], 16);
				}
				console.log('-----new:%d,old:%d-----', newPuffsTime, totalPuffsTime)
				if (newPuffsTime > totalPuffsTime) {
					this.puffsLogUpdata(result);
				}
			},
			childPagIsUserDevice(msg) {},
			childPagResult() {},
			integralDayComputer(integral_day) {
				this.speed_day = (integral_day / 31) * 100 + "%";
			},
			initData() {
				let that = this;
				this.$api.signPage({
					userCode: this.$store.state.userCode,
					token: this.$store.state.token,
				}, function(res) {
					wx.hideLoading();
					if (res.data.status == 1) {
						that.list_day[0].integral = res.data.data.fst;
						that.list_day[1].integral = res.data.data.snd;
						that.list_day[2].integral = res.data.data.trd;
						that.integral_day = res.data.data.cumulativeDays;
						that.signState = res.data.data.signState;
						that.integralDayComputer(that.integral_day);
						that.showWeekList(res.data.data.weekList);
					}
					console.log(res);
				}, function(err) {
					wx.hideLoading();
					console.log(err);
				});
			},
			showWeekList(value) {
				let that = this;
				if (Array.isArray(value)) {
					value.map(function(item) {
						let i = Number(item.weekdayNum);
						that.list[i - 1].state = true;
					});
				}
			},
			getReward() {
				let that = this;
				if (this.signState == 1) {
					uni.showToast({
						title: '已领取过',
						mask: false,
						icon: 'none',
						duration: 1500
					});
					return;
				}
				let data = {
					userCode: this.$store.state.userCode,
					token: this.$store.state.token,
					puffsIntervalTime: this.$store.state.puffsIntervalTime
				}
				console.log(data);
				this.$api.signState(data, function(res) {
					console.log(res);
					if (res.data.status == 1) {
						that.signState = 1;
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							mask: false,
							duration: 1500
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

	.page {
		background: #FFFFFF;
		height: 100%;
	}

	.page-section {
		box-sizing: border-box;
	}

	.tabs {
		padding: 20upx;
	}

	.checkin-tab {
		margin: 22upx 21upx;
	}

	.label-view {}

	.label-view image {
		width: 120upx;
		height: 120upx;
	}

	.checkin-log {
		padding: 50upx 60upx;
	}

	.checkin-log>view {
		width: 640upx;
	}

	.checkin-log text {
		color: #17393C;
	}

	.checkInTure {
		background: #CACACA;
		border: 1upx solid #CACACA;
		color: #FFFFFF;
	}

	.integral {
		position: absolute;
		left: 0;
		top: 0;
		margin-left: -45upx;
	}

	.integral:nth-child(1) {
		left: 33.3%;
	}

	.integral:nth-child(2) {
		left: 66.6%;
	}

	.integral:nth-child(3) {
		left: 95%;
	}

	.integral>view {
		width: 90upx;
	}

	.integral-bg {
		align-items: center;
		width: 100%;
		height: 8upx;
		margin: 40upx 0;
		background: #CACACA;
		border-radius: 18upx;
	}

	.integral-bg view {
		width: 0;
		background: #7ef3ff;
		height: 8upx;
		border-radius: 8upx;
	}

	.user-btn {
		width: 365upx;
		height: 60upx;
		font-size: 26upx;
		line-height: 60upx;
		color: #FFFFFF;
		border-radius: 30upx;
		background: #ff7800;
	}

	.btn-active {
		background: #cacaca;
	}
</style>
