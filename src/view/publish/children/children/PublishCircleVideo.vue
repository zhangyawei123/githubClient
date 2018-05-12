<template>
  <div class="product-info-item" v-loading.fullscreen.lock="submiting" element-loading-text="正在提交中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.6)">
    <dl>
      <dt><span class="required">*</span> 视频标题：</dt>
      <dd>
        <div class="video-title">
          <el-input v-model="videoTitle" placeholder="请输入视频标题" :maxlength="80"></el-input>
          <span>{{videoTitle.length}} / 80</span>
        </div>
      </dd>
      <dt>* 视频描述：</dt>
      <dd>
        <div class="video-title">
          <el-input v-model="videoDesc" placeholder="请输入视频标题" :maxlength="80" type="textarea" :rows="3"></el-input>
          <span>{{videoDesc.length}} / 80</span>
        </div>
      </dd>
      <dt><span class="required">*</span> 海报视频：</dt>
      <dd>
        <UploadVideo ref="video1" :videoInputId="'demo1'" :videoId="videoParentId" :videoUrl="videoParentUrl" :videoCoverUrl="videoCover" @openVideoCoverPanel="openVideoCover" />
      </dd>
      <dt><span class="required">*</span> 视频标签：</dt>
      <dd>
        <div class="tag-box">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
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
      </dd>
    </dl>
    <a href="javascript:void(0)" class="save-btn" @click="submitForm">保存</a>
    <!--视频封面的弹窗-->
    <el-dialog
      :visible.sync="videoCoverDialogVisible"
      width="860px"
      class="videoCoverDialog">
      <VideoCoverPanel @sendVideoCover="getVideoCover" @closeVideoDialog="videoCoverDialogVisible=false" :systemPicList="systemPicList" />
    </el-dialog>
  </div>
</template>
<script>
  import {httpUrl} from "../../../../http_url";
  import VideoCoverPanel from '../../../common/VideoCoverPanel'
  import UploadVideo from '../../../common/UploadVideo'
  export default {
    name: 'publish-video',
    data() {
      return {
        id: '',                         //整个视频页面的id用于编辑页面修改和获取数据
        videoTitle: '',                 //视频标题
        videoDesc: '',                  //视频描述
        videoParentId: '',              //视频编辑页面传入的视频Id
        videoParentUrl: '',             //视频编辑页面传入的视频url
        videoCoverDialogVisible: false,     //视频封面弹窗
        systemPicList: [],                  //视频系统封面列表
        videoCover: '',                     //页面内选择后显示的封面
        inputVisible: false,                //下面三项为添加标签用的
        inputValue: '',
        dynamicTags: [],
        submiting: false
      }
    },
    components: {
      VideoCoverPanel,
      UploadVideo
    },
    mounted() {
      this.$nextTick(function () {
        this.checkLogIn();
        this.getVideoData();               //暂时不用编辑功能
      })
    },
    methods: {
      getVideoData() {
        this.axios.get(httpUrl + 'api/media/video/edit/index?id=398&accessToken=' + this.$cookie.get('accessToken'))
          .then(res=> {
            let _this = this;
            console.log(res.data);
            this.videoTitle = res.data.data.title;
            this.videoDesc = res.data.data.content;
            this.videoParentId = res.data.data.vid;
            this.videoCover = res.data.data;
            this.videoParentUrl = res.data.data.videoUrl;
          })
          .catch(err=>{
            alert('查询失败，将要跳回到首页');
          })
      },
      openVideoCover(data) {          //打开视频封面弹窗（由视频上传组件打开，并传入封面列表的值）
        this.videoCoverDialogVisible = true;
        this.systemPicList = data;
      },
      getVideoCover(data) {            //视频封面组件内获取选中后的封面
        this.videoCover = data;
        this.videoCoverDialogVisible = false;
      },
      /*下面三个函数为添加便签*/
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
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      submitForm() {                      //提交
        let _this =this;
        if(this.videoTitle.length < 5) {
          this.$notify({
            title: '错误',
            message: '视频标题至少5个字',
            type: 'error'
          })
          return
        }
        if((!this.$refs.video1.videoNewId)&&(!this.videoParentId)) {//如果没有返回视频并且没有上传视频
          this.$notify({
            title: '错误',
            message: '请上传一个视频',
            type: 'error'
          })
          return
        }else {
          if(!this.videoCover.pid) {
            this.$notify({
              title: '错误',
              message: '请选中一个封面',
              type: 'error'
            })
            return
          }
        }
        if(this.dynamicTags.length < 1) {
          this.$notify({
            title: '错误',
            message: '请至少添加一个视频标签',
            type: 'error'
          })
          return
        }
        let videoData= {
          accessToken: this.$cookie.get('accessToken'),
          id: this.id,
          title: this.videoTitle,
          content: this.videoDesc,
          keyWords: this.dynamicTags.join(','),
          vid: this.$refs.video1.videoNewId ||this.videoParentId,
          videoCoverPid: this.videoCover.pid
        }
        if(!this.id) {          //新增视频
          this.submiting = true;
          this.axios.post(httpUrl + 'api/media/video/add',this.qs.stringify(videoData))
            .then(res=> {
              console.log(res.data);
              if(res.data.code===1) {
                _this.submiting = false;
                _this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
              }else {
                _this.submiting = false;
                _this.$message.error(res.data.msg)
              }
            })
            .catch(err=> {
              _this.submiting = false;
              console.log(err)
            })
        }else{                        //修改视频
          this.submiting = true;
          this.axios.post(httpUrl + 'api/media/video/edit/update',this.qs.stringify(videoData))
            .then(res=> {
              console.log(res.data);
              if(res.data.code===1) {
                _this.submiting = false;
                _this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
              }else {
                _this.submiting = false;
                _this.$message.error(res.data.msg)
              }
            })
            .catch(err=> {
              _this.submiting = false;
              console.log(err)
            })
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import url(../../../../assets/css/publish.css);
  .product-info-item dt {
    line-height: 42px;
  }
  .video-title .el-input {
    width: 760px;
    height: 40px;
    line-height: 40px;
  }
  .video-title .el-textarea {
    width: 760px;
  }
  /*关联残品*/
  .configure .name {
    width: 320px;
  }
  .configure .price {
    width: 120px;
  }
  .price-value {
    color: #ff2626;
  }
  .add-btn {
    margin-top: 10px;
  }
  .save-btn {
    margin: 0 auto;
    display: block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    background: #1278ec;
    border-radius: 3px;
  }
  .tag-box {
    padding: 6px 15px;
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
