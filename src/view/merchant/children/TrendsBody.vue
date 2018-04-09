<template>
    <div>
      <div class="trends-title">动态管理</div>
      <div class="publish-box">
        <router-link tag="div" to="/trends/publishnew" class="publish-new">
          <div class="publish-title">发布上新</div>
          <div class="publish-desc">可发布设备、视频、海报等</div>
        </router-link>
        <!--<div class="publish-new">-->
          <!--<div class="publish-title">发布上新</div>-->
          <!--<div class="publish-desc">可发布设备、视频、海报等</div>-->
        <!--</div>-->
        <div class="publish-article">
          <div class="publish-title">发布文章</div>
          <div class="publish-desc">可发布新闻、公告、折扣、活动、招聘等</div>
        </div>
      </div>
      <div class="video-header clearfix">
        <span class="video-item video-item1">动态标题</span>
        <span class="video-item video-item2">动态内容</span>
        <span class="video-item video-item3">发布时间</span>
        <span class="video-item video-item4">操作</span>
      </div>
      <div class="video-body trends">
        <div class="video-cell clearfix">
          <div class="video-item video-item1">
            <span class="mark mark-discount">折扣</span>高级立式车削卧式加工中心卧式加工中心卧式加工中心高级立式车削卧
          </div>
          <div class="video-item video-item2">
            斗山 PUMA VST5000
          </div>
          <div class="video-item video-item3">
            2016年11月16日 16:00
          </div>
          <div class="video-item video-item4">
            <div class="operate">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <i class="iconfont icon-bianji"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <i class="iconfont icon-cha"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="video-cell clearfix">
          <div class="video-item video-item1">
            <span class="mark mark-new">上新</span>高级立式车削卧式加工中心卧式加工中心卧式加工中心高级立式车削卧
          </div>
          <div class="video-item video-item2">
            斗山 PUMA VST5000
          </div>
          <div class="video-item video-item3">
            2016年11月16日 16:00
          </div>
          <div class="video-item video-item4">
            <div class="operate">
              <i class="iconfont icon-bianji"></i>
              <i class="iconfont icon-cha"></i>
            </div>
          </div>
        </div>
        <div class="video-cell clearfix">
          <div class="video-item video-item1">
            <span class="mark mark-notice">公告</span>高级立式车削卧式加工中心卧式加工中心卧式加工中心高级立式车削卧
          </div>
          <div class="video-item video-item2">
            斗山 PUMA VST5000
          </div>
          <div class="video-item video-item3">
            2016年11月16日 16:00
          </div>
          <div class="video-item video-item4">
            <div class="operate">
              <i class="iconfont icon-bianji"></i>
              <i class="iconfont icon-cha"></i>
            </div>
          </div>
        </div>
        <div class="video-cell clearfix">
          <div class="video-item video-item1">
            <span class="mark mark-discount">折扣</span>高级立式车削卧式加工中心卧式加工中心卧式加工中心高级立式车削卧
          </div>
          <div class="video-item video-item2">
            斗山 PUMA VST5000
          </div>
          <div class="video-item video-item3">
            2016年11月16日 16:00
          </div>
          <div class="video-item video-item4">
            <div class="operate">
              <i class="iconfont icon-bianji"></i>
              <i class="iconfont icon-cha"></i>
            </div>
          </div>
        </div>
        <div class="video-cell clearfix">
          <div class="video-item video-item1">
            <span class="mark mark-circle">圈子</span>高级立式车削卧式加工中心卧式加工中心卧式加工中心高级立式车削卧
          </div>
          <div class="video-item video-item2">
            斗山 PUMA VST5000
          </div>
          <div class="video-item video-item3">
            2016年11月16日 16:00
          </div>
          <div class="video-item video-item4">
            <div class="operate">
              <i class="iconfont icon-bianji"></i>
              <i class="iconfont icon-cha"></i>
            </div>
          </div>
        </div>
        <div class="video-cell clearfix">
          <div class="video-item video-item1">
            <span class="mark mark-employ">招聘</span>高级立式车削卧式加工中心卧式加工中心卧式加工中心高级立式车削卧
          </div>
          <div class="video-item video-item2">
            斗山 PUMA VST5000
          </div>
          <div class="video-item video-item3">
            2016年11月16日 16:00
          </div>
          <div class="video-item video-item4">
            <div class="operate">
              <i class="iconfont icon-bianji"></i>
              <i class="iconfont icon-cha"></i>
            </div>
          </div>
        </div>
        <div class="video-cell clearfix">
          <div class="video-item video-item1">
            <span class="mark mark-news">新闻</span>高级立式车削卧式加工中心卧式加工中心卧式加工中心高级立式车削卧
          </div>
          <div class="video-item video-item2">
            斗山 PUMA VST5000
          </div>
          <div class="video-item video-item3">
            2016年11月16日 16:00
          </div>
          <div class="video-item video-item4">
            <div class="operate">
              <i class="iconfont icon-bianji"></i>
              <i class="iconfont icon-cha"></i>
            </div>
          </div>
        </div>
        <div class="video-cell clearfix">
          <div class="video-item video-item1">
            <span class="mark mark-news">新闻</span>高级立式车削卧式加工中心卧式加工中心卧式加工中心高级立式车削卧
          </div>
          <div class="video-item video-item2">
            斗山 PUMA VST5000
          </div>
          <div class="video-item video-item3">
            2016年11月16日 16:00
          </div>
          <div class="video-item video-item4">
            <div class="operate">
              <i class="iconfont icon-bianji"></i>
              <i class="iconfont icon-cha"></i>
            </div>
          </div>
        </div>
      </div>
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
        name: "trends-body",
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
 @import url(../../../assets/css/video-manage.css);
 .el-pagination {
   margin-top: 20px;
   text-align: center;
 }
</style>
