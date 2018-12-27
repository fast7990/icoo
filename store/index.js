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
		BLEDriverData: "", //蓝牙数据
		driver_name: "", //设备名
		userCode: "", //用户码
		token: "", //标志
		invitationCode: "", //我的邀请码
		headpicUrl: '',
		nickName: '',
		deviceCode: "", //设备码
		deviceName: "", //设备名称
		score: "", //总积分
		shareFriendCode: '',//邀请人邀请码
		homeNewsTarget: '',
		puffsIntervalTime: 0,
		bluetoothKeepLiveState: false,
		connectedDeviceId: '',
		onHideState: '',
		homeTimer: null,
		sysPuffsNum: 0,
		statisTicsData: {
			day: [],
			month: [],
			year: [],
		},
		globalData: {
			urlPath: 'https://www.icoo.tech/',
			openid: '',
			userInfo: '',
			mobile: '',
			encryptedData: '', //加密数据
			iv: '', //偏移量
			bindInfo: '点击绑定设备体验前所未有智能体验',
			bindStatus: false,
			driverBatter: '',
			driverBatterState:'',
			smokeInfo: '继续享受吧',
			dashboardValue: 0,
			totalPuffsTime: 0,
			sortSum: 0,
			sortSupport: 0,
			smokeReady: [
				'继续享受吧',
				'可以接着抽',
				'歇会儿再抽',
				'建议别抽了',
				'再抽断电喽'
			]
		}
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
		set_headpicUrl(state, value) {
			state.headpicUrl = value;
		},
		set_nickName(state, value) {
			state.nickName = value;
		},
		set_statisTicsData(state, value) {
			for (let key in value) {
				state.statisTicsData[key] = value[key]
			}
		},
		set_userData(state, value) {
			state.userData = value;
		},
		set_shareFriendCode(state, value) {
			state.shareFriendCode = value;
		},
		set_userCode(state, value) {
			state.userCode = value;
		},
		set_token(state, value) {
			state.token = value;
		},
		set_deviceCode(state, value) {
			state.deviceCode = value;
		},
		set_invitationCode(state, value) {
			state.invitationCode = value;
		},
		set_score(state, value) {
			state.score = value;
		},
		set_deviceName(state, value) {
			state.deviceName = value;
		},
		set_BLEDriverData(state, value) {
			state.BLEDriverData = value;
		},
		set_puffsIntervalTime(state, value) {
			state.puffsIntervalTime = value;
		},
		set_homeNewsTarget(state, value) {
			state.homeNewsTarget = value;
		},
		set_bluetoothKeepLiveState(state, value) {
			state.bluetoothKeepLiveState = value;
		},
		set_connectedDeviceId(state, value) {
			state.connectedDeviceId = value;
		},
		set_onHideState(state, value) {
			state.onHideState = value;
		},
		set_homeTimer(state, value) {
			state.homeTimer = value;
		},
		set_sysPuffsNum(state, value) {
			state.sysPuffsNum = value;
		},
		set_globalData(state, value) {
			for (let key in value) {
				state.globalData[key] = value[key]
			}
		}
	}
})

export default store
