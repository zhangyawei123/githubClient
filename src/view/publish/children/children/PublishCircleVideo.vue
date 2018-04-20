<template>
  <div class="product-info-item">
    <dl>
      <dt>* 海报标题：</dt>
      <dd>
        <div class="video-title">
          <el-input v-model="videoTitle" placeholder="请输入视频标题" :maxlength="80"></el-input>
          <span>{{videoTitle.length}} / 80</span>
        </div>
      </dd>
      <dt>* 海报视频：</dt>
      <dd>
        <div class="video-content">
          <img src="" alt="上传视频的占位图">
        </div>
        <div class="tips">1.内容以展示产品为主，可主要展示产品的3至5个点；<br>2.建议视频时间在5s以内。</div>
        <div class="video-cover">
          <span class="choose-btn">&times;</span>
          <img src="" alt="视频封面的占位图">
        </div>
        <div class="tips">视频封面图尺寸750*420px；格式JPG、JPEG及PNG。</div>
      </dd>
    </dl>
    <a href="##" class="save-btn">保存</a>
  </div>
</template>
<script>
  export default {
    name: 'publish-video',
    data() {
      return {
        videoTitle: ''
      }
    }
  }
</script>
<style scoped>
  @import url(../../../../assets/css/publish.css);
  .product-info-item dt {
    line-height: 42px;
  }
  .video-title .el-input {
    width: 760px;
    height: 40px;
    line-height: 40px;
  }
  .video-content {
    margin-bottom: 10px;
    width: 360px;
    height: 202px;
  }
  .video-cover {
    margin-top: 20px;
    margin-bottom: 10px;
    width: 212px;
    height: 120px;
    position: relative;
  }
  .choose-btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .configure .name {
    width: 320px;
  }
  .configure .price {
    width: 120px;
  }
  .price-value {
    color: #ff2626;
  }
  .save-btn {
    margin: 0 auto;
    display: block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    background: #1278ec;
    border-radius: 3px;
  }
</style>
