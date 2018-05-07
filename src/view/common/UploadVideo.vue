<template>
  <div>
        <div class="video-content">
          <label :for="videoInputId" class="video-upload-btn"></label>
          <input type="file" :id="videoInputId" name="videoFile" class="upinput" accept="video/mp4"  />
          <div class="video-uplaoding">
            <el-col :span="23"><el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress></el-col>
            <el-col :span="1" class="abort-upload"><i class="el-icon-close"></i></el-col>
          </div>
          <div class="upstatus"></div>
          <div class="video-select no-bg" style="display: none;">
            <div class="feedback-icon processing"></div>
            <div class="feedback-wrap">
              <div class="feedback-text">视频上传成功</div>
              <label :for="videoInputId" class="reupload">重新上传</label>
            </div>
          </div>
          <div class="video-wrap"></div>
        </div>
        <div class="tips">1.内容以展示产品为主，可主要展示产品的3至5个点；<br>2.建议视频时间在5s以内。</div>
        <div class="video-cover-box" style="display: none;">
          <div class="video-cover" @click="openVideoCoverPanel">
            <!--<span class="choose-btn">&times;</span>-->
            <img v-if="videoCoverUrl" :src="videoCoverUrl.url || videoCoverUrl.picUrl" alt="">
            <div class="pgc-operate-bar">设置视频封面</div>
          </div>
          <div class="tips">视频封面图尺寸750*420px；格式JPG、JPEG及PNG。</div>
        </div>

  </div>
</template>
<script>
  import {httpUrl} from "../../http_url";

  export default {
    name: 'publish-video',
    props: ['videoInputId','videoCoverUrl'],
    data() {
      return {
        percentage: 0,
        videoId: '',
        activeName: 'first',
        currentIndex: '',
        systemPicList: [],
      }
    },
    mounted() {
      this.checkLogIn();
      this.$nextTick(function () {
        let _this = this;
        $('#' + this.videoInputId).fileupload({
            url: httpUrl + "api/common/video/upload",//文件上传地址，当然也可以直接写在input的data-url属性内
            dataType: "json", //如果不指定json类型，则传来的json字符串就需要解析jQuery.parseJSON(data.result);
            formData:function(form){//如果需要额外添加参数可以在这里添加
              return [{name:"oldVideoId",value:_this.videoId || ''},
                {name:"accessToken",value: _this.$cookie.get('accessToken')}];
            },
            maxFileSize: 999,
            done:function(e,data){
              let uploadDiv = $(e.target).parent().parent();
              // uploadDiv.showTimeInterval = null;
              //done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
              //注意data要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
              //返回的数据在data.result中，这里dataType中设置的返回的数据类型为json
              if(data.result) {
                // 上传成功：
                uploadDiv.find(".feedback-icon").removeClass("success");
                uploadDiv.find('.video-upload-btn').hide();
                uploadDiv.find('.video-uplaoding').hide();
                uploadDiv.find(".video-wrap").show();
                uploadDiv.find(".video-select").show();
                uploadDiv.find(".video-cover-box").show();
                console.log(data.result);
                _this.videoId = data.result.videoId;
                uploadDiv.find(".feedback-text").html(data.result.msg);
                uploadDiv.find(".video-wrap").html("<video controls height='200' width='360' src="+data.result.previewSrc+"></video>");
                // 定时查询有没有生成封面
                uploadDiv.showTimeInterval = setInterval(function () {
                  //定时查询是否生成封面
                    $.ajax({
                      type : "get",
                      url : httpUrl+"api/common/video/cover?accessToken="+_this.$cookie.get('accessToken')+"&videoId=" + _this.videoId,
                      success : function(result) {
                        if(result.code == 1 && result.list.length > 0){
                          //修改视频上传图片
                          console.log(result)
                          uploadDiv.find(".feedback-text").text("上传成功！生成封面成功！");
                          uploadDiv.find(".feedback-icon").addClass("success");
                          _this.systemPicList = result.list;
                          //去除定时请求
                          clearInterval(uploadDiv.showTimeInterval);
                        }else {
                          // clearInterval(showTimeInterval);
                          // alert('msg');
                        }
                      }
                    });
                },500);
              } else {
                // 上传失败：
                _this.percentage = 0;
                uploadDiv.find(".upstatus").html("<span style='color:red;'>"+data.result.msg+"</span>");
              }

            },
            progressall: function (e, data) {//上传进度
              _this.systemPicList= [];
              // _this.videoCoverUrl= '';
              _this.currentIndex= '';
              let uploadDiv = $(e.target).parent().parent();
              console.log(uploadDiv);
              uploadDiv.find('.video-upload-btn').hide();
              uploadDiv.find('.video-select').hide();
              uploadDiv.find(".video-wrap").hide();
              uploadDiv.find(".video-cover-box").hide();
              uploadDiv.find('.video-uplaoding').show();
              var progress = parseInt(data.loaded / data.total * 100, 10);
              _this.percentage = progress;
              if(progress==1) {
                uploadDiv.find(".feedback-text").text('上传成功！正在自动生成封面...');
              }
            }
          });
      })
    },
    methods: {
      uploadVideo() {
        $('#' + this.videoInputId).trigger('click');
      },
      openVideoCoverPanel() {                     //打开视频封面弹窗，传递生成的视频封面列表
        this.$emit('openVideoCoverPanel',this.systemPicList);
      }
    }
  }
</script>
<style scoped lang="scss">
  .video-content {
    margin-bottom: 10px;
  }
  /*上传视频的按钮*/
  .video-upload-btn {
    display: block;
    margin-bottom: 10px;
    width: 360px;
    height: 200px;
    border: 1px solid #e2e5e7;
  }
  .tips {
    color: #a1a8b3;
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
    padding: 12px 0 30px;
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
    border: 1px solid $border-color;
    position: relative;
    cursor: pointer;
  }
  .video-cover img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .pgc-operate-bar {
    position: absolute;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
    bottom: 0;
    color: #fff;
    height: 26px;
    line-height: 26px;
    text-align: center;
    cursor: pointer;
  }
  .add-btn {
    margin-top: 10px;
  }
</style>
<style>
  /*上传视频过程*/
  .video-select.no-bg {
    padding: 42px;
    margin-bottom: 20px;
    border-bottom: 1px dashed #e2e5e7;
    border-top: 1px dashed #e2e5e7;
    background: none;
  }
  .feedback-icon {
    background-size: 48px 48px;
    width: 48px;
    height: 48px;
    display: inline-block;
    margin-right: 20px;
  }
  .feedback-icon.processing {
    background: url("../../assets/img/pagelet_z.a222db5.png") no-repeat -440px 0;
  }
  .feedback-icon.success {
    background: url("../../assets/img/common_z.daac891.png") no-repeat 0 -114px;
  }
  .feedback-wrap {
    display: inline-block;
    text-align: center;
  }
  .feedback-text {
    font-size: 20px;
    margin-bottom: 10px;
  }
  .reupload {
    color: #406599;
    cursor: pointer;
  }
  .videoCoverDialog .el-dialog__header {
    padding: 0;
  }
  .videoCoverDialog .el-tabs__header {
    margin: 0;
  }
</style>
