<template>
    <div>
      <div class="title">首页编辑</div>
      <dl>
        <dt>banner位：</dt>
        <dd>
          <table>
            <thead>
            <tr>
              <td class="logo-img-url">轮播图</td>
              <td class="logo-name">链接内容</td>
              <td class="operate">操作</td>
            </tr>
            </thead>
            <tbody>
            <input type="file"  class="change-banner-btn" @change="changeBanner" style="display: none">
            <tr v-for="(item,index) in bannerList">
              <td class="logo-img-url">
                <!--<VueImgInputer v-model="imageUrl1" accept="image/*" size="small" noMask customerIcon="&#xe60e;" nhe @onChange="fileChange" placeholder=""></VueImgInputer>-->
                <label @click="changePic(index)" class="add-banner-btn" v-if="!item.bannerPic"></label>
                <img :src="item.bannerPic" alt="" class="add-banner-btn" v-else @click="changePic(index)">
              </td>
              <td class="logo-name">
                <el-input v-if="item.jumpTypeName && item.bannerTitle" v-model="item.jumpTypeName + ' ：' + item.bannerTitle" readonly @focus="showBannerPanel(index)"></el-input>
                <el-input v-else readonly @focus="showBannerPanel(index)"></el-input>
              </td>
              <td><a href="javascript: void(0);" @click="delItem(bannerList,index)">删除</a></td>
            </tr>
            </tbody>
          </table>
          <div class="clearfix">
            <a href="javascript:void(0);" v-if="bannerList.length <6" @click="addBanner" class="add-btn">添加</a>
            <div class="tips"><br>建议轮播图尺寸为750*375px；轮播图最多添加6张。</div>
          </div>
        </dd>
        <dt>文字模块：</dt>
        <dd>
          <dl class="inner-dl">
            <dt>标题：</dt>
            <dd>
              <el-input v-model="notice.title" :maxlength="50" placeholder="详细地址" class="input-long"></el-input>
              <span class="limit" v-if="notice.title.length"> {{notice.title.length}} / 50</span>
            </dd>
            <dt>内容：</dt>
            <dd>
              <el-input v-model="notice.content" type="textarea" :rows="2" :maxlength="50" placeholder="详细地址" class="input-long"></el-input>
              <span class="limit" v-if="notice.content.length"> {{notice.content.length}} / 50</span>
            </dd>
          </dl>
        </dd>
        <dt>首页海报：</dt>
        <dd>
          <table class="component configure" v-if="posterLists.length">
            <thead>
            <tr>
              <td class="name">产品</td>
              <td class="profession">品牌</td>
              <td class="system">专业</td>
              <td class="location">产地</td>
              <td class="operate">操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in posterLists">
              <td class="name">
                <span class="component-pic"><img :src="item.videoCover" alt=""></span>
                {{item.brandName}}
              </td>
              <td>{{item.brandName}}</td>
              <td>{{item.majorName}}</td>
              <td>{{item.countryName}}</td>
              <td><a class="delete" href="javascript:void(0)" @click="delItem(posterLists,index)">删除</a></td>
            </tr>
            </tbody>
          </table>
          <a href="javascript:void(0);" v-if="posterLists.length<2" class="add-btn" @click="showPosterPanel">添加</a>
          <div class="tips"><br>
            最多添加2条，建议选择热门海报或者重点推出的产品海报。</div>
        </dd>
        <dt>首页产品：</dt>
        <dd>
          <table class="component configure" v-if="equipmentLists.length">
            <thead>
            <tr>
              <td class="name">产品</td>
              <td class="profession">品牌</td>
              <td class="system">专业</td>
              <td class="location">产地</td>
              <td class="operate">操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in equipmentLists">
              <td class="name">
                <span class="component-pic"><img :src="item.picUrl" alt=""></span>
               {{item.brandName}} {{item.modelNum}}
              </td>
              <td>{{item.brandName}}</td>
              <td>{{item.majorName}}</td>
              <td>{{item.countryName}}</td>
              <td><a class="delete" href="javascript:void(0)" @click="delItem(equipmentLists,index)">删除</a></td>
            </tr>
            </tbody>
          </table>
          <a href="javascript:void(0);" v-if="equipmentLists.length < 2" class="add-btn" @click="showEquipmentPanel">添加</a>
          <div class="tips"><br>
            最多添加2条，建议选择热门海报或者重点推出的产品海报。</div>
        </dd>
      </dl>
      <div class="footer">
        <a href="javascript: void(0);" class="save-btn" @click="showbannerLIST">保存</a>
        <a href="javascript: void(0);" class="mobile-preview">手机端预览</a>
      </div>
      <!--<AlertBanner @sendChildData="getChildData" :bannerPanelshowState.sync="bannerPanelshowState" />-->
      <el-dialog
        title="banner链接"
        :visible.sync="bannerDialogVisible"
        width="860px">
        <AlertBanner @sendBannerData="getBannerData" ref="BannerPanel" />
      </el-dialog>
      <el-dialog
        title="添加海报"
        :visible.sync="posterDialogVisible"
        width="860px">
        <AlertPosterEquipment ref="AlertPoster" :posterEquipmemntUrl="posterUrl" :posterLimit="2-posterLists.length" />
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addPosterData">添 加</el-button>
          <el-button @click="posterDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="添加产品"
        :visible.sync="equipmentDialogVisible"
        width="860px">
        <AlertPosterEquipment ref="AlertEquipment" :posterEquipmemntUrl="equipmentUrl" :equipmentLimit="2-equipmentLists.length" />
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addEquipmentData">添 加</el-button>
          <el-button @click="equipmentDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import {httpUrl} from "../../http_url";
  import AlertPosterEquipment from '../common/AlertPosterEquipment'
  import AlertBanner from '../common/AlertBanner'
    export default {
        name: "home-page-edit",
      data() {
          return {
            bannerPanelshowState: false,         //banner弹窗
            bannerDialogVisible: false,          //banner弹窗
            posterDialogVisible: false,          //海报弹窗
            equipmentDialogVisible: false,       //设备弹窗
            changeTextIndex: 0,                 //点击更换跳转链接文字的index
            bannerList: [],
            notice: {},
            posterLists: [],
            equipmentLists: [],
            posterUrl: 'api/product/equipment/poster/list',       //海报窗口url
            equipmentUrl: 'api/product/equipments',               //设备窗口url
          }
      },
      components: {
        AlertBanner,AlertPosterEquipment
      },
      mounted() {
        this.$nextTick(function () {
          this.getData();
        })
      },
      methods: {
        getData() {
          let _this = this;
          this.axios.get(httpUrl + '/api/company/home/edit/index?accessToken=' + _this.$cookie.get('accessToken'))
            .then(function (response) {
              console.log(response.data);
              _this.bannerList = response.data.companyHome.banners
              _this.notice = response.data.companyHome.notice
              _this.posterLists = response.data.companyHome.videos
              _this.posterLimit = 2 - response.data.companyHome.videos.length
              _this.equipmentLists = response.data.companyHome.equipments
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        changePic(index) {
          this.changeTextIndex = index;
          $('.change-banner-btn').trigger('click');
        },
        changeBanner(e) {
          // console.log($(e.target).parent().parent().index());
          // let _index = $(e.target).parent().parent().index();
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
            cache: false,
            async: false,
            contentType: false,    //不可缺
            processData: false,    //不可缺
            success:function(result){
              console.log(result);
              // 为什么需要一个触发事件才能显示图片呢
              _this.bannerList[_this.changeTextIndex].bannerPic = result.list[0].url;
              _this.bannerList[_this.changeTextIndex].bannerPid = result.list[0].pid;
            },
            error:function(result){
              console.log(result);
            }
          });
        },
        addBanner() {
          this.bannerList.push({bannerId:''});
          console.log(this.bannerList)
        },
        delItem(list,index) {
          list.splice(index,1);
        },
        showBannerPanel(index) {
          // this.bannerPanelshowState = true;
          this.bannerDialogVisible = true;
          console.log(index);
          this.changeTextIndex = index;
        },
        showPosterPanel() {
          this.posterDialogVisible = true;
        },
        showEquipmentPanel() {
          this.equipmentDialogVisible = true;
        },
        addPosterData() {                     //获取子组件海报弹窗的数据
          console.log(this.$refs.AlertPoster.ChooseList);
          this.posterLists = this.posterLists.concat(this.$refs.AlertPoster.ChooseList);
          this.posterDialogVisible = false;
        },//获取子组件海报弹窗的数据
        addEquipmentData() {                  //获取子组件产品弹窗的数据
          console.log(this.$refs.AlertEquipment.ChooseList);
          this.equipmentLists = this.equipmentLists.concat(this.$refs.AlertEquipment.ChooseList);
          this.equipmentDialogVisible = false;
        },//获取子组件产品弹窗的数据
        getBannerData(data) {                     //获取子组件banner弹窗的数据
          console.log(data);
          this.bannerList[this.changeTextIndex].jumpTypeName = data.jumpTypeName;
          this.bannerList[this.changeTextIndex].bannerTitle = data.bannerTitle;
          this.bannerList[this.changeTextIndex].bannerJumpType = data.bannerJumpType;
          this.bannerList[this.changeTextIndex].bannerOutId = data.bannerOutId;
          this.bannerList[this.changeTextIndex].outHtml = data.outHtml;
          this.bannerDialogVisible = false;
        },
        showbannerLIST() {
          // 判断海报列表有没有空缺的项
          for (let i=0;i< this.bannerList.length;i++) {
            if(!this.bannerList[i].bannerPic) {
              this.$notify.error({                               //提示错误，简单的表单验证
                title: '错误',
                message: 'banner列表第'+(i+1)+'行图片不能为空'
              });
              return false
            }else if(!this.bannerList[i].jumpTypeName || !this.bannerList[i].bannerTitle){
              this.$notify.error({                               //提示错误，简单的表单验证
                title: '错误',
                message: 'banner列表第'+(i+1)+'行链接内容不能为空'
              });
              return false
            }
          }
          var equipmentVideoIds = this.posterLists.map(function (v) {return v.vid })
          var equipmentIds = this.equipmentLists.map(function (v) {return v.eid })
          var dataObj = {
            banner: this.bannerList,
            companyHomeTitle: this.notice.title,
            companyHomeConTent: this.notice.content,
            equipmentVideoIds: equipmentVideoIds,
            equipmentIds: equipmentIds,
          };
          var dataString = JSON.stringify(dataObj);
          // console.log(this.bannerList)
          this.axios.post(httpUrl + 'api/company/home/edit/update', this.qs.stringify({
            accessToken: this.$cookie.get('accessToken'),
            data: dataString
          }))
            .then(response => {
              console.log(response.data);
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
</script>

<style scoped lang="scss">
  @import url(../../assets/css/publish.css);

  .add-banner-btn {
    display: block;
    width: 160px;
    height: 80px;
    margin-top: 20px;
    margin-bottom: -40px;
    border: 1px solid $border-color;
  }
  .tips {
    color: #a1a8b3;
  }
  .margin-tips {
    margin-top: 14px;
  }
  .limit {
    color: $text-tips;
  }
  .title {
    padding-bottom: 18px;
    border-bottom: 1px solid $border-color;
  }
  dl {
    margin-top: 30px;
  }
  dt {
    float: left;
    padding-top: 10px;
    width: 80px;
    text-align: right;
  }
  dd {
    margin-left: 92px;
    margin-bottom: 30px;
    overflow: hidden;
  }
  table {
    width: 100%;
    border: 1px solid #e3e6e9;
    table-layout: fixed;
    margin-bottom: 20px;
  }
  thead tr {
    line-height: 48px;
    background: #fafafa;
    border-bottom: 1px solid #e3e6e9;
  }
  .logo-img-url {
    width: 280px;
    padding-left: 40px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .logo-name {
    width: 430px;
    padding-right: 120px;
    box-sizing: border-box;
  }
  tbody tr {
    height: 118px;
    border-bottom: 1px solid #e3e6e9;
  }
  .img-inputer--small {
    height: 80px;
  }
  .img-inputer {
    margin-top: 18px;
    margin-bottom: -32px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
  .add-btn {
    float: left;
    /*margin-top: -20px;*/
    margin-right: 20px;
    width: 96px;
    line-height: 36px;
    text-align: center;
    color: #1278ec!important;
    border: 1px solid #e3e6e9;
    border-radius: 3px;
  }
  .inner-dl {
    margin-top: 0;
    overflow: hidden;
    padding-top: 20px;
    background: $bg-color;
  }
  .inner-dl .input-long {
    width: 650px;
  }
  .inner-dl dd {
    margin-bottom: 20px;
  }
  .footer {
    text-align: center;
  }
  .footer a {
    display: inline-block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
  .save-btn {
    margin-right: 40px;
    color: #fff;
    background: $primary-color;
  }
  .mobile-preview {
    background: #f1f2f3;
  }
</style>
<style>
  /*弹窗部分开始*/
  .el-dialog__header {
    padding: 20px 50px;
    background: #FAFAFA;
  }
  .el-dialog__headerbtn {
    right: 50px;
    line-height: 24px;
    font-size: 24px;
  }
  .el-dialog__footer {
    padding: 0 50px 20px;
  }
  .el-button {
    padding: 14px 30px;
  }
  .banner-panel {
    margin-top: -20px;
  }
  /*弹窗部分结束*/
</style>
