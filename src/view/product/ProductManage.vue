<template>
	<div>
    <div class="product-title">产品管理</div>
    <div class="search-box">
      <input class="search-key" type="text" v-model="seachWord" placeholder="请输入关键词快捷搜素产品">
      <a href="##" class="search-btn"><i class="iconfont icon-fangdajing"></i></a>
      <a href="##" class="clear-btn" @click="clearInput">清空搜素条件</a>
    </div>
    <table>
      <thead>
      <tr>
        <td class="name">产品</td>
        <td class="price">价格</td>
        <td class="view-count">浏览数</td>
        <td class="seek-count">咨询数</td>
        <td class="publish-time">发布时间</td>
        <td class="oprate">操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in lists">
        <td class="name">
          <div class="product-pic"></div>
          {{item.name}}
        </td>
        <td class="product-price">￥{{item.price}}</td>
        <td>{{item.viewCount}}</td>
        <td>{{item.seekNum}}</td>
        <td>{{item.time}}</td>
        <td>
          <i class="iconfont icon-bianji"></i>
          <i class="iconfont icon-cha" @click="removeItem(index)"></i>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="lists.length <= 0">没有符合条件的产品</div>
	</div>
</template>
<script>
export default {
  name: 'productManage',
  data () {
    return {
      lists: [
        {
          coverImg: '',
          name: '斗山 PUMA VST',
          price: 3435629,
          viewCount: 399,
          seekNum: 200,
          time: '2016年11月16日 16:00'
        },
        {
          coverImg: '',
          name: '斗山 PUMA VST',
          price: 999999,
          viewCount: 399,
          seekNum: 200,
          time: '2016年11月16日 16:00'
        },
        {
          coverImg: '',
          name: '斗山 PUMA VST',
          price: 9999,
          viewCount: 399,
          seekNum: 200,
          time: '2016年11月16日 16:00'
        }
      ],
      seachWord: ''
    }
  },
  methods: {
    clearInput() {
      this.seachWord = ''
    },
    removeItem(index){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.lists.splice(index,1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>
<style>
  @import "../../assets/css/product-manage.css";
</style>
