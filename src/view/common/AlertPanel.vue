<template>
    <div class="panel-box" v-if="panelShow">
      <div class="panel-header clearfix">
        <span>添加可加工零件</span>
        <a class="close-btn" v-on:click="panelClose">&times;</a>
      </div>
      <div class="panel-body">
        <el-tabs v-model="activeName">
          <el-tab-pane label="零件库添加" name="first">
            <div class="search-box clearfix">
              <el-input placeholder="请输入内容" v-model="seachkey" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <div class="existent-content">
              <el-table
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                height="375"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  label="零件"
                  width="372">
                  <template slot-scope="scope">
                    <span class="existent-item-pic"><img src="" alt=""></span>
                    <span class="existent-item-name">xisdbhadgas</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="自定义添加" name="second">
            <ul class="custom-tips">
              <li>1.零件的尺寸建议为500*500px;</li>
              <li>2.零件名称的填写格式为：名称+空格+描述，如：螺母 搞精母零件生产</li>
            </ul>
            <table class="custom-content">
              <thead>
              <tr>
                <td class="custom-item1">零件图片</td>
                <td class="custom-item2">行业</td>
                <td class="custom-item3">行业</td>
                <td class="custom-item4">系统</td>
              </tr>
              </thead>
            </table>
            <div style="max-height: 372px;overflow-y: auto;border: 1px solid #e5e5e5;margin-bottom: 20px;">
              <table class="custom-content">
                <tbody>
                <tr v-for="custom in customList">
                  <td class="clearfix custom-item1">
									<!--<span class="existent-item-pic"><img src="img/content-item-pic.png" alt="">-->
									<!--</span>-->
                    <!--<el-upload-->
                      <!--class="avatar-uploader"-->
                      <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                      <!--:show-file-list="false"-->
                      <!--:on-success="handleAvatarSuccess"-->
                      <!--:before-upload="beforeAvatarUpload">-->
                      <!--<img v-if="custom.imageUrl" :src="custom.imageUrl" class="avatar">-->
                      <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    <!--</el-upload>-->
                    <VueImgInputer v-model="custom.imageUrl" accept="image/*" size="small" noMask customerIcon="&#xe60e;" nhe @onChange="fileChange" placeholder=""></VueImgInputer>
                  </td>
                  <td class="custom-item2">
                    <!--<input type="text" class="custom-item-desc">-->
                    <el-input class="custom-item-desc"></el-input>
                  </td>
                  <td class="custom-item3">
                    <el-select v-model="custom.tradeValue" class="custom-select" placeholder="请选择">
                      <el-option
                        v-for="item in tradeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-select v-model="custom.systemValue" class="custom-select" placeholder="请选择">
                      <el-option
                        v-for="item in tradeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
  import VueImgInputer from 'vue-img-inputer'
    export default {
        name: "alert-panel",
        data() {
            return {
              panelShow: false,
              activeName: 'second',
              seachkey: '',
              tableData3: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              }],
              multipleSelection: [],
              tradeOptions: [{
                value: '选项1',
                label: '黄金糕'
              }, {
                value: '选项2',
                label: '双皮奶'
              }, {
                value: '选项3',
                label: '蚵仔煎'
              }, {
                value: '选项4',
                label: '龙须面'
              }, {
                value: '选项5',
                label: '北京烤鸭'
              }],
              customList: [
                {imageUrl: '',tradeValue: '',systemValue: ''},
                {imageUrl: '',tradeValue: '',systemValue: ''},
                {imageUrl: '',tradeValue: '',systemValue: ''}
              ]
            }
        },
        components: {
          VueImgInputer
        },
        methods: {
          panelClose(){
            this.panelShow = false;
          },
          handleSelectionChange(val) {      //零件库添加
            this.multipleSelection = val;
          },
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
            // console.log('File:', file);
            // console.log('FileName:', name);
            console.log(file);
          }
        }
    }
</script>

<style scoped>
  @import url(../../assets/css/alert-panel.css);

</style>
<style>
  /*.avatar-uploader {}*/
  /*.avatar-uploader .el-upload {*/
    /*margin-top: 10px;*/
    /*margin-bottom: -22px;*/
    /*height: 56px;*/
    /*line-height: 56px;*/
    /*border: 1px dashed #d9d9d9;*/
    /*border-radius: 6px;*/
    /*cursor: pointer;*/
    /*position: relative;*/
    /*overflow: hidden;*/
  /*}*/
  /*.avatar-uploader .el-upload:hover {*/
    /*border-color: #409EFF;*/
  /*}*/
  /*.avatar-uploader-icon {*/
    /*font-size: 14px;*/
    /*color: #8c939d;*/
    /*width: 56px;*/
    /*height: 56px;*/
    /*line-height: 56px;*/
    /*text-align: center;*/
  /*}*/
  /*.avatar {*/
    /*width: 56px;*/
    /*height: 56px;*/
    /*display: block;*/
  /*}*/
  .img-inputer {
    margin-top: 10px;
    margin-bottom: -22px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
  .img-inputer.nhe:hover {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
  .img-inputer--small {
    width: 50px!important;
    height: 50px!important;
  }
  .img-inputer__preview-box {
    background: none!important;
  }
</style>
