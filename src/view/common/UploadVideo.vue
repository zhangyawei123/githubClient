<template>
  <div>
        <div class="video-content">
          <label for="videoFile" class="video-upload-btn"></label>
          <input type="file" id="videoFile" name="videoFile" class="upinput" accept="video/mp4"  />
          <div class="video-uplaoding">
            <el-col :span="23"><el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress></el-col>
            <el-col :span="1" class="abort-upload"><i class="el-icon-close"></i></el-col>
          </div>
          <div class="upstatus"></div>
          <div class="video-select no-bg" style="display: none;">
            <div class="feedback-icon processing"></div>
            <div class="feedback-wrap">
              <div class="feedback-text">视频上传成功</div>
              <label for="videoFile" class="reupload">重新上传</label>
            </div>
          </div>
          <div class="video-wrap"></div>
        </div>
        <div class="tips">1.内容以展示产品为主，可主要展示产品的3至5个点；<br>2.建议视频时间在5s以内。</div>
        <div class="video-cover" @click="videoCoverDialogVisible = true" v-if="videoId">
          <!--<span class="choose-btn">&times;</span>-->
          <img v-if="videoCoverUrl" :src="videoCoverUrl" alt="">
          <div class="pgc-operate-bar">设置视频封面</div>
        </div>
        <div class="tips">视频封面图尺寸750*420px；格式JPG、JPEG及PNG。</div>
    <!--视频封面的弹窗-->
    <el-dialog
      :visible.sync="videoCoverDialogVisible"
      width="860px"
      class="videoCoverDialog">
      <el-tabs v-model="activeName">
        <el-tab-pane label="上传封面" name="first">
          <div v-show="!customPicUrl">
            <div class="video-uploader-upload-background"></div>
            <label class="upload-video-cover"><input type="file" id="videoPicUrl" @change="onFileChangeCover" style="display: none;">选择图片</label>
          </div>
          <div class="video-cover-uploaded" v-show="customPicUrl">
            <img :src="customPicUrl" alt="" height="224" width="400" style="padding: 16px 0px;">
            <div class="confirm-box">
              <label for="videoPicUrl" class="upload-video-cover">重新上传</label>
              <label class="upload-video-cover" @click="confirmCustomPic">确认</label>
            </div>
          </div>
          <div class="video-uploader-upload-note">
            <span>上传图片不超过2M</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="系统封面" name="second">
          <ul class="videoposter-items" v-if="systemPicList.length > 0">
            <li v-for="(item,index) in systemPicList" class="videoposter-item" :class="{selected: currentIndex===index}" @click="chooseVideoCover(index)">
              <div class="videoposter-item-wrap">
                <img class="videoposter-image" :src="item.picUrl">
                <div class="videoposter-image-hover"></div>
              </div>
            </li>
          </ul>
          <div class="system-items uploader" v-else>
            <p class="tip">视频处理中，暂无系统封面，请使用上传封面</p>
            <button type="button" class="system-uploader" @click="activeName='first'">立即上传封面</button>
            <p>上传优质的封面将获取更多的播放量</p>
          </div>
          <div class="confirm-box">
            <label class="upload-video-cover" @click="confirmSystemPic">确认</label>
            <label class="upload-video-cover" @click="videoCoverDialogVisible=false">取消</label>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
  import {httpUrl} from "../../http_url";

  export default {
    name: 'publish-video',
    data() {
      return {
        percentage: 0,
        videoId: '',
        videoCoverDialogVisible: false,
        activeName: 'first',
        currentIndex: '',
        customPicUrl: '',                                         //自定义上传的视频封面
        systemPicUrl: '',                                         //系统选择的的视频封面
        systemPicList: [],                                        //系统封面列表
        videoCoverUrl: '',                                        //页面内选择后显示的封面
        linkProduct: null,
      }
    },
    mounted() {
      this.checkLogIn();
      this.$nextTick(function () {
        let _this = this;
        let showTimeInterval = null;
        for(let i=0;i<$(".upinput").length;i++) {
          $(".upinput").eq(i).fileupload({
            url: httpUrl + "api/common/video/upload",//文件上传地址，当然也可以直接写在input的data-url属性内
            dataType: "json", //如果不指定json类型，则传来的json字符串就需要解析jQuery.parseJSON(data.result);
            formData:function(form){//如果需要额外添加参数可以在这里添加
              return [{name:"oldVideoId",value:_this.videoId || ''},
                {name:"accessToken",value: _this.$cookie.get('accessToken')}];
            },
            maxFileSize: 999,
            done:function(e,data){
              //done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
              //注意data要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
              //返回的数据在data.result中，这里dataType中设置的返回的数据类型为json
              if(data.result) {
                // 上传成功：
                $(".feedback-icon").eq(i).removeClass("success");
                $('.video-upload-btn').eq(i).hide();
                $('.video-uplaoding').eq(i).hide();
                $(".video-wrap").eq(i).show();
                $(".video-select").eq(i).show();
                console.log(data.result);
                _this.videoId = data.result.videoId;
                $(".feedback-text").eq(i).html(data.result.msg);
                $(".video-wrap").eq(i).html("<video controls height='200' width='360' src="+data.result.previewSrc+"></video>");
                // 定时查询有没有生成封面
                showTimeInterval = setInterval(checkVideoPic,500);
              } else {
                // 上传失败：
                _this.percentage = 0;
                $(".upstatus").eq(i).html("<span style='color:red;'>"+data.result.msg+"</span>");
              }

            },
            progressall: function (e, data) {//上传进度
              _this.systemPicList= [];
              _this.videoCoverUrl= '';
              _this.currentIndex= '';
              $('.video-upload-btn').eq(i).hide();
              $('.video-select').eq(i).hide();
              $(".video-wrap").eq(i).hide();
              $('.video-uplaoding').eq(i).show();
              var progress = parseInt(data.loaded / data.total * 100, 10);
              _this.percentage = progress;
              if(progress==1) {
                $(".feedback-text").eq(i).text('上传成功！正在自动生成封面...');
              }
            }
          });
          //定时查询是否生成封面
          function checkVideoPic(){
            $.ajax({
              type : "get",
              url : httpUrl+"api/common/video/cover?accessToken="+_this.$cookie.get('accessToken')+"&videoId=" + _this.videoId,
              // async : true,
              // data:{
              //   videoId :videoId,
              //   accessToken: _this.$cookie.get('accessToken')
              // },
              // dataType : 'json',
              success : function(result) {
                if(result.code == 1 && result.list.length > 0){
                  //修改视频上传图片
                  console.log(result)
                  // $("#video-feedback").addClass("video-success");
                  $(".feedback-text").eq(i).text("上传成功！生成封面成功！");
                  $(".feedback-icon").eq(i).addClass("success");
                  _this.systemPicList = result.list;
                  //去除定时请求
                  clearInterval(showTimeInterval);
                }else {
                  // clearInterval(showTimeInterval);
                  // alert('msg');
                }
              }
            });
          }
        }

      })
    },
    methods: {
      onFileChangeCover(e) {
        var _this = this;
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        console.log(files);
        var formData = new FormData();
        formData.append('accessToken', this.$cookie.get('accessToken'));
        for (var i=0;i< files.length;i++) {
          formData.append('imgfile', files.eq(i));
        }
        $.ajax({
          url:httpUrl + '/api/common/image/upload',
          type:'POST',
          data:formData,
          contentType: false,    //不可缺
          processData: false,    //不可缺
          success:function(result){
            console.log(result);
            // _this.coverFileList = result.list;
            _this.customPicUrl = result.list[0].url;
          },
          error:function(result){
            console.log(result);
          }
        });
      },
      confirmCustomPic() {                              //点击自定义上传的封面tab的确定键
        this.videoCoverUrl = this.customPicUrl;
        this.customPicUrl='';
        this.videoCoverDialogVisible= false;
      },//点击自定义上传的封面tab的确定键
      chooseVideoCover(index) {//选择系统的封面的图片
        this.currentIndex = index;
        this.systemPicUrl = this.systemPicList[index].picUrl;
        console.log(this.systemPicUrl);
      },//选择系统的封面的图片
      confirmSystemPic() {                //点击系统的封面tab的确定键
        if(!this.systemPicUrl) {
          return
        }
        this.videoCoverUrl = this.systemPicUrl;
        this.videoCoverDialogVisible= false;
      }, //点击系统的封面tab的确定键
    }
  }
