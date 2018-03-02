<template>
	<div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <div id="demo"></div>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
	</div>
</template>
<script>
  // import { addnum } from "../assets/js/test";
  import * as test from '../assets/js/test';
  export default {
  name: 'publish',
  mounted: function () {
  	this.$nextTick(function () {
      test.addnum()
  	})
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getData() {
      this.axios.get('http://www.xinjiyuancps.com/xinjiyuan2.0_background/wei/list.html?channel=device')
        .then(function (response) {
          console.log(response.data.list[0]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>
