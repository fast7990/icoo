<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section">
				<view class="user-list uni-column">
					<view class="top">
						<image src="../../../static/calendar.png" mode=""></image><text>&nbsp;目标完成天数</text>
					</view>
					<view class="content" style="justify-content: center;">
						<view class="text uni-column align-center" v-for="(item,indexs) in complete_day" :key="indexs" @tap="targetTime(indexs)">
							<view class="justify-center" style="width: 100%;height: 50%;" :class="indexs==target_index?'bgactive':''">
								<text style="font-size: 26upx; width: 92%;border-bottom: 1upx solid #17393C;height: 62upx;">{{item.day}}天</text>
							</view>
							<text>{{item.rate}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="user-list uni-column">
					<view class="top">
						<image src="../../../static/challengetarget.png" mode=""></image><text>&nbsp;设置挑战目标</text>
					</view>
					<view class="content">
						<view style="justify-content: space-between;align-items: center;flex: 1;">
							<text>每天吸烟口数</text>
							<number-box v-on:update="numberUpdate" :value="minvalue" :min="unlockPuffsTime"></number-box>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="user-list uni-column">
					<view class="top">
						<image src="../../../static/clock.png" mode=""></image><text>&nbsp;挑战开始时间</text>
					</view>
					<view class="content">
						<view style="justify-content: space-between;align-items: center;flex: 1;">
							<view class="start uni-column" :class="startday_index==1?'bgactive':''" @tap="changeTime(1)">
								<text>今天</text>
								<text>({{time1}})</text>
							</view>
							<view class="start uni-column" :class="startday_index==2?'bgactive':''" @tap="changeTime(2)">
								<text>明天</text>
								<text>({{time2}})</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section justify-center align-center" style="margin-top: 80upx;">
				<view class="btn" @tap="submit">确&nbsp;认</view>
			</view>
		</view>
	</view>
</template>

<script>
	import numberBox from '../../../components/number-box.vue'
	export default {
		data() {
			let time = new Date();
			let time2 = new Date();
			time2.setTime(time2.getTime() + 3600 * 1000 * 24)
			let date1 = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate();
			let date2 = time2.getFullYear() + '-' + time2.getMonth() + '-' + time2.getDate();
			return {
				numberValue: 0,
				time1: date1,
				time2: date2,
				startday_index: -1,
				target_index: -1,
				unlockPuffsTime: 0,
				minvalue: 0,
				score: 0,
				rate: 0,
				complete_day: [{
					day: 7,
					rate: 1.05
				}, {
					day: 14,
					rate: 1.05
				}, {
					day: 21,
					rate: 1.05
				}]
			};
		},
		onLoad: function() {
			this.initData();
		},
		methods: {
			initData() {
				let that = this;
				this.$api.activeInfo({
					userCode: this.$store.state.userCode,
					token: this.$store.state.token
				}, function(res) {
					console.log(res);
					if (res.data.status == 1) {
						that.setDataInfo(res.data.data)
					}
				}, function(err) {
					console.log(err)
				});
			},
			setDataInfo(value) {
				if (typeof value == 'object') {
					this.unlockPuffsTime = value.unlockPuffsTime;
					this.minvalue = value.unlockPuffsTime;
					this.score = value.score;
					this.complete_day[0].rate = value.firstRate;
					this.complete_day[1].rate = value.secondRate;
					this.complete_day[2].rate = value.thridRate;
				}
			},
			changeTime(i) {
				this.startday_index = i;
			},
			targetTime(i) {
				console.log(i)
				this.target_index = i;
			},
			numberUpdate(value) {
				this.numberValue = value;
				this.minvalue = value;
			},
			submit() {
				if (this.target_index == -1) {
					uni.showToast({
						title: '请设置目标天数',
						icon: 'none'
					});
					return;
				}
				if (this.startday_index == -1) {
					uni.showToast({
						title: '请设置开始时间',
						icon: 'none'
					});
					return;
				}
				let targetPuffsTime, startType, targetDays, rate;
				targetPuffsTime = this.numberValue;
				startType = this.startday_index;
				targetDays = this.complete_day[this.target_index].day;
				rate = this.complete_day[this.target_index].rate;
				uni.navigateTo({
					url: '../challengeAward/challengeAward?targetPuffsTime=' + targetPuffsTime + '&startType=' + startType +
						'&targetDays=' + targetDays + '&score=' + this.score + '&rate=' + rate,
					success: res => {}
				});
			}
		},
		components: {
			numberBox
		}
	}
</script>

<style scoped="scoped">
	page,
	view {
		display: flex;
	}

	text {
		color: #17393C;
		font-weight: bold;
		font-size: 24upx;
	}

	.page-body {
		padding: 10upx 30upx;
	}

	.page-body,
	.page-section {
		box-sizing: border-box;
	}

	.user-list {
		width: 100%;
		margin-bottom: 25upx;
	}

	.user-list .top text {
		font-size: 36upx;
		font-weight: bold;
	}

	.user-list .top {
		align-items: center;
	}

	.user-list .top image {
		width: 42upx;
		height: 42upx;
	}

	.page-section:nth-child(1) .content>view {
		width: 92upx;
		height: 126upx;
		margin: 0 30upx;
		justify-content: center;
		align-items: center;
		border: 1upx solid #17393C;
		border-radius: 5upx;
	}

	.page-section:nth-child(1) .content>view text {
		text-align: center;
		width: 100%;
		height: 50%;
		line-height: 63upx;
	}

	.user-list .content {
		padding: 40upx;
	}

	.content .start {
		padding: 28upx 20upx;
		border: 1upx solid #17393C;
		align-items: center;
		border-radius: 8upx;
	}

	.bgactive {
		color: #FFFFFF;
		background: #17393C;
	}

	.bgactive text {
		color: #FFFFFF;
	}

	.fontwhite {
		color: #FFFFFF !important;
	}

	.btn {
		background: none;
		border: #17393c 1upx solid;
		border-radius: 50upx;
		font-size: 26upx;
		padding: 15upx 120upx;
		font-weight: bold;
	}
</style>
