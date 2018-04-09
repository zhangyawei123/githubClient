<template>
    <div>
      <div class="crumbs">
        <div class="crumbs-inner">
          <router-link to="/circleManage">返回上一级</router-link><i class="crumbs-icon">|</i><router-link to="/circleManage">圈子管理</router-link><i class="crumbs-icon">&gt;</i><span>详情</span>
        </div>
      </div>
      <div class="article-box">
        <div class="title">
          自动化机械做的披萨大饼，你吃过么？煮鸡蛋炒鸡蛋都是自动化
        </div>
        <div class="info-box">
          <span><span>鑫机缘</span><span class="publish-time">02-01 14:50</span></span>
          <span class="right-box">
            <span>播放 613</span>
            <i class="line-icon">|</i>
            <span>评论 21</span>
            <i class="line-icon">|</i>
            <span>收藏 9</span>
          </span>
        </div>
        <div class="content" v-html="html"></div>
        <div class="discuss-title"><span class="discuss-num">27</span>条评论</div>
        <div class="message-cell" v-for="(item,index) in lists">
          <span class="visitor-pic"></span>
          <div class="visitor-name">{{item.name}}</div>
          <div class="visitor-message">{{item.message}}</div>
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
            <div class="answer-item" v-for="(answer,index) in item.answers">
              <span class="visitor-pic"></span>
              <div class="visitor-name">{{answer.name}}</div>
              <div class="visitor-message" v-if="answer.type===1">{{answer.message}}</div>
              <div class="visitor-message" v-if="answer.type===0">{{answer.message}}//@{{answer.toName}}：{{answer.toMessage}}</div>
              <div class="time-reply"><span>{{answer.time}}</span><span class="reply-btn" @click="changOpen(answer)">回复</span></div>
              <div class="reply-box" v-if="answer.opened">
                <el-input
                  class="reply-text"
                  type="textarea"
                  :rows="3"
                  :maxlength="100"
                  placeholder="回复该留言"
                  v-model="answer.textarea">
                </el-input>
                <div class="send-info">
                  <span>您还可以输入{{100 - answer.textarea.length}}字</span>
                  <span class="send-btn" v-bind:class="{disabled: answer.textarea.length===0}" @click="sendAnswerMessage(item,answer)">发送</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "circle-article",
        data() {
          return {
            html: '<div>这里面是后台传过来的html</div>',
            lists: [
              {
                'name': '周工',
                'message': '这个机型的设备，在一朋友工厂看到过，工作确实不懒。 还是比较推荐购买的！',
                'messageto': '高速立式车削卧式加工中心',
                'answers': [
                  {'pic': '','name': '张三','message': '很好，非常棒','time' : '3小时前','type': 1},
                  {'pic': '','name': '张三','message': '很好，非常棒','time' : '3小时前','toName': '周工','toMessage': '这个机型的设备，在一朋友工厂看到过，工作确实不懒。 还是比较推荐购买的！','type': 0}
                ]
              },
              {
                'name': '张三',
                'message': '这个机型的设备，在一朋友工厂看到过，工作确实不懒。 还是比较推荐购买的！',
                'messageto': '高速立式车削卧式加工中心',
                'answers': [
                  {'pic': '','name': '张三','message': '很好，非常棒','time' : '3小时前'}
                ]
              }
            ],
          }
        },
        mounted(){
          this.$nextTick(function () {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
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
              item.answers.push({'pic': '','name': '张三','message': item.textarea,'time' : '3小时前','type': 1});
              item.textarea = '';
            }
          },
          sendAnswerMessage(item,answer) {
            if (answer.textarea.length > 0) {
              answer.opened = false;
              item.answers.push({'pic': '','name': '张三','message': answer.textarea,'time' : '3小时前','toName': answer.name,'toMessage': answer.message,'type': 0});
              answer.textarea = '';
            }
          }
        }
    }
</script>

<style scoped lang="scss">
  @import url('../../../assets/css/deal-manage.css');
  .crumbs-inner {
    margin-bottom: 30px;
    padding: 0px 0 20px;
    border-bottom: 1px solid $border-color;
  }
  .crumbs a {color: #1278ec;}
  .crumbs-icon { margin: 0 5px; color: $primary-color}
  .article-box { width: 660px;
    margin: 0 auto;}
  .title {
    margin: 17px 0;
    font-size: 30px;
    font-weight: bold;
    color: $text-normal;
  }
  .info-box{
    color: $text-tips;
  }
  .publish-time {
    margin-left: 10px;
  }
  .right-box {
    float: right;
  }
  .line-icon {
    margin: 0 20px;
  }
  .content {
    padding-top: 18px;
  }
  .discuss-title { margin-top: 60px;padding-bottom: 20px; font-size: 20px;
    border-bottom: 1px solid $border-color;}
  .discuss-num { color: $primary-color;}
  /*评论回复部分*/
  .el-textarea {
    margin-bottom: 10px;
  }
  .answer-box {
    background: none;
  }
  .answer-item {
    margin: 0;
    padding: 10px 0 0 60px;
  }
  .time-reply {
    padding-top: 0;
  }
</style>
