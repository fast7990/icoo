<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section" style="margin: 20upx 0;">
				<view class="uni-swiper-msg">
					<swiper indicator-dots="true" autoplay="autoplay" interval="5000" duration="500">
						<block v-for="(item,index) in news_list" :key="index">
							<swiper-item @tap="openViews(item.banner_href)">
								<view class="swiper-item color1" style="width: 100%;height: 100%;">
									<image :src="baseurl+item.banner_url" mode="" style="width: 100%;height: 100%;"></image>
								</view>
							</swiper-item>
						</block>
					</swiper>
				</view>
			</view>
			<view class="page-section">
				<scroll-view class="scroll-view_H" scroll-x="true">
					<view class="scroll-view-item_H" v-for="(item,index) in banner_list" :key="index">
						<image :src="baseurl+item.banner_url" mode=""></image>
					</view>
				</scroll-view>
			</view>
			<view class="page-section uni-column">
				<view class="title" style="margin-top: 20upx;">
					<text style="font-size: 36upx;font-weight: bold;">健康挑战生活</text>
				</view>
				<view class="challenge">
					<view class="list" v-for="(item,index) in challenge_list" :key="index" @tap="challengeFn">
						<image :src="baseurl+item.banner_url" mode="" style="width: 100%;height: 300upx;"></image>
					</view>
				</view>
			</view>
			<view class="page-section agree" v-if="agreestatus">
				<view class="box">
					<view class="" style="display: flex;justify-content: flex-end;">
						<image src="../../../static/img/close.png" mode="" style="width: 45upx;height: 45upx;" @tap="close"></image>
					</view>
					<text>在发起目标前请认真阅读下列详细规则。</text>
					<text>1.关于目标</text>
					<text>2.关于挑战金</text>
					<text>3.关于监督人</text>
					<text>4.其他</text>
					<text>如果你同意本协议中全部条款则可以发起目标</text>
					<view class="btn">
						<text @tap="agreeFn">
							我同意
						</text>
					</view>
				</view>
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
				agreestatus: false,
				baseurl: 'https://www.icoo.tech',
				activeStatus: 0,
				unlockNum: 0,
				challenge_list: [],
				banner_list: [],
				news_list: []
			}
		},
		mixins: [childMixin],
		onPullDownRefresh: function() {
			console.log('onPullDownRefresh');
			this.initDiscovery();
			this.initData(2);
			this.initData(3);
			this.initData(4);
		},
		onLoad() {
			this.initData(2);
			this.initData(3);
			this.initData(4);
		},
		onShow: function() {
			this.initDiscovery();
		},
		methods: {
			initData(type) {
				let that = this;
				this.$api.startBanner({
					type: type
				}, function(res) {
					console.log(res);
					if (res.data.status == 1) {
						that.setBannerList(res.data.data, type);
					}
					uni.stopPullDownRefresh();
				}, function(err) {
					uni.stopPullDownRefresh();
					console.log(err)
				});
			},
			initDiscovery() {
				let that = this;
				this.$api.discoveryPage({
					userCode: this.$store.state.userCode,
					token: this.$store.state.token
				}, function(res) {
					console.log(res);
					if (res.data.status == 1) {
						that.unlockNum = res.data.data.unlockNum;
						that.activeStatus = res.data.data.activeStatus;
					}
					if (res.data.status == 99) {
						that.loginOut(res.data.msg);
					}
					uni.stopPullDownRefresh();
				}, function(err) {
					uni.stopPullDownRefresh();
					console.log(err)
				});
			},
			target(tag) {
				if (tag == '') {
					return;
				}
				uni.navigateTo({
					url: '../../template/' + tag + '/' + tag
				});
			},
			setBannerList(value, type) {
				if (Array.isArray(value)) {
					if (type == 2) {
						this.news_list = value;
					}
					if (type == 3) {
						this.banner_list = value;
					}
					if (type == 4) {
						this.challenge_list = value;
					}
				}
			},
			challengeFn() {
				if (this.activeStatus == -1) {
					this.agreestatus = true;
				} else {
					uni.navigateTo({
						url: '../../template/challenge/challenge'
					});
				}
			},
			agreeFn() {
				this.agreestatus = false;
				if (this.unlockNum = 0) {
					uni.showToast({
						title: '连续签到7天解锁活动',
					});
				}
				if (this.activeStatus > -1) {
					uni.navigateTo({
						url: '../../template/challenge/challenge'
					});
				} else {
					uni.navigateTo({
						url: '../../template/challengeTarget/challengeTarget'
					});
				}
			},
			close() {
				this.agreestatus = false;
			},
			openViews(urltag) {
				this.$store.commit('set_homeNewsTarget', urltag);
				uni.navigateTo({
					url: '../../template/webView/webView',
				});
			},
		}
	}
</script>

<style scoped>
	/* 	page,
	view {
		display: flex;
	} */
	.page-body {
		padding: 10upx 30upx;
	}

	.page-body,
	.page-section {
		box-sizing: border-box;
	}

	text {
		color: #17393c;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 300upx;
		height: 160upx;
		border-radius: 15upx;
		overflow: hidden;
		margin-right: 20upx;
	}

	.content>view {
		width: 100%;
	}

	.challenge .list {
		width: 100%;
		height: 300upx;
		border-radius: 25upx;
		overflow: hidden;
	}

	swiper {
		height: 300upx;
	}

	swiper-item {
		width: 100%;
		height: 100%;
		text-align: center;
		border-radius: 15upx;
	}

	.agree {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
	}

	.agree text {
		font-size: 26upx;
		line-height: 3em;
	}

	.agree .box {
		display: flex;
		width: 90%;
		height: 70%;
		margin: 10% 5% 0;
		border-radius: 15upx;
		padding: 20upx 10upx 20upx 40upx;
		box-sizing: border-box;
		flex-direction: column;
		background: #FFFFFF;
	}

	.agree .box .btn {
		margin-top: 80upx;
		text-align: center;
	}

	.agree .box .btn text {
		font-size: 30upx;
		line-height: 1em;
		padding: 10upx 125upx;
		border-radius: 50upx;
		border: 1upx solid #17393C;
	}
</style>
