var showTimeInterval = null;

//统计总共添加图片数量
function count_image(){
	$("#addAmount").text("已经添加"+ $(".j_pagelet_item_list").children("li").length +"张图片");
}
//绑定删除图片事件
function delete_image(li_id){
	$("#"+li_id+" .gallery-del-icon").click(function(){
		var $li = $(this).parents("li");
		$li.css({overflow:"hidden","margin-top":"0px","margin-bottom":"0px","border":"none"}).animate( { height: "0px" , "padding-top":"0px","padding-bottom":"0px"} , 200 );
		setTimeout("deleteLi('"+ $li.attr("id") +"')",300);
	});
}
function saveOrder(){
	//放置事件
}
//绑定点击更换图片页面
function modify_img(li_id){
	$("#gallery_"+li_id+" .gallery-modify-icon input").change(function(){
		var data = new FormData();
		data.append('imgfile', this.files[0]);
		data.append('pid', li_id);
		$.ajax({
			url:server_url + '/img/updateImage',
			type:'POST',
			data:data,
		    cache: false,
		    async: false,
		    contentType: false,    //不可缺
		    processData: false,    //不可缺
		    success:function(result){
		    	var image = result.imagePic;
		    	$("#gallery_"+li_id).find("img").attr({"src":image.url,"data-width":image.width,"data-height":image.height});
		    }
		});
	});
}
//添加图片
function add_image_row(images){
	for (var i = 0 ; i < images.length ; i++) {
		var image = images[i];
		var li_id = "gallery_" + image.pid;
		var html = '<li id="' + li_id + '" class="gallery-item sclearfix">';
		html += '<div class="gallery-sub-item gallery-no"></div>';
		html += '<div class="gallery-sub-item gallery-img">';
		html += '<img src="'+image.url+'" data-uri="" data-width="'+image.width+'" data-height="'+image.height+'">';
		html += '<div id="gallery-modify-' + image.pid + '"></div></div>';
		html += '<div class="gallery-sub-item gallery-txt">';
		html += '<textarea class="new gallery-desc" maxlength="200" placeholder="图片说明（不超过200个字）">'
		html += image.content!=undefined?image.content:"";	
			
		html += '</textarea></div>';
		html += '<div class="gallery-sub-item gallery-action"><div class="gellery-button-list">';
		html += '<div id="modify_file_' + image.pid + '" class="uploadify" style="height: 30px; width: 22px;" data-title="更换图片" title="更换图片">';
		html += '<div id="modify_file_' + image.pid + '-button" class="uploadify-button upload_button_click" style="height: 30px; line-height: 30px; width: 22px;">';
		html += '<span class="uploadify-button-text">上传图片</span></div></div><div id="modify_file_' + image.pid + '-queue" class="uploadify-queue"></div>';
		html += '<a class="gallery-icon gallery-modify-icon" title="更换图片">';
		html += '<input type="file" name="imgfile" style="opacity: 0;position: absolute;left:0;top:0;width: 100%;height: 100%;cursor: pointer;"></a>';
		
		html += '<a class="gallery-icon gallery-del-icon" data-title="删除" title="删除" ></a>';
		html += '<a class="gallery-icon gallery-sort-icon" data-title="拖动排序" title="拖动排序"></a></div></div></li>';
		$(".j_pagelet_item_list").append(html);
		
		//为刚才的图片加上---图片拖拽排序事件
		$(".j_pagelet_item_list").dragsort({ dragSelector: "#"+li_id + " .gallery-sort-icon", dragEnd: saveOrder ,dragBetween:true});
		count_image();
		delete_image(li_id);
		modify_img(image.pid);
	}
	
}

var app = angular.module('myApp', []);

