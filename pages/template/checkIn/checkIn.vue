<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section" style="background: #17393c;">
				<view class="tabs" style="flex: 1;flex-wrap: wrap;justify-content: center;">
					<view class="checkin-tab uni-column" v-for="(item,index) in list" :key="index" @tap="checked(index,item)">
						<view class="label-view">
							<image src="../../../static/img/yilingqu.png" v-if="item.state"></image>
							<image src="../../../static/img/weilingqu.png" v-else></image>
						</view>
						<view class="justify-center" style="margin-top: 67upx;margin-bottom: 5upx;">
							<image src="../../../static/img/gold.png" style="width: 62upx;height: 45upx;"></image>
						</view>
						<view class="justify-center">
							<text style="color: #FFFFFF;">{{item.day}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section uni-column justify-center align-center checkin-log">
				<view class="uni-row" style="justify-content: space-between;margin-bottom: 20upx;">
					<text style="font-size:34upx;">11月</text>
					<text style="font-size:24upx;">已累计签到20天</text>
				</view>
				<view class="uni-row" style="position: relative;">
					<view class="integral" v-for="item in [10,20,28]" :key="item">
						<view class="uni-column align-center">
							<view style="font-size: 16upx;color: #ea2022;align-items: center;line-height: 28upx;">
								<text style="font-size: 28upx;color: #ea2022;">20</text>
								积分
							</view>
							<view>
								<image src="../../../static/img/gift.png" style="width: 26upx;height: 26upx;" mode=""></image>
							</view>
							<view>
								<text style="font-size: 22upx;line-height: 22upx;">{{item}}天</text>
							</view>
						</view>
					</view>
					<view class="integral-bg">
						<view :style="{width:speed_day}"></view>
					</view>
				</view>
				<view class="uni-row" style="padding: 72upx 0 126upx;">
					<button type="primary" class="user-btn" :class="get_reward?'btn-active':''" @tap="getReward">{{get_reward?'已领取':'领取奖励'}}</button>
				</view>
				<view class="uni-row justify-center">
					<navigator url="" style="color:#183b3e;font-size: 24upx;align-items: center;">查看规则说明<image src="../../../static/img/more2.png" style="width: 13upx;height: 21upx;"
						 mode=""></image>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked_state: -1,
				today: -1,
				speed_day: '0',
				integral_day: '10',
				get_reward: false,
				list: [{
						day: '周一',
						state: false,
					},
					{
						day: '周二',
						state: false,
					}, {
						day: '周三',
						state: true,
					}, {
						day: '周四',
						state: false,
					}, {
						day: '周五',
						state: false,
					}, {
						day: '周六',
						state: false,
					}, {
						day: '周日',
						state: false,
					}
				]
			}
		},
		onLoad() {
			this.integralDayComputer();
		},
		created() {
			this.today = new Date().getDay();
		},
		methods: {
			integralDayComputer() {
				this.speed_day = (this.integral_day / 31) * 100 + "%";
			},
			getReward() {
				this.get_reward = true;
			},
			checked(index, item) {
				if (item.state || this.today != index + 1) {
					return;
				} else {
					this.checked_state = index;
					item.state = true;
					uni.showToast({
						title: '领取成功',
						mask: false,
						duration: 1500
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
		/* uni-app默认使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。若不需要flex布局可删除本行*/
	}

	.page-section {
		box-sizing: border-box;
	}

	.tabs {
		padding: 20upx;
	}

	.checkin-tab {
		width: 128upx;
		height: 178upx;
		margin: 22upx 21upx;
		background: #6fc3cb;
		border-radius: 10upx;
		position: relative;
	}

	.label-view {
		position: absolute;
		left: 0;
		top: 0;
	}

	.label-view image {
		width: 83upx;
		height: 82upx;
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

	.integral {
		position: absolute;
		left: 0;
		top: 0;
	}

	.integral:nth-child(1) {
		left: 33.3%;
		margin-left: -40upx;
	}

	.integral:nth-child(2) {
		left: 66.6%;
		margin-left: -40upx;
	}

	.integral:nth-child(3) {
		left: 95%;
		margin-left: -40upx;
	}

	.integral>view {
		width: 80upx;
		height: 80upx;
	}

	.integral-bg {
		align-items: center;
		width: 100%;
		height: 18upx;
		margin: 31upx 0;
		background: #cacaca;
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
