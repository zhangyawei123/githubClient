<template>
  <div>
    <div class="title-h1">圈子管理</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <div class="circle-cell" v-for="(item,index) in listAll">
          <div class="cell-pic" v-if="item.mainPic">
            <img :src="item.mainPic" alt="">
          </div>
          <div class="cell-title">
            <router-link v-if="item.type ==='video'" :to="{path: '/circleManage/video',query: { videoIndex: item.id}}">{{item.title}}</router-link>
            <router-link v-else-if="item.type ==='image'" :to="{path: '/circleManage/image',query: { videoIndex: item.id}}">{{item.title}}</router-link>
            <router-link v-else-if="item.type ==='article'" :to="{path: '/circleManage/article',query: { videoIndex: item.id}}">{{item.title}}</router-link>
          </div>
          <div class="state"><span class="cell-mark">{{stateObj[item.verifyState]}}</span>工艺  · {{item.publishTime | formatTime}} · <span class="delete" @click="removeItem(index,listAll,item.id,item.type)">删除</span></div>
          <div class="infomation"><span>阅读 {{item.viewNum}}</span><span>评论 {{item.evaluateNum}}</span><span class="last">收藏 {{item.collectNum}}</span></div>
        </div>
        <a href="javascript:void(0)" v-if="listAllLoadMoreTips" class="load-more" @click="loadListAll">查看更多</a>
        <span class="load-all" v-else>已显示全部内容</span>
      </el-tab-pane>
      <el-tab-pane label="审核中" name="second">
        <div class="circle-cell" v-for="(item,index) in listVerify">
          <div class="cell-pic" v-if="item.mainPic">
            <img :src="item.mainPic" alt="">
          </div>
          <div class="cell-title">{{item.title}}</div>
          <div class="state"><span class="cell-mark">{{stateObj[item.verifyState]}}</span>工艺 · {{item.publishTime | formatTime}} · <span class="delete" @click="removeItem(index,listVerify,item.id,item.type)">删除</span></div>
          <div class="infomation"><span>阅读 {{item.viewNum}}</span><span>评论 {{item.evaluateNum}}</span><span class="last">收藏 {{item.collectNum}}</span></div>
        </div>
        <a href="javascript:void(0)" v-if="listVerifyLoadMoreTips" class="load-more" @click="loadMoreVerify">查看更多</a>
        <span class="load-all" v-else>已显示全部内容</span>
      </el-tab-pane>
      <el-tab-pane label="已发布" name="third">
        <div class="circle-cell" v-for="(item,index) in listPublish">
          <div class="cell-pic" v-if="item.mainPic">
            <img :src="item.mainPic" alt="">
          </div>
          <div class="cell-title">{{item.title}}</div>
          <div class="state"><span class="cell-mark">{{stateObj[item.verifyState]}}</span>工艺 · {{item.publishTime | formatTime}} · <span class="delete" @click="removeItem(index,listPublish,item.id,item.type)">删除</span></div>
          <div class="infomation"><span>阅读 {{item.viewNum}}</span><span>评论 {{item.evaluateNum}}</span><span class="last">收藏 {{item.collectNum}}</span></div>
        </div>
        <a href="javascript:void(0)" v-if="listPublishLoadMoreTips" class="load-more" @click="loadMorePublish">查看更多</a>
        <span class="load-all" v-else>已显示全部内容</span>
      </el-tab-pane>
      <el-tab-pane label="未通过" name="fourth">
        <div class="circle-cell" v-for="(item,index) in listNoPass">
          <div class="cell-pic" v-if="item.mainPic">
            <img :src="item.mainPic" alt="">
          </div>
          <div class="cell-title">{{item.title}}</div>
          <div class="state"><span class="cell-mark">{{stateObj[item.verifyState]}}</span>工艺 · {{item.publishTime | formatTime}} · <span class="delete" @click="removeItem(index,listNoPass,item.id,item.type)">删除</span></div>
          <div class="infomation"><span>阅读 {{item.viewNum}}</span><span>评论 {{item.evaluateNum}}</span><span class="last">收藏 {{item.collectNum}}</span></div>
        </div>
        <a href="javascript:void(0)" v-if="listNoPassLoadMoreTips" class="load-more" @click="loadMoreNoPass">查看更多</a>
        <span class="load-all" v-else>已显示全部内容</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import { httpUrl} from "../../../http_url";
  export default {
    name: 'circleManage',
    data () {
      return {
        activeName: 'first',
        listAllLoadMoreTips: true,
        listVerifyLoadMoreTips: true,
        listPublishLoadMoreTips: true,
        listNoPassLoadMoreTips: true,
        listAllPage: -1,
        listVerifyPage: -1,
        listPublishPage: -1,
        listNoPassPage: -1,
        listAll: [],
        listVerify: [],
        listPublish: [],
        listNoPass: [],
        stateObj: {
          '2001': '未审核',
          '2002': '已发布',
          '2003': '未通过 ',
          '2004': '审核中',
        }
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        var _this = this;
        this.checkLogIn();
        this.loadListAll();
        this.loadMoreVerify();
        this.loadMorePublish();
        this.loadMoreNoPass();
      })
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      removeItem(index,list,circleId,type) {
        var _this = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post(httpUrl + 'api/circle/manager/del?accessToken='+this.$cookie.get('accessToken')+'&circleId='+circleId+'&type='+ type)
            .then(function (response) {
              console.log(response.data);
              if (response.data.code ===1) {
                list.splice(index,1);
                _this.$message({
                  type: 'success',
                  message: response.data.msg
                });
              }else {
                _this.$message({
                  type: 'warning',
                  message: response.data.msg
                });
              }
            })
            .catch(function (error) {

            })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      loadListAll() {
        var _this = this;
        this.listAllPage++;
        this.axios.get(httpUrl + 'api/circle/manager/list?accessToken='+ this.$cookie.get('accessToken')+'&currentPage='+  _this.listAllPage)
          .then(function (response) {
            console.log(response.data);
            _this.listAll = _this.listAll.concat(response.data.list);
            if(_this.listAllPage === (response.data.pageSum -1) || response.data.pageSum===0) {  //如果当前页等于总页码的时候加载更多按钮消失
              _this.listAllLoadMoreTips = false;
            }
          })
          .catch(function (error) {

          })
      },
      loadMoreVerify() {
        var _this = this;
        this.listVerifyPage++;
        this.axios.get(httpUrl + 'api/circle/manager/list?accessToken='+ this.$cookie.get('accessToken')+'&currentPage='+ _this.listVerifyPage+ '&&verifyState=2002')
          .then(function (response) {
            _this.listVerify = _this.listVerify.concat(response.data.list);
            if(_this.listVerifyPage === (response.data.pageSum -1) || response.data.pageSum===0) {  //如果当前页等于总页码的时候加载更多按钮消失
              _this.listVerifyLoadMoreTips = false;
            }
          })
          .catch(function (error) {

          })
      },
      loadMorePublish() {
        var _this = this;
        this.listPublishPage++;
        this.axios.get(httpUrl + 'api/circle/manager/list?accessToken='+ this.$cookie.get('accessToken')+'&currentPage='+  _this.listPublishPage+ '&&verifyState=2002')
          .then(function (response) {
            _this.listPublish = _this.listPublish.concat(response.data.list);
            if(_this.listPublishPage === (response.data.pageSum -1) || response.data.pageSum===0) {  //如果当前页等于总页码的时候加载更多按钮消失
              _this.listPublishLoadMoreTips = false;
            }
          })
          .catch(function (error) {

          })
      },
      loadMoreNoPass() {
        var _this = this;
        this.listNoPassPage++;
        this.axios.get(httpUrl + 'api/circle/manager/list?accessToken='+ this.$cookie.get('accessToken')+'&currentPage='+ _this.listNoPassPage+ '&&verifyState=2003')
          .then(function (response) {
            console.log(response.data);
            _this.listNoPass = _this.listNoPass.concat(response.data.list);
            if(_this.listNoPassPage === (response.data.pageSum -1) || response.data.pageSum===0) {  //如果当前页等于总页码的时候加载更多按钮消失
              _this.listNoPassLoadMoreTips = false;
            }
          })
          .catch(function (error) {

          })
      }
    },
    // filters: {
    //   loadSign: function (value) {
    //     if (value%10 === 0) {
    //       return false
    //     }else {
    //       return true
    //     }
    //   }
    // }
  }
