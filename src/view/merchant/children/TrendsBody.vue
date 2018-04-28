<template>
    <div>
      <div class="trends-title">动态管理</div>
      <div class="publish-box">
        <router-link tag="div" to="/trends/publishnew" class="publish-new">
          <div class="publish-title">发布上新</div>
          <div class="publish-desc">可发布设备、视频、海报等</div>
        </router-link>
        <router-link tag="div" to="/trends/publisharticle" class="publish-article">
          <div class="publish-title">发布文章</div>
          <div class="publish-desc">可发布新闻、公告、折扣、活动、招聘等</div>
        </router-link>
      </div>
      <div class="video-header clearfix">
        <span class="video-item video-item1">动态标题</span>
        <span class="video-item video-item2">动态内容</span>
        <span class="video-item video-item3">发布时间</span>
        <span class="video-item video-item4">操作</span>
      </div>
      <div class="video-body trends">
        <div class="video-cell clearfix" v-for="(item,index) in lists">
          <div class="video-item video-item1">
            <span class="mark" :class="'mark-'+ item.outCategory">{{item.typeName}}</span>{{item.title}}</div>
          <div class="video-item video-item2">
            {{item.outTitle}}
          </div>
          <div class="video-item video-item3">
            {{item.opt | formatTime}}
          </div>
          <div class="video-item video-item4">
            <div class="operate">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <!--现在暂时只有折扣和上新，没有加其他的判断-->
                <router-link v-if="item.outCategory===4601" :to="{ path: '/trends/updatenew', query: { did: item.did }}"><i class="iconfont icon-bianji"></i></router-link>
                <router-link v-if="item.outCategory===4602" to="/trends/publisharticle"><i class="iconfont icon-bianji"></i></router-link>
                <i class="iconfont icon-bianji" v-else></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <i class="iconfont icon-cha" @click="delItem(index,item.did)"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
        <!--<div class="video-cell clearfix">-->
          <!--<div class="video-item video-item1">-->
            <!--<span class="mark mark-news">新闻</span>高级立式车削卧式加工中心卧式加工中心卧式加工中心高级立式车削卧-->
          <!--</div>-->
          <!--<div class="video-item video-item2">-->
            <!--斗山 PUMA VST5000-->
          <!--</div>-->
          <!--<div class="video-item video-item3">-->
            <!--2016年11月16日 16:00-->
          <!--</div>-->
          <!--<div class="video-item video-item4">-->
            <!--<div class="operate">-->
              <!--<i class="iconfont icon-bianji"></i>-->
              <!--<i class="iconfont icon-cha"></i>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next,total"
        :total="totalPage">
      </el-pagination>
    </div>
</template>

<script>
  import {httpUrl} from "../../../http_url";

  export default {
      name: "trends-body",
      data() {
          return {
            currentPage: 1,
            lists: [],
            totalPage: 0,
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
          let _this =this;
          this.axios.get(httpUrl + 'api/company/dynamic/list?accessToken=' + _this.$cookie.get('accessToken')+ '&currentPage=' + (_this.currentPage-1))
            .then(function (response) {
              console.log(response.data);
              _this.lists= response.data.list;
              _this.totalPage= parseInt(response.data.total,10);
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.getData();
        },
        delItem(index,did) {
          let _this=this;
          this.$confirm('此操作将永久删除该条动态, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.lists.splice(index,1);
            this.axios.post(httpUrl+ 'api/company/dynamic/del',this.qs.stringify({
              accessToken: this.$cookie.get('accessToken'),
              did: did
            }))
              .then(function (response) {
                // console.log(response.data);
                _this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              })
              .catch(function (error) {
                console.log(error)
              })

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

<style scoped>
 @import url(../../../assets/css/video-manage.css);
 .el-pagination {
   margin-top: 20px;
   text-align: center;
 }
</style>
