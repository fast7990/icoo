class bluetooth {
	constructor(arg) {

	}
	/** 
	 * 初始化蓝牙适配器
	 * @param {Object} str
	 * @return {Boolean} 返回值 
	 * @author xxx 
	 */
	openBluetoothAdapter(_this, callback) {
		var that = _this;
		wx.openBluetoothAdapter({
			success: function(res) {
				console.log("初始化蓝牙适配器成功！" + JSON.stringify(res));
				//监听蓝牙适配器状态
				wx.onBluetoothAdapterStateChange(function(res) {
					console.log(res.discovering ? "在搜索。" : "未搜索。");
					console.log(res.available ? "可用。" : "不可用。");
				})
				console.log(that.msg);
				callback(true, res);
			},
			fail: function(res) {
				console.log(res);
				callback(false, res);
			}
		})
	}

	// 本机蓝牙适配器状态
	getBluetoothAdapterState(_this) {
		var that = _this;
		wx.getBluetoothAdapterState({
			success: function(res) {
				that.msg = "本机蓝牙适配器状态" + "/" + JSON.stringify(res.errMsg);
				console.log(res.discovering ? "在搜索。" : "未搜索。");
				console.log(res.available ? "可用。" : "不可用。");
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
				that.msg = "搜索设备" + JSON.stringify(res);
				//监听蓝牙适配器状态
				wx.onBluetoothAdapterStateChange(function(res) {
					console.log(res.discovering ? "在搜索。" : "未搜索。");
					console.log(res.available ? "可用。" : "不可用。");
				});
				console.log("开始搜索设备成功:", res);
				callback(true, res);
			},
			fail: function(res) {
				callback(false, res);
				console.log("搜索失败：", res)
			}
		})
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
						} else {

						}
						// that.connectedDeviceId = res.deviceId;
						//5s内未搜索到设备，关闭搜索，关闭蓝牙模块
						// 							setTimeout(function() {
						// 								if (!that.deviceId) {
						// 									//关闭搜索
						// 									console.log('超时关闭');
						// 									that.stopFindBLEDevices();
						// 								}
						// 							}, 5000);
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
			console.log('发现设备:', res.devices)
			for (let i = 0; i < res.devices.length; i++) {
				//检索指定设备
				if (res.devices[i].name.indexOf('GSD-') != -1) {
					let connectedDeviceId = res.devices[i].deviceId;
					callback(true, connectedDeviceId);
					//关闭搜索
					that.stopFindBLEDevices();
					console.log('已找到指定设备:', res.devices[i].deviceId, '设备名：', res.devices[i].name);
				} else {
					callback(false, '');
				}
			}
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
			console.log("设备id错误")
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
	getBLEDeviceServices(_this) {
		var that = _this;
		let deviceId = that.connectedDeviceId.toString();
		console.log(deviceId);
		wx.getBLEDeviceServices({
			// 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
			deviceId: deviceId,
			success: function(res) {
				console.log('获取连接设备的service服务成功，设备服务列表:', JSON.stringify(res.services));
				that.services = res.services;
			}
		})
	}
	//获取连接设备的所有特征值
	getBLEDeviceCharacteristics(_this) {
		var that = _this;
		let deviceId = that.connectedDeviceId;
		let serverid = "00001000-0000-1000-8000-00805F9B34FB";
		wx.getBLEDeviceCharacteristics({
			// 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
			deviceId: deviceId,
			// 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
			// serviceId: that.services[0].uuid,
			serviceId: serverid,
			success: function(res) {
				// 				for (let i = 0; i < res.characteristics.length; i++) {
				// 					if (res.characteristics[i].properties.notify) {
				// 						console.log("111", that.services[0].uuid);
				// 						console.log("222", res.characteristics[i].uuid);
				// 						that.notifyServicweId = that.services[0].uuid;
				// 						that.notifyCharacteristicsId = res.characteristics[i].uuid;
				// 					}
				// 					if (res.characteristics[i].properties.write) {
				// 						that.writeServicweId = that.services[0].uuid;
				// 						that.writeCharacteristicsId = res.characteristics[i].uuid;
				// 					} else if (res.characteristics[i].properties.read) {
				// 						that.readServicweId = that.services[0].uuid;
				// 						that.readCharacteristicsId = res.characteristics[i].uuid;
				// 					}
				// 				}
				console.log('设备服务列表:', res);
			},
			fail: function() {
				console.log("fail");
			},
			complete: function() {
				console.log("complete");
			}
		});
	}
	//发送
	sendBLEValueChange(_this, callback) {
		var that = _this;
		let deviceId = that.connectedDeviceId.toString();
		// 这里的回调可以获取到 write 导致的特征值改变
		wx.onBLECharacteristicValueChange(function(res) {
			let hex = ab2hex(res.value);
			callback(true, 'success', hex);
			console.log("发送的接收消息,返回值", hex, res);
		});
		let senddata = that.inputValue;
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
				console.log('发送成功：', res);
			}
		})
		// 		wx.request({
		// 			url: '../getEncrypt',
		// 			success: function(data) {
		// 				var arr = data.data.data.split(",");
		// 				console.log(arr);
		// 				for (var i = 0; i < arr.length; i++) {
		// 					dataView.setInt8(i, arr[i]);
		// 				}
		// 				
		// 			}
		// 		})
	}
	//启用低功耗蓝牙设备特征值变化时的 notify 功能
	notifyBLEValueChange(_this, callback) {
		var that = _this;
		let deviceId = that.connectedDeviceId.toString();
		//var notifyServicweId = that.data.notifyServicweId.toUpperCase();
		//var notifyCharacteristicsId = that.data.notifyCharacteristicsId.toUpperCase();
		console.log("111", deviceId);
		console.log("111", that.notifyServicweId);
		console.log("222", that.notifyCharacteristicsId);
		wx.notifyBLECharacteristicValueChange({
			state: true, // 启用 notify 功能
			// 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
			deviceId: deviceId,
			// 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
			serviceId: that.notifyServicweId,
			// 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
			characteristicId: that.notifyCharacteristicsId,
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
	//接收消息
	getBLEValueChange(_this) {
		var that = _this;
		let deviceId = that.connectedDeviceId.toString();
		// 必须在这里的回调才能获取
		wx.onBLECharacteristicValueChange(function(characteristic) {
			let hex = ab2hex(characteristic.value);
			console.log("接收消息：,返回值", hex, characteristic);
		})
		console.log("readServicweId：", that.readServicweId);
		console.log("readCharacteristicsId：", that.readCharacteristicsId);
		wx.readBLECharacteristicValue({
			// 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
			deviceId: deviceId,
			// 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
			serviceId: that.readServicweId,
			// 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
			characteristicId: that.readCharacteristicsId,
			success: function(res) {
				console.log('可读特征值:', res);
			},
			fail: function(res) {
				console.log('读取可读特征值失败', res);
			}
		})
	}
	//断开设备连接
	closeBLEConnection(_this) {
		var that = _this;
		let deviceId = ''
		if (that.connectedDeviceId.length > 0) {
			deviceId = that.connectedDeviceId.toString();
		} else {
			console.log("没有connectedDeviceId")
			return;
		}
		if (!that.connectedDeviceId) {
			console.log("没有连接设备，断开失败", that.connectedDeviceId)
			return false;
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
				console.log(res)
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
