//触发播放事件
//  document.getElementById('audio').src = 'jq22.mp3'
var audios = document.getElementsByClassName("music-audio")[0];
document.getElementById('audio').src = 'jq22.mp3'
fry_audio.load()
var vol = audios.volume;
audios.controls = false;

$('.music-play').on('click', function() {
	audios.play();
	console.log(audios)
	var duration = audios.duration;
	$('.music-max').html(timeleng(duration));
	$(".music-animation").addClass("play-an");
	$(".music-range").attr({
		'max': duration
	});

	function timer() {
		var t = parseInt(Math.round(audios.currentTime));
		$(".music-range").val(t);
		$('.music-cur').text(timeleng(t));
		t = parseInt(audios.currentTime);
		if(t < duration) {
			setTimeout(timer, 1000);
		} else {
			clearTimeout(timer);
		}
	}
	timer();
});

//停止
$('.music-no').on('click', function() {
	audios.pause();
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
	var m = 0,
		s = 0,
		ms = '00',
		ss = '00';
	time = Math.floor(time % 3600);
	m = Math.floor(time / 60);
	s = Math.floor(time % 60);
	ss = s < 10 ? '0' + s : s + '';
	ms = m < 10 ? '0' + m : m + '';
	console.log(ss)     //播放时间
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