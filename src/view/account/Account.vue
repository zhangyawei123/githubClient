<template>
  <div>
    <AlertPanel :showState="jiajia" v-if="false" ref="demodemo" @sendOutData="showchildData" />


    <el-button type="primary" @click="dialogVisible = true">点击打开弹窗</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="860px">
      <AlertPanel :showState="jiajia" v-if="true" ref="demodemo" @sendOutData="showchildData" @closeDialogVisible="closeDialogVisible" />
      <span slot="footer" class="dialog-footer">
        <span style="float:left; color: #00a0e9">这里有一段信息提示</span>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getChildDat">确 定</el-button>
      </span>
    </el-dialog>
    <div style="height: 100px;width: 100px;background: #00a0e9" @click="inppuyClick"></div>
    <div style="margin-top:20px;">
      <span>请上传：</span>
      <span style='color:blue;'>(支持'3gp','rmvb','flv','wmv','avi','mkv','mp4','mp3','wav'格式)</span>
    </div>
    <div style="margin-top:10px;">
        <input type="file" name="videoFile" class="upinput" />
    </div>
    <!-- 上传进度条及状态： -->
    <div class="progress">
      <div class="bar" style="width: 0%;"></div>
      <div class="upstatus" style="margin-top:10px;"></div>
    </div>
    <!-- 预览框： -->
    <div class="preview"></div>
  </div>
</template>

<script>
  import fileupload from '../../../static/toutiao/jquery-file-upload-pack.js'
  import AlertPanel from '../common/AlertPanel'
    export default {
      data() {
        return {
          jiajia: 'api/product/equipment/parts',
          dialogVisible: false
        }
      },
      mounted(){
        $(".upinput").fileupload({
          url:"http://192.168.0.69:8010/xjy-web-user/api/common/video/upload",//文件上传地址，当然也可以直接写在input的data-url属性内
          dataType: "json", //如果不指定json类型，则传来的json字符串就需要解析jQuery.parseJSON(data.result);
          formData:function(form){//如果需要额外添加参数可以在这里添加
            return [{name:"oldVideoId",value:$("#videoId").val() || ''},
              {name:"accessToken",value:'324e26fafd4f4871841e1cdae6a5d8c0'}];
          },
          done:function(e,data){
            //done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
            //注意data要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
            //返回的数据在data.result中，这里dataType中设置的返回的数据类型为json
            if(data.result) {
              // 上传成功：
              console.log(data.result);
              $(".upstatus").html(data.result.msg);
              $(".preview").html("<video controls src="+data.result.previewSrc+"></video>");
            } else {
              // 上传失败：
              $(".progress .bar").css("width", "0%");
              $(".upstatus").html("<span style='color:red;'>"+data.result.msg+"</span>");
            }

          },
          progressall: function (e, data) {//上传进度
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $(".progress .bar").css("width", progress + "%");
            $(".upstatus").html("正在上传...");
          }
        });
      },
      components: {
        AlertPanel
      },
      methods: {
        inppuyClick() {
          $(".upinput").click();
        },
        showchildData(data) {
          console.log(data)                   //取子组件的值
        },
        closeDialogVisible() {
          this.dialogVisible = false
        },
        getChildDat () {
          console.log(this.$refs.demodemo.multipleSelection)
          this.dialogVisible = false
        }
      }
    }
</script>
<style>
  @import url(../../assets/css/publish.css);
</style>
