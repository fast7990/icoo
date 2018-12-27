import call from "./request.js"
/** 
 * 用户设备列表
 * @date 2018-12-7
 * @param {postData,doSuccess, doFail} str
 * @return {} 返回值 
 * @author 
 */
module.exports = {
	userDeviceList: function(postData, doSuccess, doFail) {
		let url = '/app/device/userDeviceList';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 健康统计
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	statisticsUserPuffs: function(postData, doSuccess, doFail) {
		let url = '/app/person/statisticsUserPuffs';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 用户连接设备
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	userConnect: function(postData, doSuccess, doFail) {
		let url = '/app/device/userConnect';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 吸烟口数记录存储
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	puffsLog: function(postData, doSuccess, doFail) {
		let url = '/app/device/puffsLog';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 获取设备主页数据
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	getDevicePage: function(postData, doSuccess, doFail) {
		let url = '/app/device/getDevicePage';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 获取排行数据
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	getSortPage: function(postData, doSuccess, doFail) {
		let url = '/app/device/getSortPage';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 对关注人员今日点赞
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	supportUser: function(postData, doSuccess, doFail) {
		let url = '/app/device/supportUser';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 发现页面数据
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	discoveryPage: function(postData, doSuccess, doFail) {
		let url = '/app/discovery/discoveryPage';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 我的积分
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	myScorePage: function(postData, doSuccess, doFail) {
		let url = '/app/person/myScorePage';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 我的积分明细
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	myScoreInfo: function(postData, doSuccess, doFail) {
		let url = '/app/person/myScoreInfo';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 我的社区页面（推荐、关注、粉丝列表）
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	communityPage: function(postData, doSuccess, doFail) {
		let url = '/app/person/communityPage';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 关注取消关注
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	followOrCancelUser: function(postData, doSuccess, doFail) {
		let url = '/app/person/followOrCancelUser';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 我的社区页面（推荐、关注、粉丝列表）
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	userInfo: function(postData, doSuccess, doFail) {
		let url = '/app/person/userInfo';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 我的社区页面（推荐、关注、粉丝列表）
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	myInfo: function(postData, doSuccess, doFail) {
		let url = '/app/person/myInfo';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 发送验证码
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	sendVerifyCode: function(postData, doSuccess, doFail) {
		let url = '/app/member/sendVerifyCode';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 发送验证码
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	startBanner: function(postData, doSuccess, doFail) {
		let url = '/app/member/startBanner';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 挑战活动页面数据详情
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	activePage: function(postData, doSuccess, doFail) {
		let url = '/app/discovery/activePage';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 挑战活动页面数据详情
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	activeInfo: function(postData, doSuccess, doFail) {
		let url = '/app/discovery/activeInfo';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 添加挑战任务
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	addActive: function(postData, doSuccess, doFail) {
		let url = '/app/discovery/addActive';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 领取挑战活动奖励
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	getActiveReward: function(postData, doSuccess, doFail) {
		let url = '/app/discovery/getActiveReward';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 用户信息页面
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	userPage: function(postData, doSuccess, doFail) {
		let url = '/app/person/userPage';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 用户信息页面
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	signPage: function(postData, doSuccess, doFail) {
		let url = '/app/person/signPage';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 用户信息页面
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	signState: function(postData, doSuccess, doFail) {
		let url = '/app/person/sign';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 赚取积分页面
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	addScorePage: function(postData, doSuccess, doFail) {
		let url = '/app/person/addScorePage';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 删除用户连接设备
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	deleteUserConnect: function(postData, doSuccess, doFail) {
		let url = '/app/device/deleteUserConnect';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 是否用户可以连接设备
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	isUserDevice: function(postData, doSuccess, doFail) {
		let url = '/app/device/isUserDevice';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 用户更改手机号
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	updateMobile: function(postData, doSuccess, doFail) {
		let url = '/app/member/updateMobile';
		call.request(url, postData, doSuccess, doFail)
	},
	/** 
	 * 查看帮助文档内容
	 * @date 2018-12-7
	 * @param {postData,doSuccess, doFail} str
	 * @return {} 返回值 
	 * @author 
	 */
	help: function(postData, doSuccess, doFail) {
		let url = '/app/member/help';
		call.request(url, postData, doSuccess, doFail)
	},
}
