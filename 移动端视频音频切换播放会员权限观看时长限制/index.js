mui.init();
var gaibian =0
var goods_id
var access_token
var id
var user_buy
var payment
var aliChannel
var wxChannel
var channel
var oHeight
mui.plusReady(function() {
	id = plus.webview.currentWebview().cid
	console.log('初始化课程id'+id)
	oHeight = $(document).height();
	console.log('初始化屏幕高度='+oHeight)
	
	var data = localStorage.getItem("data")
 	if(data == null) {
  	console.log(1)
  	access_token == ''
 	} else {
  	data = JSON.parse(data);
  	access_token = data.access_token
	 }
 	console.log('初始化token='+access_token)
	 // 获取支付通道
	plus.payment.getChannels(function(channels) {
		aliChannel = channels[0];
		wxChannel = channels[1];
		console.log('获取支付通道成功')   
	}, function(e) {
		alert("获取支付通道失败：" + e.message);
	});
	gettabbr()         
})
var video_url
var video_img
var audio_url
// mui('.mui-input-group').on('change', 'input', function() {
// 	console,log(333333)
// 	var value = this.checked ? "true" : "false";
// //	payment = value
// 	// this.previousElementSibling.innerText = "checked：" + value;
// 	console.log(this.value)
// });
mui(document).on("tap", ".renew", function() {
	var val_input = $("input[type='radio']:checked").val()
	console.log('这里是支付类型'+val_input)
	console.log('这里是支付id='+id)
	console.log('这里是支付token='+access_token)
	mui.ajax({
		"url": str + 'r=api/curriculum/order',
		"data": {
			access_token: access_token,
			type: val_input,
			id:id
		},
		"dataType": "json",  
		"type": "get",
		success: function(res) {
			console.log(JSON.stringify(res))
			console.log(res.data)
			getlistpay(res.data, val_input)
		}
	})
})
function getlistpay(id, val_input) {
	console.log('调用支付='+id)
	console.log('调用支付类型='+val_input)
	if(val_input == 'alipay') {
		channel = aliChannel
		console.log(channel)
	} else if(val_input == 'wxpay') {
		channel = wxChannel
		console.log(channel)
	}
	$.ajax({
		type: "get",
		url: str + "r=api/curriculum/order-pay",
		data: {
			type: val_input,
			order_id:id
		},
		success: function(res) {
			console.log('这里是支付通道类型='+channel)
			console.log(JSON.stringify(res));
			plus.payment.request(channel, res, function(result) {             
				console.log(JSON.stringify(result));          
				mui.alert("付费成功", function(e) {
					mui.back();
				});          
			}, function(e) {             
				console.log(JSON.stringify(e));   
				mui.alert("付费失败");        
			});
		}
	});
}
//目录列表	
function gettabbr() {
	console.log(access_token)
	console.log(str + "r=api/curriculum/detail&id="+id)
	$.ajax({
		type: "get",
		url: str + "r=api/curriculum/detail",
		dataType: "json",
		data: {
			id: id,
			access_token:access_token   
		},
		success: function(res) {
			console.log(JSON.stringify(res));
			goods_id = res.post.id  
//			user_buy = res.post.user_buy
			console.log(goods_id)
			video_url = res.post.video_url
			audio_url = res.post.audio_url
			video_img = res.post.pic_url
			var video1 = res.post.video_url
			$("#fuwenben").html(res.post.introduction)
			document.getElementById("music-max").innerHTML= res.post.duration_audio
			document.getElementById("danchuPrice").innerHTML = res.post.price
			var list = res.post.catalog
			for(var i = 0; i < list.length; i++) {
				$('#item2').append('<div data-id="' + list[i].id + '"  data-video="' + list[i].video_url + '" class="xuetang"><div class="xuetang_one"><img class="xuetang_tu" src="' + list[i].pic_url + '" alt=""></div><div><p class="xuetang_ming">' + list[i].title + '</p><div style="margin-top:.5rem;display:flex"><span style="color:#333333" class="iconfont iconshijian"></span><span class="xuetang_time">' + list[i].min + '</span><span class="xuetang_ren">' + list[i].study_num + '人学习' + '</span><span class="xuetang_vip">' + list[i].priceType + '</span></div></div></div>')

			}
			   
			video()
			//			渲染封面视频						
			
		}
	});   
}   
 //video()
