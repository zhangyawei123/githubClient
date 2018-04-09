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
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
                <VueImgInputer v-model="item.logoPic" accept="image/*" size="small" noMask customerIcon="&#xe60e;" nhe @onChange="fileChange" placeholder=""></VueImgInputer>
              </td>
              <td class="logo-name"><el-input v-model="item.name"></el-input></td>
              <td><a href="javascript: void(0);">删除</a></td>
            </tr>
          </tbody>
        </table>
        <div class="clearfix">
          <a href="javascript:void(0);" class="add-btn">添加</a>
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
            <el-checkbox v-for="profession in professions" :label="profession" :key="profession">{{profession}}</el-checkbox>
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
            :key="area.value"
            :label="area.label"
            :value="area.value">
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
  </div>
</template>

<script>
  import VueImgInputer from 'vue-img-inputer'
  const professionOptions = ['机床', '刀具', '夹具', '工具', '量具', '自动化'];
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
              name: '',
              short: '',
              imageUrl: '',
              checkedProfessions:[],
              areaValue: '',
              address: '',
              merchantTel: '',
              merchantMob:'',
              email: '',
              merchantIntro: '',
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
            name: '',
            short: '',
            imageUrl: '',
            brandLogoList: [
              { logoPic: '',name: ''},
            ],
            imageUrl1: '',
            logoname: '',
            professions: professionOptions,
            checkedProfessions: [],
            areaOptions: [
              {
              value: '选项1',
              label: '欧洲'
            }, {
              value: '选项2',
              label: '上海'
            }, {
              value: '选项3',
              label: '美国'
            }, {
              value: '选项4',
              label: '韩国'
            }, {
              value: '选项5',
              label: '东北'
            }
            ],        //地区选择
            areaValue: '',
            address: '',
            merchantTel: '',
            merchantIntro: '',
          }
      },
      components: {
        VueImgInputer
      },
      methods: {
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        fileChange(file, name) {
          console.log(file);
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
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
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
  .logo-name {
    width: 420px;
    padding-right: 120px;
    box-sizing: border-box;
  }
  tbody tr {
    height: 118px;
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
