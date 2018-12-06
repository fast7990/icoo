<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section">
				<view class="user-list panel uni-column">
					<view class="top align-center">
						<view class="left" style="">
							<image :src="my_data.imgsrc" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="right uni-column">
							<text style="font-size: 26upx;">{{my_data.name}}</text>
							<view>
								<text style="font-size: 34upx;font-weight: bold;margin-right: 10upx;">{{my_data.result?'挑战成功':'挑战失败'}}</text>
								<image src="../../../static/img/happy.png" style="width: 60upx;height: 60upx;" v-if="my_data.result"></image>
								<image src="../../../static/img/unhappy.png" style="width: 60upx;height: 60upx;" v-else></image>
							</view>
							<text style="font-size: 24upx;">--每天吸爱氪电子烟{{my_data.koushu}}口</text>
						</view>
					</view>
					<view class="user-card">
						<view class="user-card-list" style="flex: 1;">
							<view class="list">
								<text>挑战金</text>
								<text>{{my_data.bonus}}积分</text>
							</view>
							<view class="list">
								<text>坚持天数</text>
								<text>{{my_data.longday}}/7</text>
							</view>
							<view class="list">
								<text>围观</text>
								<text>{{my_data.look}}</text>
							</view>
						</view>
					</view>
					<view class="last">
						<text>Tips：挑战成功将获得226积分</text>
					</view>
				</view>
			</view>
			<view class="page-section uni-column">
				<view class="list-msg justify-center" v-for="(item,index) in list_msg" :key="index">
					<view class="align-center" style="flex: 9;">
						<text>{{item.text}}</text>
					</view>
					<view class="uni-column align-center" style="flex: 1;">
						<image src="../../../static/img/dianzan.png" mode="" style="width: 45upx;height: 45upx;"></image>
						<text style="font-size: 17upx;color: #5e9196;">{{item.like}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				my_data: {
					imgsrc: 'http://img3.imgtn.bdimg.com/it/u=466871861,443615080&fm=26&gp=0.jpg',
					name: '你的名字',
					result: false,
					koushu: 50,
					bonus: 100,
					longday: 1,
					look: 20
				},
				list_msg: [{
					text: '今日挑战',
					like: 12
				}, {
					text: '今日挑战',
					like: 111
				}]
			};
		}
	}
</script>

<style scoped>
	page,
	view {
		display: flex;
	}

	.page-body {
		padding: 10upx 30upx;
	}

	text {
		color: #FFFFFF;
	}

	.page-body,
	.page-section {
		box-sizing: border-box;
	}

	.panel {
		background: #17393c;
		padding: 40upx 0;
	}

	.panel .top {
		margin-bottom: 60upx;
	}

	.panel .top .left {
		width: 145upx;
		height: 145upx;
		margin-right: 27upx;
		border-radius: 145upx;
		overflow: hidden;
	}

	.top,
	.last {
		padding: 0 60upx;
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