app.service('formService' , function($http){
	this.postForm = function($scope , formData , formService){
		//将按钮至灰色#f4f5f7
		$(".fb").css("background" , "#f4f5f7");
		$scope.publishForm = function(){
			validator.display(("正在提交，请不要重复点击！") , 2000 );
		};
		
		$scope.formData.images.length = 0;
		$(".pagelet-figure-item-list").children("li").each(function(){
			var img = {};
			img.pid = $(this).attr("id").split("_")[1];
			img.content = $(this).find("textarea").val();
			$scope.formData.images.push(img);
		});
		var iid = $scope.formData.iid;
		if(iid != null && iid != '' && iid!=undefined){
			//修改
			$http({
				method: 'POST',
				url: '/xinjiyuan_user/media/updateImage',
				params : formData
			}).then(
					function successCallback(response) {
						alert("修改成功！");
					},
					function errorCallback(response) {
					}
			);
		}else{
			//新增
			$http({
				method: 'POST',
				url: '/xinjiyuan_user/media/submitImage',
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
					alert("修改失败！");
				}
			);
		}
	};
	
	this.initForm = function ($scope , iid){
		$http({
			method: 'POST',
			url: '/xinjiyuan_user/media/searchImageByIid?iid='+iid
	    }).then(
    		function successCallback(response) {
	    		$scope.formData.title = response.data.title;
	    		$scope.formData.content = response.data.content;
	    		$scope.formData.imageType = response.data.imageType;
	    		
	    		//设置封面
	    		$scope.formData.coverNum = response.data.coverNum;
	    		$scope.formData.cover1 = response.data.coverImages[0].pid;
	    		
	    		var html = '<img src="'+response.data.coverImages[0].imageUrl+'" style="opacity: 1;height: 100%;width: 100%;">';
				$(".front-cover-img:eq(0)").prepend(html);
	    		
	    		if($scope.formData.coverNum == 3){
	    			$scope.formData.cover2 = response.data.coverImages[1].pid;
	    			html = '<img src="'+response.data.coverImages[1].imageUrl+'" style="opacity: 1;height: 100%;width: 100%;">';
	    			$(".front-cover-img:eq(1)").prepend(html);
	    			
	    			$scope.formData.cover3 = response.data.coverImages[2].pid;
	    			html = '<img src="'+response.data.coverImages[2].imageUrl+'" style="opacity: 1;height: 100%;width: 100%;">';
	    			$(".front-cover-img:eq(2)").prepend(html);
	    		}
	    		add_image_row(response.data.images);
	        },
	        function errorCallback(response) {
	            // 请求失败执行代码
	        }
        );
	}
});
function publishFormFn($scope , formService){
	var opt = [];
	if($scope.formData.coverNum == 1){
		opt = {
				list : [{"id":"figure-title","nulltext":"标题不能为空","exper":"^[\\s\\S]{5,30}$","errortext":"标题长度应该在5-30字之间"},
				        {"nulltext":"请上传封面" ,"content" : $scope.formData.cover1}
				        ]
		}
	}else{
		opt = {
				list : [{"id":"figure-title","nulltext":"标题不能为空","exper":"^[\\s\\S]{5,30}$","errortext":"标题长度应该在5-30字之间"},
				        {"nulltext":"请上传封面" ,"content" : $scope.formData.cover1},
				        {"nulltext":"请上传封面" ,"content" : $scope.formData.cover2},
				        {"nulltext":"请上传封面" ,"content" : $scope.formData.cover3}
				        ]
		}
	}
	
	if(validator.check(opt)){
		formService.postForm($scope , $scope.formData , formService);
	}
};

app.controller('siteCtrl', function($scope, formService) {
	$scope.formData = {};
	$scope.formData.images = [];
	$scope.formData.coverNum = 1;
 	$scope.publishForm = function(){
 		publishFormFn($scope , formService);
 	};
 	$scope.initialization = function(){
 		var iid = $("#iid").val();
 		if(iid != null && iid != '' && iid != undefined){
 			$scope.formData.iid = iid;
 			formService.initForm($scope , iid);
 		}
 	}
});


