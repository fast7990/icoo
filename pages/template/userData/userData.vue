<template>
	<view class="page">
		<view class="page-body uni-column">
			<view class="page-section justify-center align-center" style="">
				<view class="portrait" @tap="chooseImage">
					<view>
						<image :src="headerImageSrc" class="image" mode="aspectFit"></image>
					</view>
					<view>
						<image src="../../../static/img/camera.png"></image>
					</view>
				</view>
			</view>
			<view class="page-section uni-column">
				<view class="util-list justify-center" hover-class="uni-list-cell-hover" v-for="(item,idx) in util_list" :key="idx"
				 @tap="openTag(item)">
					<view class="list uni-row">
						<view class="" style="flex: 3;">
							<text>{{item.name}}</text>
						</view>
						<view class="" style="flex: 7;justify-content: flex-end;">
							<picker @change="bindPickerChange" :value="sex_index" :range="sex_array" v-if="item.target=='sex'" style="width: 100%;text-align: right;">
								<text class="uni-input">{{sex_array[sex_index]}}</text>
							</picker>
							<picker mode="date" @change="bindDateChange" :value="date" :start="startDate" :end="endDate" v-else-if="item.target=='birthday'"
							 style="width: 100%;text-align: right;">
								<text class="uni-input">{{date}}</text>
							</picker>
							<text v-else>{{item.info}}</text>
						</view>
						<view class="" style="flex: 1;justify-content: flex-end;">
							&nbsp;<image src="../../../static/img/more2.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				sex_index: 2,
				sex_array: ['女', '男', '-'],
				date: currentDate,
				user_data: '',
				headerImageSrc: '',
				baseurl: 'https://www.icoo.tech',
				util_list: [{
					name: '昵称',
					info: '未设置',
					value: '',
					target: 'nickName',
				}, {
					name: '性别',
					info: '未设置',
					value: '',
					target: 'sex',
				}, {
					name: '出生日期',
					info: '未设置',
					value: '',
					target: 'birthday',
				}, {
					name: '身高',
					info: '未设置',
					value: '',
					target: 'height',
				}, {
					name: '体重',
					info: '未设置',
					value: '',
					target: 'weight',
				}]
			};
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onShow: function() {
			this.initData();
			let user_data = this.$store.state.userData;
			if (Array.isArray(user_data)) {
				this.setListData(user_data[0], user_data[1]);
			}
		},
		methods: {
			initData() {
				let that = this;
				this.$api.userPage({
					userCode: this.$store.state.userCode,
					token: this.$store.state.token
				}, function(res) {
					console.log(res);
					if (res.data.status == 1) {
						that.util_list[0].info = res.data.data.nickName?res.data.data.nickName:'-';
						that.sex_index = res.data.data.sex ? res.data.data.sex : 2;
						that.headerImageSrc = (res.data.data.headpicUrl.indexOf('http') > -1) ? res.data.data.headpicUrl : that.baseurl +
							res.data.data.headpicUrl;
						that.date = res.data.data.birthday ? res.data.data.birthday : '-';
						that.util_list[3].info = res.data.data.height ? res.data.data.height : '-';
						that.util_list[4].info = res.data.data.weight ? res.data.data.weight : '-';
					}
				}, function(err) {
					console.log(err);
				});
			},
			updateUserInfo(value, type) {
				if (type == 'sex') {
					if (value == '') {
						uni.showToast({
							title: '性别不能为空',
							icon: 'none'
						});
						return;
					}
				}
				if (type == 'birthday') {
					if (value == '') {
						uni.showToast({
							title: '生日不能为空',
							icon: 'none'
						});
						return;
					}
				}
				let data = {
					userCode: this.$store.state.userCode,
					token: this.$store.state.token
				}
				data[type] = value;
				console.log(data)
				this.$api.userInfo(data, function(res) {
					console.log(res);
				}, function(err) {
					console.log(err);
				});
			},
			setListData(key, value) {
				this.util_list.forEach(function(item, index) {
					if (item.target == key) {
						item.info = value;
						item.value = value;
					}
				});
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.sex_index = e.target.value;
				this.util_list[1].value = this.sex_array[this.sex_index];
				this.updateUserInfo(this.sex_index, 'sex');
			},
			bindDateChange(e) {
				this.date = e.target.value;
				this.updateUserInfo(this.date, 'birthday');
			},
			openTag(item) {
				if (item.target != 'sex' && item.target != 'birthday') {
					this.open(item.target);
				}
			},
			open(type) { //打开
				switch (type) {
					case 'nickName':
						this.target('datachecker', type, 'template');
						break;
					case 'sex':
						this.target('mpvuePicker', type, 'components');
						break;
					case 'height':
						this.target('datachecker', type, 'template');
						break;
					case 'weight':
						this.target('datachecker', type, 'template');
						break;
					case 'phone':
						this.target('datachecker', type, 'template');
						break;
					default:
						break;
				}
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;

				return `${year}-${month}-${day}`;
			},
			target(tag, type, base) {
				uni.navigateTo({
					url: '../../' + base + '/' + tag + '/' + tag + '?type=' + type,
					success: res => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				});
			},
			chooseImage: function() {
				let that = this;
				uni.chooseImage({
					count: 1, //图片数量
					sizeType: ['compressed'], //原图，缩略图['original', 'compressed']
					sourceType: ['album'], //否 album 从相册选图，camera 使用相机，默认二者都有
					success: (res) => {
						console.log('chooseImage success, temp path is', res.tempFilePaths[0])
						var imageSrc = res.tempFilePaths[0]
						uni.uploadFile({
							url: "https://www.icoo.tech/app/member/uploadimg",
							formData: {
								userCode: that.$store.state.userCode,
								token: that.$store.state.token,
							},
							filePath: imageSrc,
							name: 'file',
							success: function(res) {
								console.log('uploadImage success, res is:', JSON.parse(res.data))
								let resdata = JSON.parse(res.data);
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								});
								that.headerImageSrc = imageSrc;
								console.log(resdata.data)
								that.updateUserInfo(resdata.data, 'headpicUrl')
							},
							fail: (err) => {
								console.log('uploadImage fail', err);
								uni.showModal({
									content: err.errMsg,
									showCancel: false
								})
							},
							complete: () => {
								console.log("complate")
							}
						})

					},
					fail: (err) => {
						console.log('chooseImage fail', err)
					}
				})
			}
		},
	}
