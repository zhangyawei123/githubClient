<template>
  <div>
    <div class="purse-cell">
      <div class="stag-title">我的钱包</div>
      <div class="remainder">您的钱包当前余额为<span class="remainder-num">3800.00</span>元</div>
      <div class="purse-banner">
        <router-link class="recharge-btn" to="/purse/recharge">去充值</router-link>
      </div>
    </div>
    <div class="time-panel">
      <div class="time-left">
        <span>今日</span>
        <span class="selected">昨日</span>
        <span>7天</span>
        <span>30天</span>
        <span>90天</span>
      </div>
    </div>
    <div class="purse-cell">
      <div class="cash-flow">
        <div class="cash-flow-title">账户资金收入</div>
        <div class="cash-flow-sum">支付宝充值总额 <span>1000.00</span> 元；微信充值总额 <span>500.00</span> 元；</div>
        <div class="cash-flow-info">
          <table>
            <thead>
            <tr>
              <td class="cash-flow-item1">时间</td>
              <td class="cash-flow-item2">来源</td>
              <td class="cash-flow-item3">金额</td>
              <td class="cash-flow-item4">订单号</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in countInList">
              <td>{{item.time}}</td>
              <td>{{item.way}}</td>
              <td>{{item.money.toFixed(2)}}元</td>
              <td>{{item.orderNum}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="cash-flow cash-flow-out">
        <div class="cash-flow-title">账户资金转出</div>
        <div class="cash-flow-sum">咨询信息费总额 <span>1000.00</span> 元；海报流量费总额 <span>500.00</span> 元；</div>
        <div class="cash-flow-info">
          <table>
            <thead>
            <tr>
              <td class="cash-flow-item1">时间</td>
              <td class="cash-flow-item2">用途</td>
              <td class="cash-flow-item3">金额</td>
              <td class="cash-flow-item4">操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in countOutList">
              <td>{{item.time}}</td>
              <td>{{item.way}}</td>
              <td>{{item.money.toFixed(2)}}元</td>
              <td v-if="item.to === 'poster'"><router-link to="/purse/purseposter">费用明细</router-link></td>
              <td v-if="item.to === 'seek'"><router-link to="/purse/purseseek">费用明细</router-link></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "purse-body",
        data() {
          return {
            countInList: [
              {
                time: '2018年01月02日 08:27',
                way: '支付宝转入',
                money: 1000.00,
                orderNum: 216486152465
              },{
                time: '2018年01月02日 08:27',
                way: '支付宝转入',
                money: 1000.00,
                orderNum: 216486152465
              },
            ],
            countOutList: [
              {
                time: '2018年01月02日 08:27',
                way: '支付宝转入',
                money: 1000.00,
                to: 'poster'
              },{
                time: '2018年01月02日 08:27',
                way: '支付宝转入',
                money: 1000.00,
                to: 'seek'
              },
            ],
          }
        }
    }
</script>

<style scoped lang="scss">
  .stag {background: none;padding:0;}
  .purse-cell {padding: 0 40px;background: #fff;overflow:hidden;margin-bottom: 20px;}
  .stag-title {font-size: 20px;color: #333;padding-top: 30px;padding-bottom: 20px;border-bottom: 1px solid #e2e5e7; }
  .remainder { margin-top: 20px;margin-bottom: 20px; }
  .remainder-num { font-size: 28px;color: #ff2626;margin: 0 10px; }
  .purse-banner { height: 120px;background: #0f0;margin-bottom: 46px; }
  .recharge-btn {
    margin-top: 28px;
    margin-right: 38px;
    float: right;width: 90px;
    height: 36px;
    line-height: 36px;
    background-color: $primary-color;
    color: #fff;
    border-radius: 3px;
  text-align: center}
  .time-panel {padding: 0 40px;overflow: hidden;background: #FAFAFA;}
  .time-left {line-height: 48px;float: left;}
  .time-left > span {margin-right: 40px;cursor: pointer;}
  .time-left > span.selected {color: #1278ec;}
  .cash-flow {margin: 40px 0;}
  .cash-flow-title { font-size: 16px;margin-bottom: 20px; }
  .cash-flow-sum {color: #5c697e; margin-bottom: 20px;}
  .cash-flow-sum >span {color: #333;}
  .cash-flow-info table {border-top: 1px solid #e2e5e7;border-bottom: 1px solid #e2e5e7;width: 100%;table-layout: fixed;text-align: left;}
  .cash-flow-info table thead tr { line-height: 48px;}
  .cash-flow-info table tbody tr { line-height: 44px; color: #a1a8b3;}
  .cash-flow-info table td { padding-left: 10px;}
  .cash-flow-item1 { width: 300px; }
  .cash-flow-item2,.cash-flow-item3 { width: 210px; }
  .cash-flow-out tbody td a {display:block;}
  .cash-flow-out tbody tr:hover {background: #fafafa;}
  .cash-flow-out tbody tr:hover a {color: #1278ec;}
</style>
