<template>
  <div>
    <div class="content-item" v-for="(item,index) in lists">
      <div class="content-item-pic">
        <img src="./../../../assets/img/content-item-pic.png" alt="">
      </div>
      <div class="content-item-info">
        <p class="content-item-title">{{item.title}}</p>
        <p class="content-item-view">浏览次数：{{item.viewcount}}次</p>
        <p class="content-item-time">发布时间：{{item.time}}</p>
        <div class="content-item-oprate">
          <router-link :to="{ path: '/posterManage/edit', query: { posterIndex: index }}"><i class="iconfont icon-bianji"></i>编辑</router-link>
          <router-link :to="{ path: 'data', query: { posterIndex: index }}"><i class="iconfont icon-fenxi"></i>分析</router-link>
        </div>
      </div>
    </div>
    <alert-panel  />
  </div>
</template>
<script>
  import AlertPanel from '../../common/AlertPanel'
  export default {
    name: 'poster-manage-list',
    data () {
      return {
        lists: [
          {
            'picUrl': '',
            'title' : '斗山高效率立式加工中心机床',
            'viewcount': '365',
            'time' : '2016年11月29日 16:51'
          },
          {
            'picUrl': '',
            'title' : '斗山高效率立式加工中心机床',
            'viewcount': '365',
            'time' : '2016年11月29日 16:51'
          },
          {
            'picUrl': '',
            'title' : '斗山高效率立式加工中心机床',
            'viewcount': '365',
            'time' : '2016年11月29日 16:51'
          }
        ],
      }
    },
    components: {
      AlertPanel
    }
  }
</script>
<style scoped>
  .stag {
    width: 1010px;
    padding: 0;
    background: none;
  }
  .content-item {
    float: left;
    width: 306px;
    margin-left: 30px;
    margin-bottom: 30px;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 3px;
    transition: all .3s;
  }
  .content-item:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, .3);
  }
  .content-item-pic {
    margin-bottom: 18px;
    height: 152px;
  }
  .content-item-pic img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .content-item-info {
    overflow: hidden;
  }
  .content-item-title {
    margin-bottom: 12px;
    font-size: 16px;
    color: #252525;
  }
  .content-item-view,.content-item-time {
    margin-bottom: 7px;
    color: #A1A8B3;
  }
  .content-item-oprate {
    margin-top: 14px;
    margin-bottom: 10px;
    float: right;
  }
  .content-item-oprate a {
    margin-left: 38px;
    color: #5C697E;
  }
  .content-item-oprate a:hover {
    color: #1278ec;
  }
  .content-item-oprate a i {
    margin-right: 10px;
  }
</style>
