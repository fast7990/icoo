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
	 * 我的主页
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
	}


}
