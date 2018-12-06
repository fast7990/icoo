<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section align-center justify-center" style="background: #326e73;margin-bottom: 0upx;">
				<view class="my-top action-row">
					<view class="left align-center" style="flex: 3;justify-content: flex-start;">
						<view style="width: 120upx;height: 120upx;border-radius: 120upx;overflow: hidden;">
							<image :src="my_data.imgsrc" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="name">
							<text style="font-size: 28upx;margin-left: 10upx;color: #FFFFFF;">{{my_data.name}}</text>
						</view>
					</view>
					<view class="right align-center" style="flex: 1;justify-content: flex-end;">
						<image src="../../../static/img/more1.png" mode="" style="width: 17upx;height: 24upx;"></image>
					</view>
				</view>
			</view>
			<view class="user-card">
				<view class="user-card-list">
					<view class="list" v-for="(item,index) in user_atten_list" :key="index">
						<text>{{item.value}}</text>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="page-section justify-center">
				<view class="tabr action-row">
					<view class="list" v-for="(item,index) in tabr_list" :key="index" hover-class="uni-list-cell-hover" @tap="target(item.target)">
						<image :src="item.icon_src" mode=""></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="page-section justify-center">
				<view class="sign uni-column">
					<view class="top uni-row">
						<view class="uni-column" style="justify-content: center;flex: 3;padding-bottom: 40upx;">
							<text style="font-size: 36upx;">每日签到</text>
							<text style="font-size: 24upx;">连续签到一周，可获得9折券</text>
						</view>
						<view class="align-center" style="justify-content: flex-end;flex: 1;">
							<text style="font-size: 26upx;line-height: 52upx;padding: 0 40upx;border-radius: 40upx;border:1upx solid #17393c;"
							 @tap="target('checkIn')">
								领取
							</text>
						</view>
					</view>
					<view class="bottom">
						<view class="uni-row align-center" v-for="(item,index) in sign_list" :key="index" style="flex: 1;">
							<view class="uni-column align-center">
								<view class="box justify-center align-center" :class="(item.state?'box-active':'')||(item.day==today?'box-now':'')"
								 style="position: relative;">
									<text>{{item.day}}</text>
									<image src="../../../static/img/gift02.png" v-if="index==sign_list.length-1"></image>
								</view>
								<view class="">
									<text>
										{{item.integral}}
									</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section uni-column">
				<view class="util-list justify-center" hover-class="uni-list-cell-hover" v-for="(item,index) in util_list" :key="index">
					<view class="list uni-row" :class="index==util_list.length-1?'uni-border-none':''" @tap="openList">
						<view class="" style="flex: 1;">
							<image :src="item.imgsrc" mode=""></image>
						</view>
						<view class="" style="flex: 5;">
							<text>{{item.name}}</text>
						</view>
						<view class="" style="flex: 5;justify-content: flex-end;">
							<text>{{item.info}}</text>
						</view>
						<view class="" style="flex: 1;justify-content: flex-end;">
							&nbsp;<image src="../../../static/img/more2.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import uniIcon from "../../components/uni-icon.vue";
	export default {
		data() {
			let get_today = new Date().getDay();
			return {
				title: '我的',
				today: get_today,
				my_data: {
					imgsrc: 'http://img3.imgtn.bdimg.com/it/u=466871861,443615080&fm=26&gp=0.jpg',
					name: '你的名字',
					fans: 15,
					follow: 50,
					integral: 100
				},
				user_atten_list: [{
						value: 10,
						name: '粉丝'
					},
					{
						value: 20,
						name: '关注'
					},
					{
						value: 15,
						name: '我的积分'
					}
				],
				tabr_list: [{
					icon_src: '../../../static/img/02.png',
					name: '健康统计',
					target: 'statistics'
				}, {
					icon_src: '../../../static/img/paihang2.png',
					name: '健康排行',
					target: 'ranking'
				}, {
					icon_src: '../../../static/img/huodong.png',
					name: '我的活动',
					target: ''
				}, {
					icon_src: '../../../static/img/bangding.png',
					name: '我的设备',
					target: ''
				}, {
					icon_src: '../../../static/img/user02.png',
					name: '个人资料',
					target: 'userData'
				}],
				sign_list: [{
						day: 1,
						integral: '+10',
						state: true
					},
					{
						day: 2,
						integral: '+10',
						state: false
					}, {
						day: 3,
						integral: '+10',
						state: false
					}, {
						day: 4,
						integral: '+20',
						state: false
					}, {
						day: 5,
						integral: '+20',
						state: false
					}, {
						day: 6,
						integral: '+30',
						state: false
					}, {
						day: 7,
						integral: '九折',
						state: false
					}
				],
				util_list: [{
					imgsrc: '../../../static/img/yaoqingma.png',
					name: '我的邀请码',
					info: '邀请好友+500积分',
					target: '',
				}, {
					imgsrc: '../../../static/img/shezhi.png',
					name: '安全设置',
					info: '',
					target: '',
				}, {
					imgsrc: '../../../static/img/bangzhu.png',
					name: '帮助',
					info: '',
					target: '',
				}, {
					imgsrc: '../../../static/img/guanyu.png',
					name: '关于',
					info: '',
					target: '',
				}]
			}
		},
		onLoad() {

		},
		methods: {
			openList() {

			},
			target(tag) {
				if (tag == '') {
					return;
				}
				uni.navigateTo({
					url: '../../template/' + tag + '/' + tag
				});
			},
		},
		components: {
			uniIcon,
		}
	}
