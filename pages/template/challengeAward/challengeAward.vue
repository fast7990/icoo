<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section">
				<view class="user-list uni-column">
					<text style="color: red;font-size: 24upx;margin:10upx 30upx;">挑战金在目标成功后会退还。挑战金设置越高，挑战成功获得的奖励越大。</text>
					<view class="box-list">
						<view class="jifen-list align-center justify-center" :class="active_index==i?'bgactive':''" v-for="(item,i) in jifen_data"
						 :key="i" @tap="chooseValue(i,item)" style="position: relative;">
							<text style="font-size: 26upx;">{{item}}积分</text>
							<image v-show="active_index==i?true:false" src="../../../static/img/hot2.png" style="width: 40upx;height: 40upx;position: absolute;right: -15upx;top: -15upx;transform:rotate(20deg);"></image>
						</view>
					</view>
					<view class="box-list" style="padding: 26upx 30upx 60upx;">
						<view class="label" @tap="userSetting">
							<view class="checkbox">
								<view class="bgactive" v-if="user_set_state" style="width: 20upx;height: 20upx;margin: 8upx;border-radius:100%;"></view>
							</view>
							<text>&nbsp;自定义金额</text>
						</view>
						<view class="label"></view>
						<view class="label">
							<input type="number" :disabled="!user_set_state" v-model="user_set_value" style="border: none;background: none;border-bottom: 1upx solid #17393C;width: 100upx;" />积分
						</view>
					</view>
					<view class="box-list uni-column align-center" style="margin-bottom: 80upx;">
						<view style="align-items: flex-end;margin-bottom: 10upx;">
							<text style="font-size: 88upx;font-weight: bold;line-height: 1em;">{{choose_value}}</text><text style="font-size: 26upx;">积分</text>
						</view>
						<text style="font-size: 22upx;">挑战成功可获得{{success_value}}积分</text>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="page-section justify-center align-center" style="margin-top: 80upx;">
					<view class="btn" @tap="submit">立即开始</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jifen_data: [10, 30, 50, 88, 188, 888],
				active_index: -1,
				user_set_state: false,
				user_set_value: '',
				choose_value: 0,
				success_value: 0
			};
		},
		watch: {
			user_set_value(newValue, oldValue) {
				if (this.user_set_state) {
					this.choose_value = newValue;
				}
			}
		},
		methods: {
			chooseValue(i, item) {
				this.choose_value = item;
				this.user_set_state = false;
				this.user_set_value = '';
				this.active_index = i;
			},
			userSetting() {
				this.active_index = -1;
				this.user_set_value = '';
				this.user_set_state = !this.user_set_state;
			}
		}
	}
</script>

<style scoped>
	page,
	view {
		display: flex;
	}

	text {
		color: #17393C;
	}

	.page-body {
		padding: 10upx 30upx;
	}

	.page-body,
	.page-section {
		box-sizing: border-box;
	}

	.jifen-list {
		width: 150upx;
		height: 68upx;
		margin: 10upx 30upx;
		border: 1upx solid #17393C;
		border-radius: 10upx;
	}

	.user-list .box-list {
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.user-list .box-list .label {
		flex: 1;
		align-items: center;
	}

	.bgactive {
		background: #17393C;
	}

	.bgactive text {
		color: #FFFFFF;
	}

	.checkbox {
		width: 34upx;
		height: 34upx;
		border: 1upx solid #17393C;
		border-radius: 100%;
	}

	.btn {
		background: none;
		border: #17393c 1upx solid;
		border-radius: 50upx;
		font-size: 26upx;
		padding: 15upx 120upx;
	}
</style>
