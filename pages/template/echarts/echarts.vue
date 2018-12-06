<template>
	<view class="container">
		<view class="page-section-tab">
			<view class="tab">
				<text class="navigate" @tap="changeBarInit('day');" selectable>每日统计</text>
			</view>
			<view class="tab">
				<text class="navigate" @tap="changeBarInit('month');" selectable>按月统计</text>
			</view>
			<view class="tab">
				<text class="navigate" @tap="changeBarInit('year')" selectable>按年统计</text>
			</view>
		</view>
		<view class="page-body ">
			<text class="uni-h1">tt</text>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in {img:'123.jpg',title:'123',content:'ff'}" :key="index">
					<view class="uni-media-list">
						<image class="uni-media-list-logo" :src="item.img"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{item.title}}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">{{item.content}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="canvasView">
			<!-- <view class="title">饼图示例</view> -->
			<view class="canvasBox" v-for="item in BarInitArr" :key="item" v-show="item==barInitState">
				<mpvue-echarts :echarts="echarts" :onInit="barInit" canvasId="bar" />
			</view>
		</view>
	</view>
</template>

<script>
	import * as echarts from '../../components/echarts/echarts.min.js';
	import mpvueEcharts from '../../components/mpvue-echarts/src/echarts.vue';
	let xAxisValueDay = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
	let xAxisValueMonth = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
	let monthDataZoom = [{
			show: false,
			start: 0,
			end: 50
		},
		{
			type: 'inside',
			start: 0,
			end: 10
		}
	]

	function getBarOption(xAxisData, DataZoom, seriesData) {
		return {
			animation: false,
			backgroundColor: '#F8F8F8',
			dataZoom: DataZoom,
			xAxis: {
				axisLine: { //坐标轴轴线相关设置
					show: false
				},
				axisTick: { //坐标轴刻度相关设置
					show: false
				},
				splitLine: { //坐标轴在 grid 区域中的分隔线
					show: false
				},
				data: xAxisData
			},
			yAxis: {
				show: false,
			},
			series: [{
				label: {
					show: false,
					normal: {
						fontSize: 12
					}
				},
				color: ['#909263'],
				name: '销量',
				type: 'bar',
				data: [{
					value: '5'
				}, {
					value: '20'
				}, {
					value: '36'
				}, {
					value: '10'
				}, {
					value: '15'
				}, {
					value: '20'
				}, {
					value: '20'
				}]
			}]
		}
	}
	export default {
		data() {
			return {
				barInitArr: ['day', 'month', 'year'],
				barInitState: 'day',
				echarts,
				barInit: function(canvas, width, height) {
					let barChart = echarts.init(canvas, null, {
						width: width,
						height: height
					})
					canvas.setChart(barChart)
					barChart.setOption(getBarOption(xAxisValueDay, null))
					return barChart
				}
			}
		},
		methods: {
			changeBarInit(item) {
				if (item == 'day') {
					this.barInitState = item;
				}
				if (item == 'month') {
					this.barInitState = item;
				}
				if (item == 'year') {
					this.barInitState = item;
				}
			}
		},
		components: {
			mpvueEcharts
		}
	}
</script>

<style scoped="scoped">
	page,
	view {
		display: flex;
		/* uni-app默认使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。若不需要flex布局可删除本行*/
	}

	page {
		min-height: 100%;
	}

	.container {
		padding-bottom: 30upx;
		box-sizing: border-box;
	}

	.container,
	.canvasView {
		flex: 1;
		flex-direction: column;
	}

	.canvasBox {
		height: 600upx;
	}

	.navigate {
		height: 50upx;
	}

	.tabActive {
		border: 1upx solid #FFFFFF;
	}

	.page-section-tab {
		display: flex;
		flex-direction: row;
		border: 1upx solid #000000;

	}

	.page-section-tab .tab {
		display: block;
		width: 33.3%;
		text-align: center;
	}

	.navigate {
		color: #007AFF;
	}
</style>
