<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section">
				<segmented-control :current="current" :values="tabitems" v-on:clickItem="onClickItem" :styleType="styleType"
				 :activeColor="activeColor"></segmented-control>
			</view>
			<view class="page-section content">
				<view class="uni-column" :style="{display:current === 0?'flex':'none'}">
					1
				</view>
				<view class="uni-column" :style="{display:current === 1?'flex':'none'}">
					选项卡2的内容
				</view>
				<view class="uni-column" :style="{display:current === 2?'flex':'none'}">
					选项卡3的内容
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import segmentedControl from '../../../components/segmented-control.vue';
	export default {
		data() {
			return {
				tabitems: [
					'每日统计',
					'每月统计',
					'每年统计'
				],
				current: 0,
				activeColor: '#17393c',
				styleType: 'text'
			}
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			}
		},
		components: {
			segmentedControl
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
		padding: 0 30upx;
	}

	.page-body,
	.page-section {
		box-sizing: border-box;
		background: #FFFFFF;
	}
	.page-section:nth-child(1){
		margin-bottom: 20upx;
	}
	.content>view {
		width: 100%;
	}
</style>
