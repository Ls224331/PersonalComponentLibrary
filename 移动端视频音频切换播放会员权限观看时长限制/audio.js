//触发播放事件
//  document.getElementById('audio').src = 'jq22.mp3'
//setTimeout(function(){
	var audio_url
	var access_token
	var id
mui.plusReady(function() {
	console.log( '音频查找'+audio_url)
	console.log('吃石化')
	id = plus.webview.currentWebview().cid
	console.log('这里是音频id='+id)
	var data = localStorage.getItem("data")
 	if(data == null) {
  	console.log(1)
  	access_token == ''
 	} else {
  	data = JSON.parse(data);
  	access_token = data.access_token
 	}
	gabbr()
})

function gabbr() {
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
			audio_url = res.post.audio_url
			console.log('这里是音频接口数据'+audio_url)
			document.getElementById('audio').src = audio_url
			fry_audio.load()   
								
			
		}
	});   
}  
  
var audios = document.getElementsByClassName("music-audio")[0];

var vol = audios.volume;
audios.controls = false;



$('.music-play').on('click', function() {
	audios.play();
	quanxian()
	console.log('这里是音频'+audio_url)
//	document.getElementById('audio').src = audio_url
	console.log(audios)
	console.log(user_buy)
	document.getElementById('bofanganniu').style.display = 'none'
	document.getElementById('zantinganniu').style.display = ''
	var duration = audios.duration;
	$('.music-max').html(timeleng(duration));
	$(".music-animation").addClass("play-an");
	$(".music-range").attr({
		'max': duration
	});

	function timer() {
		var t = parseInt(Math.round(audios.currentTime));
		console.log('当前时间='+t)   //当前播放时间
		console.log('会员身份'+user_buy)
		$(".music-range").val(t);
		$('.music-cur').text(timeleng(t));
		t = parseInt(audios.currentTime);
		if(t < duration) {
			setTimeout(timer, 1000);
		} else {
			clearTimeout(timer);
		}
		if(t>14 && user_buy == 2){
			audios.pause();  
			document.getElementById('bofanganniu').style.display = 'none'
			document.getElementById('zantinganniu').style.display = 'block'
			document.getElementById('caokongban').style.display = 'none'
			document.getElementById('audioend').style.display = 'block'
		
		}
	}
	timer();
});

//停止
$('.music-no').on('click', function() {
	audios.pause();
	document.getElementById('zantinganniu').style.display = 'none'
	document.getElementById('bofanganniu').style.display = ''
	$(".music-animation").removeClass("play-an");
})

audios.onended = function() {
	$(".music-animation").removeClass("play-an")
};

//音量大
$('.music-btnd').click(function() {
	vol = vol > 0 ? (vol * 10 - 1) / 10 : 0;
	audios.volume = vol;
	console.log(vol)
	$(".music-voice").html(vol)
})
//音量小
$('.music-btne').click(function() {
	vol = vol < 1 ? (vol * 10 + 1) / 10 : 1;
	audios.volume = vol;
	console.log(vol)
	$(".music-voice").html(vol)
})
  
//监听滑块，拖动
$(".music-range").on('change', function() {
	audios.currentTime = this.value;
	console.log(this.value)
	$(".music-range").val(this.value);
});

//将秒数转为00:00格式
function timeleng(time) {
//	console.log(time)
	var m = 0,
		s = 0,
		ms = '00',
		ss = '00';
	time = Math.floor(time % 3600);
	m = Math.floor(time / 60);
	s = Math.floor(time % 60);
	ss = s < 10 ? '0' + s : s + '';
	ms = m < 10 ? '0' + m : m + '';
	//console.log('这里是当前播放秒数'+ms)
	//console.log('这里是当前播放时间'+ss)     //播放时间
//	setTimeout(function(){
//		if(ss>6){
//			audios.pause();  
//			document.getElementById('bofanganniu').style.display = 'none'
//			document.getElementById('zantinganniu').style.display = 'block'
//			document.getElementById('caokongban').style.display = 'none'
//			document.getElementById('end').style.display = 'block'
//		}
//	},1500)
	return ms + ":" + ss;
}

$(".music-qd").on("click", function() {
	var nameid = $(".input-text").val();
	console.log(nameid)
	$.ajax({
		type: "get",
		dataType: 'jsonp',

		success: function(d) {
			//最新音乐数据
			console.log(d)
		},
		error: function(d) {
			console.log(d);
		}
	});
})

//},1000)