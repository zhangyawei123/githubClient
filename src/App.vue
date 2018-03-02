<template>
  <div id="app">
  	<div class="public-header">
		<div class="common-width clearfix">
			<div class="header-logo-box clearfix">
				<span class="header-logo">
					<img src="./assets/img/logo.png" alt="">
				</span>
				<span class="platform-name">鑫机缘商家管理平台</span>
			</div>
			<div class="user-info-box clearfix">
				<div class="user-name">东研贸易</div>
				<div class="user-logo">
					<img src="./assets/img/user-logo.png" alt="">
				</div>
        <el-badge :value="1" :max="99">
          <router-link to="/messagecenter" class="massage"></router-link>
        </el-badge>
			</div>
		</div>
	</div>
    <router-view class="container clearfix" />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
	margin: 40px auto;
	width: 1200px;
	min-width: 1200px;
}
  .massage {
    background: url(./assets/img/ic_new@2x.png) no-repeat;
  }
.el-badge__content {
  background-color: #f00;}
</style>
