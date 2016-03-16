$(function(){
	/*登录注册的导航*/
	$(".header_top").find(".right>div").hover(function(){
		$(this).toggleClass("boxshadow");
		$(this).find("div").toggle();
	});
	$(".weixin").hover(function(){
		$(this).find("div").toggle();
	});
	$("body img").hover(function() {
		$(this).animate({opacity:"0.7"},500);
	},function(){
		$(this).animate({opacity:"1"},500);
	});
	/*左面大菜单*/
	$(".main_top_left li").hover(function(){
		var that = $(this);
		$.ajax({
			type:"get",
			url:"http://127.0.0.1:8020/邦购网项目/api/main_top_left.json",
			async:true,
			success:function(response){
				var index = that.index();
				var total = response.total,data = response.data;
				var hoverStr="",brandStr="";
				for(var i in data){
					if(data[i].index == index){
						var lside_total = data[i].lside.total,
							lside_title =data[i].lside.title.split(","),
							lside_content =data[i].lside.content;
							tside = data[i].tside.title,
							bside_title =data[i].bside.title,
							bside_content =data[i].bside.content;
						for(var q=0;q<lside_total;q++){
							hoverStr += '<dl><dt><a href="#">'+lside_title[q]+'</a></dt><dd>';
							var str=lside_content[q].txt.split(",");
							for(var r=0;r<str.length;r++){
								hoverStr += '<a href="#">'+str[r]+'</a>';
							}
							hoverStr += '</dd></dl>';
						}
						brandStr += '<p>'+bside_title+'</p>';
						for(var t=0;t<bside_content.length;t++){
							brandStr += '<dd><a href="#"></a><img src="'+bside_content[t]+'" /></dd>';
						}
						$(".lside").html(hoverStr);
						$(".tside").html('<img src="'+tside+'"/>');
						$(".bside").html(brandStr);
					}
				}
			}
		});
		$(this).children().find("i").toggle(100,function(){
			$(this).next().toggle();
		});
	});
	$.ajax({
			type:"get",
			url:"http://127.0.0.1:8020/邦购网项目/api/main_top_left.json",
			async:true,
			success:function(response){
				var total = response.total,data = response.data;
				var str = "",hoverStr="",brandStr="";
				for(var j=0;j<total;j++){
					var arr = data[j].left;
					for(var k=0;k< data[j].left.length;k++){
						if(typeof data[j].left[k] == "object"){
							str += '<a id="red" href="#">'+data[j].left[k].red+'</a>';
						}else{
							str += '<a href="#">'+data[j].left[k]+'</a>';
						}
					}
					$(".getActId").eq(j).html(str);
					str="";
				}
			}
		});
	$(".hoverTab").mouseenter(function(){
		$(".main_top_left_hover").animate({opacity:"show"},500);
		$(".main_top_pic").hide();
	});
	$(".hoverTab").mouseleave(function(){
		$(".main_top_left_hover").animate({opacity:"hide"},500);
		$(".main_top_pic").show();
	});
	/*轮播图*/
	var index = 0,length = $(".pic").children().length -1;
	var timer = setInterval(function(){
		index = index == length? 0:index;
		init(index);
		index++;
	},2000);
	function init(index){
		$(".pic li").eq(index).fadeIn("slow").siblings().fadeOut("slow");
		$(".opt li").eq(index).addClass("opt_li_click").siblings().removeClass('opt_li_click');
	}
	/*左右按键*/
	$(".main_top_pic").hover(function() {
		clearInterval(timer);
		$(".pic li").find('img').addClass('opacity');
		$(".pic_mask").show();
	},function() {
		$(".pic_mask").hide();
		$(".pic li").find('img').removeClass('opacity');
		timer = setInterval(function(){
			index = index == length ? 0:index;
			init(index);
			index++;
		},2000);
	});
	//按完左右键后，鼠标移入li透明度变化
	/*$(".pic_mask span").mouseover(function() {
		$(".pic li").find('img').removeClass('opacity');
	});*/
	$(".pic_lbtn").bind("click",function(){
		index = index == 0 ? length:index;
		index--;
		init(index);
	});
	$(".pic_rbtn").bind("click",function(){
		index = index == length? 0:index;
		index++;
		init(index);
	});
	/*opt*/
	$(".opt li").bind("click",function(){
		$(this).addClass("opt_li_click").siblings().removeClass('opt_li_click');
		index = $(this).index();
		init(index);
	});
	/*countdown*/
	var intDiff = parseInt(1000);
	countdowntimer(intDiff);
	/*main_bottom*/
	$.ajax({
		type:"get",
		url:"http://127.0.0.1:8020/邦购网项目/api/main_bottom.json",
		async:true,
		success:function(response){
			var total = response.total, data = response.data;
			var str="";
			for(var i=0;i<total;i++){
				str += '<li><a href="#"><dl><dt><img src="'+data[i].dt+'" alt=""></dt><dd class="brand_pic"><img src="'+data[i].dd_pic+'" alt=""></dd><dd class="brand_txt">'+data[i].dd_txt+'</dd></dl></a></li>';
			}
			$(".main_bottom ul").html(str);
		}
	});
	$(".brand_btn_left").bind("click",function(){
		var b_length = -$(".main_bottom").width(),n_left = parseInt($(".main_bottom ul").css("left"));
		if(n_left != 0){
			$(".main_bottom ul").animate({"left":"0"},500);
		}
	});
	$(".brand_btn_right").bind("click",function(){
		var b_length = -$(".main_bottom").width(),n_left = parseInt($(".main_bottom ul").css("left"));
		if(n_left == 0){
			$(".main_bottom ul").animate({"left":b_length},500);
		}
	});
	/*floor*/
	var sindex = 0;
	$(window).scroll( function(){
	    //当内容滚动到底部时加载新的内容
	    if ($(this).scrollTop() + $(window).height() + 20 >= $(document).height() && $(this).scrollTop() > 20) {
	        console.log(sindex);//当前要加载的页码
	       	if(sindex<=8){
	       		$.ajax({
					type:"get",
					url:"http://127.0.0.1:8020/邦购网项目/api/floor.json",
					async:true,
					success:function(response){
						var str="";
						var total = response.total,data = response.data;
						var hdata = response.data[sindex].h1,
							Cont_Left_Top = response.data[sindex].Cont_Left_Top,
							KeyWords_Left = response.data[sindex].KeyWords_Left.split(","),
							KeyWords_Right = response.data[sindex].KeyWords_Right.split(","),
							Cont_Left_Bottom= response.data[sindex].Cont_Left_Bottom.arr,
							Cont_Right= response.data[sindex].Cont_Right.arr;
						str += '<div class="zyFloor"><div class="zyCont_wrap"><h1><img src="'+hdata+'"></h1><div class="Cont"><div class="Cont_Left"><div class="Cont_Left_Top"><a href="#"><img src="'+Cont_Left_Top+'"></a><ul class="KeyWords"><li class="KeyWords_Left">';
						for(var i=0;i<KeyWords_Left.length;i++){
							str += '<a href="">'+KeyWords_Left[i]+'</a>';
						}
						str += '</li><li class="KeyWords_Right">';
						for(var j=0;j<KeyWords_Right.length;j++){
							str += '<a href="">'+KeyWords_Right[i]+'</a>';
						}
						str += '</li></ul></div><ul class="Cont_Left_Bottom"><ul>';
						for(var k=0;k<Cont_Left_Bottom.length;k++){
							str += '<li><a href="#"><img src="'+Cont_Left_Bottom[k]+'"></a></li>';
						}
						str += '</ul></div><div class="Cont_Right"><ul>';
						for(var q=0;q<Cont_Right.length;q++){
							str += '<li><a href="#"><img src="'+Cont_Right[q]+'"></a></li>';
						}
						str += '</ul></div></div></div></div>';
						$(".container").append(str);
						sindex++;
					}
				});
	       	}
	    }
	});
});
/*countdown*/
function countdowntimer(intDiff){
	var countimer = setInterval(function(){
	var day=0,
		hour=0,
		minute=0,
		second=0;//时间默认值
	if(intDiff > 0){
		hour = Math.floor(intDiff / (60 * 60));
		minute = Math.floor(intDiff / 60) - (hour * 60);
		second = Math.floor(intDiff) - (hour * 60 * 60) - (minute * 60);
	}
	if (hour <= 9) hour = '0' + hour;
	if (minute <= 9) minute = '0' + minute;
	if (second <= 9) second = '0' + second;
	$('.time-hour').html(hour);
	$('.time-minute').html(minute);
	$('.time-second').html(second);
	intDiff--;
	}, 1000);
}