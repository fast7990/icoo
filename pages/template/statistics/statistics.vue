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
							<view>相当于少抽烟<text>&nbsp;{{panel_list[current].tar_reduce}}</text></view>
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

	function getBarOption(xAxisData, DataZoom, seriesData, max) {
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
				max: max,
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
				data: seriesData
			}]
		}
	}

	function maxNumber(num) {
		console.log(num)
		if (num < 10) {
			return 10;
		} else if (num < 50) {
			return 50;
		} else if (num < 100) {
			return 100;
		} else if (num < 200) {
			return 200;
		} else if (num < 500) {
			return 500;
		} else if (num < 1000) {
			return 1000;
		} else {
			return 4000;
		}
	}
	export default {
		data() {
			let that = this;
			let statisTicsData = this.$store.state.statisTicsData;
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
					tobacco_consume: '0ml',
					tar_reduce: '0支',
					life: '0min',
					has_mouth: 0,
					need_mouth: 0
				}, {
					tobacco_consume: '0ml',
					tar_reduce: '0支',
					life: '0min',
					has_mouth: 0,
					need_mouth: 0
				}, {
					tobacco_consume: '0ml',
					tar_reduce: '0支',
					life: '0min',
					has_mouth: 0,
					need_mouth: 0
				}],
				barInit: {
					day: function(canvas, width, height) {
						let max = 100;
						let arr = [];
						let init_data = [];
						console.log(statisTicsData);
						xAxisValuewWeek.map(function(item) {
							init_data.push('');
						});
						if (Array.isArray(statisTicsData.day)) {
							statisTicsData.day.map(function(item) {
								init_data[item.statisticsDate - 1] = item.puffsTime;
								arr.push(item.puffsTime);
							});
							max = maxNumber(Math.max.apply(null, arr));
						}
						let barChart = echarts.init(canvas, null, {
							width: width,
							height: height
						})
						canvas.setChart(barChart);
						barChart.on('click', function(params) {
							that.panel_list[0].has_mouth = params.value;
						});
						barChart.setOption(getBarOption(xAxisValuewWeek, null, init_data, max))
						return barChart
					},
					month: function(canvas, width, height) {
						let init_data = [];
						let max = 100;
						let arr = [];
						xAxisValuewWeek.map(function(item) {
							init_data.push('');
						});
						if (Array.isArray(statisTicsData.month)) {
							statisTicsData.month.map(function(item) {
								init_data[item.statisticsDate - 1] = item.puffsTime;
								arr.push(item.puffsTime);
							});
							max = maxNumber(Math.max.apply(null, arr));
						}
						let barChart = echarts.init(canvas, null, {
							width: width,
							height: height
						})
						canvas.setChart(barChart);
						barChart.on('click', function(params) {
							that.panel_list[1].has_mouth = params.value;
						});
						barChart.setOption(getBarOption(xAxisValueDay, monthDataZoom, init_data, max))
						return barChart
					},
					year: function(canvas, width, height) {
						let init_data = [];
						let max = 100;
						let arr = [];
						xAxisValuewWeek.map(function(item) {
							init_data.push('');
						});
						if (Array.isArray(statisTicsData.year)) {
							statisTicsData.year.map(function(item) {
								init_data[item.statisticsDate - 1] = item.puffsTime;
								arr.push(item.puffsTime);
							});
							max = maxNumber(Math.max.apply(null, arr));
						}
						let barChart = echarts.init(canvas, null, {
							width: width,
							height: height
						})
						canvas.setChart(barChart);
						barChart.on('click', function(params) {
							that.panel_list[2].has_mouth = params.value;
						});
						barChart.setOption(getBarOption(xAxisValueMonth, monthDataZoom, init_data, max))
						return barChart
					}
				}
			}
		},
		onLoad: function() {
			let dashboardValue = this.$store.state.globalData.dashboardValue;
			let sysPuffsNum = this.$store.state.sysPuffsNum;
			for (var i = 0; i < 3; i++) {
				this.panel_list[i].has_mouth = dashboardValue;
				if (sysPuffsNum - dashboardValue > 0) {
					this.panel_list[i].need_mouth = sysPuffsNum - dashboardValue;
				} else {
					this.panel_list[i].need_mouth = 0;
				}
			}
		},
		watch: {
			newhasMouthValue(newValue, oldValue) {
				this.panel_list[this.current].tobacco_consume = (newValue * 0.0017).toFixed(4) + 'ml';
				this.panel_list[this.current].tar_reduce = (newValue * 0.02).toFixed(2) + '支';
				this.panel_list[this.current].life = (newValue * 0.22).toFixed(2) + 'min';
			}
		},
		computed: {
			newhasMouthValue() {
				return this.panel_list[this.current].has_mouth
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
