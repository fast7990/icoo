class bluetooth {
	constructor(arg) {}
	/** 
	 * 初始化蓝牙适配器
	 * @param {Object} str
	 * @return {Boolean} 返回值 
	 * @author xxx 
	 */
	openBluetoothAdapter(_this, callback) {
		var that = _this;
		var _this = this;
		wx.showLoading({
			title: '开启蓝牙适配'
		});
		wx.openBluetoothAdapter({
			success: function(res) {
				console.log("初始化蓝牙适配器成功！" + JSON.stringify(res));
				_this.getBluetoothAdapterState(that);
				callback(true, res);
			},
			fail: function(res) {
				console.log(res);
				callback(false, res);
			},
			complete: function() {
				setTimeout(function() {
					wx.hideToast()
				}, 2000);
			}
		});
		//监听蓝牙适配器状态
		wx.onBluetoothAdapterStateChange(function(res) {
			var available = res.available;
			console.log(res.discovering ? "开启完毕正在搜索。" : "开启完毕未搜索。");
			console.log(res.available ? "开启完毕蓝牙可用。" : "开启完毕蓝牙不可用。");
			if (available) {
				_this.getBluetoothAdapterState(that);
			}
		});
	}

	// 本机蓝牙适配器状态
	getBluetoothAdapterState(_this) {
		var that = _this;
		wx.getBluetoothAdapterState({
			success: function(res) {
				that.msg = "本机蓝牙适配器状态" + "/" + JSON.stringify(res.errMsg);
				console.log(res.discovering ? "状态：在搜索。" : "状态：未搜索。");
				console.log(res.available ? "蓝牙可用。" : "蓝牙不可用。");
				console.log(that.msg);
				if (!res.available) {
					wx.showToast({
						title: '请打开手机蓝牙',
						icon: 'success',
						duration: 2000
					});
					setTimeout(function() {
						wx.hideToast()
					}, 2000);
					that.bluetoothOpenFlag = false;
				} else {
					if (that.bluetoothOpenFlag) {
						that.initOpen();
						that.bluetoothOpenFlag = true;
					}
				}
			},
			fail: function(res) {
				console.log(res)
			}
		})
	}
	/** 
	 * 搜索蓝牙设备
	 * @param {Object} str
	 * @return {Boolean} 返回值 
	 * @author xxx 
	 */
	startBluetoothDevicesDiscovery(_this, callback) {
		var that = _this;
		that.devices = [];
		wx.startBluetoothDevicesDiscovery({
			success: function(res) {
				//监听蓝牙适配器状态
				wx.onBluetoothAdapterStateChange(function(res) {
					console.log(res.discovering ? "搜索状态：在搜索。" : "搜索状态：未搜索。");
				});
				console.log("开始搜索设备成功:", res);
				callback(true, res);
			},
			fail: function(res) {
				callback(false, res);
				console.log("搜索设备失败：", res)
			}
		});

	}
	/** 
	 * 获取所有已发现的设备
	 * @param {Object} str
	 * @return {Boolean} 返回值 
	 * @author xxx 
	 */
	getBluetoothDevices(_this) {
		var that = _this;
		that.devices = [];
		let deviceId = that.connectedDeviceId;
		wx.getBluetoothDevices({
			success: function(res) {
				//根据 uuid 获取处于已连接状态的设备
				wx.getConnectedBluetoothDevices({
					success: function(res) {
						console.log("发现设备状态", JSON.stringify(res));
						if (res.devices[0]) {
							console.log("已连接设备");
						}
						that.connectedDeviceId = res.deviceId;
						// 5 s内未搜索到设备， 关闭搜索， 关闭蓝牙模块
						setTimeout(function() {
							if (!that.deviceId) {
								//关闭搜索
								console.log('超时关闭');
								that.stopFindBLEDevices();
								setTimeout(function() {
									that.initOpen();
								}, 2000);
							}
						}, 5000);
					},
					fail: function(res) {
						console.log("获取失败", res)
					}
				})
				let devices = []
				for (let i = 0; i < res.devices.length; i++) {
					if (res.devices[i].name != "未知设备") {
						devices.push(res.devices[i])
					}
				}
				that.devices = devices;
				console.log("获取所有已发现的设备", res.devices);
				// that.msg = "搜索设备" + JSON.stringify(res.devices);
				//监听蓝牙适配器状态
				wx.onBluetoothAdapterStateChange(function(res) {
					console.log(res.discovering ? "在搜索。" : "未搜索。");
					console.log(res.available ? "可用。" : "不可用。");
				})
			},
			fail: function(res) {
				console.log(res)
			}
		})
	}
	/** 
	 * 监听发现设备
	 * @param {Object} str
	 * @return {Boolean} 返回值 
	 * @author xxx 
	 */
	onBluetoothDeviceFound(_this, callback) {
		let that = _this;
		wx.onBluetoothDeviceFound(function(res) {
			// console.log('发现设备:', res.devices)
			if (that.find_status) {
				return;
			}
			for (let i = 0; i < res.devices.length; i++) {
				//检索指定设备
				if (res.devices[i].name.indexOf('GSD-') != -1) {
					let connectedDeviceInfo = res.devices[i];
					// console.log("mac:", ab2hex(res.devices[i].advertisData));
					let driver_mac = ab2hex(res.devices[i].advertisData);
					//关闭搜索
					that.find_status = true;
					console.log('已找到指定设备:', res.devices[i].deviceId, '设备名：', res.devices[i].name);
					that.driver_name = res.devices[i].name;
					callback(true, connectedDeviceInfo, driver_mac);
					return;
				} else {
					callback(false, '');
				}
			}
		});
		wx.onBeaconUpdate(function(res) {
			console.log('监听设备', res);
		});
	}
	/** 
	 * 停止搜索周边设备
	 * @param {Object} str
	 * @return {Boolean} 返回值 
	 * @author xxx 
	 */
	stopBluetoothDevicesDiscovery(_this, callback) {
		var that = _this;
		wx.stopBluetoothDevicesDiscovery({
			success: function(res) {
				console.log("停止搜索周边设备" + "/" + JSON.stringify(res.errMsg))
				callback(true, res)
			},
			fail: function(res) {
				console.log("停止搜索失败：", res);
				callback(false, res)
			}
		})
	}
	/** 
	 * 连接设备
	 * @param {Object} str
	 * @return {Boolean} 返回值 
	 * @author xxx 
	 */
	connectTO(deviceId, _this, callback) {
		var that = _this;
		if (typeof deviceId == "object") {
			deviceId = deviceId.currentTarget.id;
			that.connectedDeviceId = deviceId;
		}
		if (!deviceId) {
			console.log("没有发现设备id")
			return false;
		}
		console.log("连接设备id:", deviceId);
		wx.createBLEConnection({
			deviceId: deviceId.toString(),
			success: function(res) {
				wx.onBLEConnectionStateChange(function(res) {
					// 该方法回调中可以用于处理连接意外断开等异常情况
					console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`)
				});
				callback(true, res);
				console.log("已连接-设备id为%s,连接信息", that.connectedDeviceId, res);
			},
			fail: function(res) {
				callback(false, res);
				console.log("调用失败", res);
			},
			complete: function() {
				console.log("调用结束");
			}
		});
	}
	/** 
	 * 获取连接设备的service服务
	 * @param {Object} str
	 * @return {Boolean} 返回值 
	 * @author xxx 
	 */
	getBLEDeviceServices(_this, callback) {
		var that = _this;
		let deviceId = that.connectedDeviceId.toString();
		console.log(deviceId);
		wx.getBLEDeviceServices({
			// 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
			deviceId: deviceId,
			success: function(res) {
				console.log('获取连接设备的service服务成功，设备服务列表:', res);
				that.services = res.services;
				callback(true)
			},
			fail: function(res) {
				console.log("链接设备service服务失败", res);
				callback(false)
			},
		})
	}
	//获取连接设备的所有特征值
	getBLEDeviceCharacteristics(_this, callback) {
		var that = _this;
		let deviceId = that.connectedDeviceId;
		let serverid = "00001000-0000-1000-8000-00805F9B34FB";
		// let serverid = "0000180A-0000-1000-8000-00805F9B34FB";
		wx.getBLEDeviceCharacteristics({
			// 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
			deviceId: deviceId,
			// 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
			// serviceId: that.services[0].uuid,
			serviceId: serverid,
			success: function(res) {
				console.log('特征值设备服务列表:', res);
				// that.getBLEValueChange();
				callback(true);
			},
			fail: function(res) {
				console.log("获取连接设备特征值失败", res);
				callback(false);
			},
			complete: function() {
				// console.log("complete");
			}
		});
	}
	//启用低功耗蓝牙设备特征值变化时的 notify 功能
	notifyBLEValueChange(_this, callback) {
		var that = _this;
		let deviceId = that.connectedDeviceId.toString();
		let notifyServicweId = that.notifyServicweId.toUpperCase(); //必须大写UUID
		let notifyCharacteristicsId = that.notifyCharacteristicsId.toUpperCase(); //必须大写UUID
		console.log("deviceId", deviceId);
		console.log("notifyServicweId", notifyServicweId);
		console.log("notifyCharacteristicsId", notifyCharacteristicsId);
		wx.notifyBLECharacteristicValueChange({
			state: true, // 启用 notify 功能
			// 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
			deviceId: deviceId,
			// 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
			serviceId: notifyServicweId,
			// 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
			characteristicId: notifyCharacteristicsId,
			success: function(res) {
				console.log('启用蓝牙设备特征值变化notify 功能成功', res);
				callback(true, res);
			},
			fail: function(res) {
				callback(false, res);
				console.log('启用蓝牙设备特征值变化notify 功能失败', res);
			}
		})
	}
	//发送数据
	sendBLEValueChange(_this, inputValue, callback) {
		var that = _this;
		let deviceId = that.$store.state.connectedDeviceId;
		// 这里的回调可以获取到 write 导致的特征值改变
		wx.onBLECharacteristicValueChange(function(res) {
			let hex = ab2hex(res.value);
			console.log("发送的接收消息,返回值", hex, res);
			callback(true, 'result', hex);
		});
		let senddata = inputValue;
		console.log(senddata, deviceId)
		let buffer = new ArrayBuffer(3)
		let dataView = new DataView(buffer)
		dataView.setUint8(0, senddata);
		console.log('发送的数据', dataView);
		console.log('writeServicweId', that.writeServicweId);
		console.log('writeCharacteristicsId', that.writeCharacteristicsId);
		wx.writeBLECharacteristicValue({
			// 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
			deviceId: deviceId,
			// 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
			serviceId: that.writeServicweId,
			// 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
			characteristicId: that.writeCharacteristicsId,
			// 这里的value是ArrayBuffer类型
			value: buffer,
			success: function(res) {
				callback(true, 'success', '');
				console.log('发送成功：', res)
			},
			fail: function(res) {
				callback(false, '', res);
				console.log('发送失败：', res);
			}
		});
	}
	//接收消息
	getBLEValueChange(_this, callback) {
		var that = _this;
		let deviceId = that.connectedDeviceId.toString();
		// 必须在这里的回调才能获取
		wx.onBLECharacteristicValueChange(function(characteristic) {
			let hex = ab2hex(characteristic.value);
			console.log("接收消息：,返回值", hex, characteristic);
		})
		console.log("readServicweId：", that.serviceuuid);
		console.log("readCharacteristicsId：", that.readuuid);
		wx.readBLECharacteristicValue({
			// 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
			deviceId: deviceId,
			// 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
			serviceId: that.serviceuuid,
			// 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
			characteristicId: that.readuuid,
			success: function(res) {
				callback(true, res);
				console.log('可读特征值:', res);
			},
			fail: function(res) {
				callback(false, res);
				console.log('读取可读特征值失败', res);
			}
		})
	}
	//断开设备连接
	closeBLEConnection(_this) {
		var that = _this;
		let deviceId = that.$store.state.connectedDeviceId;
		if (deviceId.length > 0) {
			deviceId = deviceId.toString();
		} else {
			console.log("没有连接设备id")
			return;
		}
		wx.closeBLEConnection({
			deviceId: deviceId,
			success: function(res) {
				that.connectedDeviceId = "";
				console.log("断开成功", res)
			},
			fail: function(res) {
				console.log("断开失败", res)
			}
		})
		wx.closeBluetoothAdapter({
			success(res) {
				console.log('关闭蓝牙适配器成功', res);
			},
			fail: function(err) {
				console.log('关闭适配器失败', err)
			}
		});
	}
}
// ArrayBuffer转为16进制数
function ab2hex(buffer) {
	var hexArr = Array.prototype.map.call(
		new Uint8Array(buffer),
		function(bit) {
			return ('00' + bit.toString(16)).slice(-2)
		}
	)
	return hexArr;
}
// 16进制数转ASCLL码
function hexCharCodeToStr(hexCharCodeStr) {
	var trimedStr = hexCharCodeStr.trim();
	var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
	var len = rawStr.length;
	var curCharCode;
	var resultStr = [];
	for (var i = 0; i < len; i = i + 2) {
		curCharCode = parseInt(rawStr.substr(i, 2), 16);
		resultStr.push(String.fromCharCode(curCharCode));
	}
	return resultStr.join("");
}
export default new bluetooth()
