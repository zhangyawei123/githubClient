<template>
    <!--如果是海报的弹窗-->
    <div class="panel-body" v-if="posterEquipmemntUrl=='api/product/equipment/poster/list'">
          <div class="search-box clearfix">
            <el-input placeholder="请输入内容" v-model="seachkey" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="existent-content alertPosterEquipment">
            <el-table
              ref="posterTable"
              v-loading="loadingFlag"
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
                prop="brandName"
                label="品牌">
              </el-table-column>
              <el-table-column
                prop="majorName"
                label="专业"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="countryName"
                label="产地"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
            </el-table>
          </div>
      <!--<div class="footer clearfix">-->
        <!--若您要选择的海报或产品这里没有，请先前往“发布”板块，发布对应的内容。-->
        <!--<div class="oprate-box">-->
          <!--<a href="javascript:void(0);" class="add-btn" @click="addChooseData">添加</a>-->
          <!--<a href="javascript:void(0);" class="cancel-btn" @click="">取消</a>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  <!--如果是产品的弹窗-->
  <div v-else>
    <div class="search-box clearfix">
      <el-input placeholder="请输入内容" v-model="seachkey" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="existent-content alertPosterEquipment-eq">
      <el-table
        v-loading="loadingFlag"
        ref="equipmentTable"
        :data="equipmentList"
        tooltip-effect="dark"
        height="315"
        style="width: 100%"
        @select-all="selectAll"
        @select="equipmentSelectionChange">
        <el-table-column
          label="零件"
          width="372">
          <template slot-scope="scope">
            <span class="existent-item-pic"><img :src="scope.row.picUrl" alt=""></span>
            <span class="existent-item-name">{{scope.row.brandName}} {{scope.row.modelNum}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌">
        </el-table-column>
        <el-table-column
          prop="majorName"
          label="专业"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="countryName"
          label="产地"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

  import { httpUrl} from "../../http_url";
  export default {
    props: ['posterEquipmemntUrl','posterLimit','equipmentLimit'],
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
      this.checkLogIn();
      this.$nextTick(function () {
        console.log(this.posterLimit)
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
        $('.alertPosterEquipment-eq .el-table__body-wrapper').scroll(function () {
          if($('.alertPosterEquipment-eq .el-table__body-wrapper').scrollTop() + $('.alertPosterEquipment-eq .el-table__body-wrapper').height() > ($('.alertPosterEquipment-eq .el-table__body').height() -10) && !_this.loadingFlag) {
            _this.getEquipmentDataList();
          }
        })
      })
    },
    methods: {
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
              _this.loadingFlag = false;
            }
          })
          .catch(function (error) {
            console.log(error);
            _this.checkLogIn();
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
      posterSelectionChange(selection, row) {
        // 最多添加几条是根据父组件返回的海报的条数判断
        if(selection.length > this.posterLimit) {
          // alert(123);
          this.$notify.error({
            title: '错误',
            message: '最多添加'+this.posterLimit+'条信息'
          });
          this.$refs.posterTable.toggleRowSelection(row,false);
        }
        this.ChooseList = selection;
      },
      equipmentSelectionChange(selection, row) {
        // 最多添加几条是根据父组件返回的产品的条数判断
        if(selection.length > this.equipmentLimit) {
          this.$notify.error({
            title: '错误',
            message: '最多添加'+this.equipmentLimit+'条信息'
          });
          this.$refs.equipmentTable.toggleRowSelection(row,false);
        }
        this.ChooseList = selection;
        console.log(this.ChooseList)
      },
      selectAll() {                             //全选功能是禁止的
        var _this = this;
        this.ChooseList = [];
        this.$notify.error({
          title: '错误',
          message: '最多添加'+(this.equipmentLimit || this.posterLimit)+'条信息,请单独选择'
        });
        if(this.posterEquipmemntUrl==='api/product/equipment/poster/list') {
          setTimeout(function () {
            _this.$refs.posterTable.clearSelection();
          },10)
        }else {
          setTimeout(function () {
            _this.$refs.equipmentTable.clearSelection();
          },10)
        }

      }
    }
  }
</script>

<style scoped lang="scss">
  @import url(../../assets/css/alert-panel.css);
</style>

