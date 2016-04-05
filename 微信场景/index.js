window.onload= function(){
	document.documentElement.style.fontSize = document.documentElement.clientWidth/6.4+'px';
	var outer = document.querySelector('#outer');
	var answer = document.querySelector("#answer");
	var know = document.querySelector('#know');
	var bell = document.querySelector("#bell");
	var say = document.querySelector("#say");
	var time = document.querySelector('#time');
	var input = document.querySelector('#input');
	var height = answer.parentNode.offsetHeight;
	var timer = null;

	if(outer.offsetTop == 0){
		bell.play();
	}
	answer.addEventListener('touchend', function() {
		bell.pause();
		move(outer,{top:-height});
		say.play();
		timer = setInterval(function(){
			sayTime(say,time);
		},1000);
	});
	know.addEventListener('touchend', function() {
		clearInterval(timer);
		say.pause();
		move(outer,{top:-height*2});
		var chatDialog = document.querySelector('.chat ul');
		var chatLiAll = document.querySelectorAll('.chat li');
		var index = 0;
		var chatTop = 0;
		var chatTimer = setInterval(function(){
			chatLiAll[index].style.opacity = 1;
			if(index > 2) {
				chatTop -= chatLiAll[index].offsetHeight;
				chatDialog.style.transform = 'translate(0,'+ chatTop +'px)';
			}
			if(index >= chatLiAll.length - 1){
				clearInterval(chatTimer);console.log(outer);
				move(outer,{top:-height*3});
			}
			index++;
		},2000);

	});
	var cubeBox = document.querySelector(".cubeBox");
		var step = 0.2,pos = {x:0,y:0},deg={x:0,y:0};
		cubeBox.addEventListener("touchstart",function(event){
			pos.x = event.touches[0].clientX;
			pos.y = event.touches[0].clientY;
			//console.log(xStart+" "+yStart);
		});
		cubeBox.addEventListener("touchmove",function(event){
			var xNow = event.touches[0].clientX;
			var yNow = event.touches[0].clientY;console.log((xNow-pos.x)+" "+(yNow-pos.y));
			deg.x += ( xNow- pos.x) * step;
			deg.y -= ( yNow - pos.y) * step;
			cubeBox.style.transform = 'rotateX('+deg.y+'deg) rotateY('+deg.x+'deg)';
			pos.x = event.touches[0].clientX;
			pos.y = event.touches[0].clientY;
		});
}
function sayTime(say,time){
	var duration = say.duration;
	var currentTime = say.currentTime;
	var minute = Math.floor(say.currentTime/60);
	var second = Math.floor(say.currentTime-minute*60);
	minute = minute>10?minute:("0"+minute);
	second = second>10?second:("0"+second);
	time.innerHTML = minute+":"+second;
}
