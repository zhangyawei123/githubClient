<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="文章标题" prop="title">
      <el-input v-model="ruleForm.title" placeholder="请输入文章标题">
        <i slot="suffix">{{ruleForm.title.length}} / 30</i>
      </el-input>
    </el-form-item>
    <el-form-item label="文章内容" required>
      <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
    </el-form-item>
    <el-form-item label="文章封面" prop="CoverType">
      <el-radio-group v-model="ruleForm.CoverType">
        <el-radio label="0">无图模式</el-radio>
        <el-radio label="1">单图模式</el-radio>
        <el-radio label="3">三图模式</el-radio>
      </el-radio-group>
      <div class="front-cover-upload clearfix" v-if="ruleForm.CoverType!='0'">
        <div class="front-cover-img front-cover-single" v-if="ruleForm.CoverType=='1' || ruleForm.CoverType=='3'"></div>
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
</template>
<script>
  import UE from '../../../common/UE'
  export default {
    data() {
      return {
        ruleForm: {
          title: '',                  //文章标题
          channel: '',                //频道分类
          CoverType: '0',             //文章封面
          dynamicTags: [],            //文章标签
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
          CoverType: [
            { required: true, message: '请选择封面模式', trigger: 'change' }
          ],
          channel: [
            { required: true, message: '请选择频道分类', trigger: 'change' }
          ],
          dynamicTags: [
            {type: 'array', required: true, message: '请至少添加一个标签'}
          ]
        }
      };
    },
    components: {
      UE
    },
    methods: {
      handleClose(tag) {
        this.ruleForm.dynamicTags.splice(this.ruleForm.dynamicTags.indexOf(tag), 1);
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
