<template>
    <div class="stag-inner">
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
            <div class="product-pic">
              <img :src="item.picUrl" alt="">
            </div>
            {{item.brandName}} {{item.modelNum}}
          </td>
          <td class="product-price">{{item.customPrice}}</td>
          <td>{{item.viewNum}}</td>
          <td>{{item.consultNum}}</td>
          <td>{{item.opt | formatTime}}</td>
          <td>
            <el-tooltip content="编辑" placement="top">
            <router-link :to="{ path: '/productManage/edit', query: {productIndex: index}}"><i class="iconfont icon-bianji"></i></router-link>
            </el-tooltip>
            <i class="iconfont icon-cha" @click="removeItem(index)"></i>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-if="lists.length <= 0">没有符合条件的产品</div>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next,total"
        :total="total">
      </el-pagination>
    </div>
</template>

<script>
  import {httpUrl} from "../../../http_url";

  export default {
        name: "product-manage-list",
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
            pageSize: 10,
            total: 100,
            seachWord: '',
            currentPage: 1,

          }
        },
        mounted() {
          this.$nextTick(function () {
            this.checkLogIn();
            this.getData();
          })
        },
        methods: {
          getData() {
            let _this = this;
            this.axios.get(httpUrl + 'api/product/equipments?currentPage=' + (this.currentPage-1) + '&accessToken=' +  this.$cookie.get('accessToken'))
              .then(function (response) {
                console.log(response.data);
                _this.pageSize = response.data.pageSize;
                _this.total = response.data.total;
                _this.lists = response.data.list;
              })
              .catch(function (error) {
                console.log(error)
              })
          },
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
          },
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.getData();
          },
        }
    }
</script>

<style scoped>
  @import "../../../assets/css/product-manage.css";
  .stag-inner {
    padding: 30px 40px;
    background: #fff!important;
  }
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
</style>
