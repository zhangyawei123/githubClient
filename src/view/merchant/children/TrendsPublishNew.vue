<template>
    <div>
      <div class="crumbs">
        <div class="crumbs-inner">
          <router-link to="/posterManage">返回上一级</router-link><i class="crumbs-icon">|</i><router-link to="/posterManage">海报管理</router-link><i class="crumbs-icon">&gt;</i><span>海报编辑</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "trends-publish-new"
    }
</script>

<style scoped lang="scss">
  .crumbs {
    background: #fff;}
  .crumbs-inner {
    /*margin: 0 40px;*/
    /*padding: 30px 0 20px;*/
    padding-bottom: 20px;
    border-bottom: 1px solid $border-color;
  }
  .crumbs a {color: #1278ec;}
  .crumbs-icon { margin: 0 5px; color: #1278ec;}
</style>
