<template>
  <div>
    <div class="crumbs">
      <div class="crumbs-inner">
        <router-link to="/trends">返回上一级</router-link><i class="crumbs-icon">|</i><router-link to="/trends">动态管理</router-link><i class="crumbs-icon">&gt;</i><span>发布文章</span>
      </div>
    </div>
    <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入文章标题">
          <i slot="suffix">{{ruleForm.title.length}} / 30</i>
        </el-input>
      </el-form-item>
      <el-form-item label="文章内容" required>
        <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
      </el-form-item>

      <el-form-item label="频道分类" prop="channel">
        <el-radio-group v-model="ruleForm.channel">
          <el-radio label="0">新闻</el-radio>
          <el-radio label="1">公告</el-radio>
          <el-radio label="2">活动</el-radio>
          <el-radio label="3">折扣</el-radio>
          <el-radio label="4">招聘</el-radio>
          <el-radio label="5">其它</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章封面" required>
        <div class="front-cover-upload">
          <div class="front-cover-img"></div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import UE from '../../common/UE'
  export default {
    data() {
      return {
        ruleForm: {
          title: '',                  //文章标题
          channel: '',                //频道分类
        },
        defaultMsg: '<span><strong>夏钧姗：成功的投资需具备哪些心态和掌握哪些重要止损位</strong></span>',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 200
        },
        ue1: "ue1", // 不同编辑器必须不同的id
        inputVisible: false,
        inputValue: '',
        rules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          channel: [
            { required: true, message: '请选择频道分类', trigger: 'change' }
          ],
        }
      };
    },
    components: {
      UE
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
  .crumbs {
    background: #fff;}
  .crumbs-inner {
    /*margin: 0 40px;*/
    /*padding: 30px 0 20px;*/
    padding-bottom: 20px;
    border-bottom: 1px solid $border-color;
  }
  .crumbs a {color: #1278ec;}
  .crumbs-icon { margin: 0 5px; color: #1278ec;}

  .demo-ruleForm {
    background: #fff;
    padding: 40px 0;
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
