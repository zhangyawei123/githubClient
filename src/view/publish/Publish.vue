<template>
	<div>
    <div class="publish-header">
      <div class="publish-h1">发布</div>
      <div class="publish-title-box">
        <router-link to="/publish" class="publish-title-item" exact>视频</router-link>
        <router-link to="/publish/product" class="publish-title-item">产品</router-link>
        <router-link to="/publish/circle" class="publish-title-item">圈子</router-link>
      </div>
    </div>
    <router-view />
	</div>
</template>
<script>
  export default {
  name: 'publish',
  mounted: function () {
  	this.$nextTick(function () {

  	})
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
  @import url(../../assets/css/publish.css);
  .stag {
    padding: 0;
    background: none;
  }
  .router-link-active {
    color: $primary-color;
    border-bottom: 3px solid $primary-color;
  }
</style>
