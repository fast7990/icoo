<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section" style="padding: 0 20%;margin-bottom: 30upx;">
				<segmented-control :current="current" :values="tabitems" v-on:clickItem="onClickItem" :styleType="styleType"
				 :activeColor="activeColor"></segmented-control>
			</view>
			<view class="page-section uni-column" style="flex: 1;padding: 0 30upx;justify-content: flex-start;">
				<view class="list-cell uni-column justify-center" v-for="(item,add_index) in add_list" :key="add_index" :style="{display:current === 0?'flex':'none'}">
					<view class="top">
						<text style="text-align: left;font-size:34upx;font-weight: bold;">积分增加</text>
						<text style="text-align: center;font-weight: bold;">{{item.score?item.score:''}}</text>
					</view>
					<view class="bottom">
						<text style="text-align: left;color: #CACACA;">{{item.remark?item.remark:''}}</text>
						<text style="text-align: center;">{{item.createDate}}</text>
					</view>
				</view>
				<view class="list-cell uni-column justify-center" v-for="(item,index) in reduce_list" :key="index" :style="{display:current === 1?'flex':'none'}">
					<view class="top">
						<text style="text-align: left;font-size:34upx;font-weight: bold;">积分支出</text>
						<text style="text-align: center;font-weight: bold;">{{item.score?item.score:''}}</text>
					</view>
					<view class="bottom">
						<text style="text-align: left;color: #CACACA;">{{item.remark?item.remark:''}}</text>
						<text style="text-align: center;">{{item.createDate}}</text>
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
				scoreCount: '', //总条数
				totalScore: '', //总积分数
				add_list: [],
				reduce_list: []
			};
		},
		onLoad: function() {
			this.getInitData(0, 20, 1);
		},
		methods: {
			getInitData(type, limit, pageNum) {
				let that = this;
				let data = {
					userCode: this.$store.state.userCode,
					token: this.$store.state.token,
					type: type,
					limit: limit,
					pageNum: pageNum
				}
				this.$api.myScoreInfo(data, function(res) {
					if (res.data.status == 1) {
						that.scoreCount = res.data.data.scoreCount;
						that.totalScore = res.data.data.totalScore;
						that.listItem(type, res.data.data.scoreList);
					}
					console.log(res)
				}, function(err) {
					console.log(err)
				});
			},
			listItem(type, value) {
				let list_type = '';
				let that = this;
				if (type == 0) {
					list_type = 'add_list';
				} else {
					list_type = 'reduce_list';
				}
				if (Array.isArray(value)) {
					let arr = value;
					value.map(function(item, index) {
						arr[index].createDate = value[index].createDate.substring(0, 10)
					});
					this[list_type] = arr;
				}
			},
			onClickItem(index) {
				console.log(index)
				if (this.current !== index) {
					this.current = index;
				}
				this.getInitData(index, 20, 1);
			},
			formatDate(data) {
				return data.toString().slice(0, 10);
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
