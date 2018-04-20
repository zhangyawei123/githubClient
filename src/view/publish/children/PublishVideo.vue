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
            <label for="videoFile" class="video-upload-btn"></label>
            <input type="file" id="videoFile" name="videoFile" class="upinput"  />
            <div class="video-uplaoding">
              <el-col :span="23"><el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress></el-col>
              <el-col :span="1" class="abort-upload"><i class="el-icon-close"></i></el-col>
              <div class="upstatus"></div>
            </div>
            <div class="video-wrap">
            </div>
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
</template>
<script>
  export default {
    name: 'publish-video',
    data() {
      return {
        videoTitle: '',
        percentage: 0,
      }
    },
    mounted() {
      this.$nextTick(function () {
        let _this = this;
        $(".upinput").fileupload({
          url:"http://192.168.0.69:8010/xjy-web-user/api/common/video/upload",//文件上传地址，当然也可以直接写在input的data-url属性内
          dataType: "json", //如果不指定json类型，则传来的json字符串就需要解析jQuery.parseJSON(data.result);
          formData:function(form){//如果需要额外添加参数可以在这里添加
            return [{name:"oldVideoId",value:$("#videoId").val() || ''},
              {name:"accessToken",value:'324e26fafd4f4871841e1cdae6a5d8c0'}];
          },
          done:function(e,data){
            //done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
            //注意data要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
            //返回的数据在data.result中，这里dataType中设置的返回的数据类型为json
            if(data.result) {
              // 上传成功：
              $('.video-upload-btn').hide();
              $('.video-uplaoding').hide();
              $(".video-wrap").show();
              console.log(data.result);
              $(".upstatus").html(data.result.msg);
              $(".video-wrap").html("<video controls height='200' width='360' src="+data.result.previewSrc+"></video>");
            } else {
              // 上传失败：
              _this.percentage = 0;
              $(".upstatus").html("<span style='color:red;'>"+data.result.msg+"</span>");
            }

          },
          progressall: function (e, data) {//上传进度
            $('.video-upload-btn').hide();
            $('.video-uplaoding').show();
            var progress = parseInt(data.loaded / data.total * 100, 10);
            _this.percentage = progress;
          }
        });
      })
    }
  }
</script>
<style scoped>
 @import url(../../../assets/css/publish.css);
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
   /*width: 360px;*/
   /*height: 202px;*/
 }
 .upinput {
   display: none;
 }
 .abort-upload {
   text-align: center;
   cursor: pointer;
 }
 .video-wrap{
   display: block;
   width: 360px;
   height: 200px;
   overflow: hidden;
 }
 .video-uplaoding,.video-wrap {
   display: none;
 }
 .video-uplaoding {
   margin-bottom: 10px;
 }
 .video-wrap video {
   width: 100%;
   height: 100%;
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
