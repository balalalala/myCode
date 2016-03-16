$(document).ready(function(){
	$(function(){
		$(".tabHeader>div").click(function(){
			var name = $(this).attr("name");
			tabByName(name);
			change(name);
		});
	});
});

function tabByName(name){
	switch(name){
		case "comp":
			$(".current").css("left","0%");
			break;
		case "css":
			$(".current").css("left","33%");
			break;
		case "js":
			$(".current").css("left","66%");
			break;
	}
}

function change(name){
	switch(name){
		case "comp":
			/*$(".tabBody>div").eq(0).css("display","block");
			$(".tabBody>div").eq(0).siblings().css("display","none");*/

			$(".tabBody>div:visible").hide();
			$(".tabBody>div").eq(0).show();
			break;
		case "css":
			/*$(".tabBody>div").eq(1).css("display","block");
			$(".tabBody>div").eq(1).siblings().css("display","none");*/

			$(".tabBody>div:visible").hide();
			$(".tabBody>div").eq(1).show();
			break;
		case "js":
			/*$(".tabBody>div").eq(2).css("display","block");
			$(".tabBody>div").eq(2).siblings().css("display","none");*/

			$(".tabBody>div:visible").hide();
			$(".tabBody>div").eq(2).show();
			break;
	}
}
