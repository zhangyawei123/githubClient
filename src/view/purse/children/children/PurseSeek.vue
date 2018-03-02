<template>
    <div class="purse-seek">
      <div class="crumbs"><router-link to="/purse">返回上一级</router-link><i class="crumbs-icon">|</i><router-link to="/purse">我的钱包</router-link><i class="crumbs-icon">&gt;</i><span>海报流量费明细</span></div>
      <div class="tips">收费标准：每播放一次，按1.00元扣费，次日结算当天的总费用。</div>
      <table>
        <thead>
        <tr>
          <td class="name">产品</td>
          <td class="product">次数</td>
          <td class="view-count">费用</td>
          <td class="cost">咨询者</td>
          <td class="publish-time">时间</td>
          <td class="oprate">订单号</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="name">
            <div class="poster-cover"></div>
            斗山 PUMA VST
          </td>
          <td>1</td>
          <td class="cost-num">366</td>
          <td>1555</td>
          <td>2016年11月16日</td>
          <td>20180452456781</td>
        </tr>
        <tr>
          <td class="name">
            <div class="poster-cover"></div>
            斗山 PUMA VST
          </td>
          <td>1</td>
          <td class="cost-num">366</td>
          <td>1555</td>
          <td>2016年11月16日</td>
          <td>20180452456781</td>
        </tr>
        <tr>
          <td class="name">
            <div class="poster-cover"></div>
            斗山 PUMA VST
          </td>
          <td>1</td>
          <td class="cost-num">366</td>
          <td>1555</td>
          <td>2016年11月16日</td>
          <td>20180452456781</td>
        </tr>
        <tr>
          <td class="name">
            <div class="poster-cover"></div>
            斗山 PUMA VST
          </td>
          <td>1</td>
          <td class="cost-num">366</td>
          <td>1555</td>
          <td>2016年11月16日</td>
          <td>20180452456781</td>
        </tr>
        <tr>
          <td class="name">
            <div class="poster-cover"></div>
            斗山 PUMA VST
          </td>
          <td>1</td>
          <td class="cost-num">366</td>
          <td>1555</td>
          <td>2016年11月16日</td>
          <td>20180452456781</td>
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
    export default {
        name: "purse-seek"
    }
</script>

<style scoped>
  @import "../../../../assets/css/product-manage.css";
  .purse-seek { padding: 30px 40px;background: #fff;}
  .crumbs a {color: #1278ec;}
  .crumbs-icon { margin: 0 5px; color: #1278ec;}
  .tips {margin-top: 30px;margin-bottom: 20px;color: #a1a8b3;}
  table thead tr { color: #a1a8b3; }
  .name { width: 320px; }
  .product { width: 60px; }
  .view-count { width: 100px; }
  .cost { width: 92px; }
  .publish-time { width: 200px; }
  .poster-cover { float: left;margin-top: 20px;margin-right: 12px;width: 55px;height: 55px;border: 1px solid #f0f0f0;background: #f00; }
  .product-cover { width: 55px;height: 55px;background: #00f; display: inline-block;vertical-align: middle;}
  .cost-num {color: #ff2626;}
</style>