</script>
<style scoped lang="scss">
  .title-h1 {
    margin-bottom: 12px;
    font-size: 20px;
  }
  .title-box {
    border-bottom: 1px solid $border-color;
  }
  .title-item {
    line-height: 46px;
    margin-right: 50px;
    display: inline-block;
    font-size: 16px;
    border-bottom: 2px solid transparent;
  }
  .title-item.selected {
    color: $primary-color;
    border-bottom: 2px solid $primary-color;
  }
  .circle-cell {
    overflow: hidden;
    padding: 30px 0 40px;
    border-bottom: 1px solid $border-color;
  }
  .cell-title {
    margin-bottom: 20px;
    font-size: 20px;
    color: $text-normal;
  }
  .state,.infomation {
    margin-bottom: 20px;
    color: $text-tips;
  }
  .delete {
    cursor: pointer;
  }
  .cell-pic {
    float: right;
    width: 120px;
    height: 120px;
    background: #f00;
  }
  .cell-pic > img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .cell-mark {
    display: inline-block;
    margin-right: 16px;
    line-height: 12px;
    padding: 2px;
    color: $primary-color;
    border: 1px solid $primary-color;
    border-radius: 3px;
    font-size: 12px;
  }
  .infomation {
    margin-left: -20px;
  }
  .infomation > span {
    padding: 0 20px;
    border-right: 1px solid $border-color;
  }
  .infomation > span.last {
    border-right: none;
  }
  .load-more,.load-all {
    margin: 20px auto;
    display: block;
    width: 110px;
    height: 36px;
    line-height:36px;
    text-align: center;
  }
  .load-more {
    border: solid 1px $border-color;
  }
  .load-all {
    color: $text-tips;
  }
</style>
