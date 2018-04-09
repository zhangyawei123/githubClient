<template>
    <div>
      <div class="stag-inner">
        <div class="crumbs">
          <div class="crumbs-inner">
            <router-link to="/circleManage">返回上一级</router-link><i class="crumbs-icon">|</i><router-link to="/circleManage">圈子管理</router-link><i class="crumbs-icon">&gt;</i><span>详情</span>
          </div>
        </div>
        <video-player  class="vjs-custom-skin"
                       ref="videoPlayer"
                       :options="playerOptions"
                       :playsinline="true"
                       @play="onPlayerPlay($event)"
                       @pause="onPlayerPause($event)"
                       @ended="onPlayerEnded($event)"
                       @loadeddata="onPlayerLoadeddata($event)"
                       @waiting="onPlayerWaiting($event)"
                       @playing="onPlayerPlaying($event)"
                       @timeupdate="onPlayerTimeupdate($event)"
                       @canplay="onPlayerCanplay($event)"
                       @canplaythrough="onPlayerCanplaythrough($event)"
                       @ready="playerReadied"
                       @statechanged="playerStateChanged($event)">
        </video-player>
        <div class="video-title">
          自动化机械做的披萨大饼，你吃过么？煮鸡蛋炒鸡蛋都是自动化
        </div>
        <div class="video-desc">
          这个视频只要是斗山机床的现场加工视频，你看过么？反正我是第一次见，觉得蛮高大上的。（得意）
        </div>
        <div class="video-info-box">
          <span><span>鑫机缘</span><span class="publish-time">02-01 14:50</span></span>
          <span class="right-box">
            <span>播放 613</span>
            <i class="line-icon">|</i>
            <span>评论 21</span>
            <i class="line-icon">|</i>
            <span>收藏 9</span>
          </span>
        </div>
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
                <!--<textarea class="reply-text" name="" id="" placeholder="回复该留言" v-model="item.textarea"></textarea>-->
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
            <!--<div class="answer-item" v-for="answer in item.answers">-->
              <!--<div class="answer-content">-->
                <!--<span class="answer-to">上海东研(商家) &gt; {{item.name}}：</span>{{answer}}-->
              <!--</div>-->
              <!--<p class="answer-time">刚刚</p>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'

  import { videoPlayer } from 'vue-video-player'
    export default {
        name: "circle-video",
        mounted() {
          this.$nextTick(function () {

          })
        },
      components: {
        videoPlayer
      },
      data() {
        return {
          // videojs options
          playerOptions: {
            height: '360',
            autoplay: false,
            muted: false,
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [{
              type: "video/mp4",
              // mp4
              src: "http://vjs.zencdn.net/v/oceans.mp4",
              // webm
              // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            }],
            poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
          },
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
          ]
        }
      },
      mounted() {
        // console.log('this is current player instance object', this.player)
        setTimeout(() => {
          console.log('dynamic change options', this.player)

          // change src
          // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';

          // change item
          // this.$set(this.playerOptions.sources, 0, {
          //   type: "video/mp4",
          //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
          // })

          // change array
          // this.playerOptions.sources = [{
          //   type: "video/mp4",
          //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
          // }]
          this.player.muted(false)
        }, 5000)
      },
      computed: {
        player() {
          return this.$refs.videoPlayer.player
        }
      },
      methods: {
        // listen event
        onPlayerPlay(player) {
          // console.log('player play!', player)
        },
        onPlayerPause(player) {
          // console.log('player pause!', player)
        },
        onPlayerEnded(player) {
          // console.log('player ended!', player)
        },
        onPlayerLoadeddata(player) {
          // console.log('player Loadeddata!', player)
        },
        onPlayerWaiting(player) {
          // console.log('player Waiting!', player)
        },
        onPlayerPlaying(player) {
          // console.log('player Playing!', player)
        },
        onPlayerTimeupdate(player) {
          // console.log('player Timeupdate!', player.currentTime())
        },
        onPlayerCanplay(player) {
          // console.log('player Canplay!', player)
        },
        onPlayerCanplaythrough(player) {
          // console.log('player Canplaythrough!', player)
        },
        // or listen state event
        playerStateChanged(playerCurrentState) {
          // console.log('player current update state', playerCurrentState)
        },
        // player is ready
        playerReadied(player) {
          // seek to 10s
          console.log('example player 1 readied', player)
          player.currentTime(10)
          // console.log('example 01: the player is readied', player)
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
  .stag {
    padding: 0 0 30px 0;
  }
  .stag-inner {
    padding: 0 40px;
  }
  .crumbs-inner {
    padding: 30px 0 20px;
    border-bottom: 1px solid $border-color;
  }
  .crumbs a {color: #1278ec;}
  .crumbs-icon { margin: 0 5px; color: #1278ec;}
  .vjs_video_3-dimensions {
    height: 506px;
  }
  .video-title {
    margin: 17px 0;
    font-size: 24px;
    font-weight: bold;
    color: $text-normal;
  }
  .video-desc {
    margin-bottom: 19px;
    color: $text-light;
  }
  .video-info-box{
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
  /*评论回复部分*/
  .discuss-title { margin-top: 60px;padding-bottom: 20px; font-size: 20px;
    border-bottom: 1px solid $border-color;}
  .discuss-num { color: $primary-color;}
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

