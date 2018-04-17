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
            <tr v-for="(item,index) in bannerList">
              <td class="logo-img-url">
                <!--<VueImgInputer v-model="imageUrl1" accept="image/*" size="small" noMask customerIcon="&#xe60e;" nhe @onChange="fileChange" placeholder=""></VueImgInputer>-->
                <img :src="item.bannerPics" alt="" class="add-banner-btn" v-if="item.bannerPics" @click="changePic(index)">
                <label :for="'addBannerPic_' + index" class="add-banner-btn" v-else></label>
                <input type="file" :id="'addBannerPic_' + index" class="change-banner-btn" @change="changeBanner" style="display: none">
              </td>
              <td class="logo-name">
                <el-input v-if="item.jumpTypeName && item.bannerTitles" v-model="item.jumpTypeName + ' ：' + item.bannerTitles" readonly @focus="showBannerPanel(index)"></el-input>
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
                <span class="component-pic"><img :src="item.coverPic" alt=""></span>
                {{item.brandName}}
              </td>
              <td>{{item.brandName}}</td>
              <td>{{item.majorName}}</td>
              <td>{{item.countryName}}</td>
              <td><a class="delete" href="javascript:void(0)" @click="delItem(posterLists,index)">删除</a></td>
            </tr>
            </tbody>
          </table>
          <a href="javascript:void(0);" class="add-btn" @click="showPosterEquipmentPanel">添加</a>
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
                <span class="component-pic"><img :src="item.equipmentPic" alt=""></span>
               {{item.brandName}} {{item.modelNum}}
              </td>
              <td>{{item.brandName}}</td>
              <td>{{item.majorName}}</td>
              <td>{{item.countryName}}</td>
              <td><a class="delete" href="javascript:void(0)" @click="delItem(equipmentLists,index)">删除</a></td>
            </tr>
            </tbody>
          </table>
          <a href="javascript:void(0);" class="add-btn">添加</a>
          <div class="tips"><br>
            最多添加2条，建议选择热门海报或者重点推出的产品海报。</div>
        </dd>
      </dl>
      <div class="footer">
        <a href="javascript: void(0);" class="save-btn" @click="showbannerLIST">保存</a>
        <a href="javascript: void(0);" class="mobile-preview">手机端预览</a>
      </div>
      <AlertBanner @sendChildData="getChildData" :bannerPanelshowState.sync="bannerPanelshowState" />
      <AlertPosterEquipment ref="dmeodmoe" :posterEquipmemntshowState.sync="posterEquipmemntshowState" :posterEquipmemntUrl="posterUrl" />
      <AlertPosterEquipment ref="dmeodmoe" :posterEquipmemntshowState.sync="posterEquipmemntshowState" :posterEquipmemntUrl="equipmentUrl" />
      <!--<div style="position: fixed; top: 0;bottom: 0;left: 0;right: 0;background-color: rgba(0,0,0,.4);"></div>-->
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
            posterEquipmemntshowState: false,    //选着海报设备弹窗
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
              _this.equipmentLists = response.data.companyHome.equipments
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        changePic(index) {
          $('.change-banner-btn').eq(index).click();
        },
        changeBanner(e) {
          // console.log($(e.target).parent().parent().index());
          let _index = $(e.target).parent().parent().index();
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
              _this.bannerList[_index].bannerPics = result.list[0].url;
              _this.bannerList[_index].bannerPid = result.list[0].pid;
            },
            error:function(result){
              console.log(result);
            }
          });
        },
        addBanner() {
          this.bannerList.push({
            bannerJumpTypes:'',
            bannerOutIds:'',
            bannerPics:'',
            bannerTitles:'',
            companyBannerId:'',
            jumpTypeName:'',
            outHtml:'',
          });
        },
        delItem(list,index) {
          list.splice(index,1);
        },
        showBannerPanel(index) {
          this.bannerPanelshowState = true;
          console.log(index);
          this.changeTextIndex = index;
        },
        showPosterEquipmentPanel() {
          this.posterEquipmemntshowState = true;
          this.posterUrl= 'api/product/equipments'
          // this.$refs.dmeodmoe.getPosterDataList();
        },
        getChildData(data) {
          console.log(data);
          this.bannerList[this.changeTextIndex].jumpTypeName = data.jumpTypeName
          this.bannerList[this.changeTextIndex].bannerTitles = data.bannerTitles
        },
        showbannerLIST() {
          console.log(this.bannerList);
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
