<template>
  <div>
    <div v-show="!imgList.length" class="figure-upload">
      <div class="figure-upload-bg"></div>
      <label class="image-upload-btn">
        添加图片
        <input type="file" id="imageUpload" style="display: none;" @change="onFileChange" multiple>
      </label>
      <div class="figure-upload-note">
        图集功能使用须知：<br>
        1、图集支持绝大部分图片格式，大小不超过5M, 最长边不超过10000像素；<br>
        2、<span class="figure_red">禁止使用图集模式发表文字类、统计图类、gif图、画质粗糙的视频截图</span>，该类文章将被退回且禁止修改并占据当天1篇的发文限额，建议使用文章模式发表；<br>
        3、涉及政治敏感、黄色暴力、血腥恐怖等图集，将被删除或不予推荐展示，且占据当天1篇的发文限额；<br>
      </div>
    </div>

    <el-form v-show="imgList.length" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <div class="pagelet-figure-gallery-box">
        <draggable v-model="imgList" :options="{handle: '.el-icon-sort',animation: 150}" @end="showImglist">
          <div class="pagelet-figure-gallery-item clearfix" v-for="(item,index) in imgList">
            <div class="gallery-img"><img alt="图集" :src="item.url"></div>
            <div class="gallery-txt"><textarea v-model="item.content" placeholder="图片说明（不超过200个字）" maxlength="200"></textarea></div>
            <div class="gallery-action">
              <i class="el-icon-picture-outline gallery-icon" @click="changeImgTrigger(index)">
              </i>
              <input type="file" style="display: none;" id="imageChange" @change="imageChange">
              <i class="el-icon-delete gallery-icon" @click="delImage(index)"></i>
              <i class="el-icon-sort gallery-icon"></i>
            </div>
          </div>
        </draggable>
        <div class="add-btn-box">
          <a href="javascript:void(0)" class="add-btn" @click="addImage">添加</a>
          <span class="tips">最多可添加9张图片。</span>
        </div>
      </div>
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入文章标题">
          <i slot="suffix">{{ruleForm.title.length}} / 30</i>
        </el-input>
      </el-form-item>
      <el-form-item label="文章封面" prop="CoverType">
        <el-radio-group v-model="ruleForm.CoverType">
          <el-radio label="1">单图模式</el-radio>
          <el-radio label="3">三图模式</el-radio>
        </el-radio-group>
        <div class="front-cover-upload clearfix">
          <!--<div v-for="(item,index) in ruleForm.coverList" class="front-cover-img" @click="openVideoDialog(index)"></div>-->
          <div class="front-cover-img" @click="openImgDialog(0)">
            <img :src="ruleForm.coverList[0].url" :data-pid="ruleForm.coverList[0].pid" alt="">
            <div v-if="ruleForm.coverList[0].url" @click.stop="openCropPanel(0)" class="cropper-icon"></div>
          </div>
          <div class="front-cover-img" v-show="ruleForm.CoverType=='3'" @click="openImgDialog(1)">
            <img :src="ruleForm.coverList[1].url" :data-pid="ruleForm.coverList[1].pid" alt="">
            <div v-if="ruleForm.coverList[1].url" @click.stop="openCropPanel(1)" class="cropper-icon"></div>
          </div>
          <div class="front-cover-img" v-show="ruleForm.CoverType=='3'" @click="openImgDialog(2)">
            <img :src="ruleForm.coverList[2].url" :data-pid="ruleForm.coverList[2].pid" alt="">
            <div v-if="ruleForm.coverList[2].url" @click.stop="openCropPanel(2)" class="cropper-icon"></div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="频道分类" prop="channel">
        <el-radio-group v-model="ruleForm.channel">
          <el-radio label="scene">现场</el-radio>
          <el-radio label="component">零件</el-radio>
          <el-radio label="skill">工艺</el-radio>
          <el-radio label="device">设备</el-radio>
          <el-radio label="customerService">售后</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
    <!--图片封面的弹窗-->
    <el-dialog
      :visible.sync="imgCoverDialogVisible"
      width="712px"
      title="正文图片"
      class="imgCoverDialog">
      <ImgCoverPanel :imgCoverList="imgList" @sendImgCover="getImgCover" @closeImgDialog="imgCoverDialogVisible=false" />
    </el-dialog>
    <!--剪切的弹窗-->
    <el-dialog
      :visible.sync="cropperDialogVisible"
      width="712px"
      title="正文图片"
      class="imgCoverDialog">
      <Cropper :cropImgUrl="cropImgUrl" ref="cropperPanel" @sendCropData="getCropImg" @closeCropPanel="cropperDialogVisible=false" />
    </el-dialog>
  </div>
