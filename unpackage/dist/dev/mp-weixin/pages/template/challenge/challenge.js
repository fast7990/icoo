require("../../../common/manifest.js");
require("../../../common/vendor.js");
global.webpackJsonp([14],{106:function(t,e,s){"use strict";var i=l(s(1)),a=l(s(107));function l(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(a.default))},107:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(109),a=s.n(i),l=s(110),n=!1;var c=function(t){n||s(108)},u=s(0)(a.a,l.a,c,"data-v-244819c1",null);u.options.__file="..\\..\\..\\..\\HBX\\icoo\\pages\\template\\challenge\\challenge.vue",u.esModule&&Object.keys(u.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),u.options.functional&&console.error("[vue-loader] challenge.vue: functional components are not supported with templates, they should use render functions."),e.default=u.exports},108:function(t,e){},109:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{my_data:{imgsrc:"http://img3.imgtn.bdimg.com/it/u=466871861,443615080&fm=26&gp=0.jpg",name:"你的名字",result:!1,koushu:50,bonus:100,longday:1,look:20},list_msg:[{text:"今日挑战",like:12},{text:"今日挑战",like:111}]}}}},110:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"page"},[s("view",{staticClass:"page-body uni-column"},[s("view",{staticClass:"page-section"},[s("view",{staticClass:"user-list panel uni-column"},[s("view",{staticClass:"top align-center"},[s("view",{staticClass:"left"},[s("image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.my_data.imgsrc}})]),s("view",{staticClass:"right uni-column"},[s("text",{staticStyle:{"font-size":"26upx"}},[t._v(t._s(t.my_data.name))]),s("view",[s("text",{staticStyle:{"font-size":"34upx","font-weight":"bold","margin-right":"10upx"}},[t._v(t._s(t.my_data.result?"挑战成功":"挑战失败"))]),t.my_data.result?s("image",{staticStyle:{width:"60upx",height:"60upx"},attrs:{src:"../../../static/img/happy.png"}}):s("image",{staticStyle:{width:"60upx",height:"60upx"},attrs:{src:"../../../static/img/unhappy.png"}})]),s("text",{staticStyle:{"font-size":"24upx"}},[t._v("--每天吸爱氪电子烟"+t._s(t.my_data.koushu)+"口")])])]),s("view",{staticClass:"user-card"},[s("view",{staticClass:"user-card-list",staticStyle:{flex:"1"}},[s("view",{staticClass:"list"},[s("text",[t._v("挑战金")]),s("text",[t._v(t._s(t.my_data.bonus)+"积分")])]),s("view",{staticClass:"list"},[s("text",[t._v("坚持天数")]),s("text",[t._v(t._s(t.my_data.longday)+"/7")])]),s("view",{staticClass:"list"},[s("text",[t._v("围观")]),s("text",[t._v(t._s(t.my_data.look))])])])]),t._m(0)])]),s("view",{staticClass:"page-section uni-column"},t._l(t.list_msg,function(e,i){return s("view",{key:i,staticClass:"list-msg justify-center"},[s("view",{staticClass:"align-center",staticStyle:{flex:"9"}},[s("text",[t._v(t._s(e.text))])]),s("view",{staticClass:"uni-column align-center",staticStyle:{flex:"1"}},[s("image",{staticStyle:{width:"45upx",height:"45upx"},attrs:{src:"../../../static/img/dianzan.png",mode:""}}),s("text",{staticStyle:{"font-size":"17upx",color:"#5e9196"}},[t._v(t._s(e.like))])])])}))])])};i._withStripped=!0;var a={render:i,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"last"},[e("text",[this._v("Tips：挑战成功将获得226积分")])])}]};e.a=a}},[106]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/template/challenge/challenge.js.map