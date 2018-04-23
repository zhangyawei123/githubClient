<template>
    <div>
      <div class="stag-title">消息中心</div>
      <div class="message-cell">
        <router-link to="/seekManage">
          <span class="message-icon icon-seek"></span>
          <el-badge class="mark brage" :value="lists[0].unReadSum" :max="10">
          </el-badge>
          <div class="cell-title">咨询管理</div>
          <div class="cell-desc">{{lists[0].content || '暂无消息'}}</div>
        </router-link>
      </div>
      <div class="message-cell">
        <router-link to="/leaveWordManage">
          <span class="message-icon icon-leaveword"></span>
          <el-badge class="mark brage" :value="lists[1].unReadSum" :max="10">
          </el-badge>
          <div class="cell-title">留言管理</div>
          <div class="cell-desc">{{lists[1].content || '暂无消息'}}</div>
        </router-link>
      </div>
      <div class="message-cell">
        <router-link to="/answerManage">
          <span class="message-icon icon-answer"></span>
          <el-badge class="mark brage" :value="lists[2].unReadSum" :max="10">
          </el-badge>
          <div class="cell-title">问答管理</div>
          <div class="cell-desc">{{lists[2].content || '暂无消息'}}</div>
        </router-link>
      </div>
      <div class="message-cell">
        <router-link to="/serveManage">
          <span class="message-icon icon-serve"></span>
          <el-badge class="mark brage" :value="lists[3].unReadSum" :max="10">
          </el-badge>
          <div class="cell-title">服务需求</div>
          <div class="cell-desc">{{lists[3].content || '暂无消息'}}</div>
        </router-link>
      </div>
      <div class="message-cell">
        <router-link to="/centerdiscuss">
          <span class="message-icon icon-discuss"></span>
          <el-badge class="mark brage" :value="lists[4].unReadSum" :max="10">
          </el-badge>
          <div class="cell-title">评论</div>
          <div class="cell-desc">{{lists[4].content || '暂无消息'}}</div>
        </router-link>
      </div>
      <div class="message-cell">
        <router-link to="/centerpraise">
          <span class="message-icon icon-praise"></span>
          <el-badge class="mark brage" :value="lists[5].unReadSum" :max="10">
          </el-badge>
          <div class="cell-title">赞</div>
          <div class="cell-desc">{{lists[5].content || '暂无消息'}}</div>
        </router-link>
      </div>
      <div class="message-cell">
        <router-link to="/systemmsg">
          <span class="message-icon icon-systemMsg"></span>
          <el-badge class="mark brage" :value="lists[6].unReadSum" :max="10">
          </el-badge>
          <div class="cell-title">系统消息</div>
          <div class="cell-desc">{{lists[6].content || '暂无消息'}}</div>
        </router-link>
      </div>
    </div>
</template>

<script>
  import {httpUrl} from "../../http_url";

  export default {
        name: "message-center",
        data() {
          return {
            lists: []
          }
        },
        mounted() {
          this.$nextTick(function () {
            this.getData();
          })
        },
        methods: {
          getData() {
            let _this = this;
            this.axios.get(httpUrl + 'api/company/message/counts?accessToken=' + this.$cookie.get('accessToken'))
              .then(function (response) {
                console.log(response.data);
                _this.lists = response.data.list;
              })
              .catch(function (error) {
                console.log(error)
              })
          }
        }
    }
</script>

<style scoped>
  .stag-title {font-size: 20px;color: #333;padding-bottom: 30px;border-bottom: 1px solid #e2e5e7; }
  .message-cell {position: relative;padding: 20px 0 20px 68px;border-bottom: 1px solid #e2e5e7;}
  .message-icon {position: absolute;left: 0;width: 48px;height: 48px;background-size: 100% 100%;}
  .icon-seek {background-image: url("../../assets/img/ic_new_consult@2x.png");}
  .icon-leaveword {background-image: url("../../assets/img/ic_new_message@2x.png");}
  .icon-answer {background-image: url("../../assets/img/ic_new_ask@2x.png");}
  .icon-serve {background-image: url("../../assets/img/ic_new_serve@2x.png");}
  .icon-discuss {background-image: url("../../assets/img/ic_new_comment@2x.png");}
  .icon-praise {background-image: url("../../assets/img/ic_new_praise@2x.png");}
  .icon-systemMsg {background-image: url("../../assets/img/ic_new_system@2x.png");}
  .cell-title{ font-size: 16px;color: #333;margin-bottom: 14px; }
  .cell-desc { width: 720px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap; color: #a1a8b3; }
  .brage {position: absolute;right: 0;top:40px;}
</style>
<style>

</style>
