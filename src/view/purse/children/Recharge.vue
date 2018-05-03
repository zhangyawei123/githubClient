<template>
  <div class="recharge-page">
    <div class="crumbs"><router-link to="/purse">返回上一级</router-link><i class="crumbs-icon">|</i><router-link to="/purse">我的钱包</router-link><i class="crumbs-icon">&gt;</i><span>海报流量费明细</span></div>
    <div class="banner"></div>
    <div class="cell">
      <div class="cell-title">充值金额</div>
      <div class="cell-select-box clearfix">
        <div id="5000" class="cell-item" @click="changeNum(5000)" :class="{cur: rechargeNum===5000}">5000元</div>
        <div id="10000" class="cell-item" @click="changeNum(10000)" :class="{cur: rechargeNum===10000}">10000元</div>
        <div id="20000" class="cell-item" @click="changeNum(20000)" :class="{cur: rechargeNum===20000}">20000元</div>
        <div id="50000" class="cell-item" @click="changeNum(50000)" :class="{cur: rechargeNum===50000}">50000元</div>
        <div class="cell-item">
          <el-input placeholder="自定义金额"  @keyup.native="changeNum(rechargeInput)" v-model="rechargeInput"></el-input>
        </div>
      </div>
    </div>
    <div class="cell">
      <div class="cell-title">付款方式</div>
      <div class="cell-select-box clearfix">
        <div class="cell-item" @click="payMethod='weixin'" :class="{cur: payMethod==='weixin'}">微信支付</div>
        <div class="cell-item" @click="payMethod='zhifubao'" :class="{cur: payMethod==='zhifubao'}">支付宝支付</div>
      </div>
    </div>
    <div class="total-box">
      应付金额： <span class="total-num">{{rechargeNum.toFixed(2)}}</span> 元
    </div>
    <div class="pay-btn" @click="recharge">立即支付</div>
    <div class="tips-box">
      <div class="tips-title">温馨提示</div>
      <ul class="tips-content">
        <li>1.账户中的现金，会自动根据每天的海报浏览量、咨询次数扣除相应的费用；</li>
        <li>2.如账户中有剩余，可随时转出账户现金。</li>
      </ul>
    </div>
    <form action="http://192.168.0.69:8010/xjy-web-user/api/alipay/recharge/pay" method="post" style="display: none" target="_blank">
      <input type="text" name="accessToken" v-model="accessToken">
      <input type="text" name="outTradeNo" v-model="outTradeNo">
      <input type="submit" id="rechargeBtn">
    </form>
    <el-dialog
      title="登录平台支付"
      :visible.sync="payDialogVisible"
      width="640px">
      <span>请您在新打开的页面进行支付，支付完成前请不要关闭该窗口 ！</span>
      <span slot="footer" class="dialog-footer">
        <span class="other-method">选择其它支付方式</span>
        <el-button type="primary" @click="rechargeCallback">已完成支付</el-button>
        <el-button @click="dialogVisible = false">支付遇到问题</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {httpUrl} from "../../../http_url";

  export default {
    name: "recharge",
    data() {
      return {
        accessToken: this.$cookie.get('accessToken'),
        rechargeNum: 0,
        rechargeInput: "",
        payMethod: 'weixin',
        payDialogVisible: false,
        outTradeNo: '',
      }
    },
    mounted() {
      this.checkLogIn();
    },
    methods: {
      changeNum(num) {
          let reg = /^([1-9]\d*|0)(\.\d*)?$/;
          if(!reg.test(Number(num))) {
            this.rechargeInput = '';
            this.rechargeNum = 0;
          }else {
            this.rechargeNum = Number(num);
          }
      },
      recharge() {
        this.payDialogVisible =true;
        let _this =this;
        this.axios.post(httpUrl + 'api/alipay/recharge/order',this.qs.stringify({
          totalAmount: _this.rechargeNum,
          accessToken: _this.$cookie.get('accessToken')
        }))
          .then(function (response) {
            console.log(response.data);
            _this.outTradeNo = response.data.data;
            setTimeout(function () {
              $('#rechargeBtn').trigger('click');
            },100)
          })
          .catch(function (error) {
            console.log(error)
          })

      },
      rechargeCallback() {
        this.payDialogVisible = false;
        this.$router.push({path: '/paysuccess',query: { outTradeNo: this.outTradeNo}})
      }
    }
  }
</script>

<style scoped lang="scss">
.recharge-page {
  padding: 30px 40px;
  background: #fff;
}
.crumbs {
  padding-bottom: 20px;
  border-bottom: 1px solid $border-color;
}
.crumbs a {color: #1278ec;}
.crumbs-icon { margin: 0 5px; color: #1278ec;}
  .banner {
    height: 120px;
    margin: 20px 0;
    background: #fbdfa1;
  }
  .cell {
    margin-bottom: 30px;
    overflow: hidden;
  }
  .cell-select-box {
    margin-right: -30px;
    padding-bottom: 30px;
    border-bottom: 1px solid $border-color;
  }
  .cell-title {
    font-size: 16px;
    color: $text-normal;
    margin-bottom: 20px;
  }
  .cell-item {
    position: relative;
    margin-right: 15px;
    float: left;
    width: 166px;
    height: 56px;
    line-height: 56px;
    border: 1px solid $border-color;
    text-align: center;
    cursor: pointer;
  }

  .cell-item.cur {
    border: 1px solid $primary-color;
  }
  .cell-item.cur:after {
    position: absolute;
    content: '';
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-bottom: 10px solid $primary-color;
    border-left: 10px solid transparent;
  }
  .total-box {
    margin-bottom: 40px;
    font-size: 16px;
  }
  .total-num {
    font-size: 24px;
    color: #ff2626;
  }
  .pay-btn {
    margin: 0 auto 100px;
    width: 200px;
    line-height: 48px;
    background: $primary-color;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
  }
  .tips-box {
    padding: 30px;
    background: $bg-color;
    color: $text-normal;
  }
  .tips-title {
    margin-bottom: 27px;
  }
  .tips-content li{
    margin-bottom: 22px;
  }
  .other-method {
    line-height: 38px;
    float: left;
    color: $primary-color;
  }
</style>
<style>
  .cell-item .el-input__inner {
    border: none!important;
    text-align: center;
  }
</style>
