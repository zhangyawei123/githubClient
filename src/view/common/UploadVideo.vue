<template>
  <div>
        <div class="video-content">
          <label v-if="!videoId" @click="triggerUploadVideo" class="video-upload-btn"></label>
          <input type="file" :id="videoInputId" name="videoFile" class="upinput" accept="video/mp4"  />
          <div class="video-uplaoding">
            <el-col :span="23"><el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress></el-col>
            <el-col :span="1" class="abort-upload"><i class="el-icon-close"></i></el-col>
          </div>
          <div class="upstatus"></div>
          <div class="video-select no-bg" v-if="videoOldId || videoNewId">
            <div class="feedback-icon processing" :class="{'success':videoId}"></div>
            <div class="feedback-wrap">
              <div class="feedback-text">{{videoOldId ? '视频上传成功':'上传成功！正在自动生成封面...'}}</div>
              <label  @click="triggerUploadVideo" class="reupload">重新上传</label>
            </div>
          </div>
          <div class="video-wrap">
            <video controls v-if="videoOldId" height='200' width='360' :src="videoUrl"></video>
          </div>
        </div>
        <div class="tips">1.内容以展示产品为主，可主要展示产品的3至5个点；<br>2.建议视频时间在5s以内。</div>
        <div class="video-cover-box" v-if="videoCoverUrl || videoNewId">
          <div class="video-cover" @click="openVideoCoverPanel">
            <!--<span class="choose-btn">&times;</span>-->
            <img v-if="videoCoverUrl" :src="videoCoverUrl.url || videoCoverUrl.picUrl ||videoCoverUrl.videoCoverUrl" alt="">
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
    props: ['videoInputId','videoCoverUrl','videoId','videoUrl'],
    data() {
      return {
        percentage: 0,
        videoUploading: false,
        videoNewId: '',
        activeName: 'first',
        currentIndex: '',
        systemPicList: [],
      }
    },
    computed: {
      videoOldId() { return this.videoId },
    },
    mounted() {
      console.log(this.videoId);
      this.checkLogIn();
      this.$nextTick(function () {
        let _this = this;
        $('#' + this.videoInputId).fileupload({
            url: httpUrl + "api/common/video/upload",//文件上传地址，当然也可以直接写在input的data-url属性内
            dataType: "json", //如果不指定json类型，则传来的json字符串就需要解析jQuery.parseJSON(data.result);
            formData:function(form){//如果需要额外添加参数可以在这里添加

              return [{name:"oldVideoId",value: _this.videoNewId},
                {name:"accessToken",value: _this.$cookie.get('accessToken')}];
            },
            maxFileSize: 999,
            done:function(e,data){
              _this.videoUploading = true;
              let uploadDiv = $(e.target).parent().parent();
              // uploadDiv.showTimeInterval = null;
              //done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
              //注意data要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
              //返回的数据在data.result中，这里dataType中设置的返回的数据类型为json
              if(data.result.code===1) {
                // 上传成功：
                uploadDiv.find(".feedback-icon").removeClass("success");
                uploadDiv.find('.video-upload-btn').hide();
                uploadDiv.find('.video-uplaoding').hide();
                uploadDiv.find(".video-wrap").show();
                uploadDiv.find(".video-select").show();
                uploadDiv.find(".video-cover-box").show();
                console.log(data.result);
                _this.videoNewId = data.result.videoId;
                uploadDiv.find(".feedback-text").html(data.result.msg);
                uploadDiv.find(".video-wrap").html("<video controls height='200' width='360' src="+data.result.previewSrc+"></video>");
                // 定时查询有没有生成封面
                uploadDiv.showTimeInterval = setInterval(function () {
                  //定时查询是否生成封面
                    $.ajax({
                      type : "get",
                      url : httpUrl+"api/common/video/cover?accessToken="+_this.$cookie.get('accessToken')+"&videoId=" + _this.videoNewId,
                      success : function(result) {
                        if(result.code == 1 && result.list.length > 0){
                          //修改视频上传图片
                          console.log(result)
                          uploadDiv.find(".feedback-text").text("上传成功！生成封面成功！");
                          uploadDiv.find(".feedback-icon").addClass("success");
                          _this.systemPicList = result.list;
                          //去除定时请求
                          clearInterval(uploadDiv.showTimeInterval);
                          _this.videoUploading = false;
                        }else {
                          // _this.videoUploading = false;
                          // clearInterval(showTimeInterval);
                          // alert('msg');
                        }
                      }
                    });
                },3000);
              } else {
                // 上传失败：
                _this.percentage = 0;
                uploadDiv.find(".upstatus").html("<span style='color:red;'>"+data.result.msg+"</span>");
                _this.videoUploading = false;
              }

            },
            progressall: function (e, data) {//上传进度
              _this.videoUploading = true;
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
          setTimeout(function () {
            //根据的接收的视频ID查询封面
            _this.axios.get(httpUrl+"api/common/video/cover?accessToken="+_this.$cookie.get('accessToken')+"&videoId=" + _this.videoOldId)
              .then(res=> {
                if(res.data.code == 1 && res.data.list.length > 0){
                  _this.systemPicList = res.data.list;
                }else {
                  console.log('查询失败,有可能是发布页面');
                }
              })
          },1000)
      })
    },
    methods: {
      triggerUploadVideo() {
        if(!this.videoUploading) {
          $('#' + this.videoInputId).trigger('click');
        }else { //有视频正在处理
          this.$notify({
            // title: '警告',
            message: '上个视频正在处理，请稍后',
            type: 'warning'
          })
        }
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
    overflow: hidden;
  }
  .video-uplaoding {
    display: none;
  }
  .video-uplaoding {
    padding: 12px 0 30px;
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
