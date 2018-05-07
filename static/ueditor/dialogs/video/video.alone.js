var showTimeInterval = null;

var app = angular.module('myApp', []);

app.service('formService' , function($http){
	this.postForm = function($scope ,formData ,formService){
		//将按钮至灰色#f4f5f7
		$(".fb").css("background" , "#f4f5f7");
		$scope.publishForm = function(){
			validator.display(("正在提交，请不要重复点击！") , 2000 );
		};
		var vid = $("#videoId").val();
		$scope.formData.vid = vid;
		var id = $scope.formData.id;
		if(id != null && id != '' && id != undefined){
			//修改
			$http({
				method: 'POST',
				url: '/xinjiyuan_user/media/updateVideo',
				params : formData
			}).then(
					function successCallback(response) {
						if(response.data.data == 1){
							alert("修改成功！");
						}else{
							alert("修改失败！");
						}
					},
					function errorCallback(response) {
						alert("修改失败！");
					}
			);
		}else{
			//新增
			$http({
				method: 'POST',
				url: '/xinjiyuan_user/media/submitVideo',
				params : formData
			}).then(
				function successCallback(response) {
					if(response.data.data == 1){
						validator.display(("发布成功！") , 2000 , function(){
							window.location.href = "/xinjiyuan_user/manage/list?type=0";
						});
					}else{
						//将按钮至原来的#f4f5f7，设置提交的方法为原本的方法
						validator.display(("发布失败，请重新提交！") , 2000 , function(){
							$(".fb").css("background" , "#0f7ddb");
							$scope.publishForm = function(){
								publishFormFn($scope , formService);
							};
						});
					}
				},
				function errorCallback(response) {
				}
			);
		}
	}
	this.initForm = function ($scope , id){
		
		$http({
			method: 'POST',
			url: '/xinjiyuan_user/media/searchVideoById?id='+id
	    }).then(
    		function successCallback(response) {
	    		
	    		$scope.formData.title = response.data.title;
	    		$scope.formData.content = response.data.content;
	    		$scope.formData.videoType = response.data.videoType;
	    		
	    		$("#video-feedback-name").text(response.data.title);
	    		$("#videoId").val(response.data.vid);
	    		$scope.formData.vid = response.data.vid;
	    		
	    		$("#poster-con img").get(0).src = response.data.videoCoverUrl;
	    		$scope.formData.videoCover = response.data.videoCoverUrl;
	    		
	        },
	        function errorCallback(response) {
	            // 请求失败执行代码
	        }
        );
	}
});
function publishFormFn($scope , formService ){
	var opt = {
        	list : [{"id":"title","nulltext":"标题不能为空","exper":"^[\\s\\S]{5,30}$","errortext":"标题长度应该在5-30字之间"},
        	        {"nulltext":"请填写标签" ,"content" : $scope.formData.keyWords},
        	        {"nulltext":"请上传封面" ,"content" : $scope.formData.videoCover}
        			],
			display : $(".affix-top span").get(0)
        }
	if(validator.check(opt)){
		formService.postForm($scope , $scope.formData , formService);
	}
};
app.controller('siteCtrl', function($scope, formService) {
	$scope.formData = {};
 	$scope.publishForm = function(){
 		publishFormFn($scope , formService );
 	}
 	$scope.initialization = function(){
 		var id = $("#mediaId").val();
 		if(id!=null && id != '' && id!=undefined){
 			$scope.formData.id = id;
 			formService.initForm($scope , id);
 		}
 	}
});

