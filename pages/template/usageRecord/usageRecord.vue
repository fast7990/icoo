<template>
	<view class="page">
		<view class="page-section-tab" :style="{background:backgroundColor}">
			<view class="tab" v-for="(item,index) in navList" :class="{tabActive:index==activeIndex}" :key="item">
				<text class="navigate" @tap="changeBarInit(item,index);" daycolor='red'>{{item.text}}</text>
			</view>
		</view>
		<view class="page-body bannder" style="height: 400upx;flex-direction: column;align-items: center;justify-content: center;"
		 :style="{backgroundColor:backgroundColor}">
			<text class="today-num" style="font-size: 80upx;">56</text>
			<text class="today-msg" style="26upx">卡就是大家撒</text>
		</view>
		<view class="page-body" style="flex-direction: column;">
			<view style="flex: 1;">
				<view class="body-info" style="width: 33.3%;align-items: center;flex-direction: column;">
					<view class="uni-flex uni-row">
						<view class="text" style="height: 60upx;; justify-content: center;align-items: center;">
							<text style="font-size: 40upx;">5</text>
						</view>
						<view class="text" style="height: 60upx; justify-content: center;align-items: flex-end;">
							<text style="font-size: 26upx;">mg</text>
						</view>
					</view>
					<view class="text">
						<text style="font-size: 26upx;">每日焦油</text>
					</view>
				</view>
				<view class="body-info" style="width: 33.3%;align-items: center;flex-direction: column;">
					<view class="uni-flex uni-row">
						<view class="text" style="height: 60upx;; justify-content: center;align-items: center;">
							<text style="font-size: 40upx;">5</text>
						</view>
						<view class="text" style="height: 60upx; justify-content: center;align-items: flex-end;">
							<text style="font-size: 26upx;">mg</text>
						</view>
					</view>
					<view class="text">
						<text style="font-size: 26upx;">每日焦油</text>
					</view>
				</view>
				<view class="body-info" style="width: 33.3%;align-items: center;flex-direction: column;">
					<view class="uni-flex uni-row">
						<view class="text" style="height: 60upx;; justify-content: center;align-items: center;">
							<text style="font-size: 40upx;">5</text>
						</view>
						<view class="text" style="height: 60upx; justify-content: center;align-items: flex-end;">
							<text style="font-size: 26upx;">mg</text>
						</view>
					</view>
					<view class="text">
						<text style="font-size: 26upx;">每日焦油</text>
					</view>
				</view>
			</view>
			<view class="line" style="height: 0;width: 96%;margin:0 2%;border-bottom: 1upx solid #e5e5e5;"></view>
		</view>
		<view class="canvasBox">
			<!-- <view class="title">饼图示例</view> -->
			<div class="canvasView" :class="barInitState=='day'?'hidden':'day'">
				<mpvue-echarts :echarts="echarts" :onInit="barInit.day" canvasId="day" />
			</div>
			<div class="canvasView" :class="barInitState=='month'?'hidden':'month'">
				<mpvue-echarts :echarts="echarts" :onInit="barInit.month" canvasId="month" />
			</div>
			<div class="canvasView" :class="barInitState=='year'?'hidden':'year'">
				<mpvue-echarts :echarts="echarts" :onInit="barInit.year" canvasId="year" />
			</div>
		</view>
	</view>
</template>

<script>
	import * as echarts from '../../components/echarts/echarts.min.js';
	import mpvueEcharts from '../../components/mpvue-echarts/src/echarts.vue';
	import {
		IsDate
	} from '../../../common/util.js';

	function getDay() {
		let time = new Date();
		// let date = time.getFullYear() + '-' + time.getMonth();
		let date = '2018-3'
		let d = 31;
		let arr = [];
		for (let i = 28; i <= 32; i++) {
			if (!IsDate(date + '-' + i)) {
				d = i - 1;
				break;
			}
		}
		for (let i = 1; i <= d; i++) {
			arr.push(i);
		}
		// console.log(arr)
		return arr;
	}
	let xAxisValuewWeek = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
	let xAxisValueMonth = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
	let xAxisValueDay = getDay();
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
	let itemStyleNormalColor = function(params) { //自定义颜色
		var colorList = [
			'#5e7e54', '#e44f2f', '#81b6b2', '#eba422', '#5e7e54',
			'#e44f2f', '#81b6b2'
		];
		return colorList[params.dataIndex]
	}

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
				itemStyle: {
					normal: {
						color: itemStyleNormalColor,
						label: {
							show: true,
							position: 'top',
							textStyle: {
								color: 'white'
							}
						}
					}
				},
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
				backgroundColor: "red",
				echarts,
				navList: [{
					type: 'day',
					text: '每日统计',
					color: 'blue'
				}, {
					type: 'month',
					text: '按月统计',
					color: 'yellow'
				}, {
					type: 'year',
					text: '按年统计',
					color: 'red'
				}],
				activeIndex: 0,
				barInit: {
					day: function(canvas, width, height) {
						let barChart = echarts.init(canvas, null, {
							width: width,
							height: height
						})
						canvas.setChart(barChart)
						barChart.setOption(getBarOption(xAxisValuewWeek, null))
						return barChart
					},
					month: function(canvas, width, height) {
						let barChart = echarts.init(canvas, null, {
							width: width,
							height: height
						})
						canvas.setChart(barChart)
						barChart.setOption(getBarOption(xAxisValueDay, monthDataZoom))
						return barChart
					},
					year: function(canvas, width, height) {
						let barChart = echarts.init(canvas, null, {
							width: width,
							height: height
						})
						canvas.setChart(barChart)
						barChart.setOption(getBarOption(xAxisValueMonth, monthDataZoom))
						return barChart
					}
				}
			}
		},
		methods: {
			changeBarInit(item, index) {
				if (item.type == 'day') {
					this.barInitState = item.type;
				}
				if (item.type == 'month') {
					this.barInitState = item.type;
				}
				if (item.type == 'year') {
					this.barInitState = item.type;
				}
				this.backgroundColor = item.color;
				this.activeIndex = index;
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

	.page {
		flex-direction: column;
	}

	.canvasBox {
		position: relative;
		height: 600upx;
	}

	.canvasView {
		position: absolute;
		top: 0;
		width: 100%;
		height: 600upx;
	}

	.day {
		left: 0;
	}

	.month {
		left: -100%;
	}

	.year {
		left: -200%;
	}

	.navigate {
		line-height: 80upx;
	}

	.hidden {
		left: 0;
	}

	.page-section-tab {
		flex-direction: row;
		background: #b3d6fb;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 4px 4px 0px;
	}

	.tab {
		display: block;
		width: 33.3%;
		text-align: center;

	}

	.tab.tabActive {
		border-bottom: 2upx solid #f5d100;
	}

	.navigate {
		color: #007AFF;
	}

	.today-consume {}

	.strong-font {
		text-align: center;
		font-size: 32upx;
	}

	.small-font {
		font-size: 18upx;
	}
</style>
