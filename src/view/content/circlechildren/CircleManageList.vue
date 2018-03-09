<template>
  <div>
    <div class="title-h1">圈子管理</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <div class="circle-cell" v-for="(item,index) in listAll">
          <div class="cell-pic">
            <img src="../../../assets/img/content-item-pic.png" alt="">
          </div>
          <div class="cell-title">
            <router-link :to="{path: '/circleManage/article',query: { videoIndex: index}}">{{item.title}}</router-link>
          </div>
          <div class="state"><span class="cell-mark">{{item.mark}}</span>工艺 · 未审核 · 刚刚 · <span class="delete" @click="removeItem(index,listAll)">删除</span></div>
          <div class="infomation"><span>阅读 613</span><span>评论 0</span><span class="last">收藏 0</span></div>
        </div>
        <a href="##" v-if="listAll.length%10 === 0 && listAll.length !==0" class="load-more">查看更多</a>
        <span class="load-all" v-else>已显示全部内容</span>
      </el-tab-pane>
      <el-tab-pane label="审核中" name="second">
        <div class="circle-cell" v-for="(item,index) in listVerify">
          <div class="cell-pic">
            <img src="../../../assets/img/content-item-pic.png" alt="">
          </div>
          <div class="cell-title">{{item.title}}</div>
          <div class="state"><span class="cell-mark">{{item.mark}}</span>工艺 · 未审核 · 刚刚 · <span class="delete" @click="removeItem(index,listVerify)">删除</span></div>
          <div class="infomation"><span>阅读 613</span><span>评论 0</span><span class="last">收藏 0</span></div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已发布" name="third">
        <div class="circle-cell" v-for="(item,index) in listPublish">
          <div class="cell-pic">
            <img src="../../../assets/img/content-item-pic.png" alt="">
          </div>
          <div class="cell-title">{{item.title}}</div>
          <div class="state"><span class="cell-mark">{{item.mark}}</span>工艺 · 未审核 · 刚刚 · <span class="delete" @click="removeItem(index,listPublish)">删除</span></div>
          <div class="infomation"><span>阅读 613</span><span>评论 0</span><span class="last">收藏 0</span></div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="未通过" name="fourth">
        <div class="circle-cell" v-for="(item,index) in listNoPass">
          <div class="cell-pic">
            <img src="../../../assets/img/content-item-pic.png" alt="">
          </div>
          <div class="cell-title">{{item.title}}</div>
          <div class="state"><span class="cell-mark">{{item.mark}}</span>工艺 · 未审核 · 刚刚 · <span class="delete" @click="removeItem(index,listNoPass)">删除</span></div>
          <div class="infomation"><span>阅读 613</span><span>评论 0</span><span class="last">收藏 0</span></div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    name: 'circleManage',
    data () {
      return {
        activeName: 'first',
        listAll: [
          {
            imgurl: '',
            title: '机械化做的劈杀大瓶，你吃过吗？还可以加蛋的',
            mark: '已发布'
          },{
            imgurl: '',
            title: '机械化做的劈杀大瓶，你吃过吗？还可以加蛋的',
            mark: '已发布'
          },{
            imgurl: '',
            title: '机械化做的劈杀大瓶，你吃过吗？还可以加蛋的',
            mark: '已发布'
          },
        ],
        listVerify: [
          {
            imgurl: '',
            title: '机械化做的劈杀大瓶，你吃过吗？还可以加蛋的',
            mark: '已发布'
          },{
            imgurl: '',
            title: '机械化做的劈杀大瓶，你吃过吗？还可以加蛋的',
            mark: '已发布'
          }
        ],
        listPublish: [
          {
            imgurl: '',
            title: '机械化做的劈杀大瓶，你吃过吗？还可以加蛋的',
            mark: '已发布'
          },{
            imgurl: '',
            title: '机械化做的劈杀大瓶，你吃过吗？还可以加蛋的',
            mark: '已发布'
          }
        ],
        listNoPass: [
          {
            imgurl: '',
            title: '机械化做的劈杀大瓶，你吃过吗？还可以加蛋的',
            mark: '已发布'
          }
        ],
      }
    },
    mounted: function () {
      this.$nextTick(function () {

      })
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      removeItem(index,list) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          list.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    // filters: {
    //   loadSign: function (value) {
    //     if (value%10 === 0) {
    //       return false
    //     }else {
    //       return true
    //     }
    //   }
    // }
  }
</script>
<style scoped lang="scss">
  .title-h1 {
    margin-bottom: 12px;
    font-size: 20px;
  }
  .title-box {
    border-bottom: 1px solid $border-color;
  }
  .title-item {
    line-height: 46px;
    margin-right: 50px;
    display: inline-block;
    font-size: 16px;
    border-bottom: 2px solid transparent;
  }
  .title-item.selected {
    color: $primary-color;
    border-bottom: 2px solid $primary-color;
  }
  .circle-cell {
    overflow: hidden;
    padding: 30px 0 40px;
    border-bottom: 1px solid $border-color;
  }
  .cell-title {
    margin-bottom: 20px;
    font-size: 20px;
    color: $text-normal;
  }
  .state,.infomation {
    margin-bottom: 20px;
    color: $text-tips;
  }
  .delete {
    cursor: pointer;
  }
  .cell-pic {
    float: right;
    width: 120px;
    height: 120px;
    background: #f00;
  }
  .cell-pic > img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .cell-mark {
    display: inline-block;
    margin-right: 16px;
    line-height: 12px;
    padding: 2px;
    color: $primary-color;
    border: 1px solid $primary-color;
    border-radius: 3px;
    font-size: 12px;
  }
  .infomation {
    margin-left: -20px;
  }
  .infomation > span {
    padding: 0 20px;
    border-right: 1px solid $border-color;
  }
  .infomation > span.last {
    border-right: none;
  }
  .load-more,.load-all {
    margin: 20px auto;
    display: block;
    width: 110px;
    height: 36px;
    line-height:36px;
    text-align: center;
  }
  .load-more {
    border: solid 1px $border-color;
  }
  .load-all {
    color: $text-tips;
  }
</style>