$(function() {
	var t= $("#figure-title"), e = $(".title_tip"),
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
	
	//上传图片
	$("#img_file").change(function(){				
		//上传该文件
		$(".j_figure_upload").hide();
		$(".j_pagelet_figure_image").show();
		setTimeout(function(){
			uploadPic('#img_file');
		} , 500);
	});
	$("#img_file_add").change(function(){				
		//上传该文件
		uploadPic('#img_file_add');
	});
	
	//没有图片的时候---上传图片 
	function uploadPic(select){
		$.each($(select)[0].files, function(i, file) {
			var data = new FormData();
			data.append('imgfile', file);
			add_img_row(data);
		});
	}
	function add_img_row(data){
		$.ajax({
			url:server_url + '/img/uploadImages',
			type:'POST',
			data:data,
		    cache: false,
		    async : false,
		    contentType: false,    //不可缺
		    processData: false,    //不可缺
		    success:function(result){
		    	add_image_row(result.images);
		    }
		});
	}
	
	 $("#modal-cover .close, #modal-cover .cancel").click(function(){
		 $("#modal-cover").hide();
		 $(".overlay").hide();
	 });
	//封面模式
	$("#video-cover .front-cover-radio").click(function(){
		var data_type = $(this).attr("data-type");
		$("#video-cover .front-cover-radio").removeClass("selected");
		$(this).addClass("selected");
		var controllerScope = angular.element($("body")).scope();
		if(data_type == 'single'){
			controllerScope.formData.coverNum = 1;
			$("#video-cover .front-cover-cur").animate( { left: "40px"} , 200 );
			$("#video-cover .front-cover-multi").hide();
		}else{
			controllerScope.formData.coverNum = 3;
			$("#video-cover .front-cover-cur").animate( { left: "160px"} , 200 );
			$("#video-cover .front-cover-multi").show();
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
		var img_width = $select_pic.attr("data-width");
		var img_height = $select_pic.attr("data-height");
		
		var select_max_width = jcropApi.getBounds()[0];
		var select_max_height = jcropApi.getBounds()[1];
		
		var x = parseInt(jcropApi.tellSelect().x/select_max_width * img_width);
		var y = parseInt(jcropApi.tellSelect().y/select_max_height * img_height);
		var w = parseInt(jcropApi.tellSelect().w /select_max_width * img_width);
		var h = parseInt(jcropApi.tellSelect().h /select_max_height * img_height);
		
		var pic_src = $select_pic.get(0).src;
		$.ajax({
			type : "POST",
			url : server_url + "/img/cutOutImage",
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
					selectEd.get(0).onmouseover = function(){
						$(".cover-img-modify" , this).show();
					}
					selectEd.get(0).onmouseout = function(){
						$(".cover-img-modify" , this).hide();
					}
					var controllerScope = angular.element($("body")).scope();
					var index = $(".front-cover-img").index(selectEd);
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
	});
	
	//截取图片，点击取消
	$("#cover-crop-modal .cover-crop-cancel").click(function(){
		if(jcropApi!=null){
			jcropApi.destroy();
		}
		$("#cover-select-modal").show()
		$("#cover-crop-modal").hide();
	});
	
});
//删除图集中一行的记录
function deleteLi(id){
	$("#"+id).remove();
	count_image();
}

//点击弹出弹出封面
$(".front-cover-img").click(function(){
	//设置点击的是那个
	var $img = $(".pagelet-figure-item-list .gallery-img img");
	if($img.length > 0){
		$(".front-cover-img").removeAttr("data-selected");
		$(this).attr("data-selected", "1");
		$("#cover-select-modal").show();
		$(".overlay").height(document.body.scrollHeight);
		$(".overlay").show();
		document.documentElement.style.overflow = "hidden";
		//
		$(".cover-select-items").html("");
		//
		var html = "";
		$img.each(function(){
			html += '<li><img src="'+this.src+'" data-width="'+ $(this).attr("data-width") +'" data-height="'+ $(this).attr("data-height") +'"><div class="cover-img-hover"></div></li>';
		});
		$(".cover-select-items").html(html);
		bind_click_imagepic();
	}else{
		alert("您的文章正文中无可用图片，请先上传！");
	}
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
 * 绑定封面图片的点击事件
 */
function bind_click_videopic(){
	$(".videoposter-item-wrap").mousemove(function(){
		$(".videoposter-image-hover" , this).show();
	}).mouseout(function(){
		if(!$(this).parent().hasClass("selected")){
			$(".videoposter-image-hover" , this).hide();
		}
	}).click(function(){
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
	});
}

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

//裁剪图片
var jcropApi;
function jcropImg(){
    var opt = {
        allowSelect: true,
        baseClass: 'jcrop',
        aspectRatio:1.43,
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

