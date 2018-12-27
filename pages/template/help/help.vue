<template>
	<view class="page">
		<view class="page-body">
			<view class="page-section text">
				<text>{{text?text:''}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: ''
			};
		},
		onLoad: function() {
			let that = this;
			this.$api.help({}, function(res) {
				console.log(res)
				if (res.data.status == 1) {
					that.text = res.data.data;
				}
			});
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
		flex-direction: column;
		box-sizing: border-box;
		overflow-y: auto;
	}

	.page-section {
		margin: 20upx;
	}

	.text text {
		font-size: 28upx;
		line-height: 2em;
	}
</style>
