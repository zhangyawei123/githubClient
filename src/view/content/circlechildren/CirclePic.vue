<template>
    <div>
      <div class="crumbs">
        <div class="crumbs-inner">
          <router-link to="/posterManage">返回上一级</router-link><i class="crumbs-icon">|</i><router-link to="/posterManage">海报管理</router-link><i class="crumbs-icon">&gt;</i><span>海报编辑</span>
        </div>
      </div>
      <swiper :options="swiperOption" ref="mySwiper" @slideChangeTransitionStart="callback">
        <swiper-slide v-for="(slide,index) in swiperSlides" :key="index">I'm Slide {{index}}</swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <div class="pic-info-box">
        <div class="pic-title">32个工作台的超级加工系统，你见过么？</div>
        <div class="publish-time">鑫机缘&nbsp;&nbsp;&nbsp;02-01 14:50</div>
        <div class="info-text">
          <i class="current-page">{{currentPage + 1}}</i> / {{swiperSlides.length}}  {{swiperSlides[currentPage].text}}
        </div>
        <div class="bottom-box">
          <span>播放 613</span>
          <i class="line-icon">|</i>
          <span>评论 21</span>
          <i class="line-icon">|</i>
          <span>收藏 9</span>
        </div>
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
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: "circle-pic",
        data() {
          return {
            currentPage: 0,
            swiperOption: {
              allowTouchMove: false,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              on: {
                slideChange: function(){
                  if(this.isBeginning){
                    this.navigation.$prevEl.css('display','none');
                  }else{
                    this.navigation.$prevEl.css('display','block');
                  }
                  if(this.isEnd){
                    this.navigation.$nextEl.css('display','none');
                  }else{
                    this.navigation.$nextEl.css('display','block');
                  }
                },
              },
            },
            swiperSlides: [
              {'text': '酒柜这种真的是坑了，相信我，买了就会后悔。很多人买这个是为了起装饰作用，给酒找一个容身之地。','imgurl': ''},
              {'text': '酒柜这种真的是坑了。很多人买这个是为了起装饰作用，给酒找一个容身之地。','imgurl': ''},
              {'text': '类文章将被退回且禁止修改并占据当天1篇的发文限额，建议使用文章模式发表；','imgurl': ''}
            ],
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
        components: {
          swiper,
          swiperSlide
        },
        computed: {
          swiper() {
            return this.$refs.mySwiper.swiper
          }
        },
        mounted() {
          this.$nextTick(function () {

          })
        },
        methods: {
          callback() {
            console.log(this.swiper.activeIndex)
            this.currentPage = this.swiper.activeIndex
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
  .crumbs-inner {
    margin-bottom: 30px;
    padding: 0px 0 20px;
    border-bottom: 1px solid $border-color;
  }
  .crumbs a {color: #1278ec;}
  .crumbs-icon { margin: 0 5px; color: #1278ec;}
  .swiper-container {
    float: left;
    margin: 0 20px 0 0;
    width: 630px;
    height: 506px;
  }
  .swiper-slide {
    background: #00ffff;
  }
  .pic-info-box {
    padding: 20px 20px 20px 0;
    height: 506px;
    border: 1px solid $border-color;
    box-sizing: border-box;
  }
  .pic-title {
    margin-bottom: 18px;
    font-size: 20px;
    font-weight: bold;
    color: $text-normal;
  }
  .publish-time {
    margin-bottom: 20px;
    color: $text-tips;
  }
  .info-text {
    height: 330px;
    overflow: auto;
    font-size: 16px;
    line-height: 1.6;
  }
  .current-page {
    color: $primary-color;
    font-size: 32px;
  }
  .bottom-box {
    margin-top: 5px;
    color: $text-tips;
  }
  .line-icon {
    margin: 0 15px;
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
