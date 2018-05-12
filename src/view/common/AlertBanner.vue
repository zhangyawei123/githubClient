<template>
    <div class="panel-body banner-panel">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="海报" name="first">
          <div class="search-box clearfix">
            <el-input placeholder="请输入内容" v-model="seachkey" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="existent-content poster">
            <el-table
              ref="posterTable"
              :data="posterList"
              tooltip-effect="dark"
              height="315"
              style="width: 100%"
              @select-all="posterSelectAll"
              @select="posterSelectionChange">
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
          <div class="add-title-box clearfix" v-if="posterTitleShow">
            <span class="title-tips">* 海报列表标题：</span>
            <el-input v-model="posterTitle" @change="changeBannerTitle(posterTitle)" placeholder="为以上您选择的海报写个标题吧，8个字以内"></el-input>
          </div>
        </el-tab-pane>
        <el-tab-pane label="产品" name="second">
          <div class="search-box clearfix">
            <el-input placeholder="请输入内容" v-model="seachkey" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="existent-content equipment">
            <el-table
              ref="equipmentTable"
              :data="equipmentList"
              tooltip-effect="dark"
              height="315"
              style="width: 100%"
              @select-all="equipmentSelectAll"
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
          <div class="add-title-box clearfix" v-if="equipmentTitleShow">
            <span class="title-tips">* 产品列表标题：</span>
            <el-input v-model="equipmentTitle" @change="changeBannerTitle(equipmentTitle)" placeholder="为以上您选择的产品写个标题吧，8个字以内"></el-input>
          </div>
        </el-tab-pane>
        <el-tab-pane label="外部链接" name="third">
          <div class="search-box clearfix">
            <el-input @change="changeOutHtml" placeholder="请填写外部链接地址，例：http://www.xinjiyuan.com" v-model="showLocalTextLink.outHtml" class="input-with-select">
            </el-input>
          </div>
          <div style="height: 377px;"></div>
        </el-tab-pane>
      </el-tabs>
      <div class="footer clearfix">
        若您要选择的海报或产品这里没有，请先前往“发布”板块，发布对应的内容。
        <div class="oprate-box">
          <a href="javascript:void(0);" class="add-btn" @click="sendBannerData">添加</a>
          <a href="javascript:void(0);" class="cancel-btn" @click="">取消</a>
        </div>
      </div>
    </div>
</template>

