<template>
    <div>
      <div class="message-title">咨询管理</div>
      <p class="sub-title">在收到咨询后，请及时有效的与用户进行电话沟通，争取留住每一个意向客户。在您和用户电话沟通后，请修改当前咨询信息的状态为“已联系”！</p>
      <div class="message-cell" v-for="(item,index) in lists">
        <span class="visitor-pic"></span>
        <div class="visitor-name">{{item.name}}
          <span class="contact-state">当前状态：
						<!--<select name="" id="" class="state-select" style="width:80px;">-->
							<!--<option value="">未联系</option>-->
							<!--<option value="">已联系</option>-->
						<!--</select>-->
            <el-select v-model="item.option" v-bind:disabled="item.option =='选项2'" size="mini" placeholder="请选择">
              <el-option
                v-for="option in options"
                :key="option.value"
                :label="option.label"
                :value="option.value">
              </el-option>
            </el-select>
					</span>
        </div>
        <div class="visitor-message">这个机型的设备，在一朋友工厂看到过，工作确实不懒。 还是比较推荐购买的！<span class="message-from">（来自：售前服务需求）</span></div>
        <div class="time-reply"><span>3小时前</span><span class="reply-btn" v-if="!item.seen" @click="checkContact(item)">查看联系方式</span></div>
        <div class="reply-box" v-if="item.seen">
          <span class="visitor-info-key">姓名：<em class="visitor-info-value">赵大致</em></span>
          <span class="visitor-info-key">手机号：<em class="visitor-info-value">15038182846</em></span>
          <span class="visitor-info-key">公司名称：<em class="visitor-info-value">上海互缘信息技术服务有限公司</em></span><br>
          <span class="visitor-info-key">地址：<em class="visitor-info-value">上海市徐汇区桂平路391号新漕河泾国际商务中心B座906室</em></span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "seek-manage",
        data() {
            return {
              lists: [
                {
                  'name': '周工',
                  'message': '这个机型的设备，在一朋友工厂看到过，工作确实不懒。 还是比较推荐购买的！',
                  'option': '选项1',
                  'seen': false
                },
                {
                  'name': '张三',
                  'message': '这个机型的设备，在一朋友工厂看到过，工作确实不懒。 还是比较推荐购买的！',
                  'messageto': '高速立式车削卧式加工中心',
                  'option': '选项2',
                  'seen': true
                }
              ],
              options: [
                {
                  value: '选项1',
                  label: '未联系'
                }, {
                  value: '选项2',
                  label: '已联系'
                }
              ],
              value: ''
            }
        },
        methods: {
          checkContact: function (item) {
            this.$confirm('查看该客户联系方式，系统会自动从您的账户中扣除200元。确定要查看么？', '温馨提示', {
              confirmButtonText: '查看',
              confirmButtonClass: 'confirm-btn',
              cancelButtonClass: 'confirm-btn',
              closeOnClickModal: false,
              cancelButtonText: '取消',
              center: true
            }).then(() => {
              item.seen = true
            }).catch(() => {

            });
          }
        }
    }
</script>

<style scoped>
  @import url('../assets/css/deal-manage.css');
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
