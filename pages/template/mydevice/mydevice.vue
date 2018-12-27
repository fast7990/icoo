<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section uni-column">
				<view class="page-list" @touchstart="touchstart" @touchmove="touchmove($event,item)" @touchend="touchend" v-for="(item,index) in device_list"
				 :key="index" v-if="item.status">
					<view class="title uni-column">
						<text>{{item.device_name}}</text>
						<text style="font-size: 20upx;color: #CACACA;">{{item.device_code}}</text>
					</view>
					<view class="delete align-center" :style="{transform: 'translateX('+item.moveX+'px)'}" @tap="deleteFn(item)">
						<text>删除</text>
					</view>
				</view>
			</view>
			<view class="page-section justify-center">
				<view class="add-device">
					<navigator url="../../API/get-bluetooth-tool/get-bluetooth-tool?switchDevice=2" style="width: 100%;height: 100%;padding: 25upx 65upx;">+
						添加新设备</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {
		childMixin
	} from "../../../common/mixins.js";
	export default {
		data() {
			return {
				start_clientX: 0,
				moveX: 0,
				device_list: []
			}
		},
		mixins: [childMixin],
		onLoad: function() {
			this.initData();
		},
		onShow: function() {
			let that = this;
			this.BLEDriverData = this.$store.state.BLEDriverData;
		},
		onUnload: function() {
			wx.hideLoading();
		},
		computed: {
			...mapState({ //这里的...不是省略号了,是对象扩展符
				$globalData: 'globalData'
			})
		},
		methods: {
			initData() {
				let that = this;
				let data = {
					userCode: this.$store.state.userCode,
					token: this.$store.state.token
				}
				console.log(this.$store.state.userCode, this.$store.state.token)
				this.$api.userDeviceList(data, function(res) {
					console.log(res);
					if (res.data.status == 1) {
						that.setDataList(res.data);
					}
				}, function(err) {
					console.log(err)
				});
			},
			setDataList(value) {
				let that = this;
				value.data.map(function(item, index) {
					that.device_list.push({
						device_code: item.device_code,
						device_name: item.device_name,
						status: true,
						moveX: 0
					});
				});
			},
			touchstart(e) {
				this.start_clientX = e.clientX;
			},
			touchmove(e, item) {
				let x = e.clientX - this.start_clientX;
				if (x < 0 && x > -40) {
					item.moveX = -76;
				}
				if (x > 0 && x < 40) {
					item.moveX = 0;
				}
			},
			touchend(e) {
				this.start_clientX = 0;
			},
			deleteFn(item) {
				let that = this;
				let data = {
					userCode: this.$store.state.userCode,
					token: this.$store.state.token,
					deviceCode: item.device_code,
				}
				console.log(data);
				this.$api.deleteUserConnect(data, function(res) {
					console.log(res);
					if (res.data.status == 1) {
						uni.showToast({
							title: '删除成功',
							mask: false,
							duration: 1500
						});
						item.status = false;
					} else if (res.data.status == 99) {
						that.loginOut(res.data.msg);
					} else {
						uni.showToast({
							title: '删除失败' + res.data.msg,
							mask: false,
							icon: 'none',
							duration: 1500
						});
					}
				}, function(err) {
					console.log(err)
				});
			}
		},
	}
</script>

<style scoped="scoped">
	page,
	view {
		display: flex;
	}

	page,
	.page {
		width: 100%;
		overflow-x: hidden;
	}

	.page-body,
	.page-section {
		box-sizing: border-box;
		font-size: 30upx;
		font-weight: bold;
	}

	.page-section {
		justify-content: center;
	}

	.page-list {
		width: 100%;
		background: #FFFFFF;
		height: 115upx;
		border-bottom: 1upx solid #CACACA;
		box-shadow: 5upx 5upx 30upx #E2E2E2;
	}

	.title {
		flex: 1;
		justify-content: center;
	}

	.title text {
		padding-left: 60upx;
	}

	.delete {
		position: absolute;
		justify-content: center;
		right: -175upx;
		width: 175upx;
		height: 115upx;
		line-height: 100%;
		color: #FFFFFF;
		background: #e60012;
		transition: all .3s ease-in;
	}

	.delete text {
		color: #FFFFFF;
	}

	.add-device {
		border-radius: 50upx;
		border: 1upx solid #17393C;
		margin-top: 165upx;
	}
</style>
