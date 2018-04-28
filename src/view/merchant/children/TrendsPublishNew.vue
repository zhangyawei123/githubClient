<template>
    <div>
      <div class="crumbs">
        <div class="crumbs-inner">
          <router-link to="/trends">返回上一级</router-link><i class="crumbs-icon">|</i><router-link to="/trends">动态管理</router-link><i class="crumbs-icon">&gt;</i><span>发布上新</span>
        </div>
      </div>
      <div class="product-info-item">
        <dl>
          <dt>* 海报标题：</dt>
          <dd>
            <div class="video-title">
              <el-input v-model="title" placeholder="请输入视频标题" :maxlength="30">
              </el-input>
              <span>{{title.length}} / 80</span>
            </div>
          </dd>
          <dt>* 上新内容：</dt>
          <dd>
            <table v-if="tableData.picUrl" class="component configure">
              <thead>
              <tr>
                <td v-if="tableData.showType==='海报'" class="name">海报标题</td>
                <td v-else class="name">产品名称</td>
                <td class="profession">品牌</td>
                <td class="system">专业</td>
                <td class="location">产地</td>
                <td class="operate">操作</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="name">
                  <span class="component-pic" :class="{'poster':tableData.showType==='海报'}">
                    <img :src="tableData.picUrl" alt="">
                  </span>
                  {{tableData.title}}
                </td>
                <td>{{tableData.brandName}}</td>
                <td>{{tableData.majorName}}</td>
                <td>{{tableData.countryName}}</td>
                <td><a class="delete" href="javascript:void(0)" @click="PublishNewDialogVisible=true">重新添加</a></td>
              </tr>
              </tbody>
            </table>
            <a href="javascript:void(0)" v-if="!tableData.picUrl" @click="PublishNewDialogVisible=true" class="add-btn">添加</a>
            <div class="tips"><br>最多添加1条，建议选择热门产品或者重点推出的产品。</div>
          </dd>
        </dl>
        <a href="javascript:void(0)" class="save-btn" @click="saveData">保存</a>
      </div>
      <el-dialog
        title="添加动态内容"
        :visible.sync="PublishNewDialogVisible"
        width="860px">
        <PublishNewPanel @sendBannerData="getBannerData" @closeDialog="PublishNewDialogVisible=false" ref="PublishNewPanel" />
      </el-dialog>
    </div>
</template>

<script>
  import {httpUrl} from "../../../http_url";
  import PublishNewPanel from '../../common/PublishNewPanel'
    export default {
      name: "trends-publish-new",
      data() {
        return {
          title: '',
          PublishNewDialogVisible: false,
          tableData: {},
          vids: '',
          eids: '',
        }
      },
      mounted() {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
      },
      components: {
        PublishNewPanel
      },
      methods: {
        getBannerData(data) {
          console.log('这是子组件传出来的数据');
          console.log(data);
          this.tableData.picUrl = data.videoCover || data.picUrl;
          this.tableData.title = data.title || data.brandName + data.modelNum;
          this.tableData.brandName = data.brandName;
          this.tableData.majorName = data.majorName;
          this.tableData.countryName = data.countryName;
          this.tableData.showType = data.showType;
          this.eids = data.eid || '';
          this.vids = data.vid || '';
          this.PublishNewDialogVisible=false;
        },
        saveData() {
          if (this.title==='') {
            this.$notify.error({
              title: '错误',
              message: '请填写标题'
            })
            return
          }else if(this.title.length < 4) {
            this.$notify.error({
              title: '错误',
              message: '标题不能少于四个字'
            })
            return
          }
          if (!this.tableData.picUrl) {
            this.$notify.error({
              title: '错误',
              message: '请至少添加一条海报或者产品'
            })
            return
          }
          let _this = this;
          this.axios.post(httpUrl + 'api/company/dynamic/new/add/save',this.qs.stringify({
            accessToken: this.$cookie.get('accessToken'),
            title: _this.title,
            vids: _this.vids,
            eids: _this.eids
          }))
            .then(function (response) {
              console.log(response.data);
              if(response.data.code ===1) {
                _this.$message({
                  message: '恭喜你，保存成功',
                  type: 'success'
                });
                _this.$router.push({path: '/trends'})
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      }
    }
</script>

<style scoped lang="scss">
  @import url(../../../assets/css/publish.css);
  .stag {
    padding: 0;
  }
  .crumbs {
    background: #fff;}
  .crumbs-inner {
    margin: 0 40px;
    padding: 30px 0 20px;
    border-bottom: 1px solid $border-color;
  }
  .crumbs a {color: #1278ec;}
  .crumbs-icon { margin: 0 5px; color: #1278ec;}
  .video-title .el-input {
    width: 760px;
  }
  .tips {
    float: left;
  }
  .component {
    margin-bottom: 0;
  }
</style>
