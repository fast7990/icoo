require("../../../common/manifest.js");
require("../../../common/vendor.js");
global.webpackJsonp([13],{90:function(t,e,i){"use strict";var s=n(i(1)),a=n(i(91));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(a.default))},91:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(93),a=i.n(s),n=i(94),c=!1;var r=function(t){c||i(92)},o=i(0)(a.a,n.a,r,"data-v-5ed63395",null);o.options.__file="..\\..\\..\\..\\HBX\\icoo\\pages\\template\\checkIn\\checkIn.vue",o.esModule&&Object.keys(o.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] checkIn.vue: functional components are not supported with templates, they should use render functions."),e.default=o.exports},92:function(t,e){},93:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{checked_state:-1,today:-1,speed_day:"0",integral_day:"10",get_reward:!1,list:[{day:"周一",state:!1},{day:"周二",state:!1},{day:"周三",state:!0},{day:"周四",state:!1},{day:"周五",state:!1},{day:"周六",state:!1},{day:"周日",state:!1}]}},onLoad:function(){this.integralDayComputer()},created:function(){this.today=(new Date).getDay()},methods:{integralDayComputer:function(){this.speed_day=this.integral_day/31*100+"%"},getReward:function(){this.get_reward=!0},checked:function(e,i){i.state||this.today!=e+1||(this.checked_state=e,i.state=!0,t.showToast({title:"领取成功",mask:!1,duration:1500}))}}}}).call(e,i(2).default)},94:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"page"},[i("view",{staticClass:"page-body uni-column"},[i("view",{staticClass:"page-section",staticStyle:{background:"#17393c"}},[i("view",{staticClass:"tabs",staticStyle:{flex:"1","flex-wrap":"wrap","justify-content":"center"}},t._l(t.list,function(e,s){return i("view",{key:s,staticClass:"checkin-tab uni-column",attrs:{eventid:"Lyl-0-"+s},on:{tap:function(i){t.checked(s,e)}}},[i("view",{staticClass:"label-view"},[e.state?i("image",{attrs:{src:"../../../static/img/yilingqu.png"}}):i("image",{attrs:{src:"../../../static/img/weilingqu.png"}})]),t._m(0,!0),i("view",{staticClass:"justify-center"},[i("text",{staticStyle:{color:"#FFFFFF"}},[t._v(t._s(e.day))])])])}))]),i("view",{staticClass:"page-section uni-column justify-center align-center checkin-log"},[t._m(1),i("view",{staticClass:"uni-row",staticStyle:{position:"relative"}},[t._l([10,20,28],function(e,s){return i("view",{key:e,staticClass:"integral"},[i("view",{staticClass:"uni-column align-center"},[t._m(2,!0),t._m(3,!0),i("view",[i("text",{staticStyle:{"font-size":"22upx","line-height":"22upx"}},[t._v(t._s(e)+"天")])])])])}),i("view",{staticClass:"integral-bg"},[i("view",{style:{width:t.speed_day}})])],2),i("view",{staticClass:"uni-row",staticStyle:{padding:"72upx 0 126upx"}},[i("button",{staticClass:"user-btn",class:t.get_reward?"btn-active":"",attrs:{type:"primary",eventid:"AzC-1"},on:{tap:t.getReward}},[t._v(t._s(t.get_reward?"已领取":"领取奖励"))])],1),i("view",{staticClass:"uni-row justify-center"},[i("navigator",{staticStyle:{color:"#183b3e","font-size":"24upx","align-items":"center"},attrs:{url:""}},[t._v("查看规则说明"),i("image",{staticStyle:{width:"13upx",height:"21upx"},attrs:{src:"../../../static/img/more2.png",mode:""}})])],1)])])])};s._withStripped=!0;var a={render:s,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"justify-center",staticStyle:{"margin-top":"67upx","margin-bottom":"5upx"}},[e("image",{staticStyle:{width:"62upx",height:"45upx"},attrs:{src:"../../../static/img/gold.png"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"uni-row",staticStyle:{"justify-content":"space-between","margin-bottom":"20upx"}},[e("text",{staticStyle:{"font-size":"34upx"}},[this._v("11月")]),e("text",{staticStyle:{"font-size":"24upx"}},[this._v("已累计签到20天")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticStyle:{"font-size":"16upx",color:"#ea2022","align-items":"center","line-height":"28upx"}},[e("text",{staticStyle:{"font-size":"28upx",color:"#ea2022"}},[this._v("20")]),this._v("\n\t\t\t\t\t\t\t积分\n\t\t\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",[e("image",{staticStyle:{width:"26upx",height:"26upx"},attrs:{src:"../../../static/img/gift.png",mode:""}})])}]};e.a=a}},[90]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/template/checkIn/checkIn.js.map