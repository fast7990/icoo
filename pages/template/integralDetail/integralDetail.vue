<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section" style="padding: 0 20%;margin-bottom: 30upx;">
				<segmented-control :current="current" :values="tabitems" v-on:clickItem="onClickItem" :styleType="styleType"
				 :activeColor="activeColor"></segmented-control>
			</view>
			<view class="page-section" style="flex: 1;padding: 0 30upx;align-content: flex-start;">
				<view class="list-cell uni-column justify-center" v-for="(item,add_index) in add_list" :key="add_index" :style="{display:current === 0?'flex':'none'}">
					<view class="top">
						<text style="text-align: left;font-size:34upx;font-weight: bold;">{{item.name}}</text>
						<text style="text-align: center;font-weight: bold;">{{item.type}}</text>
					</view>
					<view class="bottom">
						<text style="text-align: left;color: #CACACA;">{{item.add}}</text>
						<text style="text-align: center;">{{item.date}}</text>
					</view>
				</view>
				<view class="list-cell uni-column justify-center" v-for="(item,index) in reduce_list" :key="index" :style="{display:current === 1?'flex':'none'}">
					<view class="top">
						<text style="text-align: left;font-size:34upx;font-weight: bold;">{{item.name}}</text>
						<text style="text-align: center;font-weight: bold;">{{item.type}}</text>
					</view>
					<view class="bottom">
						<text style="text-align: left;color: #CACACA;">{{item.reduce}}</text>
						<text style="text-align: center;">{{item.date}}</text>
					</view>
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
					'收入',
					'支出'
				],
				current: 0,
				activeColor: '#17393c',
				styleType: 'text',
				add_list: [{
					name: '积分增加',
					type: '签到',
					add: '+10',
					date: '2018-10-10'
				}],
				reduce_list: [{
					name: '积分减少',
					type: '活动',
					reduce: '-10',
					date: '2018-10-10'
				}]
			};
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

	.page {
		flex: 1;
		height: 100%;
	}

	.page-body {
		box-sizing: border-box;
	}

	.page-section {
		box-sizing: border-box;
		justify-content: center;
		background: #FFFFFF;
	}

	.list-cell {
		width: 100%;
		height: 130upx;
		border-bottom: 1upx solid #CACACA;
	}

	.list-cell .top,
	.list-cell .bottom {
		width: 100%;
		justify-content: space-between;
	}

	.list-cell text {
		font-size: 22upx;
	}
</style>
