<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section my-info" style="margin-top: 15upx;">
				<view class="user-list" style="background: #17393c;">
					<view class="user-list-left" style="flex: 2;">
						<view class="touming" style="padding: 15upx;background: rgba(255, 255, 255, 0.1);">
							<view class="touming" style="padding: 15upx;background: rgba(255, 255, 255, 0.15);">
								<view class="touming" style="padding: 20upx;background: rgba(255, 255, 255, 0.18);">
									<view style="width: 120upx;height: 120upx;border-radius: 120upx;overflow: hidden;">
										<image :src="my_data.headpicUrl?my_data.headpicUrl:noheaderimg" style="width: 100%;height: 100%;"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="user-list-center action-row" style="flex: 4;">
						<view class="uni-column" style="flex: 7;justify-content: center;padding-left: 15upx;">
							<view>
								<text class="user-list-text-h2" style="font-size: 30upx;">
									{{my_data.nickName}}
								</text>
							</view>
							<view>
								<text class="user-list-text-h4" style="font-size: 24upx;color: #565656;">
									第{{userPuffsSort}}名
								</text>
							</view>
						</view>
						<view class="" style="flex: 3;align-items: center;">
							<text style="font-size: 68upx;font-weight: bold;">{{my_data.puffsSum}}</text>
						</view>
					</view>
					<view class="user-list-right uni-column" style="flex: 1;align-items: center;">
						<image src="../../../static/img/dianzan.png"></image>
						<text class="user-list-text-h4" style="text-align: center;">
							{{my_data.suportNum}}
						</text>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="user-list uni-column">
					<view class="list1" v-for="(item,index) in ranking_data" :key="index" :class="(index==ranking_data.length-1)?'noborder':''">
						<view class="align-center justify-center" style="flex: 1;">
							<text style="font-size: 28upx;font-weight: bold;">{{index+1}}</text>
						</view>
						<view class="align-center justify-center" style="flex: 5;">
							<view style="width: 90upx;height: 90upx;position: relative;">
								<view style="width: 100%;height: 100%;border-radius:100%;overflow: hidden;position: relative;">
									<image :src="item.headpicUrl?item.headpicUrl:noheaderimg" style="width: 100%;height: 100%;position: relative;"></image>
								</view>
								<image :src="crown[0]" class="crown" v-if="index==0"></image>
								<image :src="crown[1]" class="crown" v-if="index==1"></image>
								<image :src="crown[2]" class="crown" v-if="index==2"></image>
							</view>
						</view>
						<view class="align-center" style="flex: 15;">
							<text style="font-size: 24upx;">{{item.nickName?item.nickName:''}}</text>
						</view>
						<view class="align-center" style="flex: 5;">
							<text style="font-size: 32upx;font-weight: bold;color: #17393c;">{{item.puffsSum?item.puffsSum:'0'}}</text>
						</view>
						<view class="user-list-right uni-column" style="flex: 2;align-items: center;" @tap="suportFn(item)">
							<image src="../../../static/img/dianzan.png"></image>
							<text class="user-list-text-h4" style="text-align: center;color: #17393c;" v-show="item.suportState==0">
								{{item.suportNum}}
							</text>
							<text class="user-list-text-h4" style="text-align: center;color: #17393c;" v-show="item.suportState==1">
								{{item.suportNum}}
							</text>
						</view>
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
				noheaderimg: '../../../static/img/nopicture.png',
				baseurl: 'https://www.icoo.tech',
				my_data: {
					headpicUrl: '../../../static/img/nopicture.png',
					nickName: '',
					puffsSum: 0,
					suportNum: 0,
				},
				userPuffsSort: 0,
				ranking_data: [],
				crown: ['../../../static/img/guan-jun.png', '../../../static/img/ya-jun.png', '../../../static/img/ji-jun.png']
			}
		},
		onLoad: function() {
			this.initData();
		},
		methods: {
			initData() {
				let that = this;
				let data = {
					userCode: this.$store.state.userCode,
					token: this.$store.state.token,
					deviceCode: this.$store.state.deviceCode
				}
				console.log(data);
				this.$api.getSortPage(data, function(res) {
					console.log(res);
					if (res.data.status == 1) {
						that.setListData(res.data.data);
					}
				}, function(err) {
					console.log(err);
				});
			},
			setListData(value) {
				if (Array.isArray(value.sortlist)) {
					for (let i = 0; i < value.sortlist.length; i++) {
						if (value.sortlist[i].headpicUrl && value.sortlist[i].headpicUrl.indexOf('http') == -1) {
							value.sortlist[i].headpicUrl = this.baseurl + value.sortlist[i].headpicUrl;
						}
					}
					this.ranking_data = value.sortlist;
				}
				if (value.userMap.headpicUrl && value.userMap.headpicUrl.indexOf('http') == -1) {
					value.userMap.headpicUrl = this.baseurl + value.userMap.headpicUrl;
				}
				this.my_data = value.userMap;
				this.userPuffsSort = value.userPuffsSort;
			},
			suportFn(item) {
				if (item.suportState == 1) {
					uni.showToast({
						title: '已点过赞',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				}
				if (item.suportState == 0) {
					item.suportState = 1
					item.suportNum = item.suportNum + 1;
				}
				let data = {
					userCode: this.$store.state.userCode,
					token: this.$store.state.token,
					supportUserCode: item.userCode,
				}
				this.$api.supportUser(data, function(res) {
					console.log(res);
					if (res.data.state == 1) {
						uni.showToast({
							title: '点赞成功',
							icon: 'success'
						});
					}
				}, function(err) {
					console.log('err', err)
				});
			}
		}
	}
</script>

<style scoped>
	page,
	view {
		display: flex;
		/* uni-app默认使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。若不需要flex布局可删除本行*/
	}

	.page-body {
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.page-section {
		box-sizing: border-box;
		margin-bottom: 30upx;
		justify-content: center;
	}

	.my-info text {
		color: #FFFFFF;
	}

	.touming {
		border-radius: 120upx;
	}

	.list1 {
		flex: 1;
		border-bottom: 1upx solid #bfbfbf;
		padding-top: 40upx;
		padding-bottom: 25upx;
	}

	.user-list {
		padding-left: 40upx;
		padding-right: 40upx;
	}

	.crown {
		width: 85upx;
		height: 60upx;
		position: absolute;
		left: 22upx;
		top: -22upx;
	}

	.noborder {
		border: none !important;
	}
</style>
