<template>
	<view class="page">
		<view class="page-body">
			<view class="mask" v-show="popupShowMask" @tap="popupHide"></view>
			<view class="popup popup-top" v-show="popupShowState.top">
				<text>顶部 popup</text>
			</view>
			<view class="page-body-text">
				<text class="status">适配器状态：{{ status }}</text>
				<text class="sousuo">是否搜索：{{ sousuo }}</text>
				<text class="msg">消息：{{ msg }} </text>
				<text class="msg1">消息：{{ msg1 }}</text>
			</view>
			<view class="section">
				<text class="status">接收到消息：{{ jieshou }}</text>
			</view>
			<input type="text" v-model="inputValue" />
			<view class="btn-row">
				<button type="primary" class="button" @tap="initOpen">初始化蓝牙</button>
				<button type="primary" class="button" @tap="findBLEDevices">搜索周边设备</button>
				<button type="primary" class="button" @tap="getBluetoothDevices">获取所有设备</button>
				<button type="primary" class="button" @tap="onBluetoothDeviceFound">监听发现设备</button>
				<button type="primary" class="button" @tap="getBLEDeviceServices">获取连接设备server</button>
				<button type="primary" class="button" @tap="getBLEDeviceCharacteristics">获取连接设备所有特征</button>
				<button type="primary" class="button" @tap="sendBLEValueChange">发送数据</button>
				<button type="primary" class="button" @tap="notifyBLEValueChange">启用设备特征值变化时的notify</button>
				<button type="primary" class="button" @tap="getBLEValueChange">接收消息</button>
				<button type="primary" class="button" @tap="getBluetoothState">本机蓝牙适配器状态</button>
				<button type="primary" class="button" @tap="stopFindBLEDevices">停止搜索周边设备</button>
				<button type="primary" class="button" @tap="closeBLEDevices">断开蓝牙连接</button>
			</view>
		</view>
		<view class="venues_list">
			<block v-for="(item,index) in devices" :key="index">
				<view class="venues_item">
					<text class="status">设备名称:{{item.name}}</text>
					<text class="status">设备ID:{{item.deviceId}}</text>
					<text class="status">连接状态:{{connectedDeviceId == item.deviceId?"已连接":"未连接"}}</text>
					<view class="section">
					</view>
					<view class="section">
						<button type="warn" class="button" :id="item.deviceId" @tap="connectTO($event)">连接</button>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import bluetooth from '../../../common/util/bluetooth'
	import {
		childMixin
	} from '../../../common/mixins'

	function inArray(arr, key, val) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i][key] === val) {
				return i;
			}
		}
		return -1;
	}

	// ArrayBuffer转16进度字符串示例
	function ab2hex(buffer) {
		var hexArr = Array.prototype.map.call(
			new Uint8Array(buffer),
			function(bit) {
				return ('00' + bit.toString(16)).slice(-2)
			}
		)
		return hexArr.join('');
	}
	export default {
		mixins: [childMixin],
		data() {
			return {
				status: "",
				sousuo: "",
				msg: "",
				msg1: "",
				connectedDeviceId: "", //已连接设备uuid
				services: "00001000-0000-1000-8000-00805f9b34fb", // 连接设备的服务
				characteristics: "", // 连接设备的状态值
				writeServicweId: "00001000-0000-1000-8000-00805f9b34fb", // 可写服务uuid
				writeCharacteristicsId: "00001001-0000-1000-8000-00805f9b34fb", //可写特征值uuid
				readServicweId: "00001000-0000-1000-8000-00805f9b34fb", // 可读服务uuid
				readCharacteristicsId: "00001005-0000-1000-8000-00805f9b34fb", //可读特征值uuid
				notifyServicweId: "00001000-0000-1000-8000-00805f9b34fb", //通知服务UUid
				notifyCharacteristicsId: "00001002-0000-1000-8000-00805f9b34fb", //通知特征值UUID
				inputValue: '85',
				devices: [],
				characteristics1: "" // 连接设备的状态值
			}
		},
		onLoad: function() {
			if (wx.openBluetoothAdapter) {
				wx.openBluetoothAdapter()
			} else {
				// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
				wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
			}

		},
		methods: {
			connectTO(e) {
				bluetooth.connectTO(e, this,function(){});
			},
			initOpen() {
				bluetooth.openBluetoothAdapter(this, function(state, result) {
					if (!state) {
						wx.showModal({
							title: '蓝牙未打开',
							content: '请打开蓝牙后重试连接'
						})
					}
					return state;
				});
			},
			closeBLEDevices() {
				bluetooth.closeBLEConnection(this);
			},
			findBLEDevices() {
				bluetooth.startBluetoothDevicesDiscovery(this, function(state, result) {})
			},
			stopFindBLEDevices() {
				bluetooth.stopBluetoothDevicesDiscovery(this, function(state, result) {});
			},
			getBluetoothDevices() {
				bluetooth.getBluetoothDevices(this); //获取所有设备
				bluetooth.onBluetoothDeviceFound(this); //监听发现的设备
			},
			sendBLEValueChange() {
				bluetooth.sendBLEValueChange(this,function(){});
			},
			notifyBLEValueChange() {
				bluetooth.notifyBLEValueChange(this,function(){});
			},
			getBLEValueChange() {
				bluetooth.getBLEValueChange(this);
			},
			getBluetoothState() {
				bluetooth.getBluetoothAdapterState(this);
			},
			getBLEDeviceServices() {
				bluetooth.getBLEDeviceServices(this);
			},
			getBLEDeviceCharacteristics() {
				bluetooth.getBLEDeviceCharacteristics(this);
			}
		}
	}
</script>

<style scoped>
	@import '../../../common/css/popup.css';
</style>
