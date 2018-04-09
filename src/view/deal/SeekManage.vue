<template>
    <div>
      <div class="message-title">咨询管理</div>
      <p class="sub-title">在收到咨询后，请及时有效的与用户进行电话沟通，争取留住每一个意向客户。在您和用户电话沟通后，请修改当前咨询信息的状态为“已联系”！</p>
      <div class="message-cell" v-for="(item,index) in lists">
        <span class="visitor-pic"><img :src="item.basicUser.userPic" alt=""></span>
        <div class="visitor-name">{{item.basicUser.nickName}}
          <span class="contact-state">当前状态：
            <el-select v-model="item.dealState" v-bind:disabled="item.dealState == 1" size="mini" placeholder="请选择">
              <el-option
                v-for="option in options"
                :key="option.value"
                :label="option.label"
                :value="option.value">
              </el-option>
            </el-select>
					</span>
        </div>
        <div data-v-128f0705="" class="message-to">咨询了您的产品： {{item.equipmentName}}</div>
        <div class="time-reply"><span>3小时前</span><span class="reply-btn" v-if="!item.isSee" @click="checkContact(item,item.oid)">查看联系方式</span></div>
        <div class="reply-box" v-if="item.isSee">
          <span class="visitor-info-key">姓名：<em class="visitor-info-value">{{item.contact.receiverName}}</em></span>
          <span class="visitor-info-key">手机号：<em class="visitor-info-value">{{item.contact.receiverPhone}}</em></span>
          <span class="visitor-info-key" v-if="item.contact.receiverCompany">公司名称：<em class="visitor-info-value">{{item.contact.receiverCompany}}</em></span><br>
          <span class="visitor-info-key">地址：<em class="visitor-info-value">{{item.contact.receiverAddress}}</em></span>
        </div>
      </div>
    </div>
</template>

<script>
  import {httpUrl} from '../../http_url'
    export default {
        name: "seek-manage",
        data() {
            return {
              lists: [],
              currentPage: 0,
              options: [
                {
                  value: 0,
                  label: '未联系'
                }, {
                  value: 1,
                  label: '已联系'
                }
              ],
              value: '',
            }
        },
        mounted() {
            this.$nextTick(function () {
              this.checkLogIn();
              this.getDataList();
            })
        },
        methods: {
          checkContact: function (item,soid) {
            var _this= this;
            this.$confirm('查看该客户联系方式，系统会自动从您的账户中扣除200元。确定要查看么？', '温馨提示', {
              confirmButtonText: '查看',
              confirmButtonClass: 'confirm-btn',
              cancelButtonClass: 'confirm-btn',
              closeOnClickModal: false,
              cancelButtonText: '取消',
              center: true
            }).then(() => {
              // 不知道为什么这个方法就会跨域借不到数据
              // _this.axios.post(httpUrl + '/api/product/equipment/order/see', {
              //   oid: 100071
              // })
              //   .then(function (response) {
              //     console.log(response);
              //   })
              //   .catch(function (error) {
              //     console.log(error);
              //   });
              $.ajax({
                url: httpUrl + 'api/product/equipment/order/see?accessToken='+_this.$cookie.get('accessToken'),
                type: 'post',
                data:{oid:soid},
                dataType: 'json',
                success: function (data) {
                  // console.log(data.data);
                  item.isSee = 1;
                  item.contact = data.data;
                }
              })
            }).catch(() => {
              this.$message('我不看了，你扣我钱啊 ')
            });
          },
          getDataList: function () {
            var _this = this;
            this.axios.get( httpUrl + 'api/product/equipment/orders?accessToken='+_this.$cookie.get('accessToken')+'&currentPage=' + this.currentPage)
              .then(function (response) {
                if (response.data.list.length > 0) {
                  _this.lists= _this.lists.concat(response.data.list);
                }else {

                }
              })
              .catch(function (error) {
                console.log(error);
              });
          },
          loadMore() {
            this.currentPage++;
            this.getDataList();
          }
        }
    }
</script>

<style scoped>
  @import url('../../assets/css/deal-manage.css');
  .el-select {
    width: 100px;
  }
</style>
<style>
  .el-message-box {
    width: 360px;
  }
  .confirm-btn {
    width: 96px;
    height: 36px;
    font-size: 14px;
  }
</style>
