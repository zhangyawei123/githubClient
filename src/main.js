// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import echarts from 'echarts'
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

import VueAwesomeSwiper from 'vue-awesome-swiper'



import '../static/js/test'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.axios = axios;
Vue.prototype.echarts = echarts;


//    全局时间过滤器，时间格式化
Vue.filter('formatTime', function (time) {
  var nowTime = new Date().getTime();
  var publishTime = new Date(time);
  var timeDis = nowTime - time;
  var hours = publishTime.getHours();
  var minutes = publishTime.getHours();
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
