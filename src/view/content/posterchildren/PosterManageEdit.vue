<template>
  <div>
    <div class="crumbs">
      <div class="crumbs-inner">
        <router-link to="/posterManage">返回上一级</router-link><i class="crumbs-icon">|</i><router-link to="/posterManage">海报管理</router-link><i class="crumbs-icon">&gt;</i><span>海报编辑</span>
      </div>
    </div>
    <div class="product-info-item">
      <dl>
        <dt>* 海报标题：</dt>
        <dd>
          <div class="video-title">
            <el-input v-model="videoTitle" placeholder="请输入海报标题" :maxlength="30"></el-input>
            <span>{{videoTitle.length}} / 30</span>
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
        <dt>* 关联产品：</dt>
        <dd>
          <table class="component configure">
            <thead>
            <tr>
              <td class="name">产品</td>
              <td class="price">价格</td>
              <td class="profession">品牌</td>
              <td class="system">专业</td>
              <td class="location">产地</td>
              <td class="operate">操作</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="name">
                <span class="component-pic"></span>
                螺母 我司大量生产汽车仪器零部件...
              </td>
              <td class="price-value">￥298000</td>
              <td>德玛吉</td>
              <td>刀具</td>
              <td>德国</td>
              <td><a class="delete" href="##">编辑</a></td>
            </tr>
            </tbody>
          </table>
          <div class="tips">设备型号将显示于各视频列表，如有问题可在产品管理中修改。</div>
        </dd>
      </dl>
      <a href="##" class="save-btn">保存</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'poster-manage-edit',
    data() {
      return {
        videoTitle: ''
      }
    }
  }
</script>
<style scoped lang="scss">
  @import url(../../../assets/css/publish.css);
  .stag {
    padding: 0;
  }
  .crumbs {
    background: #fff;}
  .crumbs-inner {
    margin: 0 40px;
    padding: 30px 0 20px;
    border-bottom: 1px solid $border-color;
  }
  .crumbs a {color: #1278ec;}
  .crumbs-icon { margin: 0 5px; color: #1278ec;}
  .product-info-item {
    margin-top: 0;
  }
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
