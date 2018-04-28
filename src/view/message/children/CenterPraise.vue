<template>
  <div>
    <div class="crumbs">
      <div class="crumbs-inner">
        <router-link to="/messagecenter">返回上一级</router-link><i class="crumbs-icon">|</i><router-link to="/messagecenter">消息中心</router-link><i class="crumbs-icon">&gt;</i><span>{{$route.query.messageType=='1617'? '系统消息': '赞'}}</span>
      </div>
    </div>
    <div class="message-cell" v-for="(item,index) in lists">
      <span class="visitor-pic">
        <img v-if="$route.query.messageType=='1617'" :src="item.basicUser.logoUrl" alt="">
        <img v-else :src="item.basicUser.userPic" alt="">
      </span>
      <div class="visitor-name">{{$route.query.messageType=='1617' ? item.basicUser.firmBrief : item.basicUser.nickName}}</div>
      <div class="visitor-message">{{item.noticeContent}}</div>
      <div class="time-reply"><span>{{ item.opt | formatTime}}</span></div>
    </div>
    <div style="text-align: center;padding-top: 20px">
      <a href="##" v-if="lists.length%10 === 0 && lists.length !==0" class="load-more" @click="loadMore()">查看更多</a>
      <span class="load-all" v-else>已显示全部内容</span>
    </div>

  </div>
</template>

<script>
  import {httpUrl} from '../../../http_url';
  var textObj = {'1617': '系统消息','1609': '赞'};
  export default {
    name: "center-discuss",
    data() {
      return {
        lists: [],
        currentPage: 0
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.checkLogIn();
        this.getData();
      })
    },
    filters: {
      formatType: function (value) {
        switch (value) {
          case '1617':
            return '系统消息';
            break;
          case '1609':
            return '赞';
            break;
          default:
            break;
        }
      }
    },
    methods: {
      getData() {
        var _this = this;
        _this.axios.get( httpUrl + 'api/company/message/list?accessToken='+_this.$cookie.get('accessToken')+'&messageType='+this.$route.query.messageType+'&currentPage=' + _this.currentPage)
          .then(function (response) {
              console.log(response.data);
              _this.lists= _this.lists.concat(response.data.list);
          })
          .catch(function (error) {
            console.log(error);
          });
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
      loadMore() {
        this.currentPage++;
        this.getDataList();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import url('../../../assets/css/deal-manage.css');
  .crumbs {
    background: #fff;}
  .crumbs-inner {
    padding-bottom: 20px;
    border-bottom: 1px solid $border-color;
  }
  .crumbs a {color: #1278ec;}
  .crumbs-icon { margin: 0 5px; color: #1278ec;}
  .time-reply {
    padding: 0;
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
