<template>
  <div>
    <div class="public-header">
      <div class="common-width clearfix">
        <div class="header-logo-box clearfix">
				<span class="header-logo">
					<img src="./../assets/img/logo.png" alt="">
				</span>
          <span class="platform-name">鑫机缘商家管理平台</span>
        </div>
        <div class="user-info-box clearfix">
          <div class="user-name">东研贸易</div>
          <div class="user-logo">
            <img src="./../assets/img/user-logo.png" alt="">
          </div>
          <el-badge :value="1" :max="99">
            <router-link to="/messagecenter" class="massage"></router-link>
          </el-badge>
        </div>
      </div>
    </div>
    <div class="container clearfix">
      <ul class="main-menu">
        <li class="main-menu-item"><router-link to="/" exact><i class="iconfont icon-home"></i>主页</router-link></li>
        <li class="main-menu-item"><router-link to="/publish"><i class="iconfont icon-fabu1"></i>发布</router-link></li>
        <li class="main-menu-h1"><i class="iconfont icon-icon05"></i>内容管理</li>
        <ul class="sub-menu">
          <li class="sub-menu-item"><router-link to="/posterManage">海报管理</router-link></li>
          <li class="sub-menu-item"><router-link to="/videoManage">视频管理</router-link></li>
          <li class="sub-menu-item"><router-link to="/circleManage">圈子管理</router-link></li>
        </ul>
        <li class="main-menu-item"><router-link to="/productManage"><i class="iconfont icon-icon05"></i>产品管理</router-link></li>
        <li class="main-menu-h1"><i class="iconfont icon-jiaoyi1"></i>交易管理</li>
        <ul class="sub-menu">
          <li class="sub-menu-item"><router-link to="/seekManage">咨询管理</router-link></li>
          <li class="sub-menu-item"><router-link to="/leaveWordManage">留言管理</router-link></li>
          <li class="sub-menu-item"><router-link to="/answerManage">问答管理</router-link></li>
          <li class="sub-menu-item"><router-link to="/serveManage">服务需求</router-link></li>
        </ul>
        <li class="main-menu-h1"><i class="iconfont icon-jiaoyi1"></i>商家管理</li>
        <ul class="sub-menu">
          <li class="sub-menu-item"><router-link to="/merchantinfo">信息编辑</router-link></li>
          <li class="sub-menu-item"><router-link to="/homepageedit">首页编辑</router-link></li>
          <li class="sub-menu-item"><router-link to="/trends">动态管理</router-link></li>
        </ul>
        <li class="main-menu-item"><router-link to="/data"><i class="iconfont icon-fenxi"></i>数据统计</router-link></li>
        <li class="main-menu-item"><router-link to="/purse"><i class="iconfont icon-qianbao1"></i>我的钱包</router-link></li>
        <li class="main-menu-item"><a href="javascript:void(0)"><i class="iconfont icon-renyuanxiaozu"></i>粉丝列表</a></li>
        <li class="main-menu-item"><router-link to="/account"><i class="iconfont icon-fl-renyuan"></i>账号状态</router-link></li>
      </ul>
      <router-view class="stag" />
    </div>
  </div>
</template>
<script>
  import { httpUrl } from "../http_url";
  export default {
    data() {
      return {

      }
    },
    mounted() {
      this.$nextTick(function () {
        this.checkLogIn();
        console.log(this.$cookie.get('accessToken'));
      })
    },
    methods: {

    }
  }
</script>
<style scoped lang="scss">
  .router-link-active:hover{
    color: $primary-color!important;
    cursor: default;
  }
  .router-link-active {
    background: rgba(18,120,236,.1);
    color: $primary-color;
    border-left: 3px solid $primary-color!important;
  }
  .router-link-active .iconfont {
    color: $primary-color;
  }

  .container {
    margin: 40px auto;
    width: 1200px;
    min-width: 1200px;
  }
  .massage {
    background: url(./../assets/img/ic_new@2x.png) no-repeat;
  }
  .massage.router-link-active {
    border-left: none!important;
  }
  .el-badge__content {
    background-color: #f00;}
</style>
