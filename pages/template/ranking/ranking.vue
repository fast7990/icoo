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
										<image :src="my_data.imgsrc" style="width: 100%;height: 100%;"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="user-list-center action-row" style="flex: 4;">
						<view class="uni-column" style="flex: 7;justify-content: center;padding-left: 15upx;">
							<view>
								<text class="user-list-text-h2" style="font-size: 30upx;">
									{{my_data.name}}
								</text>
							</view>
							<view>
								<text class="user-list-text-h4" style="font-size: 24upx;color: #565656;">
									第{{my_data.mingci}}名
								</text>
							</view>
						</view>
						<view class="" style="flex: 3;align-items: center;">
							<text style="font-size: 68upx;font-weight: bold;">{{my_data.koushu}}</text>
						</view>
					</view>
					<view class="user-list-right uni-column" style="flex: 1;align-items: center;">
						<image src="../../../static/img/dianzan.png"></image>
						<text class="user-list-text-h4" style="text-align: center;">
							{{my_data.like_num}}
						</text>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="user-list uni-column">
					<view class="list1" v-for="(item,index) in ranking_data" :key="index" :class="(index==ranking_data.length-1)?'noborder':''">
						<view class="align-center justify-center" style="flex: 1;">
							<text style="font-size: 28upx;font-weight: bold;">{{item.mingci}}</text>
						</view>
						<view class="align-center justify-center" style="flex: 5;">
							<view style="width: 90upx;height: 90upx;position: relative;">
								<view style="width: 100%;height: 100%;border-radius:100%;overflow: hidden;position: relative;">
									<image :src="item.imgsrc" style="width: 100%;height: 100%;position: relative;"></image>
								</view>
								<image :src="crown[0]" class="crown" v-if="index==0"></image>
								<image :src="crown[1]" class="crown" v-if="index==1"></image>
								<image :src="crown[2]" class="crown" v-if="index==2"></image>
							</view>
						</view>
						<view class="align-center" style="flex: 15;">
							<text style="font-size: 24upx;">{{item.name}}</text>
						</view>
						<view class="align-center" style="flex: 5;">
							<text style="font-size: 32upx;font-weight: bold;color: #17393c;">{{item.koushu}}</text>
						</view>
						<view class="user-list-right uni-column" style="flex: 2;align-items: center;">
							<image src="../../../static/img/dianzan.png"></image>
							<text class="user-list-text-h4" style="text-align: center;color: #17393c;">
								{{item.like_num}}
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
				my_data: {
					imgsrc: 'http://img3.imgtn.bdimg.com/it/u=466871861,443615080&fm=26&gp=0.jpg',
					name: '你的名字',
					mingci: 5,
					koushu: 50,
					like_num: 100
				},
				ranking_data: [{
					mingci: 1,
					imgsrc: 'http://img4.imgtn.bdimg.com/it/u=1500340397,2782091651&fm=26&gp=0.jpg',
					name: '加上快递回',
					koushu: 10,
					like_num: 100
				}, {
					mingci: 2,
					imgsrc: 'http://img4.imgtn.bdimg.com/it/u=1500340397,2782091651&fm=26&gp=0.jpg',
					name: '加上快递回',
					koushu: 10,
					like_num: 100
				}, {
					mingci: 3,
					imgsrc: 'http://img4.imgtn.bdimg.com/it/u=1500340397,2782091651&fm=26&gp=0.jpg',
					name: '加上快递回',
					koushu: 10,
					like_num: 100
				}],
				crown:['../../../static/img/guan-jun.png','../../../static/img/ya-jun.png','../../../static/img/ji-jun.png']
			}
		},
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
	.noborder{
		border: none!important;
	}
</style>
