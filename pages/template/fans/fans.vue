<template>
	<view class="page">
		<view class="page-body">
			<view class="page-section-tab action-row">
				<segmented-control :current="current" :values="tabitems" v-on:clickItem="onClickItem" :styleType="styleType"
				 :activeColor="activeColor"></segmented-control>
			</view>
			<view class="page-section uni-column" :style="{display:current === 0?'flex':'none'}">
				<fans-control :followStatus="true" :values="page_list[0].data_list" :styleType="styleType"></fans-control>
			</view>
			<view class="page-section uni-column" :style="{display:current === 1?'flex':'none'}">
				<fans-control :followStatus="false" :values="page_list[1].data_list" :styleType="styleType"></fans-control>
				<load-more :loadingType="page_list[1].loadingType" :contentText="contentText"></load-more>
			</view>
			<view class="page-section uni-column" :style="{display:current === 2?'flex':'none'}">
				<fans-control :followStatus="false" :values="page_list[2].data_list" :styleType="styleType"></fans-control>
				<load-more :loadingType="page_list[2].loadingType" :contentText="contentText"></load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import segmentedControl from '../../../components/segmented-control.vue';
	import fansControl from '../../../components/fans-control.vue';
	import loadMore from '../../../components/load-more.vue'
	export default {
		data() {
			return {
				baseusrl: 'https://www.icoo.tech',
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				tabitems: [
					'推荐',
					'关注',
					'粉丝'
				],
				current: 0,
				activeColor: '#17393c',
				styleType: 'text',
				page_list: [{
						name: 'recommend_list',
						data_list: [],
						page_number: 1,
						limit: 5,
						fansNum: 0,
						followNum: 0,
						loadingType: 0,
					},
					{
						name: 'follow_list',
						data_list: [],
						page_number: 1,
						limit: 10,
						fansNum: 0,
						followNum: 0,
						loadingType: 0,
					},
					{
						name: 'fans_list',
						data_list: [],
						page_number: 1,
						limit: 10,
						fansNum: 0,
						followNum: 0,
						loadingType: 0,
					}
				],
			}
		},
		onLoad: function(option) {
			console.log(option)
			switch (option.index) {
				case '1':
					this.current = 2
					break;
				case '2':
					this.current = 1
					break;
				case '3':
					this.current = 0
					break;
				default:
					break;
			}
			this.initData(this.current, this.page_list[this.current].limit, 1);
		},
		onReachBottom() {
			if (this.page_list[this.current].loadingType !== 0) {
				return;
			}
			this.page_list[this.current].loadingType = 1;
			this.initData(this.current, this.page_list[this.current].limit, this.page_list[this.current].page_number);
		},
		components: {
			segmentedControl,
			fansControl,
			loadMore
		},
		methods: {
			initData(type, limit, pageNum) {
				let that = this;
				let data = {
					userCode: this.$store.state.userCode,
					token: this.$store.state.token,
					type: type,
					limit: limit,
					pageNum: pageNum
				}
				this.$api.communityPage(data, function(res) {
					console.log(res);
					if (res.data.status == 1) {
						that.set_list(res.data.data.userList);
					}
					if (res.data.data.userList.length == 0 || res.data.data.userList.length == res.data.data.fansNum) {
						that.page_list[that.current].loadingType = 2;
					} else {
						that.page_list[that.current].loadingType = 0;
						that.page_list[that.current].page_number = that.page_list[that.current].page_number + 10;
					}
				}, function(err) {
					console.log('err', err);
					that.loadingType = 0;
				});
			},
			set_list: function(userList) {
				let arrList
				if (Array.isArray(userList)) {
					for (let i = 0; i < userList.length; i++) {
						if (userList[i].headpicUrl && userList[i].headpicUrl.indexOf('http') == -1) {
							userList[i].headpicUrl = this.baseusrl + userList[i].headpicUrl;
						}
					}
					this.page_list[this.current].data_list = this.page_list[this.current].data_list.concat(userList);
				}
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
				if (this.page_list[index].data_list.length == 0) {
					this.initData(index, this.page_list[this.current].limit, 1);
				}
			}
		},
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

	.page-section-tab {
		margin-bottom: 30upx;
		background: #FFFFFF;
	}

	.page-section {
		box-sizing: border-box;
		height: 100%;
		overflow-y: auto;
		padding: 0 45upx;
		background: #FFFFFF;
	}
</style>
