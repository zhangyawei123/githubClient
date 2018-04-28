<template>
    <div class="panel-box">
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
                @select="handleSelectionChange">
                <el-table-column
                  label="零件"
                  width="372">
                  <template slot-scope="scope">
                    <span class="existent-item-pic"><img :src="scope.row.coverPic" alt=""></span>
                    <span class="existent-item-name">{{scope.row.titleName}} {{scope.row.introduction}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="industryName"
                  label="行业"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="secondName"
                  label="系统"
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
                <td class="custom-item-name">名称</td>
                <td class="custom-item2">零件名称及描述</td>
                <td class="custom-item3">行业</td>
                <td class="custom-item4">系统</td>
                <td class="custom-item5">操作</td>
              </tr>
              </thead>
            </table>
            <div style="max-height: 372px;overflow-y: auto;border: 1px solid #e5e5e5;">
              <table class="custom-content">
                <tbody>
                <tr v-for="(custom,customIndex) in customList">
                  <td class="clearfix custom-item1">
                    <VueImgInputer v-model="custom.coverPic" accept="image/*" size="small" :maxSize="5120" noMask customerIcon="&#xe60e;" nhe @onChange="fileChange" placeholder=""></VueImgInputer>
                  </td>
                  <td class="custom-item-name">
                    <el-input v-model="custom.titleName" placeholder="名称"></el-input>
                  </td>
                  <td class="custom-item2">
                    <el-input class="custom-item-desc" v-model="custom.introduction" placeholder="描述"></el-input>
                  </td>
                  <td class="custom-item3">
                    <el-select v-model="custom.industryName" @change="clearSystemOption(customIndex)" class="custom-select" placeholder="请选择">
                      <el-option
                        v-for="item in industryOptions"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </td>
                  <td class="custom-item4">
                    <el-select v-model="custom.secondName" @focus="getSystemOptions(customIndex)" class="custom-select" placeholder="请选择">
                      <el-option
                        v-for="item in custom.systemOptions"
                        :key="item.cid"
                        :label="item.cvalue"
                        :value="item.cid">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <a class="delete-btn" @click="delCustom(customIndex)">删除</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="add-new-btn-box"><a href="javascript:void(0);" class="add-new-btn" @click="addCustom">新增</a></div>
          </el-tab-pane>
        </el-tabs>
        <div class="footer clearfix">
          若您要选择的海报或产品这里没有，请先前往“发布”板块，发布对应的内容。
          <div class="oprate-box">
            <a href="javascript:void(0);" class="add-btn" @click="addComponent">添加</a>
            <a href="javascript:void(0);" class="cancel-btn" @click="shoawdds">取消</a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  var listpingyins = {
    coverPic: '图片',
    titleName: '名称',
    introduction: '描述',
    industryName: '行业',
    secondName: '系统',
  }
  import VueImgInputer from 'vue-img-inputer'
  import { httpUrl} from "../../http_url";

  export default {
        name: "alert-panel",
        props: ['dataUrl'],
        data() {
            return {
              activeName: 'first',
              seachkey: '',
              loadingFlag: false,
              currentPage: -1,
              tableData3: [],                                 //零件列表
              multipleSelection: [],                          //table选中项
              industryOptions: [],                            //行业的下拉框
              systemOptions: [],                               //行业二级分类的下拉框（系统）
              customList: [
                // { coverPic: '',titleName: '',introduction: '',industryName: '',secondName: ''},
              ],
              customListSelection: []                         //自定义添加选中项
            }
        },
        components: {
          VueImgInputer
        },
        mounted() {
          this.$nextTick(function () {
            let _this = this;
            this.checkLogIn();
            this.getIndustry();
            this.getDataList();
            _this.$refs.multipleTable.toggleRowSelection(_this.tableData3[0],true);
            $('.el-table__body-wrapper').scroll(function () {
              if($('.el-table__body-wrapper').scrollTop() + $('.el-table__body-wrapper').height() > ($('.el-table__body').height() -10) && !_this.loadingFlag) {

                console.log(_this.multipleSelection);
                _this.getDataList();
              }
            })
          })
        },
        methods: {
          getIndustry() {
            this.axios.get(httpUrl + 'api/common/codes?val=industry&accessToken='+ this.$cookie.get('accessToken'))
              .then(response => {
                console.log(response.data.list);
                this.industryOptions = response.data.list;
              })
              .catch(err => {
                console.log(err);
              });
          },
          clearSystemOption(index) {
            this.customList[index].secondName = '';
          },
          getSystemOptions(index) {
            let _this =this;
            if(!this.customList[index].industryName) {
              this.$notify({
                title: '警告',
                message: '请先选择行业',
                type: 'warning'
              });
            }else {
              console.log(this.customList[index].industryName);
              this.axios.get(httpUrl + 'api/product/part/category?levels=2&pid='+this.customList[index].industryName+'&accessToken='+ this.$cookie.get('accessToken'),)
                .then(response => {
                  console.log(response.data);
                  // 为什么系统下拉框渲染的是上一次请求的值
                  this.customList[index].systemOptions = [];
                  this.customList[index].systemOptions = response.data.list
                })
                .catch(err => {
                  console.log(err);
                });
            }
          },
          getDataList() {
            this.loadingFlag = true;
            this.currentPage++;
            var _this = this;
            this.axios.get(httpUrl + _this.dataUrl + '?currentPage='+ _this.currentPage+'&accessToken=' + this.$cookie.get('accessToken'))
              .then(function (response) {
                // console.log(response.data);
                if(response.data.current <= response.data.pageSum) {
                  _this.tableData3 = _this.tableData3.concat(response.data.list);
                  // _this.tableData3 = response.data.list;
                  console.log(_this.multipleSelection);
                  setTimeout(function () {                                    //从新加载数据的时候显示已经选中项
                    _this.multipleSelection.forEach(row => {
                      _this.$refs.multipleTable.toggleRowSelection(row,true);
                    });
                  },10)
                  _this.loadingFlag = false;
                }else {
                  // _this.loadingFlag = true;
                }
              })
          },
          addComponent() {
            var _this = this;
            if(this.customList.length>0) {
              for(var i =0;i < this.customList.length; i++) {
                console.log(this.customList[i].coverPic);
                for (var key in this.customList[i]) {
                  if(this.customList[i][key] === '') {
                    _this.$notify.error({                               //提示错误，简单的表单验证
                      title: '错误',
                      message: '自定义添加选项第'+(i+1)+'行'+listpingyins[key]+'不能为空'
                    });
                    _this.activeName = 'second'                         //tab切换到自定义选项
                    return;
                  }
                }
                var formData = new FormData();
                formData.append('accessToken', this.$cookie.get('accessToken'));
                formData.append('imgfile', this.customList[i].coverPic);
                $.ajax({
                  url:httpUrl + 'api/common/image/upload',
                  type:'POST',
                  data:formData,
                  cache: false,
                  async: false,
                  contentType: false,    //不可缺
                  processData: false,    //不可缺
                  success:function(result){
                    console.log(result);
                    _this.customList[i].coverPic = result.list[0].url;
                  },
                  error:function(result){
                    console.log(result);
                  }
                });
              }
            }
            // this.multipleSelection = this.multipleSelection.concat(this.customList);
            console.log(this.multipleSelection);
            this.$emit('sendOutData',{'one':this.multipleSelection,'two':this.customList});
            this.customList = [];
            this.multipleSelection=[];
            this.$refs.multipleTable.clearSelection();
          },
          shoawdds() {
            console.log(this.customList);
            this.$emit('closeDialogVisible');
          },
          handleSelectionChange(val,row) {      //零件库添加
            this.multipleSelection = val;
            // console.log(this.multipleSelection.length);
            // var arr = [];
            // arr.length = this.multipleSelection.length;
            // for(let i =0;i < arr.length;i++) {
            //   arr[i] = this.multipleSelection[i].name;
            // }
            // console.log(row);
            console.log(this.multipleSelection);
          },
          addCustom() {                             //自定义添加一行数据
            this.customList.push({coverPic: '',titleName: '',introduction: '',industryName: '',secondName: ''});
            // console.log(this.customList);
          },
          delCustom(index) {                             //自定义删除一列
            this.customList.splice(index,1);
          },
          fileChange(file, name) {
            // console.log('File:', file);
            // console.log('FileName:', name);
            // console.log(file);
            console.log(URL.createObjectURL(file))
            URL.createObjectURL(file);
          }
        }
    }
</script>

<style scoped lang="scss">
  @import url(../../assets/css/alert-panel.css);
  .footer {
    margin-top: 10px;
    color: $text-tips;
  }
  .oprate-box {
    float: right;
  }
  .oprate-box a {
    display: inline-block;
    width: 96px;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    text-align: center;
  }
  .add-new-btn-box {
    background: $bg-color;
    border: 1px solid $border-color;
    border-top: none;
  }
  .add-new-btn {
    margin: 10px 0 10px 20px;
    display: inline-block;
    width: 96px;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    text-align: center;
    color: $primary-color;
    background-color: #fff;
    border: 1px solid $border-color;
  }
</style>
<style>
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
  .img-inputer__preview-img {
    height: 100%;
  }
</style>
