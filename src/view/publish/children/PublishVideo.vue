<template>
    <div class="product-info-item">
      <dl>
        <dt>* 海报标题：</dt>
        <dd>
          <div class="video-title">
            <el-input v-model="videoTitle" placeholder="请输入视频标题" :maxlength="80"></el-input>
            <span>{{videoTitle.length}} / 80</span>
          </div>
        </dd>
        <dt>* 海报视频：</dt>
        <dd>
          <div class="video-upload-btn" @click="triggerUploadVideo"></div>
          <UploadVideo ref="video1" :videoInputId="'demo1'" :videoCoverUrl="videoCover" @openVideoCoverPanel="openVideoCover" />
        </dd>
        <dt>* 关联产品：</dt>
        <dd>
          <div v-if="linkProduct">
            <table class="component configure">
              <thead>
              <tr>
                <td class="name">产品</td>
                <td class="price">价格</td>
                <td class="profession">品牌</td>
                <td class="system">专业</td>
                <td class="location">产地</td>
                <td class="operate">操作</td>
              </tr>
              </thead>
              <tbody>
              <tr >
                <td class="name">
                  <span class="component-pic">
                    <img :src="linkProduct.picUrl" alt="">
                  </span>
                  {{linkProduct.majorName +' '+ linkProduct.modelNum}}
                </td>
                <td class="price-value">{{linkProduct.customPrice}}</td>
                <td>{{linkProduct.brandName}}</td>
                <td>{{linkProduct.majorName}}</td>
                <td>{{linkProduct.countryName || '---'}}</td>
                <td><a class="delete" @click="equipmentDialogVisible=true"  href="javascript:void(0)">编辑</a></td>
              </tr>
              </tbody>
            </table>
            <div class="tips">设备型号将显示于各视频列表，如有问题可在产品管理中修改。</div>
          </div>
          <a href="javascript:void(0)" v-if="!linkProduct" @click="equipmentDialogVisible=true" class="add-btn">添加</a>
        </dd>
      </dl>
      <a href="javascript:void(0)" class="save-btn">保存</a>
      <!--视频封面的弹窗-->
      <el-dialog
        :visible.sync="videoCoverDialogVisible"
        width="860px"
        class="videoCoverDialog">
        <VideoCoverPanel @sendVideoCover="getVideoCover" @closeVideoDialog="videoCoverDialogVisible=false" :systemPicList="systemPicList" />
      </el-dialog>
      <!--关联产品的弹唱-->
      <el-dialog
        title="添加产品"
        :visible.sync="equipmentDialogVisible"
        width="860px">
        <AlertPosterEquipment ref="AlertEquipment" :posterEquipmemntUrl="equipmentUrl" :equipmentLimit="1-equipmentLists.length" />
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addEquipmentData">添 加</el-button>
          <el-button @click="equipmentDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
  import {httpUrl} from "../../../http_url";

  import VideoCoverPanel from '../../common/VideoCoverPanel'
  import UploadVideo from '../../common/UploadVideo'
  import AlertPosterEquipment from '../../common/AlertPosterEquipment'
  export default {
    name: 'publish-video',
    data() {
      return {
        videoTitle: '',
        // percentage: 0,
        // videoId: '',
        videoCoverDialogVisible: false,
        equipmentUrl: 'api/product/equipments',
        equipmentLists: [],
        equipmentDialogVisible: false,
        activeName: 'first',
        systemPicList: [],                                        //系统封面列表
        videoCover: '',                                           //页面内选择后显示的封面
        linkProduct: null,
      }
    },
    components: {
      AlertPosterEquipment,
      VideoCoverPanel,
      UploadVideo
    },
    mounted() {
      this.checkLogIn();
      this.$nextTick(function () {
        // let _this = this;
        // let showTimeInterval = null;
        // $(".upinput").fileupload({
        //   url: httpUrl + "api/common/video/upload",//文件上传地址，当然也可以直接写在input的data-url属性内
        //   dataType: "json", //如果不指定json类型，则传来的json字符串就需要解析jQuery.parseJSON(data.result);
        //   formData:function(form){//如果需要额外添加参数可以在这里添加
        //     return [{name:"oldVideoId",value:_this.videoId || ''},
        //       {name:"accessToken",value: _this.$cookie.get('accessToken')}];
        //   },
        //   maxFileSize: 999,
        //   done:function(e,data){
        //     //done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
        //     //注意data要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
        //     //返回的数据在data.result中，这里dataType中设置的返回的数据类型为json
        //     if(data.result.code ===1) {
        //       // 上传成功：
        //       $(".feedback-icon").removeClass("success");
        //       $('.video-upload-btn').hide();
        //       $('.video-uplaoding').hide();
        //       $(".video-wrap").show();
        //       $(".video-select").show();
        //       console.log(data.result);
        //       _this.videoId = data.result.videoId;
        //       $(".feedback-text").html(data.result.msg);
        //       $(".video-wrap").html("<video controls height='200' width='360' src="+data.result.previewSrc+"></video>");
        //       // 定时查询有没有生成封面
        //       showTimeInterval = setInterval(checkVideoPic,500);
        //     } else {
        //       // 上传失败：
        //       _this.percentage = 0;
        //       $(".upstatus").html("<span style='color:red;'>"+data.result.msg+"</span>");
        //     }
        //
        //   },
        //   progressall: function (e, data) {//上传进度
        //     _this.systemPicList= [];
        //     _this.videoCover= '';
        //     _this.currentIndex= '';
        //     $('.video-upload-btn').hide();
        //     $('.video-select').hide();
        //     $(".video-wrap").hide();
        //     $('.video-uplaoding').show();
        //     var progress = parseInt(data.loaded / data.total * 100, 10);
        //     _this.percentage = progress;
        //     if(progress==1) {
        //       $(".feedback-text").text('上传成功！正在自动生成封面...');
        //     }
        //   }
        // });
        // //定时查询是否生成封面
        // function checkVideoPic(){
        //   $.ajax({
        //     type : "get",
        //     url : httpUrl+"api/common/video/cover?accessToken="+_this.$cookie.get('accessToken')+"&videoId=" + _this.videoId,
        //     // async : true,
        //     // data:{
        //     //   videoId :videoId,
        //     //   accessToken: _this.$cookie.get('accessToken')
        //     // },
        //     // dataType : 'json',
        //     success : function(result) {
        //       if(result.code == 1 && result.list.length > 0){
        //         //修改视频上传图片
        //         console.log(result)
        //         // $("#video-feedback").addClass("video-success");
        //         $(".feedback-text").text("上传成功！生成封面成功！");
        //         $(".feedback-icon").addClass("success");
        //         _this.systemPicList = result.list;
        //         //去除定时请求
        //         clearInterval(showTimeInterval);
        //       }else {
        //         // clearInterval(showTimeInterval);
        //         // alert('msg');
        //       }
        //     }
        //   });
        // }
      })
    },
    methods: {
      triggerUploadVideo() {                //触发视频上传事件
        if(true) {
          this.$refs.video1.uploadVideo();
        }else { //有视频正在处理
          alert('msg');
        }
      },
      openVideoCover(data) {
        this.systemPicList = data;
        this.videoCoverDialogVisible = true;
      },
      getVideoCover(data) {
        this.videoCover = data;
        this.videoCoverDialogVisible = false;
      },
      addEquipmentData() {
        console.log(this.$refs.AlertEquipment.ChooseList);
        this.linkProduct = this.$refs.AlertEquipment.ChooseList[0];
        this.equipmentDialogVisible = false;
      }
    }
  }
</script>
<style scoped lang="scss">
 @import url(../../../assets/css/publish.css);
 .product-info-item dt {
   line-height: 42px;
 }
 .video-title .el-input {
   width: 760px;
   height: 40px;
   line-height: 40px;
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
</style>
