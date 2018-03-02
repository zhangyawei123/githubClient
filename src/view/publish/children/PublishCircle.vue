<template>
    <div>
      <div class="publish-circle-title-box">
        <router-link to="/publish/circle" class="circle-title-item" exact>发布文章</router-link>
        <router-link to="/publish/circle/pic" class="circle-title-item">发布图片</router-link>
        <router-link to="/publish/circle/video" class="circle-title-item">发布视频</router-link>
      </div>
      <router-view />
    </div>
</template>

<script>
    export default {
        name: "publish-circle"
    }
</script>

<style scoped lang="scss">
  .publish-circle-title-box {
    margin: 15px 0;
  }
  .circle-title-item {
    display: inline-block;
    margin-right: 15px;
    width: 80px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 3px;
    border: solid 1px $text-tips;
    color: #5c697e;
  }
  .router-link-active {
    border: solid 1px $primary-color;
    color: $primary-color;
  }
</style>