</script>

<style scoped>
	page,
	view {
		display: flex;
	}

	.page {
		height: auto;
		background: #F7F7F7;
		color: #17393c;
		padding-bottom: 20upx;
	}

	.page-section {
		box-sizing: border-box;
		margin-bottom: 20upx;
		background: #FFFFFF;
	}

	.my-top {
		width: 630upx;
		padding: 50upx 0 100upx;
	}

	.user-card {
		position: relative;
		justify-content: center;
		height: 95upx;
		background: none;
	}

	.user-card .user-card-list {
		position: absolute;
		width: 620upx;
		border-radius: 25upx;
		box-shadow: 5upx 5upx 30upx #CACACA;
		top: -74upx;
		background: #FFFFFF;
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

	.user-card-list .list text {
		
	}

	.user-card-list .list text:nth-child(1) {
		font-size: 30upx;
		line-height: 60upx;
	}

	.user-card-list .list text:nth-child(2) {
		font-size: 24upx;
		line-height: 48upx;
	}

	.tabr,
	.sign,
	.list {
		width: 640upx;
		justify-content: space-between;
	}

	.sign {
		padding: 45upx 0 70upx;
	}

	.tabr {
		padding: 40upx 0;
	}

	.tabr .list {
		flex: 1;
		flex-direction: column;
		align-items: center;
		padding-top: 10upx;
	}

	.tabr .list image {
		width: 46upx;
		height: 46upx;
	}

	.tabr .list text {
		font-size: 24upx;
		line-height: 48upx;
	}

	.sign .bottom .box {
		width: 68upx;
		height: 68upx;
		border-radius: 100%;
		border: 1upx solid #CCCCCC;
		text-align: center;
	}

	.sign .bottom .box image {
		width: 40upx;
		height: 38upx;
		position: absolute;
		left: 14upx;
		top: 15upx;
	}

	.box-active {
		background: #17393c;
		border: 1upx solid #17393c !important;

	}

	.box-active text {
		color: #FFFFFF;
	}

	.box-now {
		border: 1upx solid #17393c !important;
	}

	.util-list .list {
		align-items: center;
		padding: 24upx 0;
		border-bottom: 1upx solid #CCCCCC;
	}

	.util-list .list view:nth-child(1) image {
		width: 34upx;
		height: 34upx;
	}

	.util-list .list view:nth-child(2) text {
		font-size: 26upx;
	}

	.util-list .list view:nth-child(3) text {
		font-size: 22upx;
	}

	.util-list .list view:nth-child(4) image {
		width: 13upx;
		height: 21upx;
	}
</style>
