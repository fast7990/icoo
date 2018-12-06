<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="action-row" style="justify-content: flex-start;">
				<view class="close" style="align-items: center;margin: 20upx;" @tap="closeBLEpage">
					<uni-icon type="close" size="30" color="#000"></uni-icon>
				</view>
			</view>
			<view class="action-row image-section">
				<image class="image" src="http://hashcredit.io/html/img/shebei.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import bluetooth from '../../../common/util/bluetooth'
	import uniIcon from "../../components/uni-icon.vue";
	import {
		childMixin
	} from '../../../common/mixins';
	export default {
		mixins: [childMixin],
		data() {
			return {
				status: false,
				connectedDeviceId: "", //已连接设备uuid
				services: "00001000-0000-1000-8000-00805f9b34fb", // 连接设备的服务
				characteristics: "", // 连接设备的状态值
				writeServicweId: "00001000-0000-1000-8000-00805f9b34fb", // 可写服务uuid
				writeCharacteristicsId: "00001001-0000-1000-8000-00805f9b34fb", //可写特征值uuid
				readServicweId: "00001000-0000-1000-8000-00805f9b34fb", // 可读服务uuid
				readCharacteristicsId: "00001005-0000-1000-8000-00805f9b34fb", //可读特征值uuid
				notifyServicweId: "00001000-0000-1000-8000-00805f9b34fb", //通知服务UUid
				notifyCharacteristicsId: "0001002-0000-1000-8000-00805f9b34fb", //通知特征值UUID
				inputValue: '85',
				devices: [],
				characteristics1: "" // 连接设备的状态值
			}
		},
		onLoad: function() {
			if (wx.openBluetoothAdapter) {
				this.initOpen();
			} else {
				// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
				wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
			}

		},
		methods: {
			closeBLEpage() {
				uni.switchTab({
					url: '../../tabBar/home/home'
				});
			},
			connectTO(deviceId) {
				let that = this;
				bluetooth.connectTO(deviceId, this, function(state, result) {
					if (state) {
						that.notifyBLEValueChange();
					}
				});
			},
			initOpen() {
				let that = this;
				bluetooth.openBluetoothAdapter(this, function(state, result) {
					if (!state) {
						wx.showModal({
							title: '蓝牙未打开',
							content: '请返回打开蓝牙后重新绑定'
						});
						that.status = false;
					} else {
						that.status = true;
						that.findBLEDevices();
					}
				});
			},
			closeBLEDevices() {
				bluetooth.closeBLEConnection(this);
			},
			findBLEDevices() {
				let that = this;
				bluetooth.startBluetoothDevicesDiscovery(this, function(states, result) {
					bluetooth.onBluetoothDeviceFound(that, function(state, connectedDeviceId) {
						if (state) {
							that.connectedDeviceId = connectedDeviceId;
							that.connectTO(connectedDeviceId);
						} else {
							that.findBLEDevices();
						}
					}); //监听发现的设备
				});
			},
			stopFindBLEDevices() {
				bluetooth.stopBluetoothDevicesDiscovery(this, function(state, result) {})
			},
			getBluetoothDevices() {
				bluetooth.getBluetoothDevices(this); //获取所有设备
			},
			sendBLEValueChange() {
				bluetooth.sendBLEValueChange(this, function(state, arg1, result) {
					if (state) {
						console.log(arg1, result);
					} else {
						console.log(result)
					}
				});
			},
			notifyBLEValueChange() {
				let that = this;
				bluetooth.notifyBLEValueChange(this, function(state, result) {
					if (state) {
						that.sendBLEValueChange();
					}
				});
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
		},
		components: {
			uniIcon
		}
	}
</script>

<style scoped>
	@import '../../../common/css/popup.css';

	page,
	view {
		display: flex;
		/* uni-app默认使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。若不需要flex布局可删除本行*/
	}

	.page,
	.page-body {
		width: 100%;
		height: 100%;
	}

	.page-body {
		justify-content: space-between;
	}

	.image-section {
		width: 100%;
		height: 500upx;
		justify-content: center;
	}

	.image {
		width: 500upx;
		height: 500upx;
		position: relative;
		animation: shake 5s infinite linear;
		-moz-animation: shake 5s infinite linear;
		/* Firefox */
		-webkit-animation: shake 5s infinite linear;
		/* Safari and Chrome */
		-o-animation: shake 3s infinite linear;
		/* Opera */
		transform-origin: bottom;
	}

	@keyframes shake {

		0%,
		50% {
			transform: rotate(0deg);
		}

		55% {
			transform: rotate(30deg);
		}

		60% {
			transform: rotate(-30deg);
		}

		65%,
		100% {
			transform: rotate(0deg);
		}
	}
</style>
