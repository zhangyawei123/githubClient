<template>
  <div>
    <el-form :model="productRuleForm" :rules="productRules" :inline="true" ref="ruleForm" class="demo-ruleForm">
      <el-button type="primary" @click="submitForm('ruleForm')">click me</el-button>
    <div class="product-info-item">
      <dl>
        <dt>* 产品属性：</dt>
        <dd>
          <div class="tips attribute-tips">错误填写产品属性，可能会引起产品下架或搜素流量减少，影响您的产品曝光率，请认真正确填写！</div>
          <div class="product-attribute">
            <div class="main-attribute-box attribute-box">
              <div class="attribute-item">
                <span class="attribute-item-key"> 品牌：</span>
                <el-form-item prop="brandValue">
                  <el-select v-model="productRuleForm.brandValue" placeholder="请选择" class="attribute-item-value">
                    <el-option
                      v-for="item in brandOptions"
                      :key="item.brandId"
                      :label="item.brandName"
                      :value="item.brandId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="attribute-item">
                <span class="attribute-item-key"> 专业：</span>
                <el-form-item prop="majorsValue">
                <el-select v-model="productRuleForm.majorsValue" placeholder="请选择" class="attribute-item-value" @focus="getMajors">
                  <el-option
                    v-for="item in majorsOptions"
                    :key="item.major"
                    :label="item.majorName"
                    :value="item.major">
                  </el-option>
                </el-select>
                </el-form-item>
              </div>
              <div class="attribute-item">
                <span class="attribute-item-key"> *产地：</span>
                <el-form-item prop="areaValue">
                  <el-select v-model="productRuleForm.areaValue" placeholder="请选择" class="attribute-item-value">
                    <el-option
                      v-for="item in areaOptions"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="attribute-item">
                <span class="attribute-item-key"> * 系列：</span>
                <el-form-item prop="seriesConfirmValue">
                  <el-input v-model="productRuleForm.seriesConfirmValue.value" placeholder="请选择系列" class="attribute-item-value" readonly @focus="showSeriesPanel" clearable></el-input>
                </el-form-item>
              </div>
              <div class="attribute-item">
                <span class="attribute-item-key"> * 型号：</span>
                <el-form-item prop="modelo">
                  <el-input v-model="productRuleForm.modelo" class="attribute-item-value" :maxlength="80" placeholder="请输入型号"></el-input>
                </el-form-item>
              </div>
              <div class="attribute-item">
                <span class="attribute-item-key"> * 价格：</span>
                <el-form-item prop="price">
                  <el-input v-model="productRuleForm.price" placeholder="请输入价格" :maxlength="80" class="attribute-item-value"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </dd>
        <dt><span class="require-icon">*</span>产品图：</dt>
        <dd>
          <div class="product-pic-box">
            <div class="product-pic-item" v-for="(pic,picIndex) in productFileList">
              <div class="item-mask">
                <i class="el-icon-delete" @click="delPic(picIndex,pic.pid)"></i>
              </div>
              <img :src="pic.url" alt="">
            </div>
            <label class="product-pic-item add-pic-btn" for="addPic" v-if="productFileList.length < 5"></label>
            <input type="file" id="addPic" @change="onFileChange" multiple style="display: none">
          </div>
          <div class="tips">图片上传尺寸为750*420px，最多可上传5张。</div>
        </dd>
        <dt><span class="require-icon">*</span>产品封面图：</dt>
        <dd>
          <div class="product-pic-box">
            <div class="product-pic-item" v-for="(pic) in coverFileList">
              <img :src="pic.url" alt="" @click="changeCover">
            </div>
            <label class="product-pic-item add-pic-btn" for="addCoverPic" v-if="!coverFileList.length"></label>
            <input type="file" id="addCoverPic" @change="onFileChangeCover" style="display: none">
          </div>
          <div class="tips">产品封面将会在设备列表、设备搜素等页面出现，建议上传尺寸为400*400，白色背景为宜</div>
        </dd>
        <dt>* 产品视频：</dt>
        <dd>
          <div class="video-upload-btn">上传视频按钮</div>
          <div class="tips">1.内容以展示产品为主，可主要展示产品的3至5个点；<br>2.建议视频时间在5s以内。</div>
        </dd>
        <dt>* 应用行业：</dt>
        <dd>
          <div class="product-profession">
            <el-checkbox-group
              v-model="checkedProfessions">
              <el-checkbox v-for="profession in professions" :label="profession" :key="profession">{{profession}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </dd>
        <dt>* 可加工零件：</dt>
        <dd>
          <table class="component" v-if="partsLibraryList.length || partsCustomList.length">
            <thead>
            <tr>
              <td class="name">零件</td>
              <td class="profession">行业</td>
              <td class="system">系统</td>
              <td class="operate">操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in partsLibraryList">
              <td class="name">
                <span class="component-pic">
                  <img :src="item.coverPic" alt="">
                </span>
                {{item.titleName+ ' ' + item.introduction}}
              </td>
              <td>{{item.secondName}}</td>
              <td>{{item.industryName}}</td>
              <td><a class="delete" href="javascript:void(0)">删除</a></td>
            </tr>
            <tr v-for="(item,index) in partsCustomList">
              <td class="name">
                <span class="component-pic">
                  <img :src="item.coverPic" alt="">
                </span>
                {{item.titleName+ ' ' + item.introduction}}
              </td>
              <td>{{item.secondName}}</td>
              <td>{{item.industryName}}</td>
              <td><a class="delete" href="javascript:void(0)">删除</a></td>
            </tr>
            </tbody>
          </table>
          <div class="tips"><a href="javascript:void(0)" @click="componentDialogVisible=true" class="add-btn">添加</a><br>最多可添加零件20条。</div>
        </dd>
        <dt>现场应用：</dt>
        <dd>
          <div class="video-upload-btn">上传视频按钮</div>
          <div class="tips">1.建议侧重展示设备生产零件过程；<br>2.视频请勿超过100M，时间5分钟以内，建议比例为16 : 9（宽*高）</div>
        </dd>
        <dt>* 推荐型号：</dt>
        <dd>
          <div class="state-box">
            <el-radio v-model="showState" label="1">显示</el-radio>
            <el-radio v-model="showState" label="2">隐藏</el-radio>
          </div>
          <div class="tips">如选择显示，将在设备详情页推荐同一系列的其他设备，增加同一系列其他产品的曝光率</div>
        </dd>
        <dt>* 推荐配置：</dt>
        <dd>
          <table class="component configure">
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
            <tr>
              <td class="name">
                <span class="component-pic"></span>
                螺母 我司大量生产汽车仪器零部件...
              </td>
              <td>德玛吉</td>
              <td>刀具</td>
              <td>德国</td>
              <td><a class="delete" href="##">删除</a></td>
            </tr>
            <tr>
              <td class="name">
                <span class="component-pic"></span>
                螺母 我司大量生产汽车仪器零部件...
              </td>
              <td>德玛吉</td>
              <td>刀具</td>
              <td>德国</td>
              <td><a class="delete" href="##">删除</a></td>
            </tr>
            </tbody>
          </table>
          <a href="javascript:void(0);" class="add-btn" @click="addProductIntro">添加</a>
          <div class="tips"><br>
            logo图片格式PNG、JPGE、PNG，文件尺寸为120*120px.</div>
        </dd>
      </dl>
    </div>
    <div class="product-info-item">
      <dl>
        <dt>* 产品介绍：</dt>
        <dd></dd>
      </dl>
    </div>
    <div class="product-info-item">
      <dl>
        <dt>* 产品介绍：</dt>
        <dd>
          <table class="component introduction" v-if="ProductsIntroList.length > 0">
            <thead>
            <tr>
              <td class="name">参数名称</td>
              <td class="profession">参数值</td>
              <td class="operate">操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(ProductsIntro,index) in ProductsIntroList">
              <td class="name">
                <input type="text" v-model="ProductsIntro.parameterKey">
              </td>
              <td><input type="text" v-model="ProductsIntro.parameterValue"></td>
              <td><a class="delete" href="##" @click="removeProductsIntro(index)">删除</a></td>
            </tr>
            </tbody>
          </table>
            <a href="javascript:void(0);" class="add-btn" @click="addProductIntro">添加</a>
            <div class="tips">品牌logo即为该商号所经营售卖的产品品牌logo。<br>
              logo图片格式PNG、JPGE、PNG，文件尺寸为120*120px.</div>
        </dd>
      </dl>
    </div>
    </el-form>
    <!--系列的弹出框-->
    <div class="seriesPanel" v-if="seriesPanelState">
      <div class="panel-header">
        <span>添加系列</span>
        <a href="javascript:void(0)" class="close-btn" @click="seriesPanelState=false">&times;</a>
      </div>
      <div class="panel-body">
        <div class="series-wrapper">
          <div class="series-box">
            <el-radio-group v-model="seriesValue">
            <ul>
              <li class="series-item" v-for="(series,eriesIndex) in seriesOptions"><el-radio :label="series.sid">{{series.name}}</el-radio><a class="delete-series-btn" href="javascript:void(0)" @click="deleteSeries(series.sid,eriesIndex)">&times;</a></li>
            </ul>
            </el-radio-group>
          </div>
          <div class="add-series-box">
            <input class="add-series-input" v-on:keyup.enter="addSeriesFn" v-model="addSeriesName" placeholder="输入系列名，15字符以内，按回车以生成系列名称" />
          </div>
        </div>
        <div class="footer clearfix">
          <span class="warning-tips">该系列名称正在被使用，请更换后再删除！</span>
          <div class="oprate-box">
            <a href="javascript:void(0);" class="add-btn" v-on:click="showseriesValue">确定</a>
            <a href="javascript:void(0);" class="cancel-btn" @click="seriesPanelState=false">取消</a>
          </div>
        </div>
      </div>
    </div>
    <!--零件的弹出框-->
    <el-dialog
      title="添加可加工零件"
      :visible.sync="componentDialogVisible"
      width="860px">
      <AlertPanel :dataUrl="componentUrl" ref="componentDialog" @sendOutData="componentDialogData" @closeDialogVisible="componentDialogVisible=false" />
    </el-dialog>
  </div>

</template>
<script>
  import { httpUrl} from "../../../http_url";
  import AlertPanel from '../../common/AlertPanel'
  const professionOptions = ['汽车', '航空航天', '工程机械', '农业机械', '纺织机械', '通用机械', '轨道交通', '通信计算机', '石油天然气', '电子与电气仪表'];
  export default {
    name: 'publish-product',
    data() {
      return {
        productRuleForm:{
          brandValue: '',          //品牌的值
          majorsValue: '',         //专业的值
          areaValue: '',           //产地
          seriesConfirmValue: {},     //产品系列弹出框选中确认关闭的时候的值
          modelo: '',         // 型号
          price: '',            // 价格
        },
        productRules: {
          brandValue: [
            { required: true, message: '请选择品牌', trigger: 'change' }
          ],
          majorsValue: [
            { required: true, message: '请选择专业', trigger: 'change' }
          ],
          seriesConfirmValue: [
            { required: true, message: '请选择系列', trigger: 'blur' }
          ],
          areaValue: [
            { required: true, message: '请选择产地', trigger: 'change' }
          ],
          modelo: [
            { required: true, message: '请输入型号', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' }
          ]
        },

        brandOptions: [],       //品牌的下拉选项
        majorsOptions:[],       //专业的下拉选项
        areaOptions: [],        //产地下拉框
        seriesPanelState: false, //系列弹窗的显示影藏状态
        addSeriesName: '', //系列弹窗的增加系列的输入框的值
        seriesOptions: [],      //系列弹窗列表
        seriesValue: '',        //产品系列弹出框的选中值
        price: '',              //价格
        productFileList: [],    //产品图的图片数组
        coverFileList: [],      //产品封面图的图片数组
        // dialogImageUrl: '',
        // dialogVisible: false,
        // imageUrl: '',
        professions: professionOptions,
        checkedProfessions: ['航空航天'],        //应用行业
        componentDialogVisible:false,           //添加零件弹窗
        componentUrl: 'api/product/equipment/parts',
        partsLibraryList: [],                   //零件库选择的零件
        partsCustomList: [],                    //自定义添加的零件
        showState: '1',                         //推荐型号显示隐藏
        ProductsIntroList: [],                  //产品介绍
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.checkLogIn();
        this.getbrands();
        this.getAreas();

      })
    },
    components: {
      AlertPanel
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
      getbrands(){         //获取品牌的下拉框数据
        this.axios.get(httpUrl + 'api/company/brands?accessToken='+ this.$cookie.get('accessToken'))
          .then(response => {
            console.log(response.data.list);
            this.brandOptions = response.data.list;
          })
          .catch(err => {
            console.log(err);
          });
      },//获取品牌的下拉框数据
      getMajors(){        //根据品牌获取专业的下拉框数据
        if(!this.productRuleForm.brandValue) {
          this.$notify({
            title: '警告',
            message: '请先选择品牌',
            type: 'warning'
          });
        }else {
          this.axios.get(httpUrl + 'api/company/brand/majors?brandId='+this.productRuleForm.brandValue+'&accessToken='+ this.$cookie.get('accessToken'),)
            .then(response => {
              console.log(response.data);
              this.majorsOptions = response.data.list
            })
            .catch(err => {
              console.log(err);
            });
        }
      },//根据品牌获取专业的下拉框数据

      showSeriesPanel(){                //打开系列面板，获取数据
        this.seriesPanelState = true;
        this.axios.get(httpUrl + 'api/product/serieses?accessToken='+ this.$cookie.get('accessToken'))
          .then(response => {
              console.log(response.data);
              this.seriesOptions = response.data.list;
          })
          .catch(err => {

          })
      }, //打开系列面板，获取数据
      addSeriesFn(){                    //输入框添加系列的值
        this.axios.post(httpUrl + 'api/product/series/add', this.qs.stringify({
          accessToken: this.$cookie.get('accessToken'),
          name: this.addSeriesName
        }))
          .then(response => {
            console.log(response.data);
            this.seriesOptions.push({name: this.addSeriesName,sid: response.data.sid});
            this.addSeriesName = '';
          })
          .catch(err => {
            console.log(err);
          });
      },//输入框添加系列的值
      deleteSeries(sid,index){                   //删除系列
        this.axios.post(httpUrl + 'api/product/series/del', this.qs.stringify({
          accessToken: this.$cookie.get('accessToken'),
          sid: sid
        }))
          .then(response => {
            if(response.data.code === 10050003) {
              this.$message({
                message: '该系列名称正在被使用，请更换后再删除！',
                type: 'warning'
              });
            }else {
              console.log(response.data);
              this.$message({
                message: response.data.msg,
                type: 'success'
              });
              this.seriesOptions.splice(index,1);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }, //删除系列
      showseriesValue() {                               //把系列弹窗选中的值回显到页面内
        console.log(this.seriesValue);
        for (let i=0;i < this.seriesOptions.length;i++){
          if(this.seriesOptions[i].sid == this.seriesValue) {
            this.productRuleForm.seriesConfirmValue = { sid: this.seriesOptions,value: this.seriesOptions[i].name};
            this.seriesPanelState = false;
          }
        }
      },//把系列弹窗选中的值回显到页面内
      getAreas(){                                         //获取地区选择
        this.axios.get(httpUrl + '/api/common/codes?val=area&accessToken='+ this.$cookie.get('accessToken'))
          .then(response => {
            console.log(response.data.list);
            this.areaOptions = response.data.list;
          })
          .catch(err => {
            console.log(err);
          });
      },//获取地区选择
      onFileChange(e) {    //产品图上传多图
        var _this = this;
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        if(files.length + _this.productFileList.length>5) {
          this.$notify({
            title: '警告',
            message: '文件个数不能超过5个',
            type: 'warning'
          });
          return
        }
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
          contentType: false,    //不可缺
          processData: false,    //不可缺
          success:function(result){
            console.log(result);
            _this.productFileList = _this.productFileList.concat(result.list);
          },
          error:function(result){
            console.log(result);
          }
        });
      }, //产品图上传多图
      delPic(index,pid) {   //删除图片
        var _this = this;
        $.ajax({
          url:httpUrl + 'api/common/image/del',
          type:'POST',
          data:{
            pid:pid,
            accessToken: _this.$cookie.get('accessToken')
          },
          success:function(result){
            _this.$message({
              type: 'success',
              message: result.msg
            });
            _this.productFileList.splice(index,1);
          },
          error:function(result){
            console.log(result);
          }
        });
      },//删除图片
      changeCover(e) {
        e.preventDefault();
        $('#addCoverPic').trigger('click');
        return false;
      },
      onFileChangeCover(e) {  //产品封面图上传
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
          contentType: false,    //不可缺
          processData: false,    //不可缺
          success:function(result){
            console.log(result);
            _this.coverFileList = result.list;
          },
          error:function(result){
            console.log(result);
          }
        });
      },//产品封面图上传
      componentDialogData(data) {                 //取零件弹窗子组件的值
        console.log(data)
        this.partsLibraryList = this.partsLibraryList.concat(data.one);
        this.partsCustomList = this.partsCustomList.concat(data.two);
        this.componentDialogVisible = false
      },
      addProductIntro() {//添加产品介绍
        this.ProductsIntroList.push({parameterKey: '',parameterValue: ''});
      },//添加产品介绍
      removeProductsIntro(index) {//删除产品信息
        this.ProductsIntroList.splice(index,1);
      },
      showlisy() {
        console.log(this.ProductsIntroList);
      },

    }
  }
