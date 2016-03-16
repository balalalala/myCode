window.onload = function(){
	/*
		下方li效果：点击切换大图-选项卡，li淡入淡出-移入移出，ul移动-位置计算
		大图片切换：图片层级-zIndex一直加1，图片下拉效果（运动框架）可以改为淡入淡出
		加入自动播放：和选项卡一样
	 */
	var div = document.getElementById("mianbao");
	var maskLeft = getByClass(div,"left")[0];//获取的是数组，所以需要下标
	var maskRight = getByClass(div,"right")[0];
	var btnLeft = getByClass(div,"btnLeft")[0];
	var btnRight = getByClass(div,"btnRight")[0];
	var largepic = getByClass(div,"largepic")[0];
	var smallpic = getByClass(div,"smallpic")[0];
	var smallmain = getByClass(div,"smallmain")[0];
	var largeimgall =largepic.getElementsByTagName("img");
	var smallimgall =smallpic.getElementsByTagName("li");
	var nowZIndex = 2;
	var now = 0;
	//左右按键的显示
	maskLeft.onmouseover = function(){
		starmove(this,"opacity",80);
	}
	maskLeft.onmouseout = function(){
		starmove(this,"opacity",0);
	}
	maskRight.onmouseover = function(){
		starmove(this,"opacity",80);
	}
	maskRight.onmouseout = function(){
		starmove(this,"opacity",0);
	}
	//大图切换
	tab();//第一张小图显示
	for(var i=0;i<smallimgall.length;i++){
		smallimgall[i].index = i;//通过小图片的index切换大图片的index
		smallimgall[i].onclick = function(){
			if(this.index == now)return;//防止重复点击小图片是反复刷大图片
			now = this.index;
			tab();
		}
		//小图鼠标淡入淡出
		smallimgall[i].onmouseover = function(){
			starmove(this,"opacity",100);
		}
		smallimgall[i].onmouseout = function(){
			if(this.index!=now){//小图片被点击后如果大图片的index和小图片index一样的话就会一直显示，其他小图片可以移入移出
				starmove(this,"opacity",50);
			}
		}
	}

	function tab(){
		largeimgall[now].style.zIndex = nowZIndex++;//this.index换成now适用于左右键
		for(var i=0;i<smallimgall.length;i++){
			starmove(smallimgall[i],"opacity",50);
		}
		starmove(smallimgall[now],"opacity",100);//小图片点击后
		largeimgall[now].style.height = 0;
		starmove(largeimgall[now],"height",400);//图片从上刷下来
		if(now == 0){
			starmove(smallmain,"left",0);//最左一张位置的bug
		}else if(now == smallimgall.length-1){
			starmove(smallmain,"left",-(now-2)*smallimgall[0].offsetWidth);//最右一张位置的bug
		}else{
			starmove(smallmain,"left",-(now-1)*smallimgall[0].offsetWidth);
		}
	}
	//左右按键点击
	btnLeft.onclick = function(){
		now--;
		now = now == -1?smallimgall.length-1:now;
		tab();
	};
	btnRight.onclick = function(){
		now++;
		now = now == smallimgall.length?0:now;
		tab();
	}

	var timer = setInterval(btnRight.onclick,2000);//自动播放
	div.onmouseover = function(){
		clearInterval(timer);
	}
	div.onmouseout = function(){
		timer = setInterval(btnRight.onclick,2000);
	}
}

/*获取指定class的元素*/
function getByClass(oParent,sClass){
	var aEle = oParent.getElementsByTagName("*");
	var aResult = [];

	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className == sClass){
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}


/*任意值运动框架*/
function starmove(obj,attr,itarget){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var cur = 0;
		if(attr == "opacity"){
			cur = Math.round(parseFloat(getStyle(obj,attr))*100);
		}else{
			cur = parseInt(getStyle(obj,attr));
		}
		var speed = (itarget - cur)/6;
		speed = speed>0?Math.ceil(speed):Math.floor(speed);
		if(cur == itarget){
			clearInterval(obj.timer);
		}else{
			if(attr == "opacity"){
				obj.style.filter = "alpha(opacity:" + (cur+speed)+")";
				obj.style.opacity = (cur+speed)/100;
			}else{

				obj.style[attr] = cur+speed+"px";
			}
		}
	},30);
}

function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,false)[name];
	}

	}