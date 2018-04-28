<template>
  <div>
    <div class="title">信息编辑</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :inline="true">
    <dl>
      <dt>* 商号名称：</dt>
      <dd>
        <el-form-item prop="name" :rules="[
      { required: true, message: '请输入商号名称', trigger: 'blur' },
      { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
    ]">
        <el-input v-model="ruleForm.name" placeholder="公司全称" class="input-long"></el-input><span class="limit"> {{ruleForm.name.length}} / 20</span>
        </el-form-item>
      </dd>
      <dt>* 商号简称：</dt>
      <dd>
        <el-form-item prop="short" :rules="[
      { required: true, message: '请输入商号简称', trigger: 'blur' },
      { max: 7, message: '简称最多七个字', trigger: 'blur' }
    ]">
        <el-input v-model="ruleForm.short" :maxlength="7" placeholder="简称最多七个字" class="input-long"></el-input><span class="limit"> {{ruleForm.short.length}} / 7</span>
        </el-form-item>
      </dd>
      <dt>* 公司logo：</dt>
      <dd>
        <div class="product-pic-box">
          <div class="product-pic-item" v-if="logoUrl">
            <img :src="logoUrl" alt="" @click="changeCover">
          </div>
          <label class="product-pic-item add-pic-btn" for="addCoverPic" v-if="!logoUrl"></label>
          <input type="file" id="addCoverPic" @change="onFileChangeCover" style="display: none">
        </div>
        <div class="tips">产品封面将会在设备列表、设备搜素等页面出现，建议上传尺寸为400*400，白色背景为宜</div>
      </dd>
      <dt>* 品牌logo：</dt>
      <dd>
        <table>
          <thead>
            <tr>
              <td class="logo-img-url">LOGO</td>
              <td class="logo-name">品牌名称</td>
              <td class="operate">操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in brandLogoList">
              <td class="logo-img-url">
                <img src="http://www.xinjiyuancps.com/xinjiyuanimg/upload/we_Media/image_list/2017.06.26/b59e7daa-0053-4d0b-824e-fe5e74f125ba.png" alt="" width="80" height="80">
              </td>
              <td class="logo-name"><el-input v-model="item.brandName" readonly></el-input></td>
              <td><a href="javascript: void(0);" @click="delBrandLogo">删除</a></td>
            </tr>
          </tbody>
        </table>
        <div class="clearfix">
          <a href="javascript:void(0);" class="add-btn" @click="logoDialogVisible=true">添加</a>
          <div class="tips">品牌logo即为该商号所经营售卖的产品品牌logo。<br>
            logo图片格式PNG、JPGE、PNG，文件尺寸为120*120px.</div>
        </div>
      </dd>
      <dt>* 主要经营：</dt>
      <dd>
        <div class="product-profession">
          <el-form-item prop="checkedProfessions" :rules="[
       { type: 'array', required: true, message: '请至少选择一个主要经营', trigger: 'change' }
    ]">
          <el-checkbox-group
            v-model="ruleForm.checkedProfessions">
            <el-checkbox v-for="profession in professions" :label="profession.id" :key="profession.id">{{profession.value}}</el-checkbox>
          </el-checkbox-group>
          </el-form-item>
          <div class="tips">该商号代理的所有产品的专业类型</div>
        </div>
      </dd>
      <dt>* 所在地区：</dt>
      <dd>
        <el-form-item prop="areaValue" :rules="[
      { required: true, message: '请选择公司所在地', trigger: 'change' }
    ]">
        <el-select v-model="ruleForm.areaValue" placeholder="公司所在地">
          <el-option
            v-for="area in areaOptions"
            :key="area.id"
            :label="area.value"
            :value="area.id">
          </el-option>
        </el-select>
        </el-form-item>
      </dd>
      <dt>* 详细地址：</dt>
      <dd>
        <el-form-item prop="address" :rules="[
      { required: true, message: '请输入详细地址', trigger: 'blur' },
      { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
    ]">
          <el-input v-model="ruleForm.address" :maxlength="50" placeholder="详细地址" class="input-long"></el-input><span class="limit"> {{ruleForm.address.length}} / 50</span>
        </el-form-item>
      </dd>
      <dt>* 商家电话：</dt>
      <dd>
        <el-form-item prop="merchantTel">
          <el-input v-model="ruleForm.merchantTel" :maxlength="12" placeholder="" class="input-long"></el-input>
        </el-form-item>
          <div class="tips margin-tips">该电话将用于接受用户电话咨询服务。</div>
      </dd>
      <dt>* 手机号：</dt>
      <dd>
        <el-form-item prop="merchantMob">
        <el-input v-model="ruleForm.merchantMob" :maxlength="11" placeholder="" class="input-long"></el-input>
        </el-form-item>
        <div class="tips margin-tips">该手机号将用于接受“低价咨询”等信息的提醒消息，请务必输入正确、有效的手机号！</div>
      </dd>
      <dt>* 绑定邮箱：</dt>
      <dd>
        <el-form-item prop="email">
        <el-input v-model="ruleForm.email" :maxlength="11" placeholder="" class="input-long"></el-input>
        </el-form-item>
        <div class="tips margin-tips">该邮箱将用于接收“底价咨询”等重要信息，请务必输入正确、有效的邮箱！</div>
      </dd>
      <dt>* 商家简介：</dt>
      <dd>
        <el-form-item prop="merchantIntro">
        <el-input
          type="textarea"
          :rows="3"
          class="input-long"
          placeholder="请输入内容"
          v-model="ruleForm.merchantIntro">
        </el-input>
        <span class="limit"> {{ruleForm.merchantIntro.length}} / 50</span>
        </el-form-item>
        <div class="tips margin-tips">请简要概括公司，该内容将显示于推荐商号、搜素商号等列表页，帮助用户快速了解公司。</div>
      </dd>
      <dt>* 商家介绍：</dt>
      <dd>这里是一个富文本编辑框</dd>
      <dt>* 宣传视频：</dt>
      <dd>
        <div class="video-upload-btn">上传视频按钮</div>
        <div class="tips">视频请勿超过100M，时间5分钟以内，建议比例为16 : 9（宽*高）</div>
      </dd>
      <dt>* 视频封面：</dt>
      <dd>
        <div class="video-upload-btn">视频封面</div>
        <div class="tips">视频封面图片尺寸750*422px，格式JPG、PNG.。</div>
      </dd>
    </dl>
    <a href="javascript:void(0);" @click="submitForm('ruleForm')" class="save-btn">保存</a>
    </el-form>
    <el-dialog
      title="添加海报"
      :visible.sync="logoDialogVisible"
      width="860px">
      <LogoPanel ref="AlertLogo" :logoUrl="brandLogoUrl" :logoLimit="5-brandLogoList.length" />
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addBrandLogoData">添 加</el-button>
          <el-button @click="logoDialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import {httpUrl} from "../../http_url";
  import LogoPanel from '../common/LogoPanel';
  import VueImgInputer from 'vue-img-inputer'
    export default {
        name: "merchant-info",
      data() {
        var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
        var isMob=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
        var checkMerchantTel = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('商家电话不能为空'));
          }
          setTimeout(() => {
              if (!(isMob.test(value)||isPhone.test(value))) {
                callback(new Error('电话号码格式不正确'));
              } else {
                callback();
              }
          }, 10);
        };
        var checkMerchantMob = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('手机号不能为空'));
          }
          setTimeout(() => {
            if (!isMob.test(value)) {
              callback(new Error('手机号格式不正确'));
            } else {
              callback();
            }
          }, 10);
        };
          return {
            ruleForm: {
              name: '',                         //商号全称
              short: '',                        //商号简介
              imageUrl: '',                     //公司logo
              checkedProfessions:[11],            //主要经营选中项
              areaValue: '',                    //公司所在地，国别
              address: '',                      //详细地址
              merchantTel: '',                  //商号电话
              merchantMob:'',                   //手机
              email: '',                        //绑定邮箱
              merchantIntro: '',                //商家简介
            },
            rules: {
              merchantTel: [
                { validator: checkMerchantTel, trigger: 'blur' }
              ],
              merchantMob: [
                { validator: checkMerchantMob, trigger: 'blur' }
              ],
              email: [
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
              ],
              merchantIntro: [
                { required: true, message: '请填写商家简介', trigger: 'blur' }
              ]
            },
            logoUrl: '',                              //公司logo
            logoDialogVisible: false,
            brandLogoUrl: 'api/company/brands',
            brandLogoList: [],                        //品牌logo
            imageUrl1: '',
            logoname: '',
            professions: [],                    //主要经营六大行业
            areaOptions: [],        //地区选择
            areaValue: '',
            address: '',
            merchantTel: '',
            merchantIntro: '',
          }
      },
      components: {
        LogoPanel
      },
      mounted() {
        this.$nextTick(function () {
          this.getDataInfo();
        })
      },
      methods: {
        getDataInfo() {
          let _this = this;
          // 六大行业多选框
          this.axios.get(httpUrl + 'api/common/codes?val=major&accessToken=' + _this.$cookie.get('accessToken'))
            .then(function (response) {
              console.log(response.data);
              _this.professions = response.data.list
            })
            .catch(function (error) {
              console.log(error)
            })
          // 地区选择下拉框
          this.axios.get(httpUrl + '/api/common/codes?val=area&accessToken='+ this.$cookie.get('accessToken'))
            .then(response => {
              console.log(response.data.list);
              this.areaOptions = response.data.list;
            })
            .catch(err => {
              console.log(err);
            });
          // 获取整体数据
          this.axios.get(httpUrl + 'api/company/info/edit/index?accessToken=' + _this.$cookie.get('accessToken'))
            .then(function (response) {
              console.log(response.data);
              _this.ruleForm.name = response.data.data.basicVO.firm
              _this.ruleForm.short = response.data.data.basicVO.firmBrief
              _this.logoUrl = response.data.data.basicVO.logoUrl
              _this.brandLogoList = response.data.data.brands
              _this.ruleForm.checkedProfessions = response.data.data.majors
              _this.ruleForm.areaValue = response.data.data.basicVO.country
              _this.ruleForm.address = response.data.data.basicVO.area
              _this.ruleForm.merchantTel = response.data.data.basicVO.servicePhone
              _this.ruleForm.merchantMob = response.data.data.basicVO.cellPhone
              _this.ruleForm.email = response.data.data.basicVO.email
              _this.ruleForm.merchantIntro = response.data.data.basicVO.introduction
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        changeCover(e) {
          e.preventDefault();
          $('#addCoverPic').trigger('click');
          return false;
        },
        onFileChangeCover(e) {
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
              _this.logoUrl = result.list[0].url;
            },
            error:function(result){
              console.log(result);
            }
          });
        },
        addBrandLogoData() {                    //添加品牌logo

        },
        delBrandLogo() {

        },

        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }
    }
