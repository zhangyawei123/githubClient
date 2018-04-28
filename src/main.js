// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import axios from 'axios'
import qs from 'qs';
import echarts from 'echarts'
import {LogIn,GetAccessToken,checkLogIn } from './utils'
// import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import $ from 'jquery'
import swal from 'sweetalert'
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'//原始的饿了么主题色
import './assets/scss/common.scss'//修改后主题颜色的样式，可在文件中接触注释就行了

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

// import '../static/toutiao/jquery-3.1.1.min.js'
import '../static/toutiao/jquery-file-upload-pack.js'

// import '../static/jquery-file-upload/js/vendor/jquery.ui.widget.js'
// import '../static/jquery-file-upload/js/jquery.iframe-transport.js'
// import '../static/jquery-file-upload/js/jquery.fileupload.js'

import '../static/jcrop/jquery.Jcrop.js'

import VueAwesomeSwiper from 'vue-awesome-swiper'

// 这种方法不用每个页面都引入httpUrl
let index = 1;//1为测试URL，2为正式上线URL
if (index === 1) {
  Vue.prototype.httpUrl = 'http://192.168.0.69:8010/xjy-web-user/';//测试URL
} else {
  Vue.prototype.httpUrl = '';//正式上线URL
}

Vue.config.productionTip = false
Vue.use(VueCookie);
Vue.use(ElementUI)
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;      //axios解决跨域问题
Vue.prototype.echarts = echarts;
Vue.prototype.LogIn = LogIn;
Vue.prototype.GetAccessToken = GetAccessToken;
Vue.prototype.checkLogIn = checkLogIn;


//    全局时间过滤器，时间格式化
Vue.filter('formatTime', function (time) {
  var nowTime = new Date().getTime();
  var publishTime = new Date(time);
  var timeDis = nowTime - time;
  var hours = publishTime.getHours();
  var minutes = publishTime.getMinutes();
  if (hours < 10) hours = '0'+hours;
  if (minutes < 10) minutes = '0'+minutes;
  if (timeDis < 1000*60) return Math.floor(timeDis/1000) +'秒前';
  if (timeDis < 1000*60*60&&timeDis >= 1000*60) return Math.floor(timeDis/(1000*60)) +'分钟前';
  if (timeDis < 1000*60*60*24&&timeDis >= 1000*60*60) return Math.floor(timeDis/(1000*60*60)) +'小时前';
  if (timeDis > 1000*60*60*24) return publishTime.getFullYear() + '-' + (publishTime.getMonth()+1) + '-' + publishTime.getDate() +'\t'+
    hours +':'+minutes;
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
