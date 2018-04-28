<template>
  <div>
    <div class="message-title">问答管理</div>
    <p class="sub-title">与用户及时、友好的互动，可以增加用户对您的关注度；您的回复还有机会直接展示在海报/产品详情页中哦。</p>
    <div class="message-cell" v-for="(item,index) in lists">
      <span class="visitor-pic">
        <img :src="item.basicUser.userPic" alt="">
      </span>
      <div class="visitor-name">{{item.basicUser.nickName}}</div>
      <div class="visitor-message">{{item.qcontent}}</div>
      <!--<div class="message-to">留言了您的海报：{{item.messageto}}（关联产品：斗山PUMAVST500G）</div>-->
      <div class="time-reply">
        <span>{{item.qtime | formatTime}}</span>
        <span v-if="item.acontent===null" class="reply-btn" @click="changOpen(item)">{{item.opened ? '收起': '回答'}}</span>
        <span class="reply-btn disabled" v-else>已回答</span>
      </div>
      <div class="reply-box" v-if="item.opened">
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
          <span class="send-btn" v-bind:class="{disabled: item.textarea.length===0}" @click="sendMessage(item,item.id)">发送</span>
        </div>
      </div>
      <div class="answer-box" v-if="item.acontent">
        <div class="answer-item">
          <div class="answer-content">
            <span class="answer-to">上海东研(商家) &gt; {{item.name}}：</span>{{item.acontent}}
          </div>
          <p class="answer-time">刚刚<span class="delete" v-on:click="deleteAnswer(item,item.id)">删除</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { httpUrl} from "../../http_url";

  export default {
    name: "answer-manage",
    data() {
      return {
        lists: [
          // {
          //   'name': '周工',
          //   'message': '这个机型的设备，在一朋友工厂看到过，工作确实不懒。 还是比较推荐购买的！',
          //   'messageto': '高速立式车削卧式加工中心',
          //   'answers': ['很好，非常棒']
          // },
          // {
          //   'name': '张三',
          //   'message': '这个机型的设备，在一朋友工厂看到过，工作确实不懒。 还是比较推荐购买的！',
          //   'messageto': '高速立式车削卧式加工中心',
          //   'answers': []
          // }
        ],
        currentPage: -1,
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.checkLogIn();
        this.getAnswerList();
      })
    },
    methods: {
      getAnswerList() {
        let _this = this;
        _this.currentPage++;
        this.axios.get(httpUrl + 'api/product/equipment/questions?accessToken='+_this.$cookie.get('accessToken')+'&currentPage=' + _this.currentPage)
          .then(function (response) {
            console.log(response.data)
            _this.lists = _this.lists.concat(response.data.list);
        })
          .catch(function (error) {
            console.log(error);
          })
      },
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
      sendMessage: function (item,id) {
        let _this = this;
        if (item.textarea.length > 0) {
          item.opened = false;
          item.acontent = item.textarea;
          this.axios.post(httpUrl + 'api/product/equipment/question/answer', this.qs.stringify({
            qid: id,
            accessToken: _this.$cookie.get('accessToken'),
            acontent: item.textarea,
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
      deleteAnswer: function (item,id) {
        let _this = this;
        this.axios.post(httpUrl + 'api/product/equipment/question/answer/del', this.qs.stringify({
          qid: id,
          accessToken: _this.$cookie.get('accessToken'),
        }))
          .then(function (response) {
            console.log(response);
            _this.$message({
              message: '删除成功',
              type: 'success'
            })
            item.acontent = null;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped>
  @import url('../../assets/css/deal-manage.css');
  .el-textarea {
    margin-bottom: 10px;
  }
</style>
