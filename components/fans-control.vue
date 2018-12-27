<template>
	<view class="fans-control uni-column" :class="styleType">
		<view v-for="(item, index) in values" class="fans-control-item align-center" :key="index" :class="index==values.length-1?'last':''">
			<view class="left" style="flex: 1;">
				<view class="imgheader">
					<image :src="item.headpicUrl?item.headpicUrl:nopicture" mode="" :url="item.headpicUrl"></image>
				</view>
			</view>
			<view class="center" style="flex: 4;">
				<text style="margin-left: 10upx;">{{item.nickName?item.nickName:''}}</text>
			</view>
			<view class="right" v-show="followStatus" style="flex: 2;" @tap="followChange(item)">
				<text>{{item.followState==0?'+关注':'已关注'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'fans-control',
		props: {
			styleType: {
				type: String,
				default: 'button'
			},
			followStatus: {
				type: Boolean,
				default: true
			},
			values: {
				type: Array,
				default () {
					return [];
				}
			},
		},
		data() {
			return {
				baseusrl: 'https://www.icoo.tech',
				nopicture: '../../../static/img/nopicture.png'
			}
		},
		methods: {
			followChange(item) {
				let type = '';
				if (item.followState == 0) {
					item.followState = 1;
					type = 0;
				} else {
					item.followState = 0;
					type = 1;
				}
				this.setFollowChange(item, type);
			},
			setFollowChange(item, type) {
				let that = this;
				let data = {
					userCode: this.$store.state.userCode,
					token: this.$store.state.token,
					followUserCode: item.userCode,
					type: type,
				}
				console.log(data)
				this.$api.followOrCancelUser(data, function(res) {
					if (res.data.status == 1) {
						if (item.followState == 1) {
							uni.showToast({
								title: '关注成功',
								icon: 'success'
							});
						} else {
							uni.showToast({
								title: '取消成功',
								icon: 'success'
							});
						}
					} else {
						uni.showToast({
							title: '设置失败',
							icon: 'none'
						});
					}
					console.log(res)
				}, function(err) {
					console.log(err)
				});
			}
		},
	}
</script>

<style scoped="scoped">
	view {
		display: flex;
	}

	text {
		font-size: 26upx;
		color: #17393c;
	}

	.fans-control {
		width: 100%;
	}

	.fans-control-item {
		padding: 27upx 0;
		border-bottom: 1upx solid #CACACA;
	}

	.fans-control-item.last {
		border: none;
	}

	.imgheader {
		width: 90upx;
		height: 90upx;
		border-radius: 100%;
		overflow: hidden;
	}

	.left image {
		width: 100%;
		height: 100%;
	}

	.center {}

	.right {
		justify-content: flex-end;
	}

	.right text {
		line-height: 1em;
		padding: 12upx 30upx;
		border-radius: 50upx;
		border: 1px solid #17393c;
	}

	.loading-text {
		padding: 27upx;
		text-align: center;
		color: #777777;
	}
</style>
