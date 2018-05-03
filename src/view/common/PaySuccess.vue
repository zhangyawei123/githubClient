<template>
  <div class="body-stag">
    <div class="public-header">
      <div class="common-width clearfix">
        <div class="header-logo-box clearfix">
				<span class="header-logo">
					<img src="./../../assets/img/logo.png" alt="">
				</span>
          <span class="platform-name">鑫机缘商家管理平台</span>
        </div>
        <div class="user-info-box clearfix">
          <div class="user-name">东研贸易</div>
          <div class="user-logo">
            <img src="./../../assets/img/user-logo.png" alt="">
          </div>
          <el-badge :value="1" :max="99">
            <router-link to="/messagecenter" class="massage"></router-link>
          </el-badge>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="pay-icon-box"><span class="pay-state-icon"></span></div>
      <p :class="[payResult ? 'state-suc':'state-err','pay-state-txt']">{{payMsg}}</p>
      <p class="outTradeNo">支付单号：{{this.$route.query.outTradeNo}}</p>
      <p class="outTradeNo" v-if="payResult">充值时间：{{payOpt | formatTime}}</p>
      <div class="btn-box">
        <router-link v-if="payResult" to="/purse" class="back-btn re-pay">查看我的钱包</router-link>
        <router-link v-else to="/recharge" class="back-btn re-pay">重新支付</router-link>
        <router-link to="/" class="back-btn home">返回主页</router-link>
      </div>
    </div>
  </div>

</template>

<script>
  import {httpUrl} from "../../http_url";

  export default {
      data() {
        return {
          payResult: '',
          payMsg: '',
          payOpt: '',
        }
      },
      mounted() {
        this.$nextTick(function () {
          console.log(this.$route.query.outTradeNo);
          this.checkState();
        })
      },
      methods: {
        checkState() {
          let _this = this;
          this.axios.get(httpUrl + 'api/wxpay/recharge/order?accessToken='+ this.$cookie.get('accessToken')+'&outTradeNo=' + this.$route.query.outTradeNo)
            .then(function (response) {
              console.log(response.data);
              _this.payResult = response.data.data.payResult;
              _this.payMsg = response.data.data.payMsg;
              _this.payOpt = response.data.data.payOpt;
            })
            .catch(function (error) {
              console.log(error)
            })
          // $.ajax({
          //   url: httpUrl + 'api/wxpay/recharge/order?accessToken='+ this.$cookie.get('accessToken')+'&outTradeNo=' + this.$route.query.outTradeNo,
          //   type:'get',
          //   success: function (data) {
          //     console.log(data)
          //   }
          // })
        }
      }

    }
</script>

<style scoped lang="scss">
  .container {
    margin: 40px auto;
    width: 1200px;
    height: 560px;
    background: #fff;
    text-align: center;
    overflow: hidden;
  }
  .pay-icon-box {
    margin-top: 120px;
  }
  .pay-state-icon {
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    background: #00b7ee;
  }
  .pay-state-txt {
    margin: 30px 0;
    font-size: 20px;
  }
  .state-err {
    color: #f55156;
  }
  .state-suc {
    color: $primary-color;
  }
  .outTradeNo {
    line-height: 1.8;
  }
  .back-btn {
    margin: 0 40px;
    display: inline-block;
    width: 180px;
    line-height: 40px;

  }
  .btn-box {
    margin-top: 100px;
  }
  .re-pay {
    background: $primary-color;
    color: #fff;
  }
  .home {
    background: #f1f2f3;
    color: $primary-color;
  }

</style>