$(function() {
	
	//设置标题的字数限制
	var t= $("#title"), e = $(".title_tip"),
	i = this,
	n = null,
	o = 0;
	e.min = 5;
	t.bind("blur", function() {
		checkTitleLength(t , e)
	}); 
	t.bind("keyup", function() {
		clearTimeout(n), 0 == o ? n = setTimeout(function() {
			checkTitleLength(t , e)
		}, 20) : o = 0
	}); t.bind("paste", function() {
		clearTimeout(n), o = 1, n = setTimeout(function() {
			checkTitleLength(t , e)
		}, 10)
	});
	function checkTitleLength(t , s){
		var i = t.val().length,
		n = i + "/" + 30,
		o = t.parent(),
		s = o.find(".title_tip");
		s.html(n), i > 30 ? s.addClass("title_red") : i < e.min && 0 != i ? s.addClass("title_red") : s.removeClass("title_red")
	}
	
	//和头条有两个功能不一样，
    // 第一个是在同一个tag写完后按下tab键可以新增一个标签，因为没有判断按下tab的事件
    // 第二个是最后一个tag如果没有内容的话，再点击其他位置的话会闪烁一下，是因为将最后一个标签给删除了，然后又新增了一个标签。
    var tagDiv = document.getElementById("tag");
    tagDiv.addEventListener("click" ,function(e){
        //点击目标
        if(e.target.id == "tag"){
            if($("#tag span").length < 5){
                var html = '<span class="tag j-tag"><a class="tag-content j-tag-content" value="" contenteditable="true"></a><a class="tag-close"></a></span>';
                $("#tag").append(html);
                $("#tag span:last .tag-content").focus();
                var nodes = document.getElementsByClassName("j-tag");
                //设置tag的监听事件
                nodes[nodes.length-1].addEventListener("click" , function(e1){
                    if(e1.target.className == 'tag-close'){
                        $(this).remove();
                    }else{
                        $(".tag-content" , this).focus();
                    }
                }, true);
                //设置tag中输入框的事件
                $("#tag span:last .tag-content").keydown(function(event){
                    var str = this.innerHTML;
                    //判断输入框的字数
                    if(str.length > 10){
                        if(event.which!=9 && event.which!=8){
                            return false;
                        }
                    }
                }).blur(function(){
                    var str = this.innerHTML;
                    if(str == ''){
                        $(this).parent().remove();
                    }else if(str.length > 0){
                        str = str.substring(0 , 10);
                        this.setAttribute("value" ,str);
                        this.innerHTML = str;
                    }
                    readTag();
                });
            }
        }
    },true);
    
    function readTag(){
   		var controllerScope = angular.element($("body")).scope();
    	var tagValue = "";
    	$("#tag").find("a.tag-content").each(function(){
    		tagValue += this.innerHTML + ",";
    	});
    	if(tagValue != ''){
    		tagValue = tagValue.substring(0 , tagValue.length-1); 
    	}
    	controllerScope.formData.keyWords = tagValue;
    }
	//绑定上传封面的弹出框的tab（上传封面，系统封面）的点击事件
	 $(".j_video_poster_nav").bind("click",function(){
		 var $_this = $(this);
		 if($_this.parent().children().index($_this) == 1){
			 //上传封面
			 $(".video-uploader-main").show();
			 $(".videoposter-main").hide();
			 $(".videoposter-footer").hide();
			 if($("#videoPicUrl").val() != ''){
				 $(".video-uploader-upload-background").hide();
				 $("#videoPic").show();
			 }
		 }else{
			 var videoId = $("#videoId").val();
			 if(videoId == ''){
				 $(".videoposter-items[data-node='tip']").show();
				 $(".videoposter-items[data-node='con']").hide();
			 }else{
				 $(".videoposter-items[data-node='tip']").hide();
				 $(".videoposter-items[data-node='con']").show();
				 //选择封面
				 $.ajax({
					type : "POST",
					url : server_url + "/video/searchVideoPicByVideoId",
					async : true,
					data:{videoId :videoId},
					dataType : 'json',
					success : function(result) {
						var html = "";
						$(".videoposter-items[data-node='con']").html("");
						if(result.videoPic.length > 0){
							$.each(result.videoPic , function(i , o ){
								html += "<li class=\"videoposter-item\" data-node=\"item\" data-index=\""+i+"\" data-source=\""+ o.sourcePicUrl +"\">";
								html += "<div class=\"videoposter-item-wrap\">";
								html += "<img class=\"videoposter-image\" src=\""+o.picUrl+"\">";
								html += "<div class=\"videoposter-image-hover\"></div>";
								html += "</div></li>";
							});
							$(".videoposter-items[data-node='con']").append(html);
							bind_click_videopic();
						}else{
							$(".videoposter-items[data-node='tip']").show();
							$(".videoposter-items[data-node='con']").hide();
						}
					}
				});
			 }
			 $(".video-uploader-main").hide();
			 $(".videoposter-main").show();
			 $(".videoposter-footer").show();
		 }
		 $_this.siblings().removeClass("active");
		 $_this.addClass("active");
	 });
	
	 //视频封面弹出框，点击取消按钮
	 $("#modal-cover .close, #modal-cover .cancel").click(function(){
		 $("#modal-cover").hide();
		 $(".overlay").hide();
	 });
	//点击设置视频封面
	 $("#poster-cell #poster-con button").click(function(){
		 $("#modal-cover").show();
		 $(".overlay").show();
		 $(".j_video_poster_nav:first").click();
	 });
	 //视频封面弹出框上传封面
	 $(".video_uplod_button").click(function(){
		 $(".j_video_poster_nav:first").click();
		 $("#formFile1").find(":file").click();
	 });
	 add_upload_video();
	 update_upload_video();
});
//上传视频
//没有上传视频的时候，上传视频
function add_upload_video(){
	$("#video_file").change(function(){
		$("#video-select").hide();
		$("#video-uploading").show();
		$("#edit-con").show();
	});
	upload_video($("#video_file").get(0));
}

