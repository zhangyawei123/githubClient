<template>
  <!--如果是海报的弹窗-->
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
          label="品牌logo"
          width="145">
          <template slot-scope="scope">
            <span class="existent-item-pic"><img :src="scope.row.picUrl" alt=""></span>
            <span class="existent-item-name">{{scope.row.equipmentName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌名称">
        </el-table-column>
        <el-table-column
          prop="majorName"
          label="专业"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="countryName"
          label="地区"
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
    props: ['logoUrl','logoLimit'],
    data() {
      return {
        loadingFlag: false,
        posterCurrentPage: -1,
        seachkey: '',
        posterList: [],                         //海报列表借用，现在是logo的list
        ChooseList: [],                         //logo选中的值
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
        $('.alertPosterEquipment .el-table__body-wrapper').scroll(function () {
          if($('.alertPosterEquipment .el-table__body-wrapper').scrollTop() + $('.alertPosterEquipment .el-table__body-wrapper').height() > ($('.alertPosterEquipment .el-table__body').height() -10) && !_this.loadingFlag) {
            _this.getPosterDataList();
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
        this.axios.get(httpUrl + this.logoUrl +'?currentPage='+ this.posterCurrentPage +'&accessToken=' + this.$cookie.get('accessToken'))
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
      selectAll() {                             //全选功能是禁止的
        var _this = this;
        this.ChooseList = [];
        this.$notify.error({
          title: '错误',
          message: '最多添加'+ this.logoLimit +'条信息,请单独选择'
        });
        setTimeout(function () {
          _this.$refs.posterTable.clearSelection();
        },10)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import url(../../assets/css/alert-panel.css);
</style>

