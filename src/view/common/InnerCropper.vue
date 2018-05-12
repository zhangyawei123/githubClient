<template>
  <div>
    <div class="container">
      <div style="width: 400px;height: 380px;float: left;">
        <img id="Innerimage" crossorigin="anonymous">
      </div>
      <div class="inner-preview"  style="width: 172px;height: 120px;overflow:hidden; float: left;margin-left: 20px;"></div>
    </div>
  </div>

</template>
<script>
  import '../../../static/cropper4.0.0/cropper.js';
  let options = {
    aspectRatio: 1.4,
    viewMode: 2,
    preview:".inner-preview",
    movable: false,//是否允许可以移动后面的图片
    checkCrossOrigin: false,//检查当前图像是否为跨域图像。
    guides: false,	//显示在裁剪框上方的虚线。
    background: true  ,//显示容器的网格背景。（就是后面的马赛克）
    autoCropArea: 1,//定义自动裁剪面积大小(百分比)和图片进行对比。
    scalable: false,//是否允许缩放图像。
    zoomable: false,//是否允许放大图像。
  }
  export default {
    props: ['cropInnerImgUrl'],
    data() {
      return {
        cropInnerImg: '',
      }
    },
    mounted() {

    },
    methods: {
      replaceImg(url) {               //打开或者更换图片
        var $image = $('#Innerimage');
        $image.cropper('destroy').attr('src', url).cropper(options);
      },
      sendCropImg() {
        let _this = this;
        var $image = $('#Innerimage');
        var data = $image.cropper('getData', true);
        $.ajax({
          url: _this.httpUrl + 'api/common/image/cutOut?x='+data.x+'&y='+data.y+'&w='+data.width+'&h='+data.height+'&image_url='+_this.cropInnerImgUrl+'&accessToken=' + _this.$cookie.get('accessToken'),
          type: 'get',
          async: false  //设置同步使return的时候有_this.cropInnerImg的值
        })
          .done(function(data) {
            if(data.sta===1) {
              _this.cropInnerImg = data.imagePic;
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
        return _this.cropInnerImg;
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
</style>
