<template>
  <div>
    <div class="jc-demo-box">

      <img src="blob:http://localhost:8080/ee521ead-4fcf-4e66-b9ff-f542d435e631" id="target" alt="[Jcrop Example]" />


    </div>
  </div>
</template>

<script>
    export default {
      data() {
        return {
        }
      },
      mounted(){
        jQuery(function($){
          var opt = {
            allowSelect: true,
            baseClass: 'jcrop',
            aspectRatio:1.43,
            maxSize:[387, 270],
            minSize:[63 , 42],
          };
          var jcropApi;

          $('#target').Jcrop(opt,function(){
            jcropApi = this;
            var imgC = jcropApi.getWidgetSize();
            var width = imgC[0];
            var height = imgC[1];
            if(width > 387){
              width = (width - 387)/2;
            }else{
              width = 0;
            }
            if(height > 270){
              height = (height - 270)/2;
            }else{
              height = 0;
            }
            var arr = [width, height].concat(jcropApi.getWidgetSize());
            opt = $.extend(opt , {setSelect : arr});
            jcropApi.setOptions(opt);
          });
        });
      },
      components: {
      },
      methods: {

      }
    }
</script>
<style>
  @import '../../../static/jcrop/jquery.Jcrop.css';
</style>