</template>
<script>
  import {httpUrl} from "../../../../http_url";
  import draggable from 'vuedraggable';
  import ImgCoverPanel from '../../../common/ImgCoverPanel'
  import Cropper from '../../../common/Cropper';

  export default {
    data() {
      return {
        iid: '',
        imgList: [],
        changeImgIndex: '',
        imgCoverDialogVisible:false,
        cropperDialogVisible: false,
        cropImgUrl: '',
        picCurrentIndex:'',            //选择的图片弹窗的图片索引
        picBoxCurrentIndex:'',            //点击的哪个图片图片弹窗按钮
        ruleForm: {
          title: '',                  //文章标题
          channel: '',                //频道分类
          CoverType: '1',             //文章封面
          coverList: [{url: '',pid: ''},{url: '',pid: ''},{url: '',pid: ''}],              //封面图片数组
        },
        rules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          CoverType: [
            { required: true, message: '请选择封面模式', trigger: 'change' }
          ],
          channel: [
            { required: true, message: '请选择频道分类', trigger: 'change' }
          ],
        }
      };
    },
    mounted() {
      this.getData()
    },
    components: {
      draggable,
      ImgCoverPanel,
      Cropper
    },
    methods: {
      getData() {
        this.axios.get(httpUrl + 'api/media/image/edit/index?aid=382&accessToken='+ this.$cookie.get('accessToken'))
          .then(response => {
            console.log(response.data);
            // console.log(this.ruleForm.title);
            this.imgList = response.data.data.imgList
          })
          .catch(err => {

          });
      },
      onFileChange(e) {    //上传多图
        var _this = this;
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        if(files.length + _this.imgList.length>5) {
          this.$notify({
            title: '警告',
            message: '文件个数不能超过5个',
            type: 'warning'
          });
          return
        }
        console.log(files);
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
            console.log(result)
            _this.imgList = _this.imgList.concat(result.list);
            // var newArr;
            // _this.imgList.map(function (item) {
            //   item.content = '';
            // })
          },
          error:function(result){
            console.log(result);
          }
        });
      },
      imageChange(e) {                            //更换图片
        var _this = this;
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        console.log(files);
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
            _this.imgList[_this.changeImgIndex].url = result.list[0].url;
            _this.imgList[_this.changeImgIndex].pid = result.list[0].pid;
          },
          error:function(result){
            console.log(result);
          }
        });
      },
      addImage(e) {
        e.preventDefault();
        $('#imageUpload').trigger('click');
        return false;
      },
      changeImgTrigger(index) {
        this.changeImgIndex = index;
        $('#imageChange').trigger('click');
        return false;
      },
      delImage(index) {
        this.imgList.splice(index,1);
      },
      showImglist() {                    //排序的时候打印图片列表的值，显示用的，没有实际意义
        console.log(this.imgList)
      },
      openImgDialog(index) {//打开选择封面弹窗,记录是点击哪一个打开的
        this.imgCoverDialogVisible = true;
        this.picBoxCurrentIndex = index;
      },
      getImgCover(data) {
        this.ruleForm.coverList[this.picBoxCurrentIndex].url = data.url;
        this.imgCoverDialogVisible = false;
      },
      openCropPanel(num) {                            //打开剪切窗口，记录位置
        let _this =this;
        this.cropperDialogVisible = true;

        this.picBoxCurrentIndex=num;
        this.cropImgUrl = this.ruleForm.coverList[num].url;
        setTimeout(function () {
          _this.$refs.cropperPanel.replaceImg(_this.cropImgUrl);
        },10)
        console.log(this.cropImgUrl);
      },
      getCropImg(data) {//回填剪切后的数据，只操作dom，不改变封面数组内的值
        let _this = this;
        console.log(data)
        $('.front-cover-img img').eq(_this.picBoxCurrentIndex).attr({
          'src' : data.url,
          'data-pid' : data.pid
        });
        this.cropperDialogVisible = false;
      },
      getSendData(url) {//获取所有数据
        let _this = this;
        let coverList=[];//到这里在从DOM里去封面的值
        if(_this.ruleForm.CoverType==1) {
          if($('.front-cover-img img').eq(0).attr('src')=='') {
            alert('请选择封面');
            return
          }else {
            coverList[0] = $('.front-cover-img img').eq(0).attr('src');
          }
        }else if(_this.ruleForm.CoverType==3) {
          $.each($('.front-cover-img img'),function (index,item) {
            if($(item).attr('src')=='') {
              alert('请选择封面');
              return
            }else {
              coverList[index] = $(item).attr('src');
            }
          })
        }
        let images = [];
        // _this.imgList.forEach(function(item,index) {
        //   images[index].pid = item.pid;
        //   images[index].content = item.content;
        // })
        for(let i=0;i<_this.imgList.length;i++) {
          images[i] = {pid:_this.imgList[i].pid,content: _this.imgList[i].content};//这个是从富文本返回的图片对象，没有pid
        }
        var dataObj = {
          iid: _this.iid,
          title: _this.ruleForm.title,
          images: images,
          imageNum: _this.imgList.length,
          coverNum: Number(_this.ruleForm.CoverType),
          imageType:_this.ruleForm.channel,
          covers: coverList
        }
        var dataString = JSON.stringify(dataObj);
        _this.axios.post(httpUrl + url,_this.qs.stringify({
          data: dataString,
          accessToken: _this.$cookie.get('accessToken'),
        }))
          .then(res=> {
            console.log(res.data);
            if(res.data.code===1) {
              _this.$message({
                message: res.data.msg,
                type: 'success'
              });
            }else {
              _this.$message.error(res.data.msg)
            }
          })
          .catch(err=> {
            console.log(err)
          })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            if(this.iid) {//修改
              this.getSendData('api/media/image/edit/update');
            }else {//增加
              this.getSendData('api/media/image/add');
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>
<style scoped lang="scss">
  /*图片上传前*/
  .figure-upload {
    background: #fff;
    padding: 40px 30px;
  }
  .figure-upload-bg {
    height: 240px;
    background: url('../../../../assets/img/picalbum_pic01.c489467.png') no-repeat center bottom;
  }
  .image-upload-btn {
    display: block;
    margin: 20px auto;
    width: 140px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background: $primary-color;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    font-size: 16px;
  }
  .figure-upload-note {
    color: #adadad;
    width: 95%;
    background: #F8F8F8;
    border: 1px solid #E9E9E9;
    font-size: 14px;
    color: #ADADAD;
    padding: 10px;
    text-align: left;
    line-height: 25px;
  }
  .figure_red {
    color: red;
  }
  /*图片上传后*/
  .pagelet-figure-gallery-box {
    margin-bottom: 30px;
  }
  .pagelet-figure-gallery-item {
    line-height: 78px;
    padding: 22px 0 22px 50px;
    border-bottom: 1px solid #e8e8e8;
    background-color: #fafafa;
    position: relative;
  }
  .pagelet-figure-gallery-item .gallery-img {
    position: relative;
    width: 150px;
    height: 105px;
    overflow: hidden;
  }
  .pagelet-figure-gallery-item .gallery-img img {
    width: 100%;
    height: 100%;
  }
  .pagelet-figure-gallery-item>* {
    float: left;
  }
  .pagelet-figure-gallery-item .gallery-txt {
    width: 500px;
    margin-left: 22px;
    height: 120px;
  }
  .pagelet-figure-gallery-item .gallery-txt textarea {
    padding: 8px 10px;
    width: 100%;
    height: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #e8e8e8;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background: #fff;
    font-size: 14px;
    resize: none;
    overflow-y: auto;
  }
  .pagelet-figure-gallery-item .gallery-action {
    position: relative;
    height: 120px;
    line-height: 120px;
    margin-left: 20px;
  }
  .pagelet-figure-gallery-item .gallery-icon {
    color: #898989;
    width: 24px;
    height: 24px;
    font-size: 24px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 30px;
    line-height: 1em;
    position: relative;
    cursor: pointer;
  }
  .add-btn-box {
    margin-top: 20px;
  }
  .add-btn {
    display: inline-block;
    margin-right: 20px;
    width: 96px;
    line-height: 36px;
    border: 1px solid $border-color;
    text-align: center;
    color: $primary-color;
  }
  .tips {
    color: $text-tips;
  }

  .demo-ruleForm {
    background: #fff;
    padding: 40px 40px 40px 20px;
  }
  .front-cover-upload {
    margin-top: 10px;
  }
  .front-cover-img {
    position: relative;
    overflow: hidden;
    float: left;
    margin-right: 20px;
    width: 150px;
    height: 105px;
    border: 1px solid $border-color;
  }
  .front-cover-img img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .cropper-icon {
    position: absolute;
    right: 5px;
    bottom: 5px;
    opacity: .6;
    cursor: pointer;
    -webkit-transition: opacity .1s;
    -moz-transition: opacity .1s;
    transition: opacity .1s;
    background: #ddd url(https://p3.pstatp.com/origin/213200066a873a8df82e) no-repeat 50%;
    width: 30px;
    height: 30px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .cropper-icon:hover {
    opacity: 1;
  }
</style>
