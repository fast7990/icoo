<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section">
				<view class="user-list uni-column align-center" style="background: #17393C;">
					<text style="font-size: 68upx;margin: 25upx 0 10upx;line-height: 1em;">{{totalScore}}</text>
					<text style="font-size: 24upx;">我的积分</text>
					<view class="user-card-list" style="margin:40upx 0 10upx;">
						<view class="list" v-for="(item,index) in user_atten_list" :key="index" @tap="target(item.target)">
							<image :src="item.imgsrc" mode="" style="width: 60upx;height: 60upx;"></image>
							<text>{{item.name}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="user-list uni-column">
					<view class="task-list" :class="task_index==user_task_list.length-1?'uni-border-none':''" hover-class="uni-list-cell-hover"
					 v-for="(item,task_index) in user_task_list" :key="task_index" @tap="target(item.target)">
						<view class="uni-column">
							<text class="top">{{item.task}}</text>
							<text class="bottom">{{item.task_info}}</text>
						</view>
						<view class="uni-row">
							<text class="last">{{item.status==1?'已完成':'+50积分'}}</text>
						</view>
						<view class="uni-row">
							<image src="../../../static/img/more2.png" style="width: 13upx;height: 21upx;" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section align-center justify-center" style="margin-top: 45upx;font-size: 22upx;">
				<navigator url="../../template/checkIn/checkIn">去每日签到获取更多积分奖励 ></navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		childMixin
	} from "../../../common/mixins.js";
	export default {
		data() {
			return {
				totalScore: 0,
				user_atten_list: [{
						imgsrc: '../../../static/img/money.png',
						name: '赚积分',
						target: ''
					},
					{
						imgsrc: '../../../static/img/search.png',
						name: '积分明细',
						target: 'integralDetail'
					}
				],
				user_task_list: [{
					task: '绑定微信',
					task_info: '下次登录更便捷',
					status: 1,
					target: ''
				}, {
					task: '首次参与挑战任务',
					task_info: '挑战任务可获得丰富奖励',
					status: 0,
					target: 'find'
				}, {
					task: '邀请好友加入爱氪世界',
					task_info: '每邀请一个好友可获得一个烟弹',
					status: 0,
					target: 'invitedFriend'
				}, {
					task: '完善个人资料',
					task_info: '完善个人资料可以帮助您更好管理健康数据',
					status: 0,
					target: 'userData'
				}]
			}
		},
		mixins: [childMixin],
		onShow: function() {
			this.initData();
		},
		onPullDownRefresh: function() {
			this.initData();
		},
		methods: {
			target(tag) {
				if (tag == '') {
					return;
				} else if (tag == 'find') {
					uni.switchTab({
						url: '../find/find',
					});
				} else {
					uni.navigateTo({
						url: '../../template/' + tag + '/' + tag
					});
				}
			},
			initData() {
				let that = this;
				this.$api.myScorePage({
					userCode: this.$store.state.userCode,
					token: this.$store.state.token,
				}, function(res) {
					console.log(res);
					uni.stopPullDownRefresh();
					if (res.data.status == 1) {
						that.totalScore = res.data.data.totalScore
					}
					if (res.data.status == 99) {
						that.loginOut(res.data.msg);
					}
				}, function(err) {
					uni.stopPullDownRefresh();
					console.log(err)
				});
				this.$api.addScorePage({
					userCode: this.$store.state.userCode,
					token: this.$store.state.token,
				}, function(res) {
					console.log(res)
					if (res.data.status == 1) {
						that.user_task_list[1].status = res.data.data.activeState;
						that.user_task_list[3].status = res.data.data.infoState;
					}
				}, function(err) {
					console.log(err)
				});
			}
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

	.page-body,
	.page-section {
		box-sizing: border-box;
	}

	.page-section {
		margin-bottom: 20upx;
	}

	.page-section:nth-child(1) text {
		color: #FFFFFF;
	}

	text {
		color: #17393c;
	}

	.user-card-list {
		width: 100%;
	}

	.user-card-list .list {
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.user-card-list .list:nth-child(2) {
		border-left: solid 1upx #5e9196;
	}

	.user-card-list .list text {
		color: #FFFFFF;
	}

	.user-card-list .list text:nth-child(1) {
		font-size: 30upx;
		line-height: 60upx;
	}

	.user-card-list .list text:nth-child(2) {
		font-size: 24upx;
		line-height: 48upx;
	}

	.task-list {
		padding: 25upx 10upx;
		border-bottom: 1upx solid #cbcbcb;
	}

	.task-list>view:nth-child(1) {
		flex: 6;
	}

	.task-list>view:nth-child(2) {
		flex: 2;
		align-items: center;
		justify-content: flex-end;
	}

	.task-list>view:nth-child(3) {
		flex: 1;
		align-items: center;
		justify-content: flex-end;
	}

	.task-list .top {
		font-weight: bold;
		font-size: 36upx;
	}

	.task-list .bottom {
		font-size: 22upx;
	}

	.task-list .last {
		font-weight: bold;
		font-size: 26upx;
	}
</style>
