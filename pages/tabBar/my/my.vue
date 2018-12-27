<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section" style="padding: 10upx 30upx 20upx;">
				<view class="user-list align-center justify-center uni-column" style="background: #17393c;">
					<view class="my-top action-row" @tap="target('userData')">
						<view class="left align-center" style="flex: 4;justify-content: flex-start;padding-left: 50upx;">
							<view style="width: 120upx;height: 120upx;border-radius: 120upx;overflow: hidden;">
								<image :src="my_data.imgsrc?my_data.imgsrc:noheaderimg" style="width: 100%;height: 100%;"></image>
							</view>
							<view class="name">
								<text style="font-size: 30upx;margin-left: 10upx;color: #FFFFFF;">&nbsp;&nbsp;{{my_data.name}}</text>
							</view>
						</view>
						<view class="right align-center" style="flex: 1;justify-content: flex-end;"></view>
					</view>
					<view class="user-card">
						<view class="user-card-list">
							<view class="list" v-for="(item,index) in user_atten_list" :key="index" @tap="target(item.target,item.index)">
								<text>{{item.value}}</text>
								<text>{{item.name}}</text>
							</view>
						</view>
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
						<view class="align-center" style="justify-content: flex-end;flex: 2;">
							<text class="sign-state" @tap="target('checkIn')" :class="my_data.signState?'checkInTure':'checkInTure'">
								{{my_data.signState?'已领取':'领取'}}
							</text>
						</view>
					</view>
					<view class="bottom">
						<view class="uni-row align-center" v-for="(item,index) in sign_list" :key="index" style="flex: 1;">
							<view class="uni-column align-center">
								<view class="box justify-center align-center" :class="(item.state?'box-active':'')||(item.day==today?'box-now':'')"
								 style="position: relative;">
									<text>{{item.day}}</text>
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
					<view class="list uni-row" :class="index==util_list.length-1?'uni-border-none':''" @tap="target(item.target)">
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
	import {
		childMixin
	} from "../../../common/mixins.js";
	export default {
		data() {
			let get_today = new Date().getDay();
			return {
				title: '我的',
				today: get_today,
				baseurl: 'https://www.icoo.tech',
				noheaderimg: '../../../static/img/nopicture.png',
				my_data: {
					imgsrc: '',
					name: '',
					fans: 0,
					follow: 0,
					integral: 0,
					signState: false,
				},
				user_atten_list: [{
						value: 0,
						name: '粉丝',
						target: 'fans',
						index: 1,
					},
					{
						value: 0,
						name: '关注',
						target: 'fans',
						index: 2,
					},
					{
						value: 0,
						name: '我的积分',
						target: 'integralDetail',
						index: 3,
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
					target: 'challenge'
				}, {
					icon_src: '../../../static/img/bangding.png',
					name: '我的设备',
					target: 'mydevice'
				}, {
					icon_src: '../../../static/img/user02.png',
					name: '个人资料',
					target: 'userData'
				}],
				sign_list: [{
						day: 1,
						integral: '+10',
						state: false
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
						integral: '+30',
						state: false
					}
				],
				util_list: [{
					imgsrc: '../../../static/img/yaoqingma.png',
					name: '我的邀请码',
					info: '邀请好友+50积分',
					target: 'invitedFriend',
				}, {
					imgsrc: '../../../static/img/shezhi.png',
					name: '安全设置',
					info: '',
					target: 'changeMobile',
				}, {
					imgsrc: '../../../static/img/bangzhu.png',
					name: '帮助',
					info: '',
					target: 'help',
				}, {
					imgsrc: '../../../static/img/guanyu.png',
					name: '关于',
					info: '',
					target: 'version',
				}, {
					imgsrc: '../../../static/img/guanyu.png',
					name: '健康挑战',
					info: '',
					target: 'challenge',
				}]
			}
		},
		mixins: [childMixin],
		onLoad() {
			this.setStatisTics();
		},
		onShow: function() {
			this.getInitData();
		},
		onPullDownRefresh: function() {
			this.getInitData();
			console.log('onPullDownRefresh');
		},
		methods: {
			getInitData() {
				let that = this;
				this.$api.myInfo({
					userCode: this.$store.state.userCode,
					token: this.$store.state.token,
				}, function(res) {
					if (res.data.status == 1) {
						that.setMyData(res.data);
					}
					console.log(res);
					if (res.data.status == 99) {
						that.loginOut(res.data.msg);
					}
					uni.stopPullDownRefresh();
				}, function(err) {
					console.log(err);
					uni.stopPullDownRefresh();
				})
			},
			target(tag, index) {
				console.log(tag, index)
				if (tag == '') {
					return;
				} else if (index) {
					uni.navigateTo({
						url: '../../template/' + tag + '/' + tag + '?index=' + index
					});
				} else {
					uni.navigateTo({
						url: '../../template/' + tag + '/' + tag
					});
				}

			},
			setMyData(value) {
				let that = this;
				value.data.weekList.map(function(item) {
					that.sign_list[item.weekdayNum - 1].state = true;
					that.sign_list[item.weekdayNum - 1].integral = "+" + item.score;
				});
				that.my_data.follow = value.data.followNum;
				that.my_data.fansNum = value.data.fans;
				that.my_data.name = value.data.nickName;
				that.my_data.imgsrc = (value.data.HeadpicUrl.indexOf('http') > -1) ? value.data.HeadpicUrl : this.baseurl + value.data
					.HeadpicUrl;
				that.my_data.signState = value.data.signState;
				that.my_data.integral = value.data.score;
				that.user_atten_list[0].value = value.data.fansNum;
				that.user_atten_list[1].value = value.data.followNum;
				that.user_atten_list[2].value = value.data.score;
				that.$store.commit('set_nickName', that.my_data.name);
				that.$store.commit('set_headpicUrl', that.my_data.imgsrc);
			},
			setStatisTics() {
				let that = this;
				[1, 2, 3].map(function(type) {
					that.$api.statisticsUserPuffs({
						userCode: that.$store.state.userCode,
						token: that.$store.state.token,
						type: type
					}, function(res) {
						console.log(res);
						if (res.data.status == 1) {
							if (type == 1) {
								that.$store.commit('set_statisTicsData', {
									day: res.data.data
								});
							}
							if (type == 2) {
								that.$store.commit('set_statisTicsData', {
									month: res.data.data
								});
							}
							if (type == 3) {
								that.$store.commit('set_statisTicsData', {
									year: res.data.data
								});
							}
						}
					});
				});
			}
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
		padding-top: 40upx;
	}

	.user-card {
		position: relative;
		justify-content: center;
		height: 95upx;
		background: none;
		padding: 30upx 0;
	}

	.user-card .user-card-list {
		width: 630upx;
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

	.sign-state {
		font-size: 26upx;
		line-height: 52upx;
		padding: 0 40upx;
		border-radius: 40upx;
		border: 1upx solid #17393c;
	}

	.sign-state.checkInTure {
		background: #CACACA;
		border: 1upx solid #CACACA;
		color: #FFFFFF;
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
