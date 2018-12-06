# UNI-APP 蓝牙电子烟 小程序项目

## 运行方式
1，git clone git@github.com:fast7990/icoo.git 项目至本地

将项目拖入[HbuilderX](http://www.dcloud.io/hbuilderx.html),直接运行即可

注意：需要下载小程序开发工具才能调试
## 特点
* 兼容微信小程序和APP
* 适用于强制登录和非强制登录应用场景
* 使用vuex管理登录状态
* 包含账户密码登录和第三方登录方式

## 注意事项
* 只能首页包含tab，如需强制登录，可以在首页检测登录状态并跳转登录页面
* 页面初始化完毕后马上跳转页面可能会失败，暂时可以延迟执行