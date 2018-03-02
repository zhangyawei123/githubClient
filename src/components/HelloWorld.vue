<template>
  <div>
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
      <li class="main-menu-item"><a href="##"><i class="iconfont icon-jiaoyi1"></i>商家管理</a></li>
      <li class="main-menu-item"><router-link to="/data"><i class="iconfont icon-fenxi"></i>数据统计</router-link></li>
      <li class="main-menu-item"><router-link to="/purse"><i class="iconfont icon-qianbao1"></i>我的钱包</router-link></li>
      <li class="main-menu-item"><a href="##"><i class="iconfont icon-renyuanxiaozu"></i>粉丝列表</a></li>
      <li class="main-menu-item"><a href="##"><i class="iconfont icon-fl-renyuan"></i>账号状态</a></li>
    </ul>
    <router-view class="stag" />
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
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
</style>