</script>

<style scoped="scoped">
	page,
	view {
		display: flex;
	}

	.page-body {
		box-sizing: border-box;
	}

	.page-section {
		box-sizing: border-box;
		justify-content: center;
	}

	.page-section {
		padding: 30upx 0 60upx;
	}

	.portrait {
		width: 126upx;
		height: 150upx;
		position: relative;
	}

	.portrait view:nth-child(1) {
		position: absolute;
		width: 126upx;
		height: 126upx;
		overflow: hidden;
		border-radius: 100%;

	}

	.portrait view:nth-child(1) image {
		width: 100%;
		height: 100%;
	}

	.portrait view:nth-child(2) {
		position: absolute;
		right: 0;
		bottom: 0;
	}

	.portrait view:nth-child(2) image {
		width: 78upx;
		height: 78upx;
	}

	.list {
		width: 640upx;
		justify-content: space-between;
	}

	.util-list .list {
		align-items: center;
		padding: 24upx 0;
		border-bottom: 1upx solid #CCCCCC;
	}

	.util-list .list view:nth-child(1) text {
		font-size: 26upx;
	}

	.util-list .list view:nth-child(2) text {
		font-size: 22upx;
	}

	.util-list .list view:nth-child(3) image {
		width: 13upx;
		height: 21upx;
	}
</style>
