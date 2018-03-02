<template>
  <div>
    <VueImgInputer v-model="file" accept="image/*" size="small" noMask customerIcon="&#xe66c;" nhe @onChange="fileChange" placeholder=""></VueImgInputer>
  </div>
</template>

<script>
  import VueImgInputer from 'vue-img-inputer'
    export default {
        data() {
            return {
              file: null
            }
        },
      components: {
        VueImgInputer
      },
      methods: {
        fileChange(file, name) {
          // console.log('File:', file);
          // console.log('FileName:', name);
          console.log(file);
        }
      }
    }
</script>

<style scoped>
  .img-inputer {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
  .img-inputer.nhe:hover {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
  .img-inputer--small {
    margin-top: 50px;
    width: 50px!important;
    height: 50px!important;
  }
  .img-inputer__preview-box {
    background: none!important;
  }
</style>