//已经上传视频了，修改上传视频
function update_upload_video(){
	$("#retry_video_file").change(function(){
		$("#video-uploading").show();
		$("#video-uploaded").hide();
	});
	upload_video($("#retry_video_file"));
}
//上传视频
function upload_video(obj){
	$(obj).fileupload({
		url:server_url+"/video/uploadVideoFile",//文件上传地址，当然也可以直接写在input的data-url属性内
		dataType: "json", //如果不指定json类型，则传来的json字符串就需要解析jQuery.parseJSON(data.result);
		formData:function(form){//如果需要额外添加参数可以在这里添加
			return [{name:"oldVideoId",value:$("#videoId").val()}];
		},
		done:function(e,data){
			//done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
			//注意data要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
			//返回的数据在data.result中，这里dataType中设置的返回的数据类型为json
			
			//修改视频上传图片
			$("#video-feedback").removeClass("video-success");
			if(data.result.sta) {
				
				$("#video-uploading").hide();
				$("#video-uploaded").show();
				// 上传成功：
				$("#videoId").val(data.result.videoId);
				$("#video-feedback-name").text(data.result.videoName);
				$("#video-feedback-text").html(data.result.msg);
				//生成封面图 片
				$.ajax({
					type : "POST",
					url : server_url+"/video/getVideoPic",
					async : true,
					data:{videoId : data.result.videoId },
					dataType : 'json',
					success : function(result) {
					}
				});
				//定时请求
				showTimeInterval = setInterval(checkVideoPic,5000);
			} else {
				$("#video-uploading").show();
				$("#video-uploaded").hide();
				// 上传失败：
				$("#progressbar-inner").animate( { width: "0%"} , 200 );
				$("#video-data").text("");
				$("#video-feedback-text").html("上传失败，请重新上传！");
				alert("上传失败，请重新上传！");
			}
		},
		progress: function (e, data) {//上传进度
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$("#progressbar-inner").animate( { width: progress + "%"} , 20 );
			$("#video-data").text(progress + "% / 100%");
		}
	});
}


/**
 * 绑定封面图片的点击事件
 */
function bind_click_videopic(){
	var cover_image = document.getElementsByClassName("videoposter-item-wrap");
	for(var i = 0 ; i < cover_image.length ; i ++){
		var obj = cover_image[i];
		obj.onmouseover = function(){
			$(".videoposter-image-hover" , this).show();
		}
		obj.onmouseout = function(){
			if(!$(this).parent().hasClass("selected")){
				$(".videoposter-image-hover" , this).hide();
			}
		}
		obj.onclick = function(){
			var $_parent = $(this).parent();
			if(!$_parent.hasClass("selected")){
				var $_select = $_parent.siblings(".selected");
				$_select.removeClass("selected");
				$_select.find("div.videoposter-image-hover").hide();
				$_parent.addClass("selected");
			}else{
				$_parent.removeClass("selected");
				$_parent.find("div.videoposter-image-hover").hide();
			}
		}
	}
}
//封面弹出框，上传封面
function uploadVideoPic(){
	//上传该文件
	 $('#formFile1').ajaxSubmit({
		success: function(data) {
			data = $.parseJSON(data.replace(/<.*?>/ig,""));
			$("#videoPic").prev().hide();
			$("#videoPic").show();
			$("#videoPic").get(0).src=rootUrl+data.picUrl;
			$("#videoPicUrl").val(data.picUrl);
			$("#confirmButton").show();
		}
	});
}
//定时查询是否生成封面
function checkVideoPic(){
	var videoId = $("#videoId").val();
	$.ajax({
		type : "POST",
		url : server_url+"/video/searchVideoPicByVideoId",
		async : true,
		data:{videoId :videoId },
		dataType : 'json',
		success : function(result) {
			if(result.resultCode == 1 && result.videoPic.length > 0){
				//修改视频上传图片
				$("#video-feedback").addClass("video-success");
				$("#video-feedback-text").html("上传成功！生成封面成功！");
				//去除定时请求
				clearInterval(showTimeInterval);
			}
		}
	});
}
//点击上传封面页面的确认
function confirmButton1(){
	var videoPicUrl = $("#videoPicUrl").val();
	if(videoPicUrl != ''){
//		$("#uploadFile").val(videoPicUrl);
		$("#poster-con img").get(0).src = $("#videoPic").attr("src");
		var controllerScope = angular.element($("body")).scope();
		
		//这个视频封面不需要id，因为后台数据库将图片存放在视频封面表中了***********************************************
		controllerScope.formData.videoCover = $("#videoPic").attr("src");
	}
	$("#modal-cover .cancel").click();
}
//点击系统封面页面的确认
function confirmButton2(){
	var data_source = $("#modal-cover .selected").attr("data-source");
	if(data_source != undefined && data_source != ''){
//		$("#uploadFile").val(data_source);
		$("#poster-con img").get(0).src = $("#modal-cover  .selected").find("img").attr("src");
		var controllerScope = angular.element($("body")).scope();
		
		//这个视频封面不需要id，因为后台数据库将图片存放在视频封面表中了***********************************************
		controllerScope.formData.videoCover = $("#modal-cover  .selected").find("img").attr("src");
	}
	$("#modal-cover .cancel").click();
}