<template>
    <div>
      <div class="title">信息编辑</div>
      <dl>
        <dt>banner位：</dt>
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
            <tr>
              <td class="logo-img-url">
                <VueImgInputer v-model="imageUrl1" accept="image/*" size="small" noMask customerIcon="&#xe60e;" nhe @onChange="fileChange" placeholder=""></VueImgInputer>
              </td>
              <td class="logo-name"><el-input v-model="logoname"></el-input></td>
              <td><a href="javascript: void(0);">删除</a></td>
            </tr>
            </tbody>
          </table>
          <div class="clearfix">
            <a href="javascript:void(0);" class="add-btn">添加</a>
            <div class="tips"><br>建议轮播图尺寸为750*375px；轮播图最多添加6张。</div>
          </div>
        </dd>
        <dt>文字模块：</dt>
        <dd>
          <dl class="inner-dl">
            <dt>标题：</dt>
            <dd>
              <el-input v-model="address" :maxlength="50" placeholder="详细地址" class="input-long"></el-input><span class="limit"> {{address.length}} / 50</span>
            </dd>
            <dt>内容：</dt>
            <dd>
              <el-input v-model="address" :maxlength="50" placeholder="详细地址" class="input-long"></el-input><span class="limit"> {{address.length}} / 50</span>
            </dd>
          </dl>
        </dd>
        <dt>首页海报：</dt>
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
          <a href="javascript:void(0);" class="add-btn">添加</a>
          <div class="tips"><br>
            最多添加2条，建议选择热门海报或者重点推出的产品海报。</div>
        </dd>
        <dt>首页产品：</dt>
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
          <a href="javascript:void(0);" class="add-btn">添加</a>
          <div class="tips"><br>
            最多添加2条，建议选择热门海报或者重点推出的产品海报。</div>
        </dd>
      </dl>
      <div class="footer">
        <a href="javascript: void(0);" class="save-btn">保存</a>
        <a href="javascript: void(0);" class="mobile-preview">手机端预览</a>
      </div>
    </div>
</template>

<script>
  import VueImgInputer from 'vue-img-inputer'
    export default {
        name: "home-page-edit",
      data() {
          return {
            imageUrl1: '',
            logoname: '',
            address : '',
          }
      },
      components: {
        VueImgInputer
      },
      methods: {
        fileChange(file, name) {
          console.log(file);
        }
      }
    }
</script>

<style scoped lang="scss">
  @import url(../../assets/css/publish.css);
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
