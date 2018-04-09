<template>
    <div class="login-page">
      <div class="logo_box"></div>
      <div class="login-box">
        <div class="inner">
          <div class="tel">
            <el-input v-model="telNum"></el-input>
          </div>
          <div class="password">
            <el-input v-model="password"></el-input>
          </div>
          <!--<p class="nologin">-->
            <!--<input type="checkbox">一个月内免登录-->
          <!--</p>-->
          <div class="logoin-btn">
            <el-button type="primary" @click="LogInFn">登录</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { httpUrl} from "../../http_url";

  export default {
        name: "logoin",
      data() {
          return {
            telNum: '13840144065',
            password: '123456',
        }
      },
      mounted() {

      },
      methods: {
        LogInFn() {
          this.LogIn(this.telNum,this.password);
        }
      }
    }
</script>

<style scoped>
  .login-page {
    width: 100%;
    height: 100%;
    background: url(../../assets/img/bg1.png) no-repeat;
  }
  /*登录页*/
  .logo_box {
    position: absolute;
    top: 50px;
    left: 125px;
    width: 149px;
    height: 47px;
    overflow: hidden;
    background: url(../../assets/img/xinjiyuan.png) no-repeat;
  }
  .login-box {
    position: absolute;
    width: 400px;
    border: 1px solid #e5e5e5;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -189px;
  }
  .login-box .inner {
    padding: 75px 50px 88px 50px;
  }
  .login-box .tel {
    margin-bottom: 25px;
  }
  .login-box .logoin-btn {
    margin-top: 20px;
    text-align: center;
  }
  .login-box .logoin-btn button{
    width: 100%;
  }
</style>
