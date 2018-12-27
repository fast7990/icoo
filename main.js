import Vue from 'vue'
import App from './App'
import api from './common/util/api.js';
import plug from './common/util/plug.js';
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$plug = plug
App.mpType = 'app'
const app = new Vue({
	store,
	api,
	plug,
	...App,
})
app.$mount()
