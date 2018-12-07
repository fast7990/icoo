<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section">
				<segmented-control :current="current" :values="tabitems" v-on:clickItem="onClickItem" :styleType="styleType"
				 :activeColor="activeColor"></segmented-control>
			</view>
			<view class="page-section" style="height: 30upx;background: #F7F7F7;"></view>
			<view class="page-section content">
				<view class="user-list panel uni-row">
					<view class="content">
						<view class="left uni-column">
							<view>烟油消耗量<text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{panel_list[current].tobacco_consume}}</text></view>
							<view>减少焦油摄入<text>&nbsp;{{panel_list[current].tar_reduce}}</text></view>
							<view>寿命延长时间<text>&nbsp;{{panel_list[current].life}}</text></view>
						</view>
						<view class="right uni-column">
							<text style="font-size: 66upx;font-weight: bold;">{{panel_list[current].has_mouth}}</text>
							<text>再吸{{panel_list[current].need_mouth}}口即可获得今日奖励</text>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section uni-column boxline align-center" style="padding: 0;margin: 0;">
				<view class="" style="width: 680upx;height: 680upx;position: relative;">
					<view class="canvasView" :style="{left:current === 0?'0':'-150%'}">
						<mpvue-echarts :echarts="echarts" :onInit="barInit.day" canvasId="day" />
					</view>
					<view class="canvasView" :style="{left:current === 1?'0':'-150%'}">
						<mpvue-echarts :echarts="echarts" :onInit="barInit.month" canvasId="month" />
					</view>
					<view class="canvasView" :style="{left:current === 2?'0':'-150%'}">
						<mpvue-echarts :echarts="echarts" :onInit="barInit.year" canvasId="year" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import segmentedControl from '../../../components/segmented-control.vue';
	import * as echarts from '../../components/echarts/echarts.min.js';
	import mpvueEcharts from '../../../components/mpvue-echarts/src/echarts.vue';
	import {
		IsDate
	} from '../../../common/util.js';

	function getDay() {
		let time = new Date();
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
		return arr;
	}
	let xAxisValuewWeek = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
	let xAxisValueMonth = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
	let xAxisValueDay = getDay();
	let monthDataZoom = [{
			type: 'slider',
			show: false,
			start: 0,
			end: 20
		},
		{
			type: 'inside',
			start: 0,
			end: 20
		}
	]

	function getBarOption(xAxisData, DataZoom, seriesData) {
		return {
			animation: true,
			backgroundColor: '#F8F8F8',
			dataZoom: DataZoom,
			xAxis: {
				type: 'category',
				axisLine: { //坐标轴轴线相关设置
					show: false
				},
				axisTick: { //坐标轴刻度相关设置
					show: false
				},
				splitLine: { //坐标轴在 grid 区域中的分隔线
					show: false
				},
				data: xAxisData,
				axisLabel: { //调整x轴的lable  
					textStyle: {
						fontSize: 8 // 让字体变大
					}
				}
			},
			yAxis: {
				type: 'value',
				min: 0,
				max: 4000,
				axisLine: { //坐标轴轴线相关设置
					show: false
				},
				axisTick: { //坐标轴刻度相关设置
					show: true
				},
				splitLine: { //坐标轴在 grid 区域中的分隔线
					show: true
				},
				axisLabel: { //调整x轴的lable  
					textStyle: {
						fontSize: 8 // 让字体变大
					}
				}
			},
			series: [{
				symbolSize: 12,
				itemStyle: {
					normal: {
						label: {
							show: false
						}
					}
				},
				name: '口数',
				type: 'line',
				data: [820, 932, 901, 934, 1290, 1330, 1320]
			}]
		}
	}
	export default {
		data() {
			let that = this;
			return {
				tabitems: [
					'每日统计',
					'每月统计',
					'每年统计'
				],
				echarts,
				current: 0,
				activeColor: '#17393c',
				styleType: 'text',
				panel_list: [{
					tobacco_consume: '5g',
					tar_reduce: '32mg',
					life: '10hr',
					has_mouth: 10,
					need_mouth: 2
				}, {
					tobacco_consume: '50g',
					tar_reduce: '132mg',
					life: '20hr',
					has_mouth: 101,
					need_mouth: 15
				}, {
					tobacco_consume: '500g',
					tar_reduce: '1132mg',
					life: '101hr',
					has_mouth: 1000,
					need_mouth: 22
				}],
				barInit: {
					day: function(canvas, width, height) {
						let barChart = echarts.init(canvas, null, {
							width: width,
							height: height
						})
						canvas.setChart(barChart);
						barChart.on('click', function(params) {
							that.panel_list[0].has_mouth = params.value;
						});
						barChart.setOption(getBarOption(xAxisValuewWeek, null))
						return barChart
					},
					month: function(canvas, width, height) {
						let barChart = echarts.init(canvas, null, {
							width: width,
							height: height
						})
						canvas.setChart(barChart);
						barChart.on('click', function(params) {
							that.panel_list[1].has_mouth = params.value;
						});
						barChart.setOption(getBarOption(xAxisValueDay, monthDataZoom))
						return barChart
					},
					year: function(canvas, width, height) {
						let barChart = echarts.init(canvas, null, {
							width: width,
							height: height
						})
						canvas.setChart(barChart);
						barChart.on('click', function(params) {
							that.panel_list[2].has_mouth = params.value;
						});
						barChart.setOption(getBarOption(xAxisValueMonth, monthDataZoom))
						return barChart
					}
				}
			}
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			}
		},
		components: {
			segmentedControl,
			mpvueEcharts
		}
	}
</script>

<style scoped>
	page,
	view {
		display: flex;
	}

	.page {
		height: 100%;
		background-color: #FFFFFF;
	}

	text {
		color: #17393C;
	}

	.page-section {
		box-sizing: border-box;
		background: #FFFFFF;
		padding: 0 30upx;
	}

	.content>view {
		width: 100%;
	}

	.panel {
		width: 680upx;
		height: 250upx;
		border-radius: 25upx;
		overflow: hidden;
		padding: 0;
		box-shadow: none;
		margin: 30upx 0 70upx;
		background-image: url(https://www.icoo.tech/imgup/2018-12-07/201812070510509u6amx1a47x.jpg);
		background-size: 100% 100%;
	}

	.panel .content {
		width: 100%;
		padding: 50upx;
	}

	.panel .left,
	.panel .right {
		flex: 1;
		color: #FFFFFF;
		font-size: 22upx;
	}

	.panel .right {
		text-align: center;
	}

	.panel .left {
		justify-content: space-between;
		font-size: 28upx;
	}

	.panel text {
		color: #FFFFFF;
	}

	.canvasView {
		width: 680upx;
		height: 680upx;
		position: absolute;
		left: 0;
		top: 0;
	}
</style>
