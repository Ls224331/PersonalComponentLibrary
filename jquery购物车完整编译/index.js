mui.init({
	gestureConfig: {
		tap: true, //默认为true
		doubletap: true, //默认为false
		longtap: true, //默认为false
		swipe: true, //默认为true
		drag: true, //默认为true
		hold: false, //默认为false，不监听
		release: false //默认为false，不监听

	},
	swipeBack: true
});
var access_token = '';
mui.plusReady(function() {
	var data = localStorage.getItem("data")
	if(data == null) {
		console.log(1)
		access_token == ''
	} else {
		data = JSON.parse(data);
		access_token = data.access_token
	}
})

function getCart() {
	$.ajax({
		type: "get",
		url: str + "r=api/cart/list",

		dataType: "json",
		data: {
			access_token: "MIBjcvSZaGlOcaJnXOvzYP-tMJTdzqyA"
		},
		success: function(res) {
			console.log(JSON.stringify(res));
			var list = res.data.list
			for(var i = 0; i < list.length; i++) {
				$(".commodity_list_term").append('<li class="select" style="display:flex;"><em data-id="' + list[i].cart_id + '" aem="0" cart_id="8"></em><img style="width:70px;height:93px;border-radius:5px;" src="' + list[i].goods_pic + '" /><div class="div_center" style="margin-left:26px;"><span class="yichu" style="color:#4A4A4A;font-size:14px;font-weight:600;">' + list[i].goods_name + '</span><span style="border-radius:4px;background:#BBBBBB;font-size:12px;padding:2px;color:#ECECEC;">' + '仁仁家教育集团' + '</span><p style="margin-top:9px;" class="now_value"><i>' + '￥' + ' </i><b class="qu_su">' + list[i].price + '</b></p></div><div style="float:left;display:flex;flex-direction:column;margin-left:10px;width:26px;height:90px;border-radius:18px;background:#F3F3F3;text-align:center;"><i style="font-size:24px;color:#9E9E9E;margin-top:8px;" onclick="plusw(this)">' + '+' + '</i><span style="font-size:15px;width:22px;height:22px;text-align: center;line-height: 22px;color:#fff;border-radius: 50%;background: #FFCA47;margin-left:2px;margin-top:6px;" class="zi">' + list[i].num + '</span><input type="hidden" value="84"><i style="font-size:24px;color: #9E9E9E;margin-top:8px;" onclick="reducew(this)">' + '-' + '</i></div></li>')
			}
		}
	});
}

getCart()