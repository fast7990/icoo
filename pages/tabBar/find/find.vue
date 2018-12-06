<template>
	<view class="page">
		<view class="page-body">
			<view class="page-section uni-column">
				<view class="title">
					<text style="font-size: 36upx;">健康挑战生活</text>
				</view>
				<view class="challenge uni-column">
					<view class="list" v-for="(item,index) in challenge_list" :key="index" @tap="target('challengeTarget')">
						<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543988583531&di=ec34da9f255c95734f6437c03535574a&imgtype=0&src=http%3A%2F%2Fimg95.699pic.com%2Fphoto%2F50062%2F2841.jpg_wh300.jpg"
						 mode=""></image>
						<view class="text align-center">
							<text>距离时间结束还有：{{item.endtime}}</text>
							<view class="align-center">
								<image src="../../../static/img/hot.png" mode=""></image><text style="color: red;">&nbsp;&nbsp;{{item.hotnum}}</text>
							</view>
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
				challenge_list: [{
					endtime: '2天6小时',
					hotnum: '2.3w'
				}, {
					endtime: '2天6小时',
					hotnum: '2.3w'
				}]
			}
		},
		onPullDownRefresh: function() {
			console.log('onPullDownRefresh');
		},
		onLoad() {
			this.current = this.current;
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			target(tag) {
				if (tag == '') {
					return;
				}
				uni.navigateTo({
					url: '../../template/' + tag + '/' + tag
				});
			},
			open() {
				uni.request({
					url: 'https://www.icoo.tech/wx/test',
					method: 'GET',
					data: {},
					success: res => {
						console.log(res)
					},
					fail: (res) => {
						console.log('err:%s', res)
					},
					complete: () => {}
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

	text {
		color: #17393c;
	}

	.content>view {
		width: 100%;
	}

	.challenge .list {
		position: relative;
		width: 100%;
		height: 280upx;
		border-radius: 20upx;
		margin-bottom: 30upx;
		overflow: hidden;
	}

	.challenge .list image {
		width: 100%;
		height: auto;
	}

	.challenge .list .text {
		position: absolute;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 56upx;
		box-sizing: border-box;
		padding: 0 15upx;
		background: rgba(255, 255, 255, 0.5);
		bottom: 0;
	}

	.challenge .list .text text {
		font-size: 22upx;
		line-height: 56upx;
	}

	.challenge .list .text image {
		width: 24upx;
		height: 27upx;
	}
</style>
