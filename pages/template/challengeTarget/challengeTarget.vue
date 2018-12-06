<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section">
				<view class="user-list uni-column">
					<view class="top">
						<image src="../../../static/calendar.png" mode=""></image><text>&nbsp;目标完成天数</text>
					</view>
					<view class="content" style="justify-content: space-between;">
						<view class="text" v-for="(item,indexs) in [7,21,30,60]" :key="indexs" :class="indexs==target_index?'bgactive':''"
						 @tap="targetTime(indexs)">
							<text style="font-size: 30upx;">{{item}}天</text>
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
							<number-box v-on:update="numberUpdate" min="0"></number-box>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="user-list uni-column">
					<view class="top">
						<image src="../../../static/challengetarget.png" mode=""></image><text>&nbsp;挑战开始时间</text>
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
				<view class="btn" @tap="submit">确认</view>
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
				startday_index: 0,
				target_index: -1
			};
		},
		methods: {
			changeTime(i) {
				this.startday_index = i;
			},
			targetTime(i) {
				console.log(i)
				this.target_index = i;
			},
			submit(){
				uni.navigateTo({
					url: '../challengeAward/challengeAward',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		components: {
			numberBox
		}
	}
</script>

<style scoped>
	page,
	view {
		display: flex;
	}

	text {
		color: #17393C;
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
		width: 85upx;
		height: 85upx;
		justify-content: center;
		align-items: center;
		border: 1upx solid #17393C;
		border-radius: 100%;
	}

	.user-list .content {
		padding: 50upx;
	}

	.content .start {
		padding: 28upx 20upx;
		border: 1upx solid #17393C;
		align-items: center;
		border-radius: 8upx;
	}

	.bgactive {
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
	}
</style>
