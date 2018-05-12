<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="上传封面" name="first">
      <div v-show="!customVideoCover">
        <div class="video-uploader-upload-background"></div>
        <label class="upload-video-cover"><input type="file" id="videoPicUrl" @change="onFileChangeCover" style="display: none;">选择图片</label>
      </div>
      <div class="video-cover-uploaded" v-show="customVideoCover">
        <!--<img :src="customVideoCover.url" alt="" height="224" width="400" style="padding: 16px 0px;">-->
        <InnerCropper :cropInnerImgUrl="customVideoCover.url"  ref="innerCrop" />
        <!--<div class="container clearfix">-->
          <!--<div style="width: 400px;height: 380px;float: left;">-->
            <!--<img id="videoImg" crossorigin="anonymous">-->
          <!--</div>-->
          <!--<div class="small-preview"  style="width: 172px;height: 120px;overflow:hidden; float: left;margin-left: 20px;"></div>-->
        <!--</div>-->

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
      <div v-if="systemPicList">
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
      </div>
      <div class="confirm-box">
        <label class="upload-video-cover" @click="confirmSystemPic">确认</label>
        <label class="upload-video-cover" @click="closeVideoDialog">取消</label>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import {httpUrl} from "../../http_url";
  // import '../../../static/cropper4.0.0/cropper.js';
  import InnerCropper from "./InnerCropper"
  let options = {
    aspectRatio: 1.4,
    viewMode: 2,
    preview:".small-preview",
    movable: false,//是否允许可以移动后面的图片
    checkCrossOrigin: false,//检查当前图像是否为跨域图像。
    guides: false,	//显示在裁剪框上方的虚线。
    background: true  ,//显示容器的网格背景。（就是后面的马赛克）
    autoCropArea: 1,//定义自动裁剪面积大小(百分比)和图片进行对比。
    scalable: false,//是否允许缩放图像。
    zoomable: false,//是否允许放大图像。
  }
  export default {
    props: ['systemPicList'],
    data() {
      return {
        activeName: 'first',
        currentIndex: '',
        customVideoCover: '',                                         //自定义上传的视频封面
        systemVideoCover: '',                                         //系统选择的的视频封面
        videoCover: '',                                        //页面内选择后显示的封面
      }
    },
    components: {
      InnerCropper
    },
    methods: {
      onFileChangeCover(e) {
        var _this = this;
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        var formData = new FormData();
        formData.append('accessToken', this.$cookie.get('accessToken'));
        for (var i=0;i< files.length;i++) {
          formData.append('imgfile', files[i]);
        }
        $.ajax({
          url:httpUrl + '/api/common/image/upload',
          type:'POST',
          data:formData,
          contentType: false,    //不可缺
          processData: false,    //不可缺
          success:function(result){
            console.log(result);
            _this.customVideoCover = result.list[0];
            // var $image = $('#videoImg');
            // setTimeout(function () {
            //   $image.cropper('destroy').attr('src', 'https://p3.pstatp.com/list/pgc-image/15259324310959d54468f9f').cropper(options);
            // },100)
            setTimeout(function () {
              _this.$refs.innerCrop.replaceImg(_this.customVideoCover.url);
            },10)
          },
          error:function(result){
            console.log(result);
          }
        });
      },
      chooseVideoCover(index) {
        this.currentIndex = index;
        this.systemVideoCover = this.systemPicList[index];
        console.log(this.systemVideoCover);
      },
      confirmCustomPic() {            //点击自定义上传tab确认按钮
        this.customVideoCover = this.$refs.innerCrop.sendCropImg();
        this.$emit('sendVideoCover',this.customVideoCover);
        this.customVideoCover='';
      },
      confirmSystemPic() {            //点击系统封面tab确认按钮
        if(!this.systemVideoCover) return;
        this.$emit('sendVideoCover',this.systemVideoCover);
        this.currentIndex = '';
      },
      closeVideoDialog() {
        this.$emit('closeVideoDialog');
        this.activeName = 'first';
      }
    }
  }
</script>
<style>
  .videoCoverDialog .el-dialog__headerbtn {
    z-index: 1!important;
  }
</style>
<style scoped lang="scss">
  /*自定义上传样式*/
  .videoCoverDialog .el-dialog__header {
    padding: 0;
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
