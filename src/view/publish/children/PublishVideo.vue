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
          <UploadVideo ref="video1" :videoInputId="'demo1'" :videoId="videoParentId" :videoUrl="videoParentUrl" :videoCoverUrl="videoCover" @openVideoCoverPanel="openVideoCover" />
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
        videoParentId: '',              //视频编辑页面传入的视频Id
        videoParentUrl: '',             //视频编辑页面传入的视频url
        videoCoverDialogVisible: false,
        equipmentUrl: 'api/product/equipments',
        equipmentLists: [],
        equipmentDialogVisible: false,

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

      })
    },
    methods: {
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
