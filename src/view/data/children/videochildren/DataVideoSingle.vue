<template>
  <div class="content-box">
    <div class="video-header clearfix">
      <span class="video-item video-item1">视频</span>
      <span class="video-item video-item2">关联产品</span>
      <span class="video-item video-item-play">播放数</span>
      <span class="video-item video-item-seek">咨询数</span>
      <span class="video-item video-item3">发布时间</span>
      <span class="video-item video-item4">操作</span>
    </div>
    <div class="video-body">
      <div class="video-cell clearfix">
        <div class="video-item video-item1">
          <div class="video-cover">
            <img src="" height="226" width="339" alt="">
          </div>
          <div class="video-name">高级立式车削卧式加工中心高级立式车削卧式...</div>
        </div>
        <div class="video-item video-item2">
          <div class="relate-product">
            <img src="" height="116" width="141" alt="">
          </div>
          <div class="product-info">
            <p class="product-name">斗山 PUMA VST5000</p>
          </div>
        </div>
        <div class="video-item video-item-play">
          <p class="publish-time">213</p>
        </div>
        <div class="video-item video-item-seek">
          <p class="publish-time">32</p>
        </div>
        <div class="video-item video-item3">
          <p class="publish-time">2016年11月16日 16:00</p>
        </div>
        <div class="video-item video-item4">
          <div class="operate">
            <a href="##">
              <el-tooltip class="item" effect="dark" content="数据分析" placement="top">
                <i class="iconfont icon-bianji"></i>
              </el-tooltip>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="pageTool" class="pages"></div>
  </div>
</template>

<script>
  export default {
    name: "data-video-single"
  }
</script>

<style scoped>
  @import "../../../../assets/css/video-manage.css";
  .content-box {
    margin-bottom: 60px;
    padding: 30px 40px 20px;
    background: #fff;
  }
  .video-item1 {width: 287px;}
  .video-name { width: 140px; }
  .video-item2 {width: 243px;}
  .video-item3 {width: 190px;}
  .video-item4 {overflow: visible;}
  .video-item-play {width: 66px;}
  .video-item-seek {width: 66px;}
</style>
