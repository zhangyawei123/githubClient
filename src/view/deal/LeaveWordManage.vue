<template>
  <div>
    <div class="message-title">留言管理</div>
    <p class="sub-title">与用户及时、友好的互动，可以增加用户对您的关注度；您的回复还有机会直接展示在海报/产品详情页中哦。</p>
    <div class="message-cell" v-for="(item,index) in lists">
      <span class="visitor-pic"><img :src="item.basicUser.userPic" alt=""></span>
      <div class="visitor-name">{{item.basicUser.nickName}}</div>
      <div class="visitor-message">{{item.content}}</div>
      <div class="message-to">留言了您的海报：{{item.messageto}}（关联产品：斗山PUMAVST500G）</div>
      <div class="time-reply"><span>{{ item.dateTime | formatTime}}</span><span class="reply-btn" @click="changOpen(item)">{{item.opened ? '收起': '回复'}}</span></div>
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
        <div class="answer-item" v-for="(answer,answerIndex) in item.replys">
          <!--个人对商家-->
          <div v-if="answer.isSelf ===0">
            <div class="answer-content">
              <span class="answer-to">{{item.basicUser.nickName}} &gt; {{item.companyUser.firm}}：</span>{{answer.content}}
            </div>
            <p class="answer-time">{{answer.dateTime | formatTime}}  <a href="javascript:void(0)" @click="changOpen(answer)">{{answer.opened ? '收起': '回复'}}</a></p>
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
          <!--商家回复个人-->
          <div v-else>
            <div class="answer-content">
              <span class="answer-to">{{item.companyUser.firm}} &gt; {{item.basicUser.nickName}}：</span>{{answer.content}}
            </div>
            <p class="answer-time">{{answer.dateTime | formatTime}}  <a href="javascript:void(0)" @click="deleteAnswer(item,answerIndex,answer.rid)">删除</a></p>
          </div>
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
            lists: [],
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
          sendMessage: function (item) {                        //回复第一条回复
            var _this = this;
            if (item.textarea.length > 0) {
              item.opened = false;
              item.replys.unshift({
                "content": item.textarea,
                "dateTime": new Date().getTime(),
              });
              this.axios.post(httpUrl + 'api/product/equipment/reply', this.qs.stringify({ // 回复的回复传数据
                eid: item.eid,
                accessToken: _this.$cookie.get('accessToken'),
                content: item.textarea,
                replyUserId: item.replyUserId,
                parentId: 0,
              }))
                .then(function (response) {
                  console.log(response);
                  item.textarea = '';
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
        },
          getDataList: function () {
            var _this = this;
            _this.axios.get( httpUrl + 'api/product/equipment/evaluates?accessToken='+_this.$cookie.get('accessToken')+'&currentPage=' + _this.currentPage)
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
            // $.ajax({
            //   url: httpUrl + 'api/product/equipment/evaluates?accessToken='+this.$cookie.get('accessToken')+'&currentPage=' + this.currentPage,
            //   type: 'get',
            //   success: function (data) {
            //     console.log(data);
            //   }
            // })
          },
          sendAnswerMessage(item,answer) {                       //回复回答列表中的回复
            var _this = this;
            if (answer.textarea.length > 0) {
              answer.opened = false;
              item.replys.unshift({
                "basicUser": {
                  "firm": item.companyUser.firm,
                },
                "replyUser": {
                  "nickName": item.basicUser.nickName,
                },
                "content":answer.textarea ,
                'isSelf': 1,
                'dateTime': new Date()
              });
              this.axios.post(httpUrl + 'api/product/equipment/reply', this.qs.stringify({ // 回复的回复传数据
                eid: answer.eid,
                accessToken: _this.$cookie.get('accessToken'),
                content: answer.textarea,
                replyUserId: answer.replyUserId,
                parentId: answer.parentId,
              }))
                .then(function (response) {
                  console.log(response);
                  answer.textarea = '';
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          },
          deleteAnswer(item,answerIndex,rid){                 //删除评论
            item.replys.splice(answerIndex,1);
            // this.axios.post(httpUrl + 'api/product/equipment/reply',this.qs.stringify({
            //   rid: rid,
            //   accessToken: this.$cookie.get('accessToken'),
            // }))
            //   .then(function (response) {
            //       console.log('msg')
            //   })
            //   .catch(function (error) {
            //
            //   })
          },
          loadMore() {
            this.currentPage++;
            this.getDataList();
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
    margin: 0 auto;
    display: block;
    width: 110px;
    height: 36px;
    line-height: 36px;
    border: solid 1px $border-color;
  }
  .load-all {
    color: $text-tips;
  }
</style>
