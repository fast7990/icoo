<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section" style="margin-top: 15upx;">
				<view class="user-list uni-column" style="background: #17393C;">
					<view class="uni-row topinfo">
						<text>当前爱氪世界总人口数：{{list_data.sortSum}}</text>
						<text>您是第{{list_data.sort}}位居民</text>
					</view>
					<view class="yibiao" style="align-items: center;justify-content: center;">
						<view class="yibiao-box">
							<block class="box neiceng">
								<canvas canvas-id="clock" class="canvas" width="470px" height="470px"></canvas>
								<canvas canvas-id="pointer" class="canvas" width="470px" height="470px"></canvas>
							</block>
						</view>
						<view class="box uni-column align-center" style="padding-top: 160upx;height: auto;z-index: 10;">
							<text class="box-text" style="font-size: 58upx;">{{list_data.dashboardValue>0?list_data.dashboardValue:0}}</text>
							<text class="box-text" style="line-height: 44upx;background: #7aff70;border-radius: 10upx;padding: 0 14upx;font-size: 22upx;color: #131313;">{{list_data.smokeInfo}}</text>
							<text class="box-text" style="font-size: 22upx;margin-top: 50upx;">轻度抽烟可以愉悦身心，健康无害</text>
							<text class="box-text reward" :class="list_data.signState==1?'reward-after':''" @tap="target('checkIn')" v-if="receivingState">{{list_data.signState?'已领取':'可领取奖励'}}</text>
							<text class="box-text reward reward-after" @tap="target('checkIn')" v-else>{{list_data.signState?'已领取':'领取奖励'}}</text>
							<text class="box-text" style="font-size: 20upx;">您还差{{list_data.sysPuffsNum-list_data.dashboardValue>0?list_data.sysPuffsNum-list_data.dashboardValue:0}}口即可获得当日积分奖励</text>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="user-list" style="height: 118upx;">
					<view class="list0 action-row align-center" @tap="openBluetooth">
						<view class="user-list-left" style="flex: 1;">
							<image src="../../../static/img/bluetooth0.png" mode="" v-if="list_data.bindStatus"></image>
							<image src="../../../static/img/bluetooth1.png" style="width: 32upx;height: 40upx;" v-else></image>
						</view>
						<view class="user-list-center action-row align-center" style="flex: 6;justify-content: space-between;">
							<view>
								<text class="user-list-text-h2" style="font-weight: bold;">
									{{list_data.bindStatus?'已绑定设备':'未绑定设备'}}
								</text>
							</view>
							<view>
								<text class="user-list-text-h4">
									{{list_data.bindInfo}}
								</text>
							</view>
						</view>
						<view class="user-list-right" style="flex: 1;">
							<image src="../../../static/img/battery_charging.jpg" mode="" v-if="battery_charging"></image>
							<image src="../../../static/img/close.png" v-else></image>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="user-list align-center" style="height: 118upx;">
					<view class="list0 action-row" @tap="target('invitedFriend')">
						<view class="user-list-left" style="flex: 1;">
							<image src="../../../static/img/paihang.png"></image>
						</view>
						<view class="user-list-center uni-column" style="flex: 6;">
							<view>
								<text class="user-list-text-h2" style="font-weight: bold;">
									邀请好友共享健康
								</text>
							</view>
						</view>
						<view class="user-list-right uni-column" style="flex: 1;align-items: center;">
						</view>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="user-list align-center" style="height: 118upx;">
					<text style="flex: 8;font-size: 28upx;font-weight: bold;">设备名称：{{list_data.deviceName?list_data.deviceName:''}}</text>
					<view style="flex: 1;border-left:1upx solid #d3d3d3;"></view>
					<text style="flex: 6;font-size: 28upx;font-weight: bold;">设备电量：{{list_data.driverBatter?list_data.driverBatter+'%':''}}</text>
				</view>
			</view>
			<view class="page-section">
				<view class="user-list uni-column">
					<view class="list0">
						<view class="user-list-center uni-column">
							<view>
								<text class="user-list-text-h2" style="font-weight: bold;">
									消耗油烟&nbsp;{{list_data.lampblack_num>0?list_data.lampblack_num:0}}&nbsp;毫升
								</text>
							</view>
							<view>
								<text class="user-list-text-h4" style="padding-top: 10upx;">
									{{list_data.lampblack_info}}
								</text>
							</view>
						</view>
					</view>
					<view class="list-line0"></view>
					<view class="list0">
						<view class="user-list-center uni-column">
							<view>
								<text class="user-list-text-h2" style="font-weight: bold;">
									寿命延长&nbsp;{{list_data.life_num>0?list_data.life_num:0}}&nbsp;分钟
								</text>
							</view>
							<view>
								<text class="user-list-text-h4" style="padding-top: 10upx;">
									{{list_data.life_info}}
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="user-list">
					<view class="list0 action-row align-center" @tap="target('ranking')">
						<view class="user-list-left" style="flex: 1;">
							<image src="../../../static/img/paihang.png"></image>
						</view>
						<view class="user-list-center uni-column" style="flex: 6;">
							<view>
								<text class="user-list-text-h2" style="font-weight: bold;">
									健康排行榜&nbsp;{{list_data.puffsSort}}名
								</text>
							</view>
						</view>
						<view class="user-list-right uni-column" style="flex: 1;align-items: center;">
							<image src="../../../static/img/dianzan.png"></image>
							<text class="user-list-text-h4" style="text-align: center;">
								{{list_data.sortSupport}}
							</text>
						</view>
					</view>
				</view>
			</view>
			<view class="page-section" style="margin: 0;justify-content: flex-start;">
				<text class="text-h1" style="font-size: 36upx;font-weight: bold;">icoo爱氪生活</text>
			</view>
			<view class="page-section uni-column">
				<view class="user-list uni-column" v-for="(item,index) in cardview_data" :key="index" style="margin-bottom: 20upx;">
					<view class="user-list-cardview-top" style="width: 100%;" @tap="openViews(item.banner_href)">
						<image :src="item.banner_url?baseusrl+item.banner_url:''"></image>
					</view>
					<view class="user-list-cardview-bottom uni-column" style="width: 100%;">
						<view class="user-text">
							<text style="font-size: 30upx;flex: 1;">
								{{item.banner_name}}
							</text>
						</view>
						<view class="user-text" style="justify-content: space-between;">
							<view class="align-center">
								<image src="../../../static/img/eye.png" style="width: 23upx;height: 16upx;"></image>
								<text class="user-list-text-h4">&nbsp;{{item.bannerid}}</text>
							</view>
							<view class="align-center">
								<text class="user-list-text-h4">{{item.create_time}}</text>
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
	import {
		childMixin
	} from "../../../common/mixins.js";
	import {
		bluetoothKeepLive
	} from '../../../common/bluetoothKeepLive';
	import {
		mapState
	} from 'vuex'
	var ctxPoint = null;
	var ctx = null;
	let smokeReady = [
		'继续享受吧',
		'可以接着抽',
		'歇会儿再抽',
		'建议别抽了',
		'再抽断电喽'
	];
	export default {
		data() {
			let shareFriendCode = JSON.stringify(this.$store.state.shareFriendCode)
			return {
				title: '蓝牙',
				baseusrl: 'https://www.icoo.tech',
				screenWidth: uni.getSystemInfoSync().windowWidth,
				canvasWidth: 0,
				you_ranking: 1550,
				BLEDriverData: '',
				shareFriendCode: shareFriendCode,
				receivingState: false,
				list_data: {
					battery_charging: false,
					bindStatus: false,
					deviceName: '',
					driverBatter: '',
					driverBatterState: '',
					smokeInfo: smokeReady[0],
					bindInfo: '点击绑定设备体',
					dashboardValue: 0,
					lampblack_num: 0,
					lampblack_info: '',
					life_num: 0,
					life_info: '电子烟中不含焦油等有害物质',
					sysPuffsNum: 0, //系统指定签到吸烟数
					signState: 0, //签到状态
					puffsInitTime: 0, //今日初始口数
					puffsSort: 0, //今日排行
					sortSupport: 0, //排行点赞人数
					sort: 0, //世界居民序号数
					sortSum: 0
				},
				cardview_data: [{
					glance_num: 10,
					creat_time: '02-10',
					imgsrc: 'http://img2.imgtn.bdimg.com/it/u=3538070765,2877117727&fm=26&gp=0.jpg'
				}]
			}
		},
		computed: {
			...mapState({ //这里的...不是省略号了,是对象扩展符
				$globalData: 'globalData'
			})
		},
		mixins: [childMixin, bluetoothKeepLive],
		onReady: function() {
			ctx = uni.createCanvasContext('clock');
			ctxPoint = uni.createCanvasContext('pointer');
			this.canvasWidth = this.screenWidth / 750 * 470;
			this.drawRing();
			this.drawRunRing(this.list_data.dashboardValue);
		},
		created() {
			this.list_data.deviceName = this.$store.state.deviceName;
		},
		onLoad: function() {
			this.keepLive();
		},
		onPullDownRefresh: function() {
			this.getApiData();
		},
		onShow: function() {
			let that = this;
			wx.hideLoading();
			if (this.$store.state.BLEDriverData) {
				console.log(1)
				this.setDeviceInfo(this.$store.state.BLEDriverData, function() {
					that.list_data.dashboardValue = that.$globalData.dashboardValue;
					that.$store.commit('set_puffsIntervalTime', that.list_data.dashboardValue);
					that.setDeviceChange();
					that.drawRunRing(that.$globalData.dashboardValue);
					that.getApiData();
				});
			} else {
				console.log(2)
				that.unbindDevice();
				that.getApiData();
			}
			console.log('首页面加载');
		},
		onHide: function() {
			let that = this;
			that.$store.commit('set_onHideState', true);
		},
		methods: {
			setDeviceChange() {
				let that = this;
				let dashboardValue = this.$globalData.dashboardValue;
				this.list_data.dashboardValue = dashboardValue;
				this.list_data.deviceName = this.$store.state.deviceName;
				this.list_data.sysPuffsNum = this.$store.state.sysPuffsNum;
				this.list_data.bindInfo = this.$globalData.bindInfo;
				this.list_data.bindStatus = this.$globalData.bindStatus;
				this.list_data.driverBatter = this.$globalData.driverBatter;
				this.list_data.smokeInfo = this.$globalData.smokeInfo;
				this.list_data.lampblack_num = (dashboardValue * 0.0017).toFixed(4);
				this.list_data.life_num = (dashboardValue * 0.22).toFixed(2);
				if (dashboardValue > 0) {
					this.list_data.lampblack_info = "相当于少抽了" + (dashboardValue * 0.02).toFixed(2) + "只烟节约了" + (dashboardValue * 0.017)
						.toFixed(2) + "元";
				}
			},
			setDeviceInfo(value, callback) {
				let driverBatter = parseInt(value[5], 16);
				this.$store.commit('set_globalData', {
					bindInfo: '',
					bindStatus: true
				});
				if (this.$globalData.dashboardValue <= 100) {
					this.$store.commit('set_globalData', {
						smokeInfo: this.$globalData.smokeReady[0]
					});
				} else if (this.$globalData.dashboardValue <= 200) {
					this.$store.commit('set_globalData', {
						smokeInfo: this.$globalData.smokeReady[1]
					});
				} else if (this.$globalData.dashboardValue <= 300) {
					this.$store.commit('set_globalData', {
						smokeInfo: this.$globalData.smokeReady[2]
					});
				} else if (this.$globalData.dashboardValue <= 400) {
					this.$store.commit('set_globalData', {
						smokeInfo: this.$globalData.smokeReady[3]
					});
				} else if (this.$globalData.dashboardValue <= 500) {
					this.$store.commit('set_globalData', {
						smokeInfo: this.$globalData.smokeReady[4]
					});
				} else {
					this.$store.commit('set_globalData', {
						smokeInfo: this.$globalData.smokeReady[4]
					});
				}
				callback();
			},
			unbindDevice() {
				let that = this;
				this.$store.commit('set_deviceName', '');
				this.$store.commit('set_BLEDriverData', '');
				this.$store.commit('set_globalData', {
					bindInfo: '',
					bindStatus: false,
					driverBatter: '',
					smokeInfo: this.$globalData.smokeReady[0],
					totalPuffsTime: 0,
				});
				this.list_data.deviceName = '';
				this.list_data.bindInfo = '';
				this.list_data.bindStatus = false;
				this.list_data.driverBatter = '';
				this.list_data.smokeInfo = this.$globalData.smokeInfo;
				this.list_data.lampblack_num = 0;
				this.list_data.life_num = 0;
				this.list_data.lampblack_info = '';
				this.list_data.dashboardValue = 0;
			},
			keepLive() {
				let that = this;
				let homeTimer = setInterval(function() {
					let bluetoothKeepLiveState = that.$store.state.bluetoothKeepLiveState;
					if (bluetoothKeepLiveState) {
						let driverBatterState = that.$store.state.globalData.driverBatterState;
						let driverBatter = that.$store.state.globalData.driverBatter;
						if (driverBatterState == 193) {
							that.list_data.bindInfo = '正在充电';
						} else {
							that.list_data.bindInfo = '';
						}
						that.list_data.driverBatter = driverBatter;
						that.sendBLEValueChange(85);
					}
					that.showDashboardValue();
				}, 5000);
				this.$store.commit('set_homeTimer', homeTimer);
			},
			childPagPuffsLogUpdata(result) {
				let onHideState = this.$store.state.onHideState;
				let totalPuffsTime = this.$globalData.totalPuffsTime;
				let newPuffsTime = '';
				if (Array.isArray(result)) {
					newPuffsTime = parseInt(result[12], 16);
				}
				console.log('onHideState', onHideState);
				if (onHideState && newPuffsTime > totalPuffsTime) {
					this.puffsLogUpdata(result);
				}
				this.$store.commit('set_onHideState', false);
			},
			showDashboardValue() {
				let dashboardValue = this.$store.state.globalData.dashboardValue;
				if (dashboardValue) {
					this.list_data.dashboardValue = dashboardValue;
					if (this.list_data.sysPuffsNum - dashboardValue < 0) {
						//可领取积分
						this.receivingState = true;
					}
				}
			},
			childPagIsUserDevice(msg) {},
			childPagResult() {},
			drawRing() {
				// 绘制外环
				let bilv = (this.canvasWidth / 2) / 236;
				ctx.beginPath();
				ctx.arc(236 * bilv, 236 * bilv, 228 * bilv, 22.5 / 180 * Math.PI, 157.5 / 180 * Math.PI, true);
				ctx.strokeStyle = '#607171';
				ctx.lineWidth = 14 * bilv;
				//.strock()官方解释是会实际的绘制出moveTo()和lineTo()方法定义的路径，在这里没什么实际意义，我把它去掉也不会受影响，看的前辈的代码，出于还是先放着吧！
				ctx.stroke();
				ctx.closePath();
				// 绘制内环
				ctx.beginPath();
				var gr = ctx.createLinearGradient(75 * bilv, 400 * bilv, 400 * bilv, 400 * bilv, 300 * bilv, 300 * bilv);
				//添加颜色端点
				gr.addColorStop(0, 'rgb(0,255,160)');
				gr.addColorStop(.5, 'rgb(255,255,0)');
				gr.addColorStop(1, 'rgb(255,0,0)');
				//应用fillStyle生成渐变
				ctx.strokeStyle = gr;
				ctx.arc(236 * bilv, 236 * bilv, 221 * bilv, 22.5 / 180 * Math.PI, 157.5 / 180 * Math.PI, true);
				ctx.lineWidth = 4 * bilv;
				ctx.stroke();
				ctx.closePath();
				ctx.translate(236 * bilv, 236 * bilv);
				// 绘制刻度
				var total = [0, '', 100, '', 200, '', 300, '', 400, '', 500];
				for (var i = 0; i < 80; i++) {
					if (i % 10 === 0) { //大刻度
						ctx.beginPath();
						ctx.lineWidth = 3 * bilv;
						ctx.strokeStyle = "#00fff6";
						ctx.moveTo(218 * bilv * Math.sin(2.25 * i / 180 * Math.PI), -218 * bilv * Math.cos(2.25 * i / 180 * Math.PI));
						ctx.lineTo(200 * bilv * Math.sin(2.25 * i / 180 * Math.PI), -200 * bilv * Math.cos(2.25 * i / 180 * Math.PI));
						ctx.moveTo(-218 * bilv * Math.sin(2.25 * i / 180 * Math.PI), -218 * bilv * Math.cos(2.25 * i / 180 * Math.PI));
						ctx.lineTo(-200 * bilv * Math.sin(2.25 * i / 180 * Math.PI), -200 * bilv * Math.cos(2.25 * i / 180 * Math.PI));
						ctx.stroke();
						ctx.closePath();
					} else { //小刻度
						ctx.beginPath();
						ctx.lineWidth = 2 * bilv;
						ctx.strokeStyle = '#00fff6';
						ctx.moveTo(215 * bilv * Math.sin(4.5 * i / 180 * Math.PI), -215 * bilv * Math.cos(4.5 * i / 180 * Math.PI));
						ctx.lineTo(200 * bilv * Math.sin(4.5 * i / 180 * Math.PI), -200 * bilv * Math.cos(4.5 * i / 180 * Math.PI));
						ctx.moveTo(-215 * bilv * Math.sin(4.5 * i / 180 * Math.PI), -215 * bilv * Math.cos(4.5 * i / 180 * Math.PI));
						ctx.lineTo(-200 * bilv * Math.sin(4.5 * i / 180 * Math.PI), -200 * bilv * Math.cos(4.5 * i / 180 * Math.PI));
						ctx.stroke();

					}
				}
				// 绘制文本
				ctx.setFontSize(22);
				ctx.fillStyle = '#00fff6';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'bottom';
				ctx.rotate((-7.5 * 15) / 180 * Math.PI);
				ctx.fillStyle = '#00fff6';
				ctx.font = '10px normal';
				for (var i = 0; i < 11; i++) {
					ctx.fillText(total[i], 0, -170 * bilv);
					ctx.rotate((7.5 * 3) / 180 * Math.PI);
				}
				ctx.rotate(-7.5 * 18 / 180 * Math.PI);
				ctx.fillStyle = '#FFFFFF';
				ctx.setFontSize(10);
				ctx.fillText('吸烟口数', 0, -90 * bilv);
				ctx.draw();
			},
			drawRunRing(inputValue) {
				var timer;
				var i = 0;
				var value = 0;
				// 设置最终的值
				var finalValue = inputValue;
				var canvasWidth = this.canvasWidth;
				var bilv = (canvasWidth / 2) / 236;
				ctxPoint.fillStyle = '#00fcff';
				ctxPoint.strokeStyle = '#00fcff';
				ctxPoint.font = '22px bold';
				ctxPoint.textAlign = 'center';
				ctxPoint.shadowColor = '#00fcff';
				// 所有的动画事件
				var slideValue = function() {
					var evalue = '';
					ctxPoint.translate(-275 * bilv, -330 * bilv);
					ctxPoint.clearRect(236 * bilv, 236 * bilv, canvasWidth, canvasWidth);
					ctxPoint.translate(275 * bilv, 330 * bilv);
					i++;
					// 绘制滚动元素
					ctxPoint.beginPath();
					ctxPoint.arc(236 * bilv, 236 * bilv, 229 * bilv, 0.45 * (350 + finalValue) / 180 * Math.PI, 22.5 / 180 * Math.PI,
						true);
					ctxPoint.strokeStyle = '#00fcff';
					ctxPoint.lineWidth = 4 * bilv;
					ctxPoint.stroke();
					ctxPoint.closePath();
					ctxPoint.beginPath();
					ctxPoint.arc(236 * bilv, 236 * bilv, 229 * bilv, 0.45 * 350 / 180 * Math.PI, 22.5 / 180 * Math.PI, true);
					ctxPoint.strokeStyle = '#17393c';
					ctxPoint.lineWidth = 60 * bilv;
					ctxPoint.stroke();
					ctxPoint.closePath();
					ctxPoint.draw();
				}
				slideValue();
			},
			getApiData() {
				let that = this;
				let data = { //设备主页数据
					userCode: this.$store.state.userCode,
					token: this.$store.state.token,
					deviceCode: this.$store.state.deviceCode
				}
				console.log(data);
				this.$api.getDevicePage(data, function(res) {
					uni.stopPullDownRefresh();
					console.log('homedata', res);
					if (res.data.status == 1) {
						that.setHomeData(res.data);
					}
					if (res.data.status == 99) {
						uni.showToast({
							title: res.data.msg,
							mask: false,
							icon: 'none',
							duration: 1500,
							success: function() {
								setTimeout(function() {
									wx.navigateTo({
										url: '../login/login'
									});
								}, 1500);
							}
						});
					}
				}, function(err) {
					uni.stopPullDownRefresh();
				});
				this.$api.startBanner({
					type: '1',
				}, function(res) {
					console.log('底部新闻', res);
					if (res.data.status == 1) {
						let dataArr = res.data.data;
						dataArr.map(function(item, index) {
							dataArr[index].create_time = item.create_time.substring(0, 10);
						});
						that.cardview_data = dataArr;
					}
				}, function(err) {
					console.log(err)
				});
			},
			setHomeData(value) {
				for (let key in value.data) {
					this.list_data[key] = value.data[key] ? value.data[key] : 0;
				}
				console.log(this.list_data.dashboardValue, '------')
				this.$store.commit('set_puffsIntervalTime', this.list_data.puffsInitTime);
				this.$store.commit('set_sysPuffsNum', this.list_data.sysPuffsNum);
				this.$store.commit('set_globalData', {
					sortSum: this.list_data.sortSum,
					sortSupport: this.list_data.sortSupport,
				});
			},
			openBluetooth(e) {
				if (this.list_data.bindStatus) {
					wx.showModal({
						title: '提示',
						content: '确定要切换其它设备吗',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../../API/get-bluetooth-tool/get-bluetooth-tool?switchDevice=1'
								});
								console.log('用户点击确定')
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					});
				} else {
					uni.navigateTo({
						url: '../../API/get-bluetooth-tool/get-bluetooth-tool'
					});
				}
			},
			target(tag) {
				if (tag == '') {
					return;
				}
				if (tag == 'checkIn' && this.receivingState == false) {
					uni.showToast({
						title: '未达到领取条件',
						mask: false,
						icon: 'none',
						duration: 1500
					});
					return;
				}
				uni.navigateTo({
					url: '../../template/' + tag + '/' + tag
				});
			},
			openViews(urltag) {
				this.$store.commit('set_homeNewsTarget', urltag);
				uni.navigateTo({
					url: '../../template/webView/webView',
				});
			},
		},
		components: {
			uniIcon
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

	.topinfo {
		justify-content: space-between;
		border-bottom: 1upx solid #3d5658;
		padding-bottom: 20upx;
	}

	.topinfo text {
		font-size: 22upx;
		color: #FFFFFF;
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
		height: 350upx;
		top: 36upx;
		overflow: hidden;
	}

	.yibiao-box canvas {
		width: 470upx;
		height: 350upx;
		position: absolute;
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
	}

	.box image {
		width: 470upx;
		height: 310upx;
	}

	.box-text {
		color: #FFFFFF;
	}

	.box .reward {
		font-size: 22upx;
		padding: 0 40upx;
		border-radius: 20upx;
		line-height: 44upx;
		background: #ff7800;
		margin: 20upx 0 10upx
	}

	.box .reward-after {
		background: #CACACA;
	}
</style>
