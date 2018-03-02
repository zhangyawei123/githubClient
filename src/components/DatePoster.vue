<template>
    <div>
      <div class="poster-title-box">
        <router-link to="/data/poster">整体数据</router-link>
        <router-link to="/data/poster/single">单个数据</router-link>
      </div>
      <router-view />
    </div>
</template>

<script>
    export default {
        name: "date-poster"
    }
</script>

<style scoped lang="scss">
  .poster-title-box {
    margin: 15px 0;
  }
  .poster-title-box >a {
    display: inline-block;
    margin-right: 15px;
    width: 80px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: $text-light;
    border: 1px solid $border-color;
    border-radius: 3px;
  }
  .poster-title-box .router-link-exact-active {
    color: $primary-color;
    border: 1px solid $primary-color;
  }
</style>
