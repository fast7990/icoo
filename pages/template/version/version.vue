<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section">
				&nbsp;
			</view>
			<view class="page-section content justify-center">
				<image src="../../../static/img/login/icoologo.png" mode=""></image>
				<text style="font-size: 30upx;line-height: 2em;">版本号：1.0.1</text>
			</view>
			<view class="page-section footer">
				<text>© 2018 iCOO Team All rights reserved</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: '关于',
		data() {
			return {

			};
		}
	}
</script>

<style scoped="scoped">
	page,
	view {
		display: flex;
	}

	.page,
	.page-body {
		height: 100%;
	}

	.page-body,
	.page-section {
		box-sizing: border-box;
		width: 100%;
	}

	.page-body {
		justify-content: space-between;
	}

	.content {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.content image {
		width: 138upx;
		height: 138upx;
		margin-bottom: 100upx;
	}

	.footer {
		justify-content: center;
	}

	.footer text {
		font-size: 30upx;
		color: #C0C0C0;
	}
</style>
