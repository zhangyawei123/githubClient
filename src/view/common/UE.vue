<!--不用管这些错误提示，是可以用的-->
<template>
  <div>
    <div id="editor" type="text/plain"></div>
  </div>
</template>
<script>
    export default {
      name: 'UE',
      data () {
        return {
          editor: null
        }
      },
      props: {
        defaultMsg: {
          type: String
        },
        config: {
          type: Object
        },
        id: {
          type: String
        },
      },
      mounted() {
        this.$nextTick(function () {
          this.editor = UE.getEditor('editor', this.config); // 初始化UE
          console.log("上传这堆错误不用理会，上传接口需自行开发配置");
        })
      },
      methods: {
        getUEContent() { // 获取内容方法
          return this.editor.getContent()
        },
        insertHtml(html) {
          this.editor.execCommand('insertHtml', html);
        },
        changeIframeCover(html,videoId,img) {                    //更换富文本里面的视频封面
          $(this.editor.document).find(".local-video").attr("src" , html).attr("data-id", videoId).attr("data-img", img);
          $(this.editor.document).find(".local-video img").attr("src" , img);
        },
        delVideoCover() {                     //删除视频的时候
          $(this.editor.document).find(".local-video").parent().remove();
        },
        checkIframeVideoCover() { //  判断添加视频后有没有加入到正文
          if ($(this.editor.document).find(".local-video").length > 0) { return true} else { return false}
        },
        getImgList() {                          //获取富文本里面的图片数组url
          var jbody = $(this.editor.document);
          var $img = $("p img[class!='remoteImageErrorPlaceholder']",jbody);
          let imgList=[];

          $.each($img,function (index,item) {
            imgList[index] = $(item).attr('src');
          })
          return imgList;
        }
      },
      destroyed() {
        this.editor.destroy();
      }
    }
</script>
