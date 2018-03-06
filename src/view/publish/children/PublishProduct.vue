<template>
  <div>
    <div class="product-info-item">
      <dl>
        <dt>* 产品属性：</dt>
        <dd>
          <div class="tips attribute-tips">错误填写产品属性，可能会引起产品下架或搜素流量减少，影响您的产品曝光率，请认真正确填写！</div>
          <div class="product-attribute">
            <div class="main-attribute-box attribute-box">
              <div class="attribute-item">
                <span class="attribute-item-key"> 系列：</span>
                <!--<select class="attribute-item-value" name="" id=""></select>-->
                <el-select v-model="seriesValue" placeholder="请选择" class="attribute-item-value">
                  <el-option
                    v-for="item in seriesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="attribute-item">
                <span class="attribute-item-key"> 型号：</span>
                <el-select v-model="seriesValue" placeholder="请选择" class="attribute-item-value">
                  <el-option
                    v-for="item in seriesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="attribute-item">
                <span class="attribute-item-key"> * 价格：</span>
                <!--<input type="text" class="attribute-item-value">-->
                <el-input v-model="price" placeholder="请输入" :maxlength="80" class="attribute-item-value"></el-input>
              </div>
              <div class="attribute-item">
                <span class="attribute-item-key"> * * 专业：</span>
                <el-select v-model="seriesValue" placeholder="请选择" class="attribute-item-value">
                  <el-option
                    v-for="item in seriesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>

              <div class="attribute-item">
                <span class="attribute-item-key"> * 品牌：</span>
                <el-select v-model="seriesValue" placeholder="请选择" class="attribute-item-value">
                  <el-option
                    v-for="item in seriesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="attribute-item">
                <span class="attribute-item-key"> * 产地：</span>
                <el-select v-model="seriesValue" placeholder="请选择" class="attribute-item-value">
                  <el-option
                    v-for="item in seriesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <!-- 附属参数 -->
            <div class="sub-attribute-box attribute-box">
              <div class="attribute-item">
                <span class="attribute-item-key"> * 电源：</span>
                <el-input v-model="electricalSource" placeholder="请输入" :maxlength="80" class="attribute-item-value"></el-input>
              </div>
              <div class="attribute-item">
                <span class="attribute-item-key"> * 额定容量：</span>
                <el-select v-model="seriesValue" placeholder="请选择" class="attribute-item-value">
                  <el-option
                    v-for="item in seriesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="attribute-item">
                <span class="attribute-item-key"> *  最大负荷量：</span>
                <el-select v-model="seriesValue" placeholder="请选择" class="attribute-item-value">
                  <el-option
                    v-for="item in seriesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="attribute-item">
                <span class="attribute-item-key"> * 满负荷电流：</span>
                <el-select v-model="seriesValue" placeholder="请选择" class="attribute-item-value">
                  <el-option
                    v-for="item in seriesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>

              <div class="attribute-item">
                <span class="attribute-item-key"> *  截断电流：</span>
                <el-select v-model="seriesValue" placeholder="请选择" class="attribute-item-value">
                  <el-option
                    v-for="item in seriesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="attribute-item">
                <span class="attribute-item-key"> *  电气图纸版本：</span>
                <el-input v-model="blueprint" placeholder="请输入" :maxlength="80" class="attribute-item-value"></el-input>
              </div>
            </div>
          </div>
        </dd>
        <dt>* 产品图：</dt>
        <dd>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="5"
            :file-list="fileList2"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div class="tips">图片上传尺寸为750*420px，最多可上传5张。</div>
        </dd>
        <dt>* 产品封面图：</dt>
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
          <table class="component">
            <thead>
            <tr>
              <td class="name">零件</td>
              <td class="profession">行业</td>
              <td class="system">系统</td>
              <td class="operate">操作</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="name">
                <span class="component-pic"></span>
                螺母 我司大量生产汽车仪器零部件...
              </td>
              <td>电子与电气仪表</td>
              <td>全自动变速系统</td>
              <td><a class="delete" href="##">删除</a></td>
            </tr>
            <tr>
              <td class="name">
                <span class="component-pic"></span>
                螺母 我司大量生产汽车仪器零部件...
              </td>
              <td>电子与电气仪表</td>
              <td>全自动变速系统</td>
              <td><a class="delete" href="##">删除</a></td>
            </tr>
            </tbody>
          </table>
          <div class="tips"><a href="##" class="add-btn">添加</a>最多可添加零件20条。</div>
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
          <div class="tips"><a href="##" class="add-btn">添加</a>最多可添加零件20条。</div>
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
          <table class="component introduction">
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
          <div class="tips"><a href="##" class="add-btn" @click="addProductIntro">添加</a><a href="##" class="add-btn" @click="showlisy">查看</a>列表前三项为关键参数，将显示于产品介绍页，请尽可能多的填写产品性能参数。</div>
        </dd>
      </dl>
    </div>
  </div>

</template>
<script>
  const professionOptions = ['汽车', '航空航天', '工程机械', '农业机械', '纺织机械', '通用机械', '轨道交通', '通信计算机', '石油天然气', '电子与电气仪表'];
  export default {
    name: 'publish-product',
    data() {
      return {
        seriesOptions: [{
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
        seriesValue: '',        //select的值，目前只用了这一个
        price: '',              //价格
        electricalSource: '',   //电源
        blueprint: '',           //图纸版本
        fileList2: [],
        dialogImageUrl: '',
        dialogVisible: false,
        imageUrl: '',
        professions: professionOptions,
        checkedProfessions: ['航空航天'],
        showState: '1',
        ProductsIntroList: [

        ]
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
      addProductIntro() {//添加产品介绍
        this.ProductsIntroList.push({parameterKey: '',parameterValue: ''});
      },
      removeProductsIntro(index) {//删除残品信息
        this.ProductsIntroList.splice(index,1);
      },
      showlisy() {
        console.log(this.ProductsIntroList);
      }
    }
  }
</script>
<style scoped>
  @import url(../../../assets/css/publish.css);
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
  .el-checkbox {
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
