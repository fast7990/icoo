<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section" style="margin-top: 15upx;">
				<view class="user-list yibiao" style="align-items: center;justify-content: center;">
					<view class="yibiao-box">
						<view class="box neiceng">
							<image src="../../../static/img/neiceng.png" mode=""></image>
						</view>
						<view class="box waiceng" id="wai1" :style="{transform:rotate_wai1}">
							<image src="../../../static/img/wai.png" mode=""></image>
						</view>
						<view class="box waiceng" id="wai2" :style="{transform:rotate_wai2}">
							<image src="../../../static/img/wai.png" mode=""></image>
						</view>
						<view class="box waiceng" id="wai3" :style="{transform:rotate_wai3}">
							<image src="../../../static/img/wai.png" mode=""></image>
						</view>
					</view>
					<view class="box uni-column align-center" style="padding-top: 120upx;height: auto;">
						<text class="box-text" style="font-size: 22upx;">吸烟口数</text>
						<text class="box-text" style="font-size: 58upx;">{{dashboardValue}}</text>
						<text class="box-text" style="line-height: 44upx;background: #7aff70;border-radius: 10upx;padding: 0 14upx;font-size: 22upx;color: #131313;">可以接着抽</text>
						<text class="box-text" style="font-size: 22upx;margin-top: 50upx;">轻度抽烟可以愉悦身心，健康无害</text>
						<text class="box-text" style="font-size: 24upx;padding: 0 40upx;border-radius:20upx;line-height: 48upx;background: #ff7800;margin: 20upx 0 10upx"
						 @tap="target('checkIn')">领取奖励</text>
						<text class="box-text" style="font-size: 20upx;">还差34口即可领取今日奖励</text>
					</view>
				</view>

			</view>
			<!-- 			<view class="page-section">
				<input type="text" value="" v-model="dashboardValue" />
				<button type="primary" @tap="initDashboard">数值</button>
			</view> -->
			<view class="page-section">
				<view class="user-list">
					<view class="list0 action-row" @tap="openBluetooth">
						<view class="user-list-left" style="flex: 1;">
							<image src="../../../static/img/bangding.png"></image>
						</view>
						<view class="user-list-center uni-column" style="flex: 6;">
							<view>
								<text class="user-list-text-h2">
									{{list_data.bind}}
								</text>
							</view>
							<view>
								<text class="user-list-text-h4">
									{{list_data.bind_info}}
								</text>
							</view>
						</view>
						<view class="user-list-right" style="flex: 1;">
							<image src="../../../static/img/close.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="user-list uni-column">
					<view class="list0">
						<view class="user-list-center uni-column">
							<view>
								<text class="user-list-text-h2">
									消耗油烟{{list_data.lampblack_num}}
								</text>
							</view>
							<view>
								<text class="user-list-text-h4">
									{{list_data.lampblack_info}}
								</text>
							</view>
						</view>
					</view>
					<view class="list-line0"></view>
					<view class="list0">
						<view class="user-list-center uni-column">
							<view>
								<text class="user-list-text-h2">
									寿命延长{{list_data.life_num}}小时
								</text>
							</view>
							<view>
								<text class="user-list-text-h4">
									{{list_data.life_info}}
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="user-list">
					<view class="list0 action-row" @tap="target('ranking')">
						<view class="user-list-left" style="flex: 1;">
							<image src="../../../static/img/paihang.png"></image>
						</view>
						<view class="user-list-center uni-column" style="flex: 6;">
							<view>
								<text class="user-list-text-h2">
									健康风云榜排行{{list_data.health_ranking}}
								</text>
							</view>
							<view>
								<text class="user-list-text-h4">
									我的当前排名{{list_data.health_ranking_num}}
								</text>
							</view>
						</view>
						<view class="user-list-right uni-column" style="flex: 1;align-items: center;">
							<image src="../../../static/img/dianzan.png"></image>
							<text class="user-list-text-h4" style="text-align: center;">
								{{list_data.like_num}}
							</text>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="user-text">
					<text class="text-h1">健康生活</text>
				</view>
			</view>
			<view class="page-section">
				<view class="user-list uni-column">
					<view class="user-list-cardview-top" style="width: 100%;">
						<image :src="cardview_data.imgsrc"></image>
					</view>
					<view class="user-list-cardview-bottom uni-column" style="width: 100%;">
						<view class="user-text">
							<text style="font-size: 30upx;flex: 1;">
								这件发假假按揭阿萨德撒娇的阿斯达四大
							</text>
						</view>
						<view class="user-text" style="justify-content: space-between;">
							<view class="align-center">
								<image src="../../../static/img/eye.png" style="width: 23upx;height: 16upx;"></image>
								<text class="user-list-text-h4">{{cardview_data.glance_num}}</text>
							</view>
							<view class="align-center">
								<text class="user-list-text-h4">{{cardview_data.creat_time}}</text>
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
	import * as echarts from '../../components/echarts/echarts.min.js';
	import mpvueEcharts from '../../components/mpvue-echarts/src/echarts.vue';

	function getBarOption(xAxisData, DataZoom, seriesData) {
		return {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
				show: false,
				orient: 'vertical',
				x: 'left',
				data: ['直接访问']
			},
			series: [{
				name: '访问来源',
				type: 'pie',
				radius: ['85%', '90%'],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: '30',
							fontWeight: 'bold'
						}
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
						value: 1,
						name: 'left'
					},
					{
						value: 30,
						name: 'right'
					}
				]
			}]
		}
	}
	export default {
		data() {
			return {
				title: '蓝牙',
				rotate_wai1: 'rotate(-108deg)',
				rotate_wai2: 'rotate(-108deg)',
				rotate_wai3: 'rotate(-108deg)',
				dashboardValue: 100,
				list_data: {
					bind: '未绑定设备',
					bind_info: '点击绑定设备体验前所未有智能体验',
					lampblack_num: 0,
					lampblack_info: 'xxx',
					life_num: 0,
					life_info: 'xxx',
					health_ranking: 0,
					health_ranking_num: 0,
					like_num: 0
				},
				cardview_data: {
					glance_num: 10,
					creat_time: '02-10',
					imgsrc: 'http://img2.imgtn.bdimg.com/it/u=3538070765,2877117727&fm=26&gp=0.jpg'
				}
			}
		},
		created() {
			this.initDashboard();
		},
		onPullDownRefresh: function() {
			console.log('onPullDownRefresh');
		},
		methods: {
			openBluetooth(e) {
				uni.navigateTo({
					url: '../../API/get-bluetooth-tool/get-bluetooth-tool'
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
			initDashboard() {
				if (this.dashboardValue > 600) {
					this.dashboardValue = 600;
				}
				let rotate = this.dashboardValue * 0.36 - 108;
				if (this.dashboardValue <= 250) {
					this.rotate_wai1 = this.rotate_wai2 = this.rotate_wai3 = 'rotate(' + rotate + 'deg)';
				} else if (this.dashboardValue > 250 && this.dashboardValue <= 500) {
					this.rotate_wai1 = 'rotate(-18deg)';
					this.rotate_wai2 = 'rotate(' + rotate + 'deg)';
					this.rotate_wai3 = 'rotate(' + rotate + 'deg)';
				} else if (this.dashboardValue > 500 && this.dashboardValue <= 600) {
					this.rotate_wai1 = 'rotate(-18deg)';
					this.rotate_wai2 = 'rotate(69deg)';
					this.rotate_wai3 = 'rotate(' + rotate + 'deg)';
				}
				console.log(rotate);
			}
		},
		components: {
			uniIcon,
			mpvueEcharts
		}
	}
</script>

<style scoped>
	page,
	view {
		display: flex;
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

	.canvasView {
		width: 500upx;
		height: 480upx;
		margin-top: 20upx;
	}

	.yibiao {
		height: 500upx;
		background: #17393c;
		position: relative;
	}

	.yibiao-box {
		position: absolute;
		width: 470upx;
		height: 310upx;
		top: 36upx;
		overflow: hidden;
	}

	.neiceng {
		position: relative;
	}

	.yibiao-box .box {
		position: absolute;
		width: 470upx;
		height: 470upx;
		top: 0;
		left: 0;
		z-index: 3;
	}

	.box image {
		width: 470upx;
		height: 310upx;
	}

	.box-text {
		color: #FFFFFF;
	}

	.waiceng {}
</style>
