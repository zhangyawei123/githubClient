<template>
  <div>
    <div class="clearfix">
      <div class="content-item" v-for="(item,index) in lists">
        <div class="content-item-pic">
          <img :src="item.videoCover" alt="">
        </div>
        <div class="content-item-info">
          <p class="content-item-title">{{item.title}}</p>
          <p class="content-item-view">浏览次数：{{item.viewNum}}次</p>
          <p class="content-item-time">发布时间：{{item.publishTime | formatTime}}</p>
          <div class="content-item-oprate">
            <router-link :to="{ path: '/posterManage/edit', query: { posterIndex: index }}"><i class="iconfont icon-bianji"></i>编辑</router-link>
            <router-link :to="{ path: 'data', query: { posterIndex: index }}"><i class="iconfont icon-fenxi"></i>分析</router-link>
          </div>
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
</template>
<script>
  import { httpUrl} from "../../../http_url";

  export default {
    name: 'poster-manage-list',
    data () {
      return {
        lists: [],
        currentPage: 1,
        total: '',
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.checkLogIn();
        console.log('accessToken ' + this.$cookie.get('accessToken'));
        console.log('secret ' + this.$cookie.get('secret'));
        console.log('cid ' + this.$cookie.get('cid'));
        this.getDataList();
      })
    },
    methods: {
      getDataList: function (currentPage) {
        var _this = this;
        this.axios.get(httpUrl + '/api/product/equipment/poster/list?accessToken='+ this.$cookie.get('accessToken') +'&&currentPage=' + currentPage,)
          .then(response => {
            console.log(response.data);
            _this.total = response.data.total;
            _this.lists = response.data.list;
          })
          .catch(err => {
            this.checkLogIn();
            console.log(err);
          });
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getDataList(val);
      },
    }
  }
</script>
<style scoped>
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
  .stag {
    width: 1010px;
    padding: 0;
    background: none;
  }
  .content-item {
    float: left;
    width: 306px;
    margin-left: 30px;
    margin-bottom: 30px;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 3px;
    transition: all .3s;
  }
  .content-item:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, .3);
  }
  .content-item-pic {
    margin-bottom: 18px;
    height: 152px;
  }
  .content-item-pic img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .content-item-info {
    overflow: hidden;
  }
  .content-item-title {
    margin-bottom: 12px;
    font-size: 16px;
    color: #252525;
  }
  .content-item-view,.content-item-time {
    margin-bottom: 7px;
    color: #A1A8B3;
  }
  .content-item-oprate {
    margin-top: 14px;
    margin-bottom: 10px;
    float: right;
  }
  .content-item-oprate a {
    margin-left: 38px;
    color: #5C697E;
  }
  .content-item-oprate a:hover {
    color: #1278ec;
  }
  .content-item-oprate a i {
    margin-right: 10px;
  }
</style>
