require("../../../common/manifest.js");
require("../../../common/vendor.js");
global.webpackJsonp([5],{100:function(e,r,t){"use strict";var s=a(t(1)),n=a(t(101));function a(e){return e&&e.__esModule?e:{default:e}}Page((0,s.default)(n.default))},101:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=t(103),n=t.n(s),a=t(105),i=!1;var o=function(e){i||t(102)},c=t(0)(n.a,a.a,o,null,null);c.options.__file="..\\..\\..\\..\\HBX\\icoo\\pages\\template\\datachecker\\datachecker.vue",c.esModule&&Object.keys(c.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),c.options.functional&&console.error("[vue-loader] datachecker.vue: functional components are not supported with templates, they should use render functions."),r.default=c.exports},102:function(e,r){},103:function(e,r,t){"use strict";(function(e){Object.defineProperty(r,"__esModule",{value:!0});var s=t(104);r.default={data:function(){return{title:"表单验证",detail_value:"",name:"姓名",name_type:"nickname",placeholder:"请填写您的昵称",checkType:"",checkRule:"",errorMsg:""}},created:function(){var e=getCurrentPages(),r=e[e.length-1].options;r&&this.showType(r)},methods:{showType:function(e){var r=e.type;switch(this.name_type=r,r){case"nickname":this.name="姓名",this.checkType="string",this.checkRule="1,10",this.errorMsg="姓名应为1-10个字符";break;case"height":this.name="身高",this.placeholder="请填写您的身高cm",this.checkType="between",this.checkRule="10,999",this.errorMsg="身高应为2-3位数字";break;case"weight":this.name="体重",this.placeholder="请填写您的体重kg",this.checkType="between",this.checkRule="10,999",this.errorMsg="体重应为2-3位数字";break;case"phone":this.name="电话",this.placeholder="请填写您的电话号码",this.checkType="phoneno",this.errorMsg="电话号码输入不正确"}},formSubmit:function(r){var t=[{name:this.name_type,checkType:this.checkType,checkRule:this.checkRule,errorMsg:this.errorMsg}],n=this,a=r.detail.value;s.check(a,t)?e.showToast({title:"验证通过!",icon:"none",success:function(){n.setData(n.name_type),e.navigateBack({delta:1})},fail:function(){}}):e.showToast({title:s.error,icon:"none"})},setData:function(e){this.$store.commit("userData",[e,this.detail_value])},formReset:function(e){console.log("清空数据"),this.chosen=""}}}}).call(r,t(2).default)},104:function(e,r,t){"use strict";e.exports={error:"",check:function(e,r){for(var t=0;t<r.length;t++){if(!r[t].checkType)return!0;if(!r[t].name)return!0;if(!r[t].errorMsg)return!0;if(!e[r[t].name])return this.error=r[t].errorMsg,!1;switch(r[t].checkType){case"string":if(!new RegExp("^.{"+r[t].checkRule+"}$").test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"int":if(!new RegExp("^(-[1-9]|[1-9])[0-9]{"+r[t].checkRule+"}$").test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"between":if(!this.isNumber(e[r[t].name]))return this.error=r[t].errorMsg,!1;if((s=r[t].checkRule.split(","))[0]=Number(s[0]),s[1]=Number(s[1]),e[r[t].name]>s[1]||e[r[t].name]<s[0])return this.error=r[t].errorMsg,!1;break;case"betweenD":if(!/^-?[1-9][0-9]?$/.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;if((s=r[t].checkRule.split(","))[0]=Number(s[0]),s[1]=Number(s[1]),e[r[t].name]>s[1]||e[r[t].name]<s[0])return this.error=r[t].errorMsg,!1;break;case"betweenF":var s;if(!/^-?[0-9][0-9]?.+[0-9]+$/.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;if((s=r[t].checkRule.split(","))[0]=Number(s[0]),s[1]=Number(s[1]),e[r[t].name]>s[1]||e[r[t].name]<s[0])return this.error=r[t].errorMsg,!1;break;case"same":if(e[r[t].name]!=r[t].checkRule)return this.error=r[t].errorMsg,!1;break;case"notsame":if(e[r[t].name]==r[t].checkRule)return this.error=r[t].errorMsg,!1;break;case"email":if(!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"phoneno":if(!/^1[0-9]{10,10}$/.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"zipcode":if(!/^[0-9]{6}$/.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"reg":if(!new RegExp(r[t].checkRule).test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"in":if(-1==r[t].checkRule.indexOf(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"notnull":if(null==e[r[t].name]||e[r[t].name].length<1)return this.error=r[t].errorMsg,!1}}return!0},isNumber:function(e){return/^-?[1-9][0-9]?.?[0-9]*$/.test(e)}}},105:function(e,r,t){"use strict";var s=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("view",[t("view",{staticClass:"page-body"},[t("form",{attrs:{eventid:"syP-1"},on:{submit:e.formSubmit,reset:e.formReset}},[t("view",{staticClass:"page-section"},[t("view",{staticClass:"page-section-title"},[t("text",{staticStyle:{"font-size":"26upx"}},[e._v(e._s(e.name))])]),t("view",{staticClass:"uni-list"},[t("view",{staticClass:"uni-list-cell"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.detail_value,expression:"detail_value"}],staticClass:"uni-input",attrs:{name:e.name_type,placeholder:e.placeholder,eventid:"6TB-0"},domProps:{value:e.detail_value},on:{input:function(r){r.target.composing||(e.detail_value=r.target.value)}}})])])]),t("view",{staticClass:"btn-area"},[t("button",{staticClass:"btn-submit",attrs:{formType:"submit"}},[e._v("提交")]),t("button",{attrs:{type:"default",formType:"reset"}},[e._v("重置")])],1)])],1)])};s._withStripped=!0;var n={render:s,staticRenderFns:[]};r.a=n}},[100]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/template/datachecker/datachecker.js.map