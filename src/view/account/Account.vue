<template>
  <div>
    <AlertPanel :showState="jiajia" v-if="true" ref="demodemo" @sendOutData="showchildData" />
  </div>
</template>

<script>
  import fileupload from '../../../static/toutiao/jquery-file-upload-pack.js'
  import AlertPanel from '../common/AlertPanel'
    export default {
      data() {
        return {
          jiajia: 'api/product/equipment/parts'
        }
      },
      mounted(){

      },
      components: {
        AlertPanel
      },
      methods: {
        showchildData(data) {
          console.log(data)                   //取子组件的值
        }
      }
    }
</script>
<style>
  @import url(../../assets/css/publish.css);
</style>
