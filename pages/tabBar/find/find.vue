<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section" style="margin: 20upx 0;">
				<view  style="overflow: hidden;height: 300upx;width: 100%;border-radius:25upx;">
					<image :src="topimgsrc" style="wi"></image>
				</view>
			</view>
			<view class="page-section">
				<scroll-view class="scroll-view_H" scroll-x="true">
					<view class="scroll-view-item_H">
						<image :src="topimgsrc" mode=""></image>
					</view>
					<view class="scroll-view-item_H">
						<image :src="topimgsrc" mode=""></image>
					</view>
					<view class="scroll-view-item_H">
						<image :src="topimgsrc" mode=""></image>
					</view>
				</scroll-view>
			</view>
			<view class="page-section uni-column">
				<view class="title" style="margin-top: 20upx;">
					<text style="font-size: 36upx;font-weight: bold;">健康挑战生活</text>
				</view>
				<view class="challenge">
					<view class="list" v-for="(item,index) in challenge_list" :key="index" @tap="target('challengeTarget')">
						<view class="left" style="flex: 3;overflow: hidden;">
							<image src="" mode=""></image>
						</view>
						<view class="right uni-column" style="flex: 4;">
							
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
				topimgsrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544184555700&di=74a6a15fc5d32a9da10841030b2d6572&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F018d2b57b19c780000018c1bac947f.jpg%402o.jpg',
				challenge_list: [{
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

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 300upx;
		height: 160upx;
		border-radius: 25upx;
		overflow: hidden;
		margin-right: 20upx;
	}

	.scroll-view-item_H image {
		
	}

	.content>view {
		width: 100%;
	}

	.challenge .list {
		position: relative;
		width: 100%;
		height: 280upx;
		border-radius: 25upx;
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

</style>
