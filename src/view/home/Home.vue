<template>
  <div>
      <section>
        <div class="section-title">
          <span>内容统计</span>
        </div>
        <div class="content-cell-box clearfix">
          <div class="content-cell cell-poster">
            <div class="cell-did">已发布海报</div>
            <div class="did-num"><span>12</span>条</div>
            <div class="cell-todo">发布海报<span>···</span></div>
          </div>
          <div class="content-cell cell-video">
            <div class="cell-did">已上传视频</div>
            <div class="did-num"><span>12</span>条</div>
            <div class="cell-todo">上传视频<span>···</span></div>
          </div>
          <div class="content-cell cell-product">
            <div class="cell-did">已上传产品</div>
            <div class="did-num"><span>12</span>台</div>
            <div class="cell-todo">上传产品<span>···</span></div>
          </div>
          <div class="content-cell cell-circle">
            <div class="cell-did">已发布圈子</div>
            <div class="did-num"><span>12</span>篇</div>
            <div class="cell-todo">发布圈子<span>···</span></div>
          </div>
        </div>
      </section>
      <section class="data">
        <div class="section-title">
          <span>内容统计</span>
          <a href="##" class="more-btn">更多数据</a>
        </div>
        <div class="data-cell-box clearfix">
          <div class="data-cell clearfix">
            <div class="data-cell-icon"></div>
            <div class="data-cell-title">海报播放数</div>
            <div class="data-cell-detail"><span>昨日<em>1234</em></span><span>全部<em>1234</em></span></div>
          </div>
          <div class="data-cell clearfix">
            <div class="data-cell-icon"></div>
            <div class="data-cell-title">底价咨询数</div>
            <div class="data-cell-detail"><span>昨日<em>1234</em></span><span>全部<em>1234</em></span></div>
          </div>
          <div class="data-cell clearfix">
            <div class="data-cell-icon"></div>
            <div class="data-cell-title">视频播放数</div>
            <div class="data-cell-detail"><span>昨日<em>1234</em></span><span>全部<em>1234</em></span></div>
          </div>
          <div class="data-cell clearfix">
            <div class="data-cell-icon"></div>
            <div class="data-cell-title">详情页浏览数</div>
            <div class="data-cell-detail"><span>昨日<em>1234</em></span><span>全部<em>1234</em></span></div>
          </div>
        </div>
      </section>
      <section class="message clearfix">
        <div class="section-title">
          <span>待处理消息</span>
        </div>
        <div class="message-cell">
          <span class="brage brage-leave">2</span>
          <div class="message-cell-num">967</div>
          <div class="message-cell-title">留言数</div>
        </div>
        <div class="message-cell">
          <span class="brage brage-answer">2</span>
          <div class="message-cell-num">967</div>
          <div class="message-cell-title">问答数</div>
        </div>
        <div class="message-cell">
          <span class="brage brage-seek">2</span>
          <div class="message-cell-num">967</div>
          <div class="message-cell-title">底价咨询数</div>
        </div>
        <div class="message-cell">
          <span class="brage brage-serve">2</span>
          <div class="message-cell-num">967</div>
          <div class="message-cell-title">服务需求</div>
        </div>
      </section>
      <section class="system">
        <div class="section-title">
          <span>系统消息</span>
          <a href="##" class="more-btn">查看全部</a>
        </div>
        <div class="system-cell">
          <p>您的账户于今日00:01扣除2018年01月14日海报流量费1773元。如有疑问，可电话咨询平台！</p>
          <p class="system-message-time">2018年01月15日 00:02</p>
        </div>
        <div class="system-cell">
          <p>您的账户于今日00:01扣除2018年01月14日海报流量费1773元。如有疑问，可电话咨询平台！</p>
          <p class="system-message-time">2018年01月15日 00:02</p>
        </div>
        <div class="system-cell">
          <p>您的账户于今日00:01扣除2018年01月14日海报流量费1773元。如有疑问，可电话咨询平台！</p>
          <p class="system-message-time">2018年01月15日 00:02</p>
        </div>
      </section>
      <section class="account">
        <div class="account-num">26,400</div>
        <div>当前账户余额</div>
        <a href="##" class="recharge-btn">去充值</a>
      </section>
  </div>
