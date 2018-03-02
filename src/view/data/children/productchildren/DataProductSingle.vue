<template>
  <div style="padding: 10px 40px 30px;background: #fff;">
    <table>
      <thead>
      <tr>
        <td class="name">产品</td>
        <td class="price">价格</td>
        <td class="view-count">浏览数</td>
        <td class="collect-count">浏览数</td>
        <td class="seek-count">咨询数</td>
        <td class="publish-time">发布时间</td>
        <td class="oprate">操作</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="name">
          <div class="product-pic"></div>
          斗山 PUMA VST
        </td>
        <td class="product-price">￥999999</td>
        <td>366</td>
        <td>1555</td>
        <td>1555</td>
        <td>2016年11月16日 16:00</td>
        <td>
          <router-link to="/analyse">
            <el-tooltip class="item" effect="dark" content="数据分析" placement="top">
              <i class="iconfont icon-bianji"></i>
            </el-tooltip>
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="15"
      layout="prev, pager, next,total"
      :total="100">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "data-product-single",
        data() {
          return {
            currentPage1: 5
          }
        },
        methods: {
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
          }
        }
    }
</script>

<style scoped>
  @import "../../../../assets/css/product-manage.css";
  thead tr {border-top: none;}
  .name {width: 325px;}
  .price { width: 113px;}
  .view-count {
    width: 83px;}
  .collect-count {
    width: 72px;}
  .seek-count {
    width: 66px;
  }
  .publish-time {
    width: 193px;}
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
</style>