</script>
<style scoped lang="scss">
  @import url(../../assets/css/publish.css);
  dt {
    line-height: 42px;
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
  .video-uploader-upload-background {
    height: 234px;
    background: url("../../assets/img/purevideo_pic.dba9515.png") no-repeat center center;
  }
  .upload-video-cover {
    margin: 0 auto;
    display: block;
    height: 40px;
    line-height: 40px;
    width: 140px;
    text-align: center;
    background: $primary-color;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
  }
  .video-cover-uploaded,.confirm-box {
    margin-top: 20px;
    text-align: center;
  }
  .video-cover-uploaded .upload-video-cover,.confirm-box .upload-video-cover{
    display: inline-block;
    margin: 0 20px;
  }
  .video-uploader-upload-note {
    color: #9e9e9e;
    font-size: 14px;
    padding-top: 12px;
    text-align: center;
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
  /*头条系统封面选择*/
  .videoposter-items {
    position: relative;
    text-align: left;
    overflow: hidden;
    padding-top: 15px;
    padding-left: 17px;
    min-height: 200px;
    background: #f4f5f6;
  }
  .videoposter-item {
    margin: 0 3px 16px;
    display: table;
    table-layout: fixed;
    position: relative;
    float: left;
    width: 192px;
    height: 100px;
    overflow: hidden;
    margin: 0 3px 16px;
    background: rgba(0,0,0,.5);
  }
  .videoposter-image-hover {
    display: none;
  }
  .videoposter-item:hover .videoposter-image-hover{
    display: block;
  }
  .videoposter-item-wrap {
    width: 100%;
    height: 100px;
    vertical-align: middle;
    font-size: 0;
  }
  .videoposter-image {
    width: 100%;
    cursor: pointer;
    height: 112px;
  }
  .videoposter-image-hover {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    cursor: pointer;
  }
  .videoposter-item.selected .videoposter-image-hover {
    display: block;
    background: url("../../assets/img/common_z.daac891.png") no-repeat 0 0;
  }
  .system-items {
    margin-bottom: 10px;
    position: relative;
    text-align: left;
    overflow: hidden;
    padding-top: 15px;
    padding-left: 17px;
    min-height: 232px;
    background: #f4f5f6;
    max-height: 272px;
    overflow-y: auto;
    text-align: center;
  }
  .tip {
    font-size: 20px;
    margin-top: 60px;
    margin-bottom: 30px;
  }
  .system-uploader {
    margin-bottom: 20px;
    padding: 10px 30px;
    min-width: 140px;
    color: #fff;
    border: none;
    background-color: #1278ec;
  }
</style>
