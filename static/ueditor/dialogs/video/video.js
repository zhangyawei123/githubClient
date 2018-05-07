var showTimeInterval = null;
var ue = UE.getEditor('editor');

var app = angular.module('myApp', []);

app.service('formService' , function($http){
	this.postForm = function($scope , formData , formService){
		console.log($scope.formData);
		//将按钮至灰色#f4f5f7
		$(".fb").css("background" , "#f4f5f7");
		$scope.publishForm = function(){
			validator.display(("正在提交，请不要重复点击！") , 2000 );
		};
		var aid = $scope.formData.aid;
		if(aid!=null && aid != '' && aid!=undefined){
			//修改
			$http({
				method: 'POST',
				url: '/xinjiyuan_user/media/updateArticle',
				params : formData
			}).then(
					function successCallback(response) {
						console.log(response.data);
						if(response.data.data == 1){
							alert("修改成功！");
						}else{
							alert("修改失败！");
						}
					},
					function errorCallback(response) {
						console.log(response.data);
						alert("修改失败！");
					}
			);
		}else{
			//新增
			$http({
				method: 'POST',
				url: '/xinjiyuan_user/media/submitArticle',
				data : $.param(formData),
				headers: {  
                    'Content-Type': 'application/x-www-form-urlencoded'  
                }  
			}).then(
				function successCallback(response) {
					var result = response.data;
					if(result.data == '1'){
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
					console.log(response.data);
				}
			);
		}
	};
	this.initForm = function ($scope , aid){
		$http({
			method: 'POST',
			url: '/xinjiyuan_user/media/searchArticleByAid?aid='+aid
	    }).then(
    		function successCallback(response) {
	    		console.log(response.data);
	    		
	    		$scope.formData.title = response.data.title;
	    		$("#title").blur();
	    		
	    		$scope.formData.articleType = response.data.articleType;
	    		$scope.formData.coverNum = response.data.coverNum;
	    		$scope.formData.cover1 = response.data.coverImages[0].imageId;
	    		
	    		var html = '<img src="'+response.data.coverImages[0].imageUrl+'" style="opacity: 1;height: 100%;width: 100%;">';
				$(".front-cover-img:eq(0)").prepend(html);
	    		
	    		if($scope.formData.coverNum == 3){
	    			$scope.formData.cover2 = response.data.coverImages[1].imageId;
	    			html = '<img src="'+response.data.coverImages[1].imageUrl+'" style="opacity: 1;height: 100%;width: 100%;">';
	    			$(".front-cover-img:eq(1)").prepend(html);
	    			
	    			$scope.formData.cover3 = response.data.coverImages[2].imageId;
	    			html = '<img src="'+response.data.coverImages[2].imageUrl+'" style="opacity: 1;height: 100%;width: 100%;">';
	    			$(".front-cover-img:eq(2)").prepend(html);
	    		}
	    		ue.addListener("ready", function () {
	    	        // editor准备好之后才可以使用
	    	        ue.setContent(response.data.content);
    	        });
	        },
	        function errorCallback(response) {
	            // 请求失败执行代码
	        	console.log(response.data);
	        }
        );
	}
});
function publishFormFn($scope , formService){
	var opt = {
		list : [{"id":"title","nulltext":"标题不能为空","exper":"^[\\s\\S]{5,30}$","errortext":"标题长度应该在5-30字之间"},
		        {"nulltext":"内容不能为空" ,"content" : ue.getContent()},
		        {"id" : "channel_tags" , "nulltext" : "请选择分类"},
		        {"nulltext":"请填写标签" ,"content" : $scope.formData.keyWords}
				],
		display : $(".affix-top span").get(0)
	}
	if(validator.check(opt)){
		$scope.formData.content = ue.getContent();
		console.log($scope.formData);
		formService.postForm($scope , $scope.formData , formService);
	}
}

app.controller('siteCtrl', function($scope, formService) {
	$scope.formData = {};
	$scope.formData.coverNum = 0;
 	$scope.publishForm = function(){
 		publishFormFn($scope , formService);
 	};
 	$scope.initialization = function(){
 		var aid = $("#aid").val();
 		if(aid!=null && aid != '' && aid!=undefined){
 			$scope.formData.aid = aid;
 			formService.initForm($scope , aid);
 		}
 	}
});
$(function(){

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
	$(".upinput").change(function(){
		delVideo();
		$(".overlay").hide();
		$("#video-modal").hide();
		$("#video-card").show();
		$("#video-uploading").show();
	});
	
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
                        readTag();
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
    
    
  //点击弹出弹出封面
	$(".front-cover-img").click(function(){
		var jbody = document.getElementById('ueditor_0').contentWindow.document.body;
		//设置点击的是那个
		var $img = $("p img[class!='remoteImageErrorPlaceholder']",jbody);
		if($img.length > 0){
			$(".front-cover-img").removeAttr("data-selected");
			$(this).attr("data-selected", "1");
			$("#cover-select-modal").show();
			$(".overlay").show();
			document.documentElement.style.overflow = "hidden";
			//
			$(".cover-select-items").html("");
			//
			var html = "";
			$img.each(function(){
				html += '<li><img src="'+this.src+'" "><div class="cover-img-hover"></div></li>';
			});
			$(".cover-select-items").html(html);
			bind_click_imagepic();
		}else{
			alert("您的文章正文中无可用图片，请先上传！");
		}
	});
	 $('#fileupload').fileupload({
		dataType: 'json',
		done: function (e, data) {
			$.each(data.result.files, function (index, file) {
				$('<p/>').text(file.name).appendTo(document.body);
			});
		},
		progressall: function (e, data) {
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#progress .bar').css(
				'width',
				progress + '%'
			);
		}
	});
	 //绑定弹出框的tab的点击事件
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
					url : server_url+"/video/searchVideoPicByVideoId",
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
	 $("#video-modify-poster").click(function(){
		 $("#modal-cover").show();
		 $(".overlay").show();
		 $(".j_video_poster_nav:first").click();
	 });
	 $(".video_uplod_button").click(function(){
		 $(".j_video_poster_nav:first").click();
		 $("#formFile1").find(":file").click();
	 });
	$(".upinput").fileupload({
		url: server_url+"/video/uploadVideoFile",//文件上传地址，当然也可以直接写在input的data-url属性内
		dataType: "json", //如果不指定json类型，则传来的json字符串就需要解析jQuery.parseJSON(data.result);
		formData:function(form){//如果需要额外添加参数可以在这里添加
			return [{name:"oldVideoId",value:$("#videoId").val()}];
		},
		done:function(e,data){
			//done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
			//注意data要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
			//返回的数据在data.result中，这里dataType中设置的返回的数据类型为json
			if(data.result.sta) {
				$("#video-uploading").hide();
				$("#video-uploaded").show();
				// 上传成功：
				$("#videoId").val(data.result.videoId);
				$("#video-feedback-name").text(data.result.videoName);
				$(".video-success").attr("href" , rootUrl+data.result.previewSrc);
				var controllerScope = angular.element($("body")).scope();
				controllerScope.formData.videoCover = "";
				//生成封面图 片
				$.ajax({
					type : "POST",
					url : server_url+"/video/getVideoPic",
					async : true,
					data:{videoId :data.result.videoId },
					dataType : 'json',
					success : function(result) {
					}
				});
			} else {
				$("#video-uploading").show();
				$("#video-uploaded").hide();
				// 上传失败：
				$(".progress .bar").css("width", "0%");
				alert("上传失败，请重新上传！");
			}
		},
		progress: function (e, data) {//上传进度
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$("#progressbar-inner").css("width", progress + "%");
		}
	});
	//点击删除视频按钮
	$("#video-delete").click(function(){
		$("#pagelet-popalert").show();
		$(".overlay").show();
		$("#popalert-submit").one("click" , function(){
			//确定删除该视频，需要走一个ajax事件，删除该视频
			delVideo();
		})
		$("#popalert-cancel").one("click" , function(){
			//取消删除，将弹出框隐藏掉
			$("#pagelet-popalert").hide();
			$(".overlay").hide();
		})
	});
	
	//添加到正文中
	$("#video-feedback-btn").click(function(){
		insert_video_iframe();
	});
	
	//封面模式
	$("#video-cover .front-cover-radio").click(function(){
		var data_type = $(this).attr("data-type");
		$("#video-cover .front-cover-radio").removeClass("selected");
		$(this).addClass("selected");
		var controllerScope = angular.element($("body")).scope();
		if(data_type == 'none'){
			$(".front-cover-main").hide();
			controllerScope.formData.coverNum = 0;
		}else if(data_type == 'single'){
			$(".front-cover-main").show();
			$("#video-cover .front-cover-cur").animate( { left: "150px"} , 200 );
			$("#video-cover .front-cover-multi").hide();
			controllerScope.formData.coverNum = 1;
		}else{
			$(".front-cover-main").show();
			$("#video-cover .front-cover-cur").animate( { left: "260px"} , 200 );
			$("#video-cover .front-cover-multi").show();
			controllerScope.formData.coverNum = 3;
		}
	});
	//选择图片，点击取消
	$(".cover-select-cancel").click(function(){
		$("#cover-select-modal").hide();
		$(".overlay").hide();
		document.documentElement.style.overflow = "scroll";
		$(".front-cover-img").removeAttr("data-selected");
	}); 
	//选择图片，点击确定
	$(".cover-select-submit").click(function(){
		if($(".cover-select-items li.selected img").length>0){
			var pic_src = $(".cover-select-items li.selected img").get(0).src;
			$("#cover-select-modal").hide();
			//更新该图片的大小
			var img = new Image();
			img.src = pic_src;
			
			var w = img.width ;
			var h = img.height ;
			if(w > 400){
				h = (h * 400) / w;
				w = 400;
			}
			if(h > 270){
				w = (w * 270) / h;
				h = 270;
			}
			$("#cover-jcrop").css("width" , w);
			$("#cover-jcrop").css("height" , h);
			
			$("#cover-jcrop").attr("src" , pic_src);
			$("#cover-crop-modal").show();
			jcropImg();
		}else{
			alert("您未选择图片！");
		}
	}); 
	//截取图片，点击确定
	$("#cover-crop-modal .cover-crop-submit").click(function(){
		//获取选区的最大高宽
		var $select_pic =$(".cover-select-items li.selected img");
		var pic_src = $select_pic.get(0).src;
		var img = new Image();
		img.src = pic_src;
		img.onload = function(){
			var img_width = img.width;
			var img_height = img.height;
			var select_max_width = jcropApi.getBounds()[0];
			var select_max_height = jcropApi.getBounds()[1];
			//jcropApi.tellSelect().x和jcropApi.tellSelect().y   是左上角的坐标
			//jcropApi.tellSelect().x2和jcropApi.tellSelect().y2   是右下角的坐标
			//jcropApi.tellSelect().w 是选择区域的宽    
			//jcropApi.tellSelect().h 是选择区域的高
			var x = parseInt(jcropApi.tellSelect().x /select_max_width * img_width);
			var y = parseInt(jcropApi.tellSelect().y /select_max_height * img_height);
			var w = parseInt(jcropApi.tellSelect().w /select_max_width * img_width);
			var h = parseInt(jcropApi.tellSelect().h /select_max_height * img_height);
			$.ajax({
				type : "POST",
				url : server_url+"/img/cutOutImage",
				async : true,
				data:{'x' :x , 'y' : y , 'w' : w , 'h' : h , 'image_url': pic_src },
				dataType : 'json',
				success : function(result) {
					var html = "";
					if(result.sta == 1){
						var selectEd = $(".front-cover-img[data-selected='1']");
						if(selectEd.children("img").length > 0){
							selectEd.children("img").attr("src", result.imagePic.url) ;
						}else{
							var html = '<img src="'+result.imagePic.url+'" style="opacity: 1;height: 100%;width: 100%;">';
							selectEd.prepend(html);
						}
						var index = $(".front-cover-img").index(selectEd);
						var controllerScope = angular.element($("body")).scope();
						switch (index) {
							case 0:
								controllerScope.formData.cover1 = result.imagePic.pid;
								break;
							case 1:
								controllerScope.formData.cover2 = result.imagePic.pid;
								break;
							case 2:
								controllerScope.formData.cover3 = result.imagePic.pid;
								break;
							default:
								break;
						}
						selectEd.get(0).onmouseover = function(){
							$(".cover-img-modify" , this).show();
						}
						selectEd.get(0).onmouseout = function(){
							$(".cover-img-modify" , this).hide();
						}
					}
					if(jcropApi!=null){
						jcropApi.destroy();
					}
					$("#cover-crop-modal").hide();
					$(".overlay").hide();
					$(".front-cover-img").removeAttr("data-selected");
					document.documentElement.style.overflow = "scroll";
				}
			});
		}
		
		
	});
	
	//截取图片，点击取消
	$("#cover-crop-modal .cover-crop-cancel").click(function(){
		if(jcropApi!=null){
			jcropApi.destroy();
		}
		$("#cover-select-modal").show()
		$("#cover-crop-modal").hide();
	});

	// 重新上传视频
	$(".video-feedback-retry").click(function(){
		if(window.confirm("重新上传时，当前视频信息会被丢弃，确认？")){
			$(".upinput").click();
		}
	});
	
});

