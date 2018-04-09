<template>
  <div>
    <div class="video-header clearfix">
      <span class="video-item video-item1">视频</span>
      <span class="video-item video-item2">关联产品</span>
      <span class="video-item video-item3">发布时间</span>
      <span class="video-item video-item4">操作</span>
    </div>
    <div class="video-body">
      <div class="video-cell clearfix" v-for="(item,index) in lists">
        <div class="video-item video-item1">
          <div class="video-cover">
            <img :src="item.videoCover" height="226" width="339" alt="">
          </div>
          <div class="video-name">{{item.title}}</div>
        </div>
        <div class="video-item video-item2">
          <div class="relate-product">
            <img :src="item.equipmentCover" height="116" width="141" alt="">
          </div>
          <div class="product-info">
            <p class="product-name">{{item.equipmentName}}</p>
          </div>
        </div>
        <div class="video-item video-item3">
          <p class="publish-time">{{item.publishTime | formatTime}}</p>
        </div>
        <div class="video-item video-item4">
          <div class="operate">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <router-link :to="{ path: '/videoManage/edit', query: { videoIndex: index }}">
                <i class="iconfont icon-bianji"></i>
              </router-link>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <i class="iconfont icon-cha" @click="removeItem(index)"></i>
            </el-tooltip>
          </div>
        </div>
      </div>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next,total"
        :total="Number(total)">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { httpUrl} from "../../../http_url";
  export default {
    name: 'video-manage-list',
    data () {
      return {
        total: '',
        lists: [],
        currentPage: 1
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.checkLogIn();
        console.log('123');
        this.getDataList((this.currentPage-1));
      })
    },
    methods: {
      getDataList: function (currentPage) {
        var _this = this;
        this.axios.get(httpUrl + '/api/product/equipment/video/list?accessToken='+ this.$cookie.get('accessToken') +'&&currentPage=' + currentPage,)
          .then(response => {
            // console.log(response.data);
            _this.total = response.data.total;
            _this.lists = response.data.list;
          })
          .catch(err => {
            console.log(err);
          });
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getDataList(val);
      },
      removeItem(index){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dataBack.list.splice(index,1);
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
    },

  }
</script>
<style scoped>
  .video-header {
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e5e5;
  }
  .video-item {
    display: inline-block;
    float: left;
  }
  .video-item1 {width: 324px;}
  .video-item2 {width: 280px;}
  .video-item3 {width: 222px;}
  .video-item4 {}
  .video-cell {
    padding: 18px 0;
    border-bottom: 1px solid #e5e5e5;
  }
  .video-cover {
    float: left;
    margin-top: 1px;
    margin-right: 10px;
    height: 55px;
    width: 97px;
  }
  .video-cover img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .video-name {
    float: left;
    margin-top: 10px;
    width: 172px;
    line-height: 1.428;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .relate-product {
    margin-right: 10px;
    float: left;
    width: 55px;
    height: 55px;
    border: 1px solid #e5e5e5;
  }
  .relate-product img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .product-info {
    line-height: 56px;
  }
  .product-name {
    padding-right: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .product-price {
    color: #FF2626;
  }
  .publish-time,.operate {
    line-height: 56px;
  }
  .operate i {
    color: #A1A8B3;
    font-size: 20px;
    cursor: pointer;
  }
  .operate .icon-bianji {
    position: relative;
    margin-right: 28px;
  }
  .video-cell:hover {
    background: #fafafa;
  }
  .video-cell:hover .icon-bianji {
    color: #1b7ded;
  }
  .video-cell:hover .icon-cha {
    color: #ff2626;
  }
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
</style>
