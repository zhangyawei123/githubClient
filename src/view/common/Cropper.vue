<template>
  <div>
    <div class="container">
      <div style="width: 400px;height: 380px;float: left;">
        <img id="image" crossorigin="anonymous">
      </div>
      <div class="small-preview"  style="width: 172px;height: 120px;overflow:hidden; float: left;margin-left: 20px;"></div>
    </div>
    <div class="footer">
      <span class="footer-btn" id="getData" @click="sendCropImg">确认</span>
      <span class="footer-btn cancel-btn" id="destroy" @click="closeCropPanel">取消</span>
    </div>
  </div>

</template>
<script>
  import '../../../static/cropper4.0.0/cropper.js';
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
    props: ['cropImgUrl'],
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      replaceImg(url) {               //打开或者更换图片
        var $image = $('#image');
        $image.cropper('destroy').attr('src', url).cropper(options);
      },
      sendCropImg() {
        let _this = this;
        var $image = $('#image');
        var data = $image.cropper('getData', true);
        console.log(data);
        $.ajax({
          url: _this.httpUrl + 'api/common/image/cutOut?x='+data.x+'&y='+data.y+'&w='+data.width+'&h='+data.height+'&image_url='+_this.cropImgUrl+'&accessToken=' + _this.$cookie.get('accessToken'),
          type: 'get',
        })
          .done(function(data) {
            console.log(data);
            if(data.sta===1) {
              _this.$emit('sendCropData',data.imagePic);
            }else {
              _this.$notify.error({
                title: '错误',
                content: data.msg
              })
            }
          })
          .fail(function() {
            console.log("error");
          })
          .always(function() {
            console.log("complete");
          });
      },
      closeCropPanel() {
        this.$emit('closeCropPanel');
      }
    }
  }
</script>
<style>
  @import '../../../static/cropper4.0.0/cropper.css';
</style>
<style scoped>
  .container {
    padding: 20px;
    background: #f7f7f7;
    overflow: hidden;
  }
  .footer {
    margin-top: 20px;
    text-align: center;
  }
  .footer-btn {
    display: inline-block;
    margin: 0 10px;
    height: 40px;
    line-height: 40px;
    width: 140px;
    text-align: center;
    background: #1278ec;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
  }
  .cancel-btn {
    background-color: #f1f1f1;
    color: #a4a4a4;
  }
</style>
