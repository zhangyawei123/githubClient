<template>
  <div>
    <div class="message-title">留言管理</div>
    <p class="sub-title">与用户及时、友好的互动，可以增加用户对您的关注度；您的回复还有机会直接展示在海报/产品详情页中哦。</p>
    <div class="message-cell" v-for="(item,index) in lists">
      <span class="visitor-pic"><img :src="item.basicUser.userPic" alt=""></span>
      <div class="visitor-name">{{item.basicUser.nickName}}</div>
      <div class="visitor-message">{{item.content}}</div>
      <div class="message-to">留言了您的海报：{{item.messageto}}（关联产品：斗山PUMAVST500G）</div>
      <div class="time-reply"><span>{{ 1517300103000 | formatTime}}</span><span class="reply-btn" @click="changOpen(item)">回复</span></div>
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
      <div class="answer-box" v-if="item.replys">
        <div class="answer-item" v-for="answer in item.replys">
          <div class="answer-content">
            <span class="answer-to">上海东研(商家) &gt; {{item.basicUser.nickName}}：</span>{{answer}}
          </div>
          <p class="answer-time">刚刚</p>
        </div>
      </div>
    </div>
    <div style="text-align: center;padding-top: 20px">
      <a href="##" v-if="lists.length%10 === 0 && lists.length !==0" class="load-more" @click="loadMore()">查看更多</a>
      <span class="load-all" v-else>已显示全部内容</span>
    </div>

  </div>
</template>

<script>
  import {httpUrl} from '../../http_url'
    export default {
        name: "leave-word-manage",
        data() {
          return {
            lists: [
              // {
              //   'name': '周工',
              //   'message': '这个机型的设备，在一朋友工厂看到过，工作确实不懒。 还是比较推荐购买的！',
              //   'messageto': '高速立式车削卧式加工中心',
              //   'answers': ['很好，非常棒','dsahk']
              // },
              // {
              //   'name': '张三',
              //   'message': '这个机型的设备，在一朋友工厂看到过，工作确实不懒。 还是比较推荐购买的！',
              //   'messageto': '高速立式车削卧式加工中心',
              //   'answers': ['很好，非常棒','dsahk']
              // }
            ],
            currentPage: 0
          }
        },
        mounted: function () {
          this.$nextTick(function () {
            this.getDataList();
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
          getDataList: function () {
            var _this = this;
            this.axios.get( httpUrl + 'api/product/equipment/evaluates?cid=9869&currentPage=' + this.currentPage)
              .then(function (response) {
                console.log(response.data);
                if (response.data.list.length > 0) {
                  _this.lists= _this.lists.concat(response.data.list);
                }else {

                }
              })
              .catch(function (error) {
                console.log(error);
              });
          },
          loadMore() {
            this.currentPage++;

          }
      }
    }
</script>

<style scoped lang="scss">
  @import url('../../assets/css/deal-manage.css');
  .el-textarea {
    margin-bottom: 10px;
  }
  .load-more {
    border: solid 1px $border-color;
  }
  .load-all {
    color: $text-tips;
  }
</style>
