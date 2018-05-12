<template>
    <div class="imgCoverWrap">
      <ul class="images-items">
        <li v-for="(item,index) in imgCoverList" class="image-item" :class="{selected: picCurrentIndex===index}" @click="chooseImgCover(index)">
          <img :src="item.url">
          <div class="image-hover"></div>
        </li>
      </ul>
      <div class="confirm-box">
        <label class="upload-video-cover" @click="confirmSystemPic">确认</label>
        <label class="upload-video-cover" @click="closeImgDialog">取消</label>
      </div>
    </div>
</template>

<script>
    export default {
        name: "img-cover-panel",
        props: ['imgCoverList'],
        data() {
          return {
            picCurrentIndex: '',
            ImgCoverUrl: ''
          }
        },
        methods: {
          chooseImgCover(index) {
            this.picCurrentIndex = index;
            this.ImgCoverUrl = this.imgCoverList[index];
          },
          confirmSystemPic() {
            if(this.imgCoverList.length!==0 && !this.ImgCoverUrl ||this.imgCoverList.length===0) return;
            this.$emit('sendImgCover',this.ImgCoverUrl);
            this.picCurrentIndex='';
          },
          closeImgDialog() {
            this.$emit('closeImgDialog');
          }
        }
    }
</script>

<style lang="scss" scoped>
  .imgCoverWrap {
    max-height: 500px;
    overflow-y: auto;
  }
  /*头条系统封面选择*/
  .images-items {
    min-height: 300px;
  }
  .image-item {
    width: 142px;
    height: 120px;
    position: relative;
    display: inline-block;
    border: 1px solid #e8e8e8;
    margin: 10px;
    cursor: pointer;
  }
  .image-item img{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
  .image-hover {
    display: none;
  }
  .image-item:hover .image-hover{
    display: block;
  }
  .image-hover {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    cursor: pointer;
  }
  .image-item.selected .image-hover {
    display: block;
    background: url("../../assets/img/common_z.daac891.png") no-repeat -34px -10px;
    background-size: 240px 196px;
  }
  .confirm-box {
    text-align: center;
  }
  .upload-video-cover {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    width: 140px;
    text-align: center;
    background: $primary-color;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
  }
</style>

