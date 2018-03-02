<template>
  <div>
    <div class="message-title">留言管理</div>
    <p class="sub-title">与用户及时、友好的互动，可以增加用户对您的关注度；您的回复还有机会直接展示在海报/产品详情页中哦。</p>
    <div class="message-cell" v-for="(item,index) in lists">
      <span class="visitor-pic"></span>
      <div class="visitor-name">{{item.name}}</div>
      <div class="visitor-message">{{item.message}}</div>
      <div class="message-to">留言了您的海报：{{item.messageto}}（关联产品：斗山PUMAVST500G）</div>
      <div class="time-reply"><span>3小时前</span><span class="reply-btn" @click="changOpen(item)">回复</span></div>
      <div class="reply-box" v-if="item.opened">
        <!--<textarea class="reply-text" name="" id="" placeholder="回复该留言" v-model="item.textarea"></textarea>-->
        <el-input
          class="reply-text"
          type="textarea"
          :rows="3"
          :maxlength="100"
          placeholder="回复该留言"
          v-model="item.textarea">
        </el-input>
        <div class="send-info">
          <span>您还可以输入{{100 - item.textarea.length}}字</span>
          <span class="send-btn" v-bind:class="{disabled: item.textarea.length===0}" @click="sendMessage(item)">发送</span>
        </div>
      </div>
      <div class="answer-box" v-if="item.answers">
        <div class="answer-item" v-for="answer in item.answers">
          <div class="answer-content">
            <span class="answer-to">上海东研(商家) &gt; {{item.name}}：</span>{{answer}}
          </div>
          <p class="answer-time">刚刚</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "leave-word-manage",
        data() {
          return {
            lists: [
              {
                'name': '周工',
                'message': '这个机型的设备，在一朋友工厂看到过，工作确实不懒。 还是比较推荐购买的！',
                'messageto': '高速立式车削卧式加工中心',
                'answers': ['很好，非常棒','dsahk']
              },
              {
                'name': '张三',
                'message': '这个机型的设备，在一朋友工厂看到过，工作确实不懒。 还是比较推荐购买的！',
                'messageto': '高速立式车削卧式加工中心',
                'answers': ['很好，非常棒','dsahk']
              }
            ]
          }
        },
        mounted: function () {
          this.$nextTick(function () {

          })
        },
      methods: {
          changOpen: function (item) {
            if (typeof item.opened == 'undefined') {
              this.$set(item,'opened',true)
            }else if (item.opened == false){
              item.opened = true;
            }else{
              item.opened = false;
            }
            if (typeof item.textarea == 'undefined') {
              this.$set(item,'textarea','')
            }
          },
          sendMessage: function (item) {
            if (item.textarea.length > 0) {
              item.opened = false;
              item.answers.push(item.textarea);
              item.textarea = '';
            }
        },
      }
    }
</script>

<style scoped>
  @import url('../assets/css/deal-manage.css');
  .el-textarea {
    margin-bottom: 10px;
  }
</style>
