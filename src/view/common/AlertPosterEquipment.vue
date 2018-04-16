<template>
  <div class="panel-box" v-show="posterEquipmemntshowState">
    <div class="panel-header clearfix">
      <span>海报</span>
      <a class="close-btn" v-on:click="changeshowState">&times;</a>
    </div>
    <div class="panel-body">
          <div class="search-box clearfix">
            <el-input placeholder="请输入内容" v-model="seachkey" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="existent-content alertPosterEquipment">
            <el-table
              ref="posterTable"
              :data="posterList"
              tooltip-effect="dark"
              height="375"
              style="width: 100%"
              @select="posterSelectionChange"
              @select-all="selectAll">
              <el-table-column
                label="零件"
                width="372">
                <template slot-scope="scope">
                  <span class="existent-item-pic"><img :src="scope.row.videoCover" alt=""></span>
                  <span class="existent-item-name">{{scope.row.equipmentName}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="brand"
                label="品牌">
              </el-table-column>
              <el-table-column
                prop="major"
                label="专业"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="country"
                label="产地"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
            </el-table>
          </div>
      <div class="footer clearfix">
        若您要选择的海报或产品这里没有，请先前往“发布”板块，发布对应的内容。
        <div class="oprate-box">
          <a href="javascript:void(0);" class="add-btn" @click="addChooseData">添加</a>
          <a href="javascript:void(0);" class="cancel-btn" @click="">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { httpUrl} from "../../http_url";
  export default {
    props: ['posterEquipmemntshowState','posterEquipmemntUrl'],
    data() {
      return {
        loadingFlag: false,
        posterCurrentPage: -1,
        equipmentCurrentPage: -1,
        seachkey: '',
        posterList: [],                         //海报列表
        equipmentList: [],                      //产品列表
        ChooseList: [],                         //海报或者设备选中的值
      }
    },
    mounted() {
      this.$nextTick(function () {
        console.log(this.posterEquipmemntUrl);
        let _this = this;
        this.checkLogIn();
        this.getPosterDataList();
        this.getEquipmentDataList();
        $('.alertPosterEquipment .el-table__body-wrapper').scroll(function () {
          if($('.alertPosterEquipment .el-table__body-wrapper').scrollTop() + $('.alertPosterEquipment .el-table__body-wrapper').height() > ($('.alertPosterEquipment .el-table__body').height() -10) && !_this.loadingFlag) {
            _this.getPosterDataList();
          }
        })
        // $('.equipment .el-table__body-wrapper').scroll(function () {
        //   if($('.equipment .el-table__body-wrapper').scrollTop() + $('.equipment .el-table__body-wrapper').height() > ($('.equipment .el-table__body').height() -10) && !_this.loadingFlag) {
        //     _this.getEquipmentDataList();
        //   }
        // })
      })
    },
    methods: {
      changeshowState() {
        this.$emit('update:posterEquipmemntshowState', false)
      },
      getPosterDataList() {
        let _this = this;
        this.loadingFlag = true;
        this.posterCurrentPage++;
        // 获取海报列表
        this.axios.get(httpUrl + this.posterEquipmemntUrl +'?currentPage='+ this.posterCurrentPage +'&accessToken=' + this.$cookie.get('accessToken'))
          .then(function (response) {
            console.log(response.data)
            if(response.data.current <= response.data.pageSum) {
              _this.posterList = _this.posterList.concat(response.data.list);
              setTimeout(function () {                                    //从新加载数据的时候显示已经选中项
                _this.ChooseList.forEach(row => {
                  _this.$refs.posterTable.toggleRowSelection(row,true);
                });
              },10)
              _this.loadingFlag = false;
            }else {

            }
          })
          .catch(function (error) {
            console.log(error)
          })

      },
      getEquipmentDataList() {
        let _this = this;
        this.loadingFlag = true;
        this.equipmentCurrentPage++;
        // 获取产品/设备列表
        this.axios.get(httpUrl + 'api/product/equipments?currentPage='+ this.equipmentCurrentPage +'&accessToken=' + this.$cookie.get('accessToken'))
          .then(function (response) {
            // console.log(response.data)
            if(response.data.current <= response.data.pageSum) {
              _this.equipmentList = _this.equipmentList.concat(response.data.list);
              setTimeout(function () {                                    //从新加载数据的时候显示已经选中项
                _this.ChooseList.forEach(row => {
                  _this.$refs.equipmentTable.toggleRowSelection(row,true);
                });
              },10)
              _this.loadingFlag = false;
            }

          })
          .catch(function (error) {
            console.log(error)
          })
      },
      posterSelectionChange(val) {
        // alert('q143');
        if(val.length > 2) {
          // alert(123);
          this.$refs.posterTable.toggleRowSelection(val[0],false);
        }
        this.ChooseList = val;
        console.log(val)
      },
      selectAll() {
        alert('这样是不行的饿');
        this.$refs.posterTable.clearSelection();
      },
      addChooseData() {

        this.$emit('sendPosterEquipmentData', this.ChooseList)
        this.$emit('update:bannerPanelshowState', false)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import url(../../assets/css/alert-panel.css);
  .panel-box .search-box {
    margin-top: 30px;
  }

/*  .add-new-btn-box {
    background: $bg-color;
    border: 1px solid $border-color;
  }
  .add-new-btn {
    margin: 10px 0 10px 20px;
    display: inline-block;
    width: 96px;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    text-align: center;
    color: $primary-color;
    background-color: #fff;
    border: 1px solid $border-color;
  }
  .add-title-box {
    margin-top: 20px;
    padding-left: 120px;
  }
  .title-tips {
    float: left;
    line-height: 40px;
    margin-left: -120px;
  }*/
</style>