</script>

<style scoped lang="scss">
  .tips {
    color: #a1a8b3;
  }
  .margin-tips {
    margin-top: 14px;
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
    /*overflow: hidden;*/
  }
  .input-long {
    width: 750px;
    margin-right: 10px;
  }
  .limit {
    color: $text-tips;
  }
  /*添加图片部分开始*/
  .product-pic-item {
    position: relative;
    margin-right: 10px;
    width: 120px;
    height: 120px;
    display: inline-block;
    border: solid 1px #e2e5e7;
  }
  .product-pic-item img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .add-pic-btn {
    background: url("../../assets/img/ic_data_duration@2x.png") no-repeat center center;
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
    width: 260px;
    padding-left: 60px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .logo-img-url img {
    vertical-align: middle;
  }
  .logo-name {
    width: 420px;
    padding-right: 120px;
    box-sizing: border-box;
  }
  tbody tr {
    height: 118px;
    line-height: 118px;
    border-bottom: 1px solid #e3e6e9;
  }
  .img-inputer--small {
    width: 80px;
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
  .product-profession {
    padding-top: 10px;
  }

  .el-checkbox {
    /*margin-bottom: 20px;*/
    margin-left: 0!important;
    width: 100px;
  }
  .el-checkbox__inner {
    width: 16px;
    height: 16px;
  }
  .el-checkbox__label {
    padding-left: 14px;
  }
  .el-checkbox__inner::after {
    height: 10px;
    left: 6px;
  }
  .video-upload-btn {
    margin-bottom: 10px;
    width: 360px;
    height: 200px;
    border: 1px solid $border-color;
  }
  .save-btn {
    margin: 0 auto;
    display: block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 3px;
    color: #fff;
    background: $primary-color;
  }
</style>
<style>
  .avatar-uploader .el-upload {
    margin-bottom: 10px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .img-inputer__preview-img {
    height: 100%!important;
  }
  .el-form--inline .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
  .el-form-item__content {
    line-height: 0;
  }
  .product-profession .el-form-item__content {
    margin-bottom: 20px!important;
  }
</style>
