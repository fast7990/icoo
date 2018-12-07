import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		userData: "",
		userCode: "4a71e132d3e6423885afe0ea5dedaa3d", //用户码
		token: "123", //标志
		deviceCode: "", //设备码
		deviceName: "" //设备名称
	},
	mutations: {
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		userData(state, value) {
			state.userData = value;
		},
		userCode(state, value) {
			state.userCode = value;
		},
		token(state, value) {
			state.token = value;
		},
		deviceCode(state, value) {
			state.deviceCode = value;
		},
		deviceName(state, value) {
			state.deviceName = value;
		}
	}
})

export default store