</template>
<script>
  export default {
   
  }
</script>
<style scoped>
   .stag { background: none;padding: 0; }
    section { padding: 30px 40px 40px; background: #fff; border-radius: 3px;margin-bottom: 15px; box-sizing: border-box;}
    .section-title {margin-bottom: 30px;}
    .section-title span{font-size: 16px;}
    .section-title .more-btn { color: #1278ec; float: right; font-size: 14px;}
    .content-cell-box {margin-right: -16px;}
    .content-cell {float: left;margin-right: 15px; width: 214px;box-sizing: border-box; border-radius: 3px;color: #fff;padding-top: 20px;overflow:hidden;}

    .cell-poster {background: #187ff5;}
    .cell-poster .cell-todo{background: #096be3;}
    .cell-video {background: #fda551;}
    .cell-video .cell-todo{background: #e3822d;}
    .cell-product {background: #ef4990;}
    .cell-product .cell-todo{background: #d62b72;}
    .cell-circle {background: #19c39c;}
    .cell-circle .cell-todo{background: #0cb087;}

    .content-cell > div {padding-left: 20px;padding-right: 20px;}
    .cell-did { margin-bottom: 20px; }
    .did-num {margin-bottom: 32px;}
    .did-num span { font-size: 24px;margin-right: 6px; }
    .cell-todo { line-height: 32px; }
    .cell-todo span {float: right;}
    .data { width: 605px; display: inline-block;}
    .data .section-title {padding-bottom: 20px;margin-bottom: 20px; border-bottom: 1px solid #e2e5e7;}
    .data-cell {width: 262px;float: left;padding: 30px 0 30px 68px;box-sizing: border-box;}
    .data-cell:hover { background: #fafafa; }
    .data-cell-icon { width: 46px; height: 46px;float: left;background: #f00;margin-left: -56px; border-radius: 50%;}
    .data-cell-title {margin-bottom: 10px;}
    .data-cell-detail span {margin-right: 20px;color: #a1a8b3;}
    .data-cell-detail span em {color: #333;margin-left: 5px;}
    .message {display: inline-block; width: 360px;float: right;padding-bottom: 30px;}
    .message-cell { width: 140px; padding: 34px 0; text-align: center; float: left;position: relative;}
    .message-cell:hover { background: #fafafa; }
    .message-cell-num { font-size: 16px; margin-bottom: 10px;}
    .message-cell-title { color: #a1a8b3; }
    .brage {position: absolute;right: 36px;top:18px;border-radius: 10px;padding:0 6px;
      line-height: 18px;font-size: 12px;color: #fff;}
    .brage-leave { background: #fda551; }
    .brage-answer { background: #187ff5; }
    .brage-seek { background: #ef4990; }
    .brage-serve { background: #19c39c; }
    .system {width: 720px; display: inline-block}
    .system .section-title { border-bottom: 1px solid #e2e5e7;padding-bottom: 20px; margin-bottom: 0;}
    .system .section-title .more-btn { color: #a1a8b3; }
    .system-cell { padding: 18px 0;border-bottom: 1px solid #e2e5e7 }
    .system-message-time { color: #a1a8b3; }
    .account {position: relative; width: 245px;float: right; text-align: center; height: 338px;box-sizing: border-box;padding-top: 90px;}
    .account-num { margin-bottom: 14px; font-size: 28px; color: #1278ec; }
    .recharge-btn { position: absolute; bottom: 22px; width: 120px; height: 36px;line-height: 36px;text-align: center; color: #1278ec; background: #fff;left: 50%;margin-left: -60px; border-radius: 3px; }
</style>