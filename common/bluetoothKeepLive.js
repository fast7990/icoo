import bluetooth from './util/bluetooth'
let timeout1 = null;
let timeout2 = null;
let bluetoothKeepLive = {
	data: function() {
		return {
			BLEDriverData: '',
			platform: '',
			status: false,
			not_find_status: false,
			driver_name: '',
			bluetoothOpenFlag: false,
			connectedDeviceId: "", //已连接设备uuid
			driver_mac: "",
			services: "00001000-0000-1000-8000-00805F9B34FB", // 连接设备的服务
			serviceuuid: "0000180A-0000-1000-8000-00805F9B34FB",
			readuuid: "00002A23-0000-1000-8000-00805F9B34FB",
			characteristics: "", // 连接设备的状态值
			writeServicweId: "00001000-0000-1000-8000-00805F9B34FB", // 可写服务uuid
			writeCharacteristicsId: "00001001-0000-1000-8000-00805F9B34FB", //可写特征值uuid
			readServicweId: "00001000-0000-1000-8000-00805F9B34FB", // 可读服务uuid
			readCharacteristicsId: "00001005-0000-1000-8000-00805F9B34FB", //可读特征值uuid
			notifyServicweId: "00001000-0000-1000-8000-00805F9B34FB", //通知服务UUid
			notifyCharacteristicsId: "00001002-0000-1000-8000-00805F9B34FB", //通知特征值UUID
			inputValue: '85',
			devices: [],
			characteristics1: "" // 连接设备的状态值
		}
	},
	onBackPress: function() {},
	methods: {
		initOpen() { // 初始化设备
			let that = this;
			bluetooth.openBluetoothAdapter(this, function(state, result) {
				if (state) {
					console.log("-----初始化成功开始搜索设备！-----")
					that.status = true;
					setTimeout(function() {
						that.findBLEDevices()
					}, 2000);
				} else {
					that.status = false;
					wx.showToast({
						title: '请打开手机蓝牙',
						icon: 'none',
						duration: 5000
					});
				}
			});
		},
		findBLEDevices() { //搜索周围设备
			let that = this;
			if (this.not_find_status) {
				that.stopFindBLEDevices();
				return;
			}
			bluetooth.startBluetoothDevicesDiscovery(this, function(state1, result) {
				if (state1) {
					bluetooth.onBluetoothDeviceFound(that, function(state, connectedDeviceInfo, macCode) { //监听发现的设备
						let driver_mac = [];
						wx.showLoading({
							title: '请等待...'
						});
						if (state) { //搜索到制定设备
							clearInterval(timeout1);
							clearTimeout(timeout2);
							that.stopFindBLEDevices(); //停止搜索周围设备
							if (Array.isArray(macCode)) {
								driver_mac = macCode.reverse().toString().replace(/,/g, ':');
							}
							console.log("driver_mac", driver_mac);
							that.connectedDeviceId = connectedDeviceInfo.deviceId;
							that.$store.commit('set_deviceName', connectedDeviceInfo.name);
							that.$store.commit('set_deviceCode', driver_mac.toUpperCase());
							that.$store.commit('set_connectedDeviceId', connectedDeviceInfo.deviceId);
							wx.hideLoading();
							wx.showLoading({
								title: '已找到设备'
							});
							//判断设备是否被绑定过；
							that.isUserDevice();
						} else {
							// console.log('未找到设备时间：', new Date());
							if (that.not_find_status) {
								return;
							}
							if (timeout1 == null) {
								timeout1 = setInterval(function() {
									wx.hideLoading();
									if (that.not_find_status) {
										wx.hideLoading();
										that.stopFindBLEDevices();
										clearInterval(timeout1);
										clearTimeout(timeout2);
									} else {
										that.stopFindBLEDevices();
										that.findBLEDevices();
									}
								}, 5000);
								timeout2 = setTimeout(function() {
									that.not_find_status = true;
									clearInterval(timeout1);
									clearTimeout(timeout2);
									wx.hideLoading();
									that.closeBLEDevices();
									that.backHome(false, '未搜索到设备');
								}, 30000);
							}
						}
					});
				} else {
					setTimeout(function() {
						that.findBLEDevices();
					}, 5000);
				}
			});
		},
		isUserDevice() { //判断设备是否被绑定过方法；
			let that = this;
			let setdata = {
				userCode: this.$store.state.userCode,
				token: this.$store.state.token,
				deviceCode: this.$store.state.deviceCode
			}
			console.log(setdata);
			this.$api.isUserDevice(setdata, function(res) {
					console.log('是否可以连接设备', res);
					if (res.data.status == 1) { //1未绑定0已绑定
						that.connectTO(that.connectedDeviceId); //可建立设备连接
					} else if (res.status == 99) {
						that.backLogin();
					} else {
						that.childPagIsUserDevice(res.data.msg);
					}
				},
				function(err) {
					console.log(err)
				});
		},
		connectTO(deviceId) {
			let that = this;
			bluetooth.connectTO(deviceId, this, function(state, result) {
				wx.hideLoading();
				wx.showLoading({
					title: '设备绑定中...'
				});
				if (state) {
					if (that.platform === 'ios') { //判断设备是ios连接或安卓连接，ios连接必须先调用wx.getBLEDeviceServices和wx.getBLEDeviceCharacteristics方法返回服务uuid和特征uuid才能发送数据；
						setTimeout(function() {
							that.getBLEDeviceServices();
						}, 2000);
					} else {
						setTimeout(function() { //安卓直接启用notify接收广播返回数据
							that.notifyBLEValueChange();
						}, 2000);
					}
				}
			});
		},
		notifyBLEValueChange() {
			let that = this;
			bluetooth.notifyBLEValueChange(this, function(state, result) {
				if (state) { //notify启用成功发送数据
					setTimeout(function() {
						that.sendBLEValueChange();
					}, 2000);
				}
			});
		},
		sendBLEValueChange(inputValue) { //向蓝牙设备发送指令
			var that = this;
			if (inputValue == null || inputValue == '' || inputValue == undefined) {
				inputValue = 85;
			}
			console.log('inputValue', inputValue);
			bluetooth.sendBLEValueChange(this, inputValue, function(state, arg1, result) {
				console.log(inputValue)
				if (state) {
					if (inputValue == 15) {
						console.log('关闭设备指令');
						that.closeBLEDevices();
						setTimeout(function() {
							that.initOpen();
						}, 2000);
						return;
					}
					if (arg1 == 'result') {
						console.log('蓝牙接收值', result);
						that.BLEDriverData = result;
						if (result.length < 12) {
							uni.showToast({
								title: '绑定失败，请使用新设备',
								icon: 'none',
								mask: false,
								duration: 1500,
								success: function() {
									that.$store.commit('set_BLEDriverData', '');
									wx.hideLoading();
									that.closeBLEDevices();
								}
							});
							return;
						}
						let driverBatter = parseInt(result[5], 16);
						let totalPuffsTime = parseInt(result[12], 16);
						let driverBatterState = parseInt(result[2], 16);
						if (totalPuffsTime > 9000) {
							totalPuffsTime = 9000;
						}
						that.$store.commit('set_globalData', {
							driverBatter: (driverBatter / 17).toFixed(2) * 100,
							totalPuffsTime: totalPuffsTime,
							driverBatterState: driverBatterState,
						});
						that.userConnect(result);
					}
				}
			});
		},
		userConnect(result) { //用户连接设备返回昨日口数（已连接过）或当前口数（未连接过）
			let that = this;
			let totalPuffsTime = that.$store.state.globalData.totalPuffsTime;
			let setdata = {
				userCode: that.$store.state.userCode,
				token: that.$store.state.token,
				deviceCode: that.$store.state.deviceCode,
				puffsTime: totalPuffsTime,
				deviceName: that.$store.state.deviceName
			}
			console.log(setdata);
			this.$api.userConnect(setdata, function(res) {
				console.log('userConnect', res);
				let yesterDay = 0;
				let dashboardValue = 0;
				if (res.data.status == 1) {
					yesterDay = res.data.data;
					if (totalPuffsTime - yesterDay < 0) {
						dashboardValue = (9000 - yesterDay) + totalPuffsTime;
						that.$store.commit('set_globalData', {
							dashboardValue: dashboardValue
						});
					} else {
						dashboardValue = totalPuffsTime - yesterDay
						that.$store.commit('set_globalData', {
							dashboardValue: dashboardValue
						});
					}
					console.log('====zuotian:%d,zongshu:%d', yesterDay, totalPuffsTime)
					that.$store.commit('set_BLEDriverData', result);
					that.childPagPuffsLogUpdata(result);
				}
			}, function(fail) {
				console.log('err', fail);
			});
		},
		puffsLogUpdata(value) { //上传口数
			let that = this;
			let deviceCode = this.$store.state.deviceCode;
			let puffsTime = this.$store.state.globalData.totalPuffsTime;
			let flag = false;
			if (puffsTime >= 9000) {
				puffsTime = 9000;
				flag = true;
			}
			let data = {
				userCode: this.$store.state.userCode,
				token: this.$store.state.token,
				deviceCode,
				puffsTime,
			}
			console.log('上传口数', data);
			this.$api.puffsLog(data, function(res) {
				console.log('puffsLog', res);
				if (res.data.status == 1) {
					if (flag) { //需要清零
						that.sendBLEValueChange(220);
					} else {
						that.childPagResult();
					}
				}
			}, function(err) {
				console.log(err);
			});
		},
		bluetoothKeepLiveStop() {
			if (this.bluetoothKeepLiveState) {
				this.$store.commit('set_bluetoothKeepLiveState', false);
				this.sendBLEValueChange(15);
			}
		},
		closeBLEDevices() { //关闭蓝牙设备
			bluetooth.closeBLEConnection(this);
			this.$store.commit('set_BLEDriverData', '');
		},
		stopFindBLEDevices() { //停止搜索周围设备
			bluetooth.stopBluetoothDevicesDiscovery(this, function(state, result) {})
		},
		getBluetoothDevices() { //获取所有设备
			bluetooth.getBluetoothDevices(this);
		},
		getBLEValueChange() {
			bluetooth.getBLEValueChange(this, function(state, result) {
				if (state) {
					console.log(result);
				}
			});
		},
		getBluetoothState() {
			bluetooth.getBluetoothAdapterState(this);
		},
		getBLEDeviceServices() { //蓝牙服务uuid
			var that = this;
			bluetooth.getBLEDeviceServices(this, function(state) {
				if (state) {
					setTimeout(function() {
						that.getBLEDeviceCharacteristics();
					}, 2000);
				}
			});
		},
		getBLEDeviceCharacteristics() { //蓝牙特征uuid
			var that = this;
			bluetooth.getBLEDeviceCharacteristics(this, function(state) {
				if (state) {
					setTimeout(function() {
						that.notifyBLEValueChange();
					}, 2000);
				}
			});
		},
		backLogin() {
			uni.switchTab({
				url: '../pages/tabBar/login/login',
				success: function() {}
			});
		}
	}
}
module.exports = {
	bluetoothKeepLive
}