</script>
<style scoped>
  @import url(../../../assets/css/publish.css);
  /*添加图片部分开始*/
  .product-pic-item {
    position: relative;
    margin-right: 10px;
    width: 120px;
    height: 120px;
    display: inline-block;
    border: solid 1px #e2e5e7;
  }
  .item-mask {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 120px;
    font-size: 24px;
    text-align: center;
    background: rgba(0,0,0,.5);
    transition: opacity .3s;
  }
  .item-mask i {
    color: #fff;
    cursor: pointer;
  }
  .product-pic-item:hover .item-mask {
    opacity: 1;
  }
  .product-pic-item img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .add-pic-btn {
    background: url("../../../assets/img/ic_data_duration@2x.png") no-repeat center center;
  }
  /*添加图片部分结束*/
  .el-radio-group {
    display: block;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .seriesPanel {
    position: fixed;
    width: 640px;
    height: 580px;
    top: 100px;
    left: 50%;
    margin-left: -320px;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, .3);
  }
  .panel-header {
    padding: 0 50px;
    height: 60px;
    line-height: 60px;
    background: #fafafa;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: bold;
  }
  .close-btn {
    float: right;
    font-size: 30px;
    font-weight: normal;
    color: #888;
  }
  .panel-body {
    padding: 20px 50px;
  }
  .series-wrapper {
    margin-bottom: 10px;
    border: 1px solid #e5e5e5;
  }
  .series-box {
    height: 364px;
    border-radius: 3px;
    overflow: auto;
  }
  .add-series-box {
    height: 56px;
    padding: 10px 30px;
    box-sizing: border-box;
    background: #fafafa;
  }
  .series-item {
    line-height: 48px;
    padding: 0 30px;
  }
  .series-item:hover {
    background: #fafafa;
  }
  .delete-series-btn {
    display: none;
    float: right;
    margin-top: 16px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    overflow: hidden;
    background: #c8c8c8;
    color: #fff;
  }
  .series-item:hover .delete-series-btn {
    display: inherit;
  }
  .add-series-input {
    width: 100%;
    height: 100%;
    border: 1px solid #e5e5e5;
    padding: 0 10px;
    box-sizing: border-box;
    border-radius: 3px;
  }
  .oprate-box {
    float: right;
  }
  .oprate-box > a {
    display: inline-block;
    width: 96px;
    height: 40px;
    line-height: 40px;
    border-radius: 6px;
    text-align: center;
  }
  .cancel-btn {
    background: #fafafa;
  }
  .seriesPanel .add-btn {
    background: #1278ec;
    color: #fff;
  }
  .warning-tips {
    color: #ff2626;
  }
</style>
<style>
  .el-upload--picture-card {
    margin-bottom: 8px;
    width: 120px;
    height: 120px;
    line-height: 120px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 120px;
    height: 120px;
  }
  .avatar-uploader .el-upload {
    margin-bottom: 10px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
    width: 120px!important;
    height: 120px!important;
    display: block;
  }
  /*多选框部分*/
  .product-profession {
    padding-right: 50px;
  }
  .product-profession .el-checkbox {
    margin-bottom: 20px;
    margin-left: 0!important;
    width: 128px;
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
</style>
