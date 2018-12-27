<template>
	<view>
		<view class="page-body">
			<form @submit="formSubmit" @reset="formReset">
				<view class="page-section">
					<view class="page-section-title"><text style="font-size: 26upx;">{{name}}</text></view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<input class="uni-input" :name="name_type" :placeholder="placeholder" v-model="detail_value" />
						</view>
					</view>
				</view>
				<view class="btn-area">
					<button class="btn-submit" formType="submit">提交</button>
					<button type="default" formType="reset">重置</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	//来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
	let graceChecker = require("../../../common/graceChecker.js");
	export default {
		data() {
			return {
				title: '表单验证',
				detail_value: '',
				name: '姓名',
				name_type: 'nickName',
				placeholder: '请填写您的昵称',
				checkType: '',
				checkRule: '',
				errorMsg: ''
			}
		},
		created() {
			let pages = getCurrentPages(); //获取加载的页面
			var options = pages[pages.length - 1].options //获取当前页面的对象
			console.log(options)
			if (options) {
				this.showType(options);
			}
		},
		methods: {
			showType(options) {
				let type = options.type;
				this.name_type = type;
				switch (type) {
					case 'nickName':
						this.name = '姓名';
						this.checkType = 'string';
						this.checkRule = '1,10';
						this.errorMsg = '姓名应为1-10个字符';
						break;
					case 'height':
						this.name = '身高';
						this.placeholder = '请填写您的身高cm';
						this.checkType = 'between';
						this.checkRule = '10,999';
						this.errorMsg = '身高应为2-3位数字';
						break;
					case 'weight':
						this.name = '体重';
						this.placeholder = '请填写您的体重kg';
						this.checkType = 'between';
						this.checkRule = '10,999';
						this.errorMsg = '体重应为2-3位数字';
						break;
					case 'phone':
						this.name = '电话';
						this.placeholder = '请填写您的电话号码';
						this.checkType = 'phoneno';
						this.errorMsg = '电话号码输入不正确';
						break;
					default:
						break;
				}
			},
			formSubmit: function(e) {
				//将下列代码加入到对应的检查位置
				//定义表单规则
				let rule = [{
					name: this.name_type,
					checkType: this.checkType,
					checkRule: this.checkRule,
					errorMsg: this.errorMsg
				}];
				let that = this;
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none",
						success: function() {
							that.setData(that.name_type);
						}, //接口调用成功
						fail: function() {}, //接口调用失败的回调函数  
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			setData: function(type) {
				let userData = {};
				this.$store.commit('set_userData', [type, this.detail_value]);
				let data = {
					userCode: this.$store.state.userCode,
					token: this.$store.state.token,
				}
				data[type] = this.detail_value;
				console.log(data);
				this.$api.userInfo(data, function(res) {
					console.log(res)
					if (res.data.status == 1) {
						uni.showToast({
							title: '提交成功',
							icon: 'success',
							success: function() {
								uni.navigateBack({
									delta: 1
								});
							}
						});
					} else {
						uni.showToast({
							title: '提交失败',
							icon: 'success'
						});
					}
				}, function(err) {
					console.log(err);
				});
			},
			formReset: function(e) {
				console.log("清空数据")
				this.chosen = ''
			}
		}
	}
</script>

<style>
	label {
		display: flex;
		flex-direction: row;
		min-width: 270upx;
		margin-right: 20upx;
	}

	.btn-submit {
		background-color: #007aff;
		color: #ffffff;
	}

	.uni-input {
		width: 100%;
		padding-left: 30upx;
	}

	.btn-area button {
		width: 80%;
		font-size: 30upx;
		line-height: 3em;
	}
</style>