/**
 * 绑定封面图片的点击事件
 */
function bind_click_imagepic(){
	var cover_image = document.getElementsByClassName("cover-select-items")[0];
	for(var i = 0 ; i < cover_image.children.length ; i ++){
		var obj = cover_image.children[i];
		obj.onmouseover = function(){
			$(".cover-img-hover" , this).show();
		}
		obj.onmouseout = function(){
			if(!$(this).hasClass("selected")){
				$(".cover-img-hover" , this).hide();
			}
		}
		obj.onclick = function(){
			var $_this = $(this);
			if(!$_this.hasClass("selected")){
				var $_select = $_this.siblings(".selected");
				$_select.removeClass("selected");
				$_select.find("div.cover-img-hover").hide();
				$_this.addClass("selected");
			}else{
				$_this.removeClass("selected");
				$_this.find("div.cover-img-hover").hide();
			}
		}
	}
}

/**
 * 将视频添加到编辑器中
 */
function insert_video_iframe(){
	//首先判断该视频是否已经添加到正文中了
	var videoId = $("#videoId").val();
	var videoImg = $(".video-success img").attr("src");
	var videoName = $("#video-feedback-name").text();
	if($(ue.document).find(".local-video").length > 0){
		alert("当前视频已经添加到正文中，请勿重复添加");
		return false;
	}
	if(videoId != ''){
		var html = '<p><iframe class="local-video"';
		html += ' id="local-video-' + videoId +'" data-vu="' + videoId + '"';
		html += ' data-id="' + videoId + '" data-img="' + videoImg + '"';
		html += ' data-vname="video.mp4" data-vposter="http://p.pstatp.com/large/9820/3808334921"';
		html += ' src="'+ server_url + '/video/video_iframe?vid='+videoId+'&img='+videoImg+'&name='+videoName+'"';
		html += ' scrolling="no" style="display:block;margin:0 auto;max-width:100%;"';
		html += ' width="450px" height="253px" frameborder="0"></iframe></p>';
		console.log(html);
		ue.execCommand('insertHtml', html);
	}
}

