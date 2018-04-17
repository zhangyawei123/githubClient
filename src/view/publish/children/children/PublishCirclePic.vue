<template>
  <div>
    <el-button type="primary" v-if="imgList.length">添加图片</el-button>

    <el-form v-else :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="pagelet-figure-gallery-box">
        <div class="pagelet-figure-gallery-item clearfix">
          <div class="gallery-img"><img alt="图集" src="https://p3.pstatp.com/large/pgc-image/15238687082820256f04156"></div>
          <div class="gallery-txt"><textarea placeholder="图片说明（不超过200个字）" maxlength="200"></textarea></div>
          <div class="gallery-action">
            <i class="el-icon-picture-outline gallery-icon">
            </i>
            <i class="el-icon-delete gallery-icon"></i>
            <i class="el-icon-sort gallery-icon"></i>
          </div>
        </div>
        <div class="add-btn-box">
          <a href="javascript:void(0)" class="add-btn">添加</a>
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
          <div class="front-cover-img front-cover-single"></div>
          <div class="front-cover-img front-cover-multi" v-if="ruleForm.CoverType=='3'"></div>
          <div class="front-cover-img front-cover-multi" v-if="ruleForm.CoverType=='3'"></div>
        </div>
      </el-form-item>
      <el-form-item label="频道分类" prop="channel">
        <el-radio-group v-model="ruleForm.channel">
          <el-radio label="0">现场</el-radio>
          <el-radio label="1">零件</el-radio>
          <el-radio label="2">工艺</el-radio>
          <el-radio label="3">设备</el-radio>
          <el-radio label="4">售后</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imgList: [],
        ruleForm: {
          title: '',                  //文章标题
          channel: '',                //频道分类
          CoverType: '1',             //文章封面
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
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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
    width: 120px;
    height: 120px;
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
    float: left;
    margin-right: 20px;
    width: 120px;
    height: 120px;
    border: 1px solid $border-color;
  }
</style>
