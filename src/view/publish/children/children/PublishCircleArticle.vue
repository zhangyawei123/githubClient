<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入文章标题">
          <i slot="suffix">{{ruleForm.title.length}} / 30</i>
        </el-input>
      </el-form-item>
      <el-form-item label="文章内容" required>
        <div id="pagelet-write">
          <div style="border: 1px solid #e5e5e5;" id="ueBox">
            <UE :config=config ref="ue"></UE>
          </div>
          <div id="video-card">
            <div id="video-uploading" class="video-uploading " style="display: none;">
              <div class="video-info">
                <div id="video-data" class="video-data"></div>
                <div id="video-name" class="video-name oneline">video</div>
              </div>
              <div class="video-progressbar">
                <div class="progressbar-outer">
                  <div id="progressbar-inner"></div>
                </div>
                <div id="video-cancel" class="video-cancel" title="取消上传"></div>
              </div>
            </div>
            <div id="video-uploaded" class="video-uploaded " style="display: none;">
              <div class="video-modify-poster" id="video-modify-poster" @click="videoCoverDialogVisible=true">设置视频封面</div>
              <div class="video-feedback video-link">
                <div id="video-feedback-status" class="video-feedback-status">
                  <div class="video-success">
                    <i></i>
                    <img v-if="videoCoverUrl" :src="videoCoverUrl" width="100%" height="100%" >
                    <img src="https://p2.pstatp.com/large/9820/3808334921" width="100%" height="100%" v-else>
                    <input type="hidden" id="videoCover">
                  </div>
                </div>
                <div class="video-feedback-middle">
                  <div class="video-feedback-mtop">
                    <div id="video-feedback-name" class="video-name oneline"></div>
                    <i></i>
                  </div>
                  <div class="video-feedback-mbottom">
                    <div class="video-delete" id="video-delete">删除</div>
                    <div class="video-feedback-retry">
                      <span>重新上传</span>
                    </div>
                  </div>
                </div>
                <a href="javascript:void(0)" id="video-feedback-btn" class="new-btn cancel video-feedback-btn">添加到正文</a>
              </div>
            </div>
            <div id="video-card-tip" class="video-card-tip oneline" style="display: none;">请将上传的视频添加到正文所需位置</div>
            <div id="pagelet-popalert" style="display: none;">
              <div class="modal popalert-modal" id="popalert-modal" data-backdrop="static">
                <div class="modal-dialog-wrapper">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-body">
                        <div class="popalert-info">
                          <div class="popalert-icon"><i></i>提示</div>
                          <div class="popalert-tip" id="popalert-tip">确认删除该视频吗？</div>
                        </div>
                        <div class="popalert-btns">
                          <a href="javascript:void(0)" id="popalert-submit" class="popalert-submit new-btn submit" data-dismiss="modal">确定</a>
                          <a href="javascript:void(0)" id="popalert-cancel" class="popalert-cancel new-btn cancel" data-dismiss="modal">取消</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input type="hidden" id="videoId" name="videoId" value="" >
          <div class="modal in" id="video-modal" data-backdrop="static" aria-hidden="false" style="display: none;">
            <div class="modal-dialog-wrapper">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-body">
                    <div class="video-header">
                      <div class="video-tags">
                        <span class="video-tag cur" data-type="local-video">本地视频</span>
                      </div>
                      <div class="video-close" data-dismiss="modal"></div>
                    </div>
                    <div class="video-content">
                      <div class="local-video-con">
                        <div class="video-select new-btn submit">
                          <span>选择视频</span>
                          <input id="video_file" type="file" name="videoFile" class="upinput" accept=".rmvb,video/mp4,video/x-m4v,video/*">
                        </div>
                        <div class="video-tip">支持绝大多数视频文件格式，大小不超过2G，较大的视频请压缩后上传</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="文章封面" prop="CoverType">
        <el-radio-group v-model="ruleForm.CoverType">
          <el-radio label="0">无图模式</el-radio>
          <el-radio label="1">单图模式</el-radio>
          <el-radio label="3">三图模式</el-radio>
        </el-radio-group>
        <div class="front-cover-upload clearfix" v-show="ruleForm.CoverType!=='0'">
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
          <!--<div v-for="(item,index) in ruleForm.coverList" class="front-cover-img" @click="openImgCoverPanel(index)"></div>-->
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
      <el-form-item label="文章标签" prop="dynamicTags">
        <div class="tag-box">
          <el-tag
            :key="tag"
            v-for="tag in ruleForm.dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
    <!--视频封面的弹窗-->
    <el-dialog
      :visible.sync="videoCoverDialogVisible"
      width="860px"
      class="videoCoverDialog">
      <VideoCoverPanel @sendVideoCover="getVideoCover" @closeVideoDialog="videoCoverDialogVisible=false" :systemPicList="systemPicList" />
    </el-dialog>
    <!--文章封面的弹窗-->
    <el-dialog
      :visible.sync="imgCoverDialogVisible"
      width="712px"
      title="正文图片"
      class="imgCoverDialog">
      <ImgCoverPanel :imgCoverList="imgCoverList" @sendImgCover="getImgCover" @closeImgDialog="imgCoverDialogVisible=false" />
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
  import UE from '../../../common/UE';
  import VideoCoverPanel from '../../../common/VideoCoverPanel';
  import ImgCoverPanel from '../../../common/ImgCoverPanel';
  import Cropper from '../../../common/Cropper';
  import {httpUrl} from "../../../../http_url";

  export default {
    data() {
      return {
        ruleForm: {
          title: '',                  //文章标题
          channel: '',                //频道分类
          CoverType: '0',             //文章封面类型
          coverList: [{url: ''},{url: ''},{url: ''}],              //文章封面的值(未剪切的时候)
          coverCropList: [{url: ''},{url: ''},{url: ''}],              //文章封面的值(剪切后)
          dynamicTags: [],            //文章标签
        },
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350,
        },
        ue1: "ue1", // 不同编辑器必须不同的id
        videoCoverDialogVisible: false,//视频的封面列表弹窗
        imgCoverDialogVisible: false,//文章的封面列表弹窗
        picBoxCurrentIndex:'',            //点击的哪个图片图片弹窗按钮
        systemPicList: [],            //视频的封面列表弹窗
        imgCoverList: [],            //文章的封面列表弹窗
        videoCoverUrl: '',
        videoCover: '',
        cropperDialogVisible: false,//剪切弹窗
        cropImgUrl: '',//剪切弹窗传入的img
        inputVisible: false,
        inputValue: '',
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
          dynamicTags: [
            {type: 'array', required: true, message: '请至少添加一个标签', trigger: 'change'}
          ]
        }
      };
    },
    mounted() {
      this.$nextTick(function () {
        this.checkLogIn();
        let _this = this;
        let showTimeInterval = null;
        // 上传视频
        $("#video_file").fileupload({
          url: httpUrl+"api/common/video/upload",//文件上传地址，当然也可以直接写在input的data-url属性内
          dataType: "json", //如果不指定json类型，则传来的json字符串就需要解析jQuery.parseJSON(data.result);
          formData:function(form){//如果需要额外添加参数可以在这里添加
            return [{name:"oldVideoId",value:$("#videoId").val()},
              {name:"accessToken",value: _this.$cookie.get('accessToken')}];
          },
          done:function(e,data){
            console.log(data.result);
            //done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
            //注意data要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
            //返回的数据在data.result中，这里dataType中设置的返回的数据类型为json
            if(data.result.code ===1) {
              $("#video-uploading").hide();
              $("#video-uploaded").show();
              // 上传成功：
              $("#videoId").val(data.result.videoId);
              $("#video-feedback-name").text(data.result.videoName);
              $("#video-card-tip").show();
              // 定时查询有没有生成封面
              showTimeInterval = setInterval(checkVideoPic,500);
            } else {
              $("#video-uploading").show();
              $("#video-uploaded").hide();
              // 上传失败：
              $("#progressbar-inner").css("width", "0%");
              alert("上传失败，请重新上传！");
            }
          },
          progress: function (e, data) {//上传进度
            $('#video-modal').hide();
            $("#video-uploading").show();
            $("#video-uploaded").hide();
            // $("#video-name").text(data.result.videoName);
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $("#progressbar-inner").css("width", progress + "%");
          }
        });
        // 重新上传视频
        $(".video-feedback-retry").click(function(){
          if(window.confirm("重新上传时，当前视频信息会被丢弃，确认？")){
            $("#video_file").click();
          }
        });
        //点击删除视频按钮
        $("#video-delete").click(function(){
          $("#pagelet-popalert").show();
          $(".overlay").show();
          $("#popalert-submit").one("click" , function(){
            //确定删除该视频，需要走一个ajax事件，删除该视频
            delVideo();
          })
          $("#popalert-cancel").one("click" , function(){
            //取消删除，将弹出框隐藏掉
            $("#pagelet-popalert").hide();
            $(".overlay").hide();
          })
        });
        //定时查询是否生成封面
        function checkVideoPic(){
          $.ajax({
            type : "get",
            url : httpUrl+"api/common/video/cover?accessToken="+_this.$cookie.get('accessToken')+"&videoId=" + $("#videoId").val(),
            success : function(result) {
              if(result.code == 1 && result.list.length > 0){
                console.log(result.list);
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
        // 删除视频
        function delVideo(){
          var videoId = $("#videoId").val();
          if(videoId != null && videoId != ''){
            $.ajax({
              type : "POST",
              url : httpUrl+"api/common/video/del",
              async : false,
              data:{oldVideoId : videoId,accessToken: _this.$cookie.get('accessToken')},
              dataType : 'json',
              success : function(result) {
                if(result.code == 1){
                  //成功
                  $("#pagelet-popalert").hide();
                  $(".overlay").hide();

                  $("#video-modal").hide();//视频弹出框
                  $("#video-card").hide();//视频进度条
                  $("#video-uploaded").hide();
                  $("#progressbar-inner").css("width", "0%");
                  $("#video-feedback-name").text("");
                  $("#videoId").val("");
                  _this.$refs.ue.delVideoCover();//删除视频

                }
              }
            });
          }
        }
        //视频添加到正文中
        $("#video-feedback-btn").click(function(){
          insert_video_iframe();
        });
        /**
         * 将视频添加到编辑器中
         */
        function insert_video_iframe(){
          //首先判断该视频是否已经添加到正文中了
          var videoId = $("#videoId").val();
          var videoImg = $(".video-success img").attr("src");
          var videoName = $("#video-feedback-name").text();
          var _html = _this.$refs.ue.getUEContent();
          if($(_html).find(".local-video").length > 0){
            alert("当前视频已经添加到正文中，请勿重复添加");
            return false;
          }
          if(videoId != ''){
            var html = '<p><iframe class="local-video"';
            html += ' id="local-video-' + videoId +'" data-vu="' + videoId + '"';
            html += ' data-id="' + videoId + '" data-img="' + videoImg + '"';
            html += ' data-vname="video.mp4" data-vposter="http://p.pstatp.com/large/9820/3808334921"';
            html += ' src="'+ httpUrl + 'api/common/video/video_iframe?vid='+videoId+'&img='+videoImg+'&name='+videoName+'"';
            html += ' scrolling="no" style="display:block;margin:0 auto;max-width:100%;"';
            html += ' width="450px" height="253px" frameborder="0"></iframe></p>';
            console.log(html);
            // this.$refs.ue.execCommand('insertHtml', html);
            _this.$refs.ue.insertHtml(html);
          }
        }
      })
    },
    components: {
      UE,
      VideoCoverPanel,
      ImgCoverPanel,
      Cropper
    },
    methods: {
      getVideoCover(data) {
        if(data.picUrl) {
          this.videoCoverUrl = data.picUrl
        }else {
          this.videoCoverUrl = data.url;
        }
        // this.videoCoverUrl = data.picUrl || data.url;
        // 把视频封面加载富文本里
        var html = "";
        var videoId = $("#videoId").val();
        var videoImg = this.videoCoverUrl;
        console.log(videoImg);
        var videoName = $("#video-feedback-name").text();
        html += httpUrl + 'api/common/video/video_iframe?vid='+videoId+'&img='+videoImg+'&name='+videoName;
        this.$refs.ue.changeIframeCover(html,videoId,videoImg);
        this.videoCoverDialogVisible = false;
      },
      openImgDialog(index) {//打开选择封面弹窗,记录是点击哪一个打开的
        // this.imgCoverList = this.$refs.ue.getImgList();
        let _this = this;
        let receiveData =  this.$refs.ue.getImgList();
        console.log(receiveData)
        for(let i=0;i<receiveData.length;i++) {
          _this.imgCoverList[i] = {url:receiveData[i],pid: ''};//这个是从富文本返回的图片对象，没有pid
        }
        console.log(this.imgCoverList)
        this.imgCoverDialogVisible = true;
        this.picBoxCurrentIndex = index;
      },
      getImgCover(data) { //回填选中后的图片封面
        this.ruleForm.coverList[this.picBoxCurrentIndex] = data;
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
      handleClose(tag) {
        this.dynamicTags.splice(this.ruleForm.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.ruleForm.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      submitForm(formName) {
        let _this = this;
        let videoId = $("#videoId").val();
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let checkIframeVideoCover = _this.$refs.ue.checkIframeVideoCover();

            if(videoId && !checkIframeVideoCover) {//加了视频但没有加到正文
              alert('视频没有加入到正文');
            }else {
              let coverList=[];//到这里在从DOM里去封面的值
              if(_this.ruleForm.CoverType==0) {
                coverList=[];
              }else if(_this.ruleForm.CoverType==1) {
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
              console.log(coverList)
              _this.axios.post(httpUrl + 'api/media/article/add',_this.qs.stringify({
                title: _this.ruleForm.title,
                content: _this.$refs.ue.getUEContent(),
                accessToken: _this.$cookie.get('accessToken'),
                hasVideo: Number(!!videoId),
                vid: videoId || '',
                coverNum: Number(_this.ruleForm.CoverType),
                keyWords: _this.ruleForm.dynamicTags.join(','),
                articleType: _this.ruleForm.channel,
                covers: coverList,
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
            }
          } else {
            // let imgList = _this.$refs.ue.getImgList();
            // console.log(imgList)
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>
<style scoped lang="scss">
  @import url(../../../../../static/ueditor/dialogs/video/common.5edf405.css);
  .pagelet-write {
    border: 1px solid $border-color;
  }
  #video-card {
    margin-top: 16px;
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
    float: left;
    margin-right: 20px;
    width: 150px;
    height: 105px;
    border: 1px solid $border-color;
    cursor: pointer;
  }
  .front-cover-img img {
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
  .tag-box {
    padding: 0 15px;
    border: 1px solid $border-color;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
<style lang="scss">

</style>
