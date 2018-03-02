<template>
    <div>
      <div class="stag-title">消息中心</div>
      <div class="message-cell" v-for="(item,index) in lists">
        <span class="message-icon" v-bind:class="'icon-' + item.type"></span>
        <el-badge class="mark brage" :value="item.num" :max="10">
        </el-badge>
        <div class="cell-title">{{item.title}}</div>
        <div class="cell-desc">{{item.content}}</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "message-center",
        data() {
          return {
            lists: [
              {
                type: 'seek',
                title: '咨询管理',
                content: '用户【狂妄的雨】向您的海报“斗山高速切削机床加工中心...”发起了底价咨询，请您及时处理~',
                num: 1
              },
              {
                type: 'leaveword',
                title: '留言管理',
                content: '用户【工业设计高老大】向您的海报“斗山高速切削机床加工中心...”发起了底价咨询，请您及时处理~',
                num: 0
              },{
                type: 'answer',
                title: '问答管理',
                content: '用户【工业设计高老大】向您的海报“斗山高速切削机床加工中心...”发起了底价咨询，请您及时处理~',
                num: 0
              },{
                type: 'serve',
                title: '服务需求',
                content: '用户【采购老赵】向您发出了“售前服务需求”，请及时处理~',
                num: 3
              },{
                type: 'discuss',
                title: '评论',
                content: '用户【工业设计高老大】向您的海报“斗山高速切削机床加工中心...”发起了底价咨询，请您及时处理~',
                num: 66
              },{
                type: 'praise',
                title: '赞',
                content: '用户【工业设计高老大】向您的海报“斗山高速切削机床加工中心...”发起了底价咨询，请您及时处理~',
                num: 3
              },{
                type: 'systemMsg',
                title: '系统消息',
                content: '用户【工业设计高老大】向您的海报“斗山高速切削机床加工中心...”发起了底价咨询，请您及时处理~',
                num: 5
              },
            ]
          }
        }
    }
</script>

<style scoped>
  .stag-title {font-size: 20px;color: #333;padding-bottom: 30px;border-bottom: 1px solid #e2e5e7; }
  .message-cell {position: relative;padding: 20px 0 20px 68px;border-bottom: 1px solid #e2e5e7;}
  .message-icon {position: absolute;left: 0;width: 48px;height: 48px;background: url(../assets/img/zixun@2x.png);background-size: 100% 100%;}
  .icon-seek {background-image: url("../assets/img/ic_new_consult@2x.png");}
  .icon-leaveword {background-image: url("../assets/img/ic_new_message@2x.png");}
  .icon-answer {background-image: url("../assets/img/ic_new_ask@2x.png");}
  .icon-serve {background-image: url("../assets/img/ic_new_serve@2x.png");}
  .icon-discuss {background-image: url("../assets/img/ic_new_comment@2x.png");}
  .icon-praise {background-image: url("../assets/img/ic_new_praise@2x.png");}
  .icon-systemMsg {background-image: url("../assets/img/ic_new_system@2x.png");}
  .cell-title{ font-size: 16px;color: #333;margin-bottom: 14px; }
  .cell-desc { width: 720px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap; color: #a1a8b3; }
  .brage {position: absolute;right: 0;top:40px;}
</style>
<style>

</style>