function video(){
	console.log(9999999)
	var htmlvideo = Html5video("#video_Container", {
		title: "移动端视频", //视频标题，当全屏时会显示
		url: video_url, //支持本地视频和网络视频，格式MP4
		//url:"https://yiliubao.guoweikeji.com/web/uploads/video/store_2/c86c657dac183cec827b197bd596bf83f0751c65.mp4",
		img: video_img,
		//img: "http://47.98.249.149:8020/readbaoss/d9c827e8-68ed-4e19-acca-ed24f9628fcb.png", //视频截图封面
		time: "", //视频总时间以分钟单位，当网络缓慢时，没办法及时加载出来，如已知可以填写，可不填。
		autoplay: false, //是否自动播放视频
		isMobile: false, //是否开启当处于移动网络时，提示用户是否继续播放视频。,不支持浏览器环境
		isFull: false, //是否点击播放就全屏显示
		iospay: false, //如果是IOS系统是否采用苹果系统自带播放器, 可以在浏览器或微信中，全屏观看视频
		drag: true, //禁止拖动,调节,音量和亮度
		isfull: true, //是否显示全屏按钮
		prompt: function(video) //当开启isMobile时,这里可以写提示用户的内容,h5+环境才有效
		{
			mui.confirm('你当前处于移动手机网络将会消耗手机流量，是否继续播放？', '提示', ["取消", "确定"], function(e) {
				if(e.index == 1) {
					video.play();
				}
			}, "div");
		
		},
		
		
	});


}
var dataType
function quanxian(){
	console.log('权限测试接口')
	console.log( 'token='+access_token)  
	if(access_token == undefined){
		console.log('测试登录')
		var btnArray = ['否', '是'];
		mui.confirm('是否去登录，确认？', '当前没有登录', btnArray, function(e) {
			if (e.index == 1) {
				console.log('确认')
					mui.openWindow({
						url: '../register_login/phone_login.html',
					})
			} else {
				console.log('取消')
				
			}
		})
	}else{
	mui.ajax({
		"url": str + 'r=api/curriculum/is-pay',
		"data": {
		access_token:access_token,
		id:id
		},
		//beforeSend: function() {
		// plus.nativeUI.showWaiting("正在加载");
		//},
		//complete: function() {
		// plus.nativeUI.closeWaiting();
		//},
		"dataType": "json",
		"type": "get",
		success: function(res) {
			console.log(JSON.stringify(res))
			user_buy = res.data
			if(user_buy == 1){
				document.getElementById('shikan').style.display = 'none'
			}
		}
 	})
}
	  
}
mui(document).on('tap',".feiMoneyUser",function(){
	mui.openWindow({
		url: '/membership/index.html',
	})
})
//gettabbr()
 mui(document).on("tap", ".xuetang", function() {
	//$(document).on("click",".xuetang_tu",function(){
	$('.my_audio').empty()   
	var cid = this.getAttribute('data-id');
	console.log(id)
	id = cid
	// window.location.reload();
		mui.openWindow({
		url: '/xiangqing/new_file.html',
		createNew: true, //瑕疵	
		extras: {
   				cid: cid
  	},
		show:{
			autoShow:true,
			aniShow:"slide-in-left",//页面显示动画，默认为；
			duration:500,
			},
		  waiting:{
			autoShow:true,//自动显示等待框，默认为true
			title:'正在为你拼命加载中',//等待对话框上显示的提示内容
			options:{
				background:'#ffffff',
				height:'200px',
				color:'#333333',
				style:'black',
				
				loading:{
//					display:"inline",
					//icon:"images/loading.png",
					interval:100,
					
				},
			}
		},

	})
})
  
var audioTime
function yinpin(){
	console.log('这是图片='+video_img)
	console.log(999999)
	audioTime = 88

	if(audio_url){
		document.getElementById('video_Container').style.display = 'none'
		document.getElementById('my_audio').style.display = 'block'
		document.getElementById('my_audio').style.background = "url("+video_img+")"
		document.getElementById('my_audio').style.backgroundSize = "cover"
		document.getElementById('zantinganniu').style.display = 'none'
	}else{
		mui.alert('请观看视频', '当前视频没有音频资料', function() {
			
		});
	}

	
}
//var audios = document.getElementsByClassName("music-audio")[0];
function myAudio(){
	audioTime = 0
	audios.pause();
	document.getElementById('my_audio').style.display = 'none'
	document.getElementById('video_Container').style.display = ''
	document.getElementById('bofanganniu').style.display = ''
}

// 收藏

var  oDiv  =  document.getElementById("shouchang");
var oSpan = document.getElementById("sc")
mui(document).on('tap',"#shouchang",function(){
// oDiv.onclick  =   function() {
	oSpan.style.color ==  "red" ? oSpan.style.color =  "#ABADAE" : oSpan.style.color =  "red";
	var data = localStorage.getItem("data")
	console.log(data)
	if(data == null) {
		console.log(1)
		access_token == ''
	} else {
		data = JSON.parse(data);
		access_token = data.access_token
		console.log(access_token)
	}  
	$.ajax({
		type: "get",
		url: str + "r=api/curriculum/favorite-add",
		dataType: "json",
		data: {
			goods_id: goods_id,
			access_token: access_token
		},
		success: function(res) {
			console.log(JSON.stringify(res));
		}
	});
})



//评论
// mui(document).on('tap','#pinglun',function(){
// 	 var tHeight = $(window).height();
// 	 console.log('当前屏幕高度='+tHeight)
// 		var cheight = tHeight - oHeight
// 		console.log('屏幕高度差值='+cheight)
// //		$('body').height(tHeight+'px');
// 	// 	if(tHeight > oHeight){	
// 	// 		console.log('键盘弹起了')
// 	// 		$("#dibu1").css("position","fixed");
// 	// 		// $("#dibu1").css("margin-bottom","cheight"+'px');
// 	// 		document.getElementById('dibu1').style.marginTop = cheight + 'px'
// 	// }else{	
// 	// 		$("#dibu1").css("position","fixed");
// 	// }

// })

// $(function(){
// 	$("#pinglun").focus(function(){
// 		var tHeight = $(document).height();
// 		console.log('当前屏幕高度='+tHeight)
// 		var cheight = tHeight - oHeight
// 		console.log('屏幕高度差值='+cheight)
// 		console.log('输入框获得焦点')
// 		document.getElementById("dibu1").style.position = "relative"
// 		// document.getElementById("dibu1").style.marginBottom = "cheight"+'px'
// 		setTimeout(function(){
// 			document.getElementById("dibu1").scrollIntoView(true)
// 		},200)
// 	}).blur(function(){
// 		console.log('输入框失去焦点')
// 		document.getElementById("dibu1").style.position = "fixed"
// 	});

// });

mui(document).on('tap',".myPinglun",function(){	
	console.log('传递评价id='+id)
	mui.openWindow({
		url: '../my_books/evaluate/index.html',
		createNew: true,
		extras: {  
			cid: id,			
			ctype:3
		},
	})
})