/**
 * 将视频封面添加到编辑器中的视频中，修改编辑器中的editor
 */
function insert_video_iframe_cover(){
	var html = "";
	var videoId = $("#videoId").val();
	var videoImg = $(".video-success img").attr("src");
	var videoName = $("#video-feedback-name").text();
	html += server_url + '/video/video_iframe?vid='+videoId+'&img='+videoImg+'&name='+videoName;
	$(ue.document).find(".local-video").attr("src" , html).attr("data-id", videoId).attr("data-img", videoImg);
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
function previewVideo(file){
	if (file.value!='' && !/\.(mp4)$/.test(file.value)) {
		$.messager.alert('提示信息','视频格式有误!','info');
		file.value="";
	}else if(file.value==''){
		//将进度条设置为0
		return;
	}else{
		$(".progress .bar").css("width", "0");
		$(".uploadProgress").text("上传进度：0%");
	}
 }
//定时查询是否生成封面
function checkVideoPic(){
	var videoId = $("#videoId").val();
	$.ajax({
		type : "POST",
		url : server_url+"/video/searchVideoPicByVideoId.html",
		async : true,
		data:{videoId :videoId },
		dataType : 'json',
		success : function(result) {
			console.log(result);
			if(result.resultCode == 1 && result.videoPic.length > 0){
				$(".upstatus").html("上传成功！生成封面成功！");
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
		$(".video-success img").get(0).src = $("#videoPic").attr("src");
		var controllerScope = angular.element($("body")).scope();
		controllerScope.formData.videoCover = $("#videoPic").attr("src");
		insert_video_iframe_cover();
	}
	$("#modal-cover .cancel").click();
}
//点击系统封面页面的确认
function confirmButton2(){
	var data_source = $("#modal-cover .selected").attr("data-source");
	if(data_source != undefined && data_source != ''){
//		$("#uploadFile").val(data_source);
		$(".video-success img").get(0).src = $("#modal-cover  .selected").find("img").attr("src");
		var controllerScope = angular.element($("body")).scope();
		controllerScope.formData.videoCover = $("#modal-cover  .selected").find("img").attr("src");
		insert_video_iframe_cover();
	}
	$("#modal-cover .cancel").click();
}
//裁剪图片
var jcropApi;
function jcropImg(){
    var opt = {
        allowSelect: true,
        baseClass: 'jcrop',
        aspectRatio:1.78,
        maxSize:[387, 270],
        minSize:[63 , 42],
    };
    $('#cover-jcrop').Jcrop(opt, function() {
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
}

// 删除视频
function delVideo(){
	var videoId = $("#videoId").val();
	if(videoId != null && videoId != ''){
		$.ajax({
			type : "POST",
			url : server_url+"/video/deleteVideoFile",
			async : false,
			data:{oldVideoId : videoId},
			dataType : 'json',
			success : function(result) {
				if(result.sta == 1){
					//成功
					$("#pagelet-popalert").hide();
					$(".overlay").hide();
					
					$("#video-modal").hide();//视频弹出框
					$("#video-card").hide();//视频进度条
					$("#video-uploaded").hide();
					$("#progressbar-inner").css("width", "0%");
					$(".video-success").attr("href" , "");
					$(".video-success img").get(0).src = server_url+"/images/uploadVideo/3808334921.jpg";
					$("#video-feedback-name").text("");
					$("#videoId").val("");
					var controllerScope = angular.element($("body")).scope();
					controllerScope.formData.videoCover = "";
					
					$(ue.document).find(".local-video").parent().remove();
				}
			}
		});
	}
	
}
