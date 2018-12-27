<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="action-row align-center uni-column" style="justify-content: flex-start;">
				<text style="font-size: 36upx;">请摇一摇您手中的电子烟设备</text>
				<text style="font-size: 24upx;">持续晃动确保设备激活</text>
			</view>
			<view class="action-row image-section">
				<image class="image" src="../../../static/img/shebei.jpg" style="width: 117upx;height: 590upx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "../../components/uni-icon.vue";
	import {
		bluetoothKeepLive
	} from '../../../common/bluetoothKeepLive';
	// ArrayBuffer转为16进制数
	function ab2hex(buffer) {
		var hexArr = Array.prototype.map.call(
			new Uint8Array(buffer),
			function(bit) {
				return ('00' + bit.toString(16)).slice(-2);
			}
		)
		return hexArr;
	}
	export default {
		data() {
			return {
				bluetoothKeepLiveState: false
			}
		},
		mixins: [bluetoothKeepLive],
		onLoad(option) {
			var that = this;
			this.bluetoothKeepLiveState = this.$store.state.bluetoothKeepLiveState;
			let switch_device = option.switchDevice; //切换设备
			console.log('switch_device', switch_device);
			wx.getSystemInfo({
				success(res) {
					that.platform = res.platform
				}
			});
			if (wx.openBluetoothAdapter) {
				let that = this;
				if (switch_device == 1) { //1切换
					this.bluetoothKeepLiveStop();
				} else if (switch_device == 2) { //2添加新设备
					if (this.bluetoothKeepLiveState) { //连接中
						this.bluetoothKeepLiveStop();
						this.closeBLEDevices();
					}
					setTimeout(function() {
						that.initOpen();
					}, 2000);
				} else {
					if (!this.bluetoothKeepLiveState) { //连接已中断
						this.initOpen();
					}
				}
			} else {
				// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
				wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				});
			}
		},
		onUnload() {
			let bluetoothKeepLiveState = this.$store.state.bluetoothKeepLiveState;
			if (!bluetoothKeepLiveState) {
				this.stopFindBLEDevices();
				this.closeBLEDevices();
			}
			this.not_find_status = true;
			wx.hideLoading();
			console.log('页面卸载');
		},
		methods: {
			childPagPuffsLogUpdata(result) {
				this.puffsLogUpdata(result);
			},
			childPagIsUserDevice(msg) {
				this.backHome(false, msg);
			},
			childPagResult() {
				this.$store.commit('set_bluetoothKeepLiveState', true);
				this.backHome(true);
			},
			backHome(flag, msg) {
				let that = this;
				if (flag) {
					wx.showModal({
						title: '温馨提示',
						content: '绑定成功是否返回',
						showCancel: true,
						success: function() {
							wx.hideLoading();
							uni.switchTab({
								url: '../../tabBar/home/home'
							});
						}
					});
				} else {
					wx.showModal({
						title: '温馨提示',
						content: msg,
						showCancel: true,
						success: function() {
							that.$store.commit('set_BLEDriverData', '');
							uni.switchTab({
								url: '../../tabBar/home/home'
							});
						}
					});
				}
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
