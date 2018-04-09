<template>
  <div>
    <AlertPanel :showState="jiajia" />
    <script id="container" name="content" type="text/plain">
        这里写你的初始化内容
    </script>
    <div>
      dashijdjs
    </div>
  </div>
</template>

<script>
  import AlertPanel from '../common/AlertPanel'
    export default {
      data() {
        return {
          jiajia: 'api/product/equipment/parts'
        }
      },
      mounted(){
        var ue = UE.getEditor('container');
      },
      components: {
        AlertPanel
      },
      methods: {

      }
    }
</script>
<style>
  @import url(../../assets/css/publish.css);
</style>