<script>
  import { httpUrl} from "../../http_url";
  // var JumpTypeText = ['海报','产品','外部链接','海报列表','产品列表'];
  // var JumpType = [4801,4083,4087,4082,4084];
  export default {
    props: ['bannerPanelshowState'],
    data() {
      return {
        loadingFlag: false,
        posterCurrentPage: -1,
        equipmentCurrentPage: -1,
        tableIndex: 0,
        activeName: 'first',
        seachkey: '',
        posterList: [],                         //海报列表
        equipmentList: [],                      //产品列表
        posterTitleShow: false,
        equipmentTitleShow: false,
        posterTitle: '',                        //海报列表自定义标题
        equipmentTitle: '',                     //产品列表自定义标题
        ChooseList: [],                         //海报选中的值
        showLocalTextLink: {                    //本地显示链接的文字以及传给后台的值
          jumpTypeName: '',                     //跳转位置名字
          bannerTitle: '',                     //跳转位置的标题
          bannerJumpType: '',                  //跳转位置代码
          outHtml: '',                          //外部链接
          bannerOutId: ''                      //跳转是列表的话选择的视频或者产品的ID
        },
      }
    },
    components: {

    },
    mounted() {
      this.$nextTick(function () {
        let _this = this;
        this.checkLogIn();
        this.getPosterDataList();
        this.getEquipmentDataList();
          $('.poster .el-table__body-wrapper').scroll(function () {
            if($('.poster .el-table__body-wrapper').scrollTop() + $('.poster .el-table__body-wrapper').height() > ($('.poster .el-table__body').height() -10) && !_this.loadingFlag) {
                _this.getPosterDataList();
            }
          })
        $('.equipment .el-table__body-wrapper').scroll(function () {
          if($('.equipment .el-table__body-wrapper').scrollTop() + $('.equipment .el-table__body-wrapper').height() > ($('.equipment .el-table__body').height() -10) && !_this.loadingFlag) {
              _this.getEquipmentDataList();
          }
        })
      })
    },
    methods: {
      changeshowState() {
        this.$emit('update:bannerPanelshowState', false)
      },
      getPosterDataList() {
        let _this = this;
        this.loadingFlag = true;
        this.posterCurrentPage++;
        // 获取海报列表
        this.axios.get(httpUrl + 'api/product/equipment/poster/list?currentPage='+ this.posterCurrentPage +'&accessToken=' + this.$cookie.get('accessToken'))
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
      handleClick(tab, event) {
        // console.log(tab, event);
        this.tableIndex = tab.index;
      },
      posterSelectionChange(val) {
        this.$refs.equipmentTable.clearSelection();
        this.ChooseList = val;
        this.showLocalTextLink.outHtml='';
        this.equipmentTitleShow = false;
        if(val.length ===0) {
          this.posterTitleShow = false;
          return
        }else if (val.length ===1) {            //海报选项单选的情况下
          this.posterTitleShow = false;
          this.showLocalTextLink.bannerJumpType = 4801;
          this.showLocalTextLink.jumpTypeName = '海报';
          this.showLocalTextLink.bannerTitle = val[0].title;
          this.showLocalTextLink.bannerOutId = val[0].vid;
          this.showLocalTextLink.outHtml = ''

        }else {
          this.posterTitleShow = true;
          this.showLocalTextLink.bannerJumpType = 4802;
          this.showLocalTextLink.jumpTypeName = '海报列表';

          this.showLocalTextLink.bannerOutId= '';
          for(let i =0;i< val.length;i++) {
            this.showLocalTextLink.bannerOutId = this.showLocalTextLink.bannerOutId + val[i].vid + '/'
          }
          this.showLocalTextLink.outHtml = ''
        }

        console.log(this.showLocalTextLink);
      },
      posterSelectAll(val) {
        this.$refs.equipmentTable.clearSelection();
        this.ChooseList = val;
        this.showLocalTextLink.outHtml='';
        this.equipmentTitleShow = false;
        if(val.length ===0) {
          this.posterTitleShow = false;
          return
        }else {
          this.posterTitleShow = true;
          this.showLocalTextLink.bannerJumpType = 4802;
          this.showLocalTextLink.jumpTypeName = '海报列表';

          this.showLocalTextLink.bannerOutId= '';
          for(let i =0;i< val.length;i++) {
            this.showLocalTextLink.bannerOutId = this.showLocalTextLink.bannerOutId + val[i].vid + '/'
          }
          this.showLocalTextLink.outHtml = ''
        }

        console.log(this.showLocalTextLink);
      },
      equipmentSelectionChange(val) {
        this.$refs.posterTable.clearSelection();
        this.ChooseList = val;
        this.showLocalTextLink.outHtml='';
        this.posterTitleShow = false;
        if(val.length ===0) {
          this.equipmentTitleShow = false;
          return
        }else if (val.length ===1) {            //海报选项单选的情况下
          this.equipmentTitleShow = false;
          this.showLocalTextLink.bannerJumpType = 4803;
          this.showLocalTextLink.jumpTypeName = '产品';
          this.showLocalTextLink.bannerTitle = val[0].brandName;
          this.showLocalTextLink.bannerOutId = val[0].id;
          this.showLocalTextLink.outHtml = ''

        }else {
          this.equipmentTitleShow = true;
          this.showLocalTextLink.bannerJumpType = 4804;
          this.showLocalTextLink.jumpTypeName = '产品列表';

          this.showLocalTextLink.bannerOutId= '';
          for(let i =0;i< val.length;i++) {
            this.showLocalTextLink.bannerOutId = this.showLocalTextLink.bannerOutId + val[i].id + '/'
          }
          this.showLocalTextLink.outHtml = ''
        }

        console.log(this.showLocalTextLink);
      },
      equipmentSelectAll(val) {
        this.$refs.posterTable.clearSelection();
        this.ChooseList = val;
        this.showLocalTextLink.outHtml='';
        this.posterTitleShow = false;
        if(val.length ===0) {
          this.equipmentTitleShow = false;
          return
        }else {
          this.equipmentTitleShow = true;
          this.showLocalTextLink.bannerJumpType = 4804;
          this.showLocalTextLink.jumpTypeName = '产品列表';

          this.showLocalTextLink.bannerOutId= '';
          for(let i =0;i< val.length;i++) {
            this.showLocalTextLink.bannerOutId = this.showLocalTextLink.bannerOutId + val[i].id + '/'
          }
          this.showLocalTextLink.outHtml = ''
        }

        console.log(this.showLocalTextLink);
      },
      changeBannerTitle(title) {
        this.showLocalTextLink.bannerTitle = title;
        console.log(this.showLocalTextLink);
      },
      changeOutHtml() {
        this.$refs.posterTable.clearSelection();
        this.$refs.equipmentTable.clearSelection();
        this.posterTitleShow = false;
        this.equipmentTitleShow = false;
        this.ChooseList = [];
        this.showLocalTextLink.bannerJumpType = 4807;
        this.showLocalTextLink.jumpTypeName = '外部链接';
        this.showLocalTextLink.bannerTitle = this.showLocalTextLink.outHtml;
        this.showLocalTextLink.bannerOutId = '';
      },
      sendBannerData() {
        console.log(this.ChooseList.length)
        console.log(this.tableIndex)
        console.log(this.equipmentTitle)


        if(this.ChooseList.length ===0 && this.showLocalTextLink.outHtml ==='') {
          // alert('请至少选中一条海报或者产品或者填写一个外部链接');
          this.$notify.error({
            title: '错误',
            message: '请至少选中一条海报或者产品或者填写一个外部链接'
          });
          return
        }
        if(this.tableIndex ==1) {
          if(this.ChooseList.length > 1) {
            if(this.equipmentTitle === '') {
              // alert('请为产品列表填写一个名字');
              this.$notify.error({
                title: '错误',
                message: '请为产品列表填写一个名字'
              });
              return
            }
          }
        }
        if(this.tableIndex ==0) {
          if(this.ChooseList.length > 1) {
            if(this.posterTitle === '') {
              this.$notify.error({
                title: '错误',
                message: '请为海报列表填写一个名字'
              });
              // alert('请为海报列表填写一个名字');
              return
            }
          }
        }
        this.$emit('sendBannerData', this.showLocalTextLink);
        // 传递数据后清空选择
        this.ChooseList = [];
        this.$refs.posterTable.clearSelection();
        this.$refs.equipmentTable.clearSelection();
        this.showLocalTextLink.outHtml='';
      }
    }
  }
</script>

<style scoped lang="scss">
  @import url(../../assets/css/alert-panel.css);
  .footer {
    margin-top: 10px;
    color: $text-tips;
  }
  .oprate-box {
    float: right;
  }
  .oprate-box a {
    display: inline-block;
    width: 96px;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    text-align: center;
  }
  .add-new-btn-box {
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
  }
</style>

