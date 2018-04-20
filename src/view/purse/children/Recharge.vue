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
          <el-input placeholder="自定义金额" @focus="changeNum(0)" @keyup.native="changeNum(Number(rechargeInput))" v-model="rechargeInput"></el-input>
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
      应付金额： <span class="total-num">{{rechargeNum}}</span> 元
    </div>
    <div class="pay-btn">立即支付</div>
    <div class="tips-box">
      <div class="tips-title">温馨提示</div>
      <ul class="tips-content">
        <li>1.账户中的现金，会自动根据每天的海报浏览量、咨询次数扣除相应的费用；</li>
        <li>2.如账户中有剩余，可随时转出账户现金。</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "recharge",
    data() {
      return {
        rechargeNum: 0,
        rechargeInput: "",
        payMethod: 'weixin',
      }
    },
    methods: {
      changeNum(num) {
        this.rechargeNum = num;
      },
      changeInputNum() {
        this.rechargeNum = Number(this.rechargeInput);
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
</style>
<style>
  .cell-item .el-input__inner {
    border: none!important;
    text-align: center;
  }
</style>
