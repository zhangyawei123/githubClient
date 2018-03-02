<template>
	<div>
    <div class="title-panel">
      <div class="title-h1">数据统计</div>
      <div class="title-box">
        <router-link to="/data" class="title-item" exact>概况</router-link>
        <router-link to="/data/poster" class="title-item">海报统计</router-link>
        <router-link to="/data/video" class="title-item">视频统计</router-link>
        <router-link to="/data/product" class="title-item">产品统计</router-link>
        <router-link to="/data/circle" class="title-item">圈子统计</router-link>
      </div>
    </div>
    <router-view />
	</div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted: function () {
    this.$nextTick(function () {
      console.log(this.$route.query.posterIndex)
    })
  }
}
</script>
<style scoped lang="scss">
  .stag {
    padding: 0;
    background: none;
  }
  .title-panel {
    padding: 30px 40px 0 40px;
    border-radius: 3px;
    background: #fff;
  }
  .title-h1 {
    margin-bottom: 12px;
    font-size: 20px;
  }
  .title-box {

  }
  .title-item {
    line-height: 46px;
    margin-right: 50px;
    display: inline-block;
    font-size: 16px;
    border-bottom: 2px solid transparent;
  }
  .router-link-active {
    color: $primary-color;
    border-bottom: 2px solid $primary-color;
  }
</style>
