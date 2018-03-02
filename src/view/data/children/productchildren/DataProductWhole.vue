<template>
  <div>
    <div class="date-panel">
      <div class="time-panel">
        <div class="time-left">
          <span>今日</span>
          <span class="selected">昨日</span>
          <span>7天</span>
          <span>30天</span>
          <span>90天</span>
        </div>
        <div class="time-right">
          <el-date-picker
            size="small"
            :clearable='false'
            :editable="false"
            v-model="value6"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <a href="##" id="timeChoose">筛选</a>
        </div>
      </div>
      <div class="poster-data-cell">
        <div class="poster-cell-title">海报详情页数据</div>
        <div class="poster-cell-content">
          <div class="poster-detail-item">
            <div class="poster-detail-item-icon poster-detail-item-icon1"></div>
            <div class="poster-play-key">浏览 (次)</div>
            <div class="poster-play-value">1000</div>
          </div>
          <div class="poster-detail-item">
            <div class="poster-detail-item-icon poster-detail-item-icon2"></div>
            <div class="poster-play-key">收藏 (次</div>
            <div class="poster-play-value">1000</div>
          </div>
          <div class="poster-detail-item">
            <div class="poster-detail-item-icon poster-detail-item-icon3"></div>
            <div class="poster-play-key">留言 (条)</div>
            <div class="poster-play-value">100</div>
          </div>
          <div class="poster-detail-item">
            <div class="poster-detail-item-icon poster-detail-item-icon4"></div>
            <div class="poster-play-key">问答 (条)</div>
            <div class="poster-play-value">30</div>
          </div>
          <div class="poster-detail-item">
            <div class="poster-detail-item-icon poster-detail-item-icon5"></div>
            <div class="poster-play-key">咨询 (次)</div>
            <div class="poster-play-value">10</div>
          </div>
          <div class="poster-detail-item">
            <div class="poster-detail-item-icon poster-detail-item-icon6"></div>
            <div class="poster-play-key">平津滞留时间</div>
            <div class="poster-play-value">00:02:00</div>
          </div>
          <div class="poster-detail-item poster-detail-item-last">
            <div class="poster-detail-item-icon poster-detail-item-icon7"></div>
            <div class="poster-play-key">跳出率</div>
            <div class="poster-play-value">5%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="visitor-chart-panel">
      <div class="visitor-panel visitor-identity-chart-chart">
        <div class="chart-title">访问者身份</div>
        <div class="visitor-chart" id="visitorIden"></div>
        <div class="visitor-mark">
          <span><i class="iconfont icon-dian jishu"></i>技术</span>
          <span><i class="iconfont icon-dian xiaoshou"></i>销售</span>
          <span><i class="iconfont icon-dian caigou"></i>采购</span><br>
          <span><i class="iconfont icon-dian meiti"></i>媒体</span>
          <span><i class="iconfont icon-dian xiehui"></i>协会</span>
          <span><i class="iconfont icon-dian shanghu"></i>商户</span>
        </div>
      </div>
      <div class="visitor-panel visitor-location-chart-chart">
        <div class="chart-title">访问者位置
          <span class="chart-select visitor-location">
              <el-select v-model="value7" placeholder="请选择">
                <el-option
                  v-for="item in cities"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label">
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                </el-option>
              </el-select>
            </span>
        </div>
        <div class="visitor-chart" id="visitorLoca"></div>
        <div class="visitor-mark">
          <span><i class="iconfont icon-dian province1"></i>江苏</span>
          <span><i class="iconfont icon-dian province2"></i>广东</span>
          <span><i class="iconfont icon-dian province3"></i>辽宁</span>
          <span><i class="iconfont icon-dian province4"></i>陕西</span><br>
          <span><i class="iconfont icon-dian province5"></i>河南</span>
          <span><i class="iconfont icon-dian province6"></i>四川</span>
          <span><i class="iconfont icon-dian province7"></i>山东</span>
          <span><i class="iconfont icon-dian province8"></i>其它</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "data-poster-whole",
    data() {
      return {
        value6: '',//datepicker的值
        value7: '',//浏览者位置各个城市赞比
        cities: [
          {
            value: '33%',
            label: '北京'
          }, {
            value: '33%',
            label: '上海'
          }, {
            value: '33%',
            label: '南京'
          }, {
            value: '33%',
            label: '成都'
          }, {
            value: '33%',
            label: '深圳'
          }, {
            value: '33%',
            label: '广州'
          }
        ],
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        var _this = this;
        var visitorIdenOption = {
          color: ['#187ff5','#19c39c','#ef4990','#36d7e9','#a763e7','#edd221'],
          tooltip: {
            trigger: 'item',
            formatter: " {c} "
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center',
                  seriesIndex: 1,
                },
                emphasis: {
                  show: true,
                  seriesIndex: 1,
                  formatter: "{d}% \n {a} ",
                  textStyle: {
                    fontSize: '18',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'技术'},
                {value:310, name:'销售'},
                {value:234, name:'采购'},
                {value:135, name:'媒体'},
                {value:1548, name:'协会'},
                {value:1548, name:'商户'}
              ]
            }
          ]
        };// 浏览者身份图表数据
        var visitorLocaOption = {
          color: ['#5C56DB','#187FF5','#36D7E9','#19C39C','#A763E7','#EF4990','#FDA551','#EDD221'],
          tooltip: {
            trigger: 'item',
            formatter: " {c} "
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center',
                  seriesIndex: 1,
                },
                emphasis: {
                  show: true,
                  seriesIndex: 1,
                  formatter: "{d}% \n {a} ",
                  textStyle: {
                    fontSize: '18',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'江苏'},
                {value:310, name:'广东'},
                {value:234, name:'辽宁'},
                {value:135, name:'陕西'},
                {value:1548, name:'河南'},
                {value:1548, name:'四川'},
                {value:1548, name:'山东'},
                {value:1548, name:'其它'},
              ]
            }
          ]
        };// 浏览者位置信息数据
        creatVisitorChart('visitorIden',visitorIdenOption);//创建浏览者身份图表
        creatVisitorChart('visitorLoca',visitorLocaOption);//创建浏览者位置图表
        function creatVisitorChart(id,visitorOption) {//浏览者位置和身份图一样合成一个函数
          var visitorChart = _this.echarts.init(document.getElementById(id));
          visitorChart.setOption(visitorOption);
        }
      })
    }
  }
</script>

<style scoped>
  @import "../../../../assets/css/statistics.css";
  .poster-detail-item {
    width: 128px;
  }
  .el-range-editor.el-input__inner {
    margin-top: 9px;
    width: 300px;
  }
  .visitor-location .el-select {
    width: 120px;
  }
  .el-select-dropdown__item {
    padding: 0 15px;
  }
</style>
