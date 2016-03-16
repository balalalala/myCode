window.onload = function() {
	var start = document.getElementById("start");
	start.onclick = function(){
		var Jtank = new TankPlayer(false,"tank");
		Jtank.init();
		for(var j=0;j<3;j++){
			var enemy = new TankEnemy(true,"enemy");
			enemy.init();
		}
		var enemyAll = setTimeout(function() {
			for(var i=0;i<3;i++){
				var enemy = new TankEnemy(true,"enemy");
				enemy.init();
			}
		}, 5000);

		var end = setTimeout(function(){
			clearInterval(enemyAll);
			var result = Jtank.shotCount();
			var user = getUserMsg(document.getElementById("login_box"));
			getajax("get"," http://datainfo.duapp.com/gamesinfo/catchgolds/gamesubmit.php",{userID:user.userName,score:result},function(data){
				if(data==1){
					document.getElementById("result").innerHTML = "提交数据成功";
				}else if(data==2){
					document.getElementById("result").innerHTML = "没有游戏得分参数";
				}
				else if(data==5){
					document.getElementById("result").innerHTML = "没有提交用户名";
				}
				else if(data==6){
					document.getElementById("result").innerHTML = "游戏分数小于历史得分";
				}
			});
			getJsonp("http://datainfo.duapp.com/gamesinfo/catchgolds/rankinglist.php");

		},60000);
	}
	/*----------------------注册-----------------------*/
	var register = document.getElementById("register");
	var register_box = document.getElementById("register_box");
	var register_cont = document.getElementById("register_cont");
	var close = document.getElementById("close");
	var change = document.getElementById("change");
	var changeText = document.getElementById("changeText");
	var code = document.getElementById("code");
	var submit_btn = document.getElementById("submit_btn");
	var index;
	register.onclick = function(){
		register_box.style.display = "block";
	}
	close.onclick = function() {
		register_box.style.display = "none";
	}
	change.onclick = function(){
		var randomNumber = Math.random().toString(36).slice(2,6);
		changeText.value = randomNumber;
	}
	registerVerify();
	submit_btn.onclick = function(){
		var user = getUserMsg(this.parentNode);
		getajax("get","http://datainfo.duapp.com/shopdata/userinfo.php",{status:"register",userID:user.userName,password:user.passWord},function(data){
			if(data==0){
				document.getElementById("result").innerHTML = "用户名重名，请重新注册";
			}else if(data==1){
				document.getElementById("result").innerHTML = "注册成功";
				document.getElementById("register_box").style.display = "none";
			}
		});
	}

	/*----------------------登录-----------------------*/
	var login = document.getElementById("login");
	var login_box = document.getElementById("login_box");
	var login_close = document.getElementById("login_close");
	var login_change = document.getElementById("login_change");
	var login_changeText = document.getElementById("login_changeText");
	var login_code = document.getElementById("login_code");
	var login_btn = document.getElementById("login_btn");
	var index;
	login.onclick = function(){
		login_box.style.display = "block";
	}
	login_close.onclick = function() {
		login_box.style.display = "none";
	}
	login_change.onclick = function(){
		var randomNumber = Math.random().toString(36).slice(2,6);
		login_changeText.value = randomNumber;
	}
	login_btn.onclick = function(){
		var user = getUserMsg(this.parentNode);
		getajax("get","http://datainfo.duapp.com/shopdata/userinfo.php",{status:"login",userID:user.userName,password:user.passWord},function(data){
			if(data==0){
				document.getElementById("result").innerHTML = "用户名不存在";
			}else if(data==2){
				document.getElementById("result").innerHTML = "用户名密码不符";
			}else if(data.substr(0,1) == "{"){
				document.getElementById("result").innerHTML = "登陆成功";
				document.getElementById("login_box").style.display = "none";
			}
		});
	}
}
	function callback(data){
		/*var data = JSON.parse(data);
		for(var i=0;i<data.length;i++){

		}*/console.log(data);
	}
	/*获取jsonp*/
	function getJsonp(url){
		var thisScript = document.getElementById("jasonpScript");
		if(thisScript){
			document.body.removeChild(thisScript);
			createScript();
		}else{
			createScript();
		}
		function createScript(){
			thisScript = document.createElement("script");
			thisScript.id = "jasonpScript";
			thisScript.src=url;
			document.body.appendChild(thisScript);
		}

	}


function getUserMsg(pnode){
	var inputAll = pnode.getElementsByTagName("input");
	var user={
		userName:inputAll[0].value,
		passWord:inputAll[1].value
	}
	return user;
}

/*注册验证*/
function registerVerify() {
	var userName = document.getElementById("userName");
	var passWord = document.getElementById("passWord");
	var repeatWord = document.getElementById("repeatWord");
	var count =0;
	userName.onblur = function(){
		var phoneNumber = /0?(13|14|15|18)[0-9]{9}/;
		var email = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
		if(this.value.length==0){
			this.nextSibling.innerHTML="账号不能为空";

		}else if(phoneNumber.test(this.value)==false&&email.test(this.value)==false){
			this.nextSibling.innerHTML="请输入正确格式的帐号";
		}
		else{
			count++;
			this.nextSibling.innerHTML= "";
		}
	}
	passWord.onblur = function(){
		var thisText=this.value;
		var code = getCode(thisText);
		if(this.value.length==0){
			this.nextSibling.innerHTML="账号不能为空";

		}else if((this.value.length<8)||(this.value.length>20)){
			this.nextSibling.innerHTML="密码长度8-20位";
		}
		else if(code<2){
			this.nextSibling.innerHTML="密码至少包含数字、字母、字符其中的2种";
		}
		else{
			count++;
			this.nextSibling.innerHTML="";
		}
	}
	repeatWord.onblur = function(){
		var thisText=this.value;
		var pText=passWord.value;
		if(thisText==pText){
			count++;
			this.nextSibling.innerHTML="";
		}else{
			this.nextSibling.innerHTML="确认密码和密码不一致，请重新输入";
		}
	}
	code.onblur = function(){
		if(this.value == changeText.value){
			count++;
		}
	}
	if(count == 4){
		return true;
	}
	return false;
}

/*登录验证*/
function loginVerify() {
	var login_userName = document.getElementById("login_userName");
	var login_passWord = document.getElementById("login_passWord");
	var count =0;
	login_userName.onblur = function(){
		var phoneNumber = /0?(13|14|15|18)[0-9]{9}/;
		var email = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
		if(this.value.length==0){
			this.nextSibling.innerHTML="账号不能为空";

		}else if(phoneNumber.test(this.value)==false&&email.test(this.value)==false){
			this.nextSibling.innerHTML="请输入正确格式的帐号";
		}
		else{
			count++;
			this.nextSibling.innerHTML= "";
		}
	}
	login_passWord.onblur = function(){
		var thisText=this.value;
		var code = getCode(thisText);
		if(this.value.length==0){
			this.nextSibling.innerHTML="账号不能为空";

		}else if((this.value.length<8)||(this.value.length>20)){
			this.nextSibling.innerHTML="密码长度8-20位";
		}
		else if(code<2){
			this.nextSibling.innerHTML="密码至少包含数字、字母、字符其中的2种";
		}
		else{
			count++;
			this.nextSibling.innerHTML="";
		}
	}
	if(count == 4){
		return true;
	}
	return false;
}


function getCode(thisText){
	var regAll = [];
	var code = 0;
	regAll[0] = /[0-9]/;
	regAll[1] = /[A-Za-z]/;
	regAll[2] = /[^a-zA-Z0-9]/;
	for(var i=0;i<3;i++){
		if(regAll[i].test(thisText)){
			code++;
		}
	}
	return code;
}/*以上都是注册以及登录的代码，下面是坦克类*/

/*坦克基类*/
function TankObject(shoot,className) {
	this.outer = null;
	this.tank = null;
	this.img = null;
	this.border = 10;
	this.height = 40;
	this.width = 40;
	this.left = false;
	this.top = false;
	this.right = false;
	this.bottom = false;
	this.direction = "";
	this.shoot = shoot;
	this.dirTimer = null;
	this.moveTimer = null;
	this.shotTimer = null;
	this.shootTime = null;
}

TankObject.prototype = {
	move:function(className,that,speed){
		if (that.left) {
			that.img.src = 'images/' + className + '4.gif';
			that.tank.style.left = that.tank.offsetLeft - speed + "px";
			if (that.tank.offsetLeft < 0) {
				that.tank.style.left = that.outer.offsetWidth - that.width - that.border * 2 + "px";
			}
		} else if (that.top) {
			that.img.src = 'images/' + className + '1.gif';
			that.tank.style.top = that.tank.offsetTop - speed + "px";
			if (that.tank.offsetTop < 0) {
				that.tank.style.top = that.outer.offsetHeight - that.height - that.border * 2 + "px";
			}
		} else if (that.right) {
			that.img.src = 'images/' + className + '2.gif';
			that.tank.style.left = that.tank.offsetLeft + speed + "px";
			if ((that.tank.offsetLeft + that.width) > (that.outer.offsetWidth - that.border * 2)) {
				that.tank.style.left = "0px";
			}
		} else if (that.bottom) {
			that.img.src = 'images/' + className + '3.gif';
			that.tank.style.top = that.tank.offsetTop + speed + "px";
			if ((that.tank.offsetTop + that.height) > (that.outer.offsetHeight - that.border * 2)) {
				that.tank.style.top = "0px";
			}
		}
	},
	tankStop:function(){
		clearInterval(this.shotTimer);
		clearInterval(this.timer);
	},
	tankShot:function(that){
		var bullet = new Bullet(that);
		bullet.init(that);
	}
}

/*敌人坦克类*/
function TankEnemy() {
	TankObject.call(this,true);
}
TankEnemy.prototype = new TankObject();

TankEnemy.prototype.init = function(){
	var outer = document.getElementById("outer");
	var tank = document.createElement("div");
	var img = document.createElement("img");
	var that = this;
	this.outer = outer;
	this.tank = tank;
	this.img = img;
	this.tank.alive = true;
	this.tank.className = "enemy";
	this.tank.style.position = "absolute";
	this.outer.appendChild(this.tank);
	this.tank.appendChild(this.img);
	var location = ["0px","250px","500px"];
	this.img.src = "images/enemy3.gif";
	this.tank.style.top = "0px";
	this.tank.style.left = location[Math.floor(Math.random()*location.length)];
	this.moveTimer = setInterval(that.enemyRandomDir(that), 1000);
	this.shootTimer = setInterval(function() {
		if (that.tank.alive==true&&that.shoot==true) {
			that.tankShot(that);
		}
		else if(that.tank.alive==false){
			clearInterval(that.shootTimer);
		}
	}, 2000);
}
TankEnemy.prototype.tankMove = function() {
	var speed = 1;
	var that = this;
	this.timer = setInterval(function() {
		that.move("enemy",that,speed);
	}, 40);
}

TankEnemy.prototype.enemyRandomDir = function(that) {
	that.dirTimer = setInterval(function() {
		var dir = [false, false, false, false];
		dir[Math.floor(Math.random() * dir.length)] = true;
		that.top = dir[0];
		that.right = dir[1];
		that.bottom = dir[2];
		that.left = dir[3];
		if (that.top) {
			that.direction = "top";
		} else if (that.right) {
			that.direction = "right";
		}
		if (that.bottom) {
			that.direction = "bottom";
		}
		if (that.left) {
			that.direction = "left";
		}
		var shootArr = [true, false];
		that.shoot = shootArr[Math.floor(Math.random() * shootArr.length)];
	}, 5000);
	that.tankMove(that);
}

/*玩家坦克类*/
function TankPlayer() {
	this.count = 0;
	TankObject.call(this,false);
}

TankPlayer.prototype = new TankObject();

TankPlayer.prototype.init = function(){
	var outer = document.getElementById("outer");
	var tank = document.createElement("div");
	var img = document.createElement("img");
	var that = this;
	this.outer = outer;
	this.tank = tank;
	this.img = img;
	this.tank.alive = true;
	this.tank.className = "tank";
	this.tank.style.position = "absolute";
	this.outer.appendChild(this.tank);
	this.tank.appendChild(this.img);
	this.img.src = "images/tank1.gif";
	this.tank.style.top = this.outer.offsetHeight - this.height - this.border * 2 + "px";
	this.tank.style.left = this.outer.offsetWidth / 2 - this.width/2 + "px";
	document.onkeydown = function(e) {
		var e = event || ev;
		switch (e && e.keyCode) {
			case 37:
				that.left = true;
				that.direction = "left";
				break;
			case 38:
				that.top = true;
				that.direction = "top";
				break;
			case 39:
				that.right = true;
				that.direction = "right";
				break;
			case 40:
				that.bottom = true;
				that.direction = "bottom";
				break;
			case 32:
				that.shoot = true;
				break;
		}
	}
	document.onkeyup = function(e) {
		var e = event || ev;
		switch (e && e.keyCode) {
			case 37:
				that.left = false;
				break;
			case 38:
				that.top = false;
				break;
			case 39:
				that.right = false;
				break;
			case 40:
				that.bottom = false;
				break;
			case 32:
				that.shoot = false;
				break;
		}
	}
	this.tankStop();
	this.tankMove();
}
TankPlayer.prototype.tankMove = function() {
	var speed = 1;
	var that = this;
	this.timer = setInterval(function() {
		that.move("tank",that,speed);
	}, 10);
	this.shotTimer = setInterval(function(){
		if (that.shoot){
			that.tankShot(that);
		}
	},200);
}
TankPlayer.prototype.shotCount = function(){
	if(!this.tank.alive){
		alert("你输了");
		this.count =0;
		return this.count;
	}else{
		return this.count;
	}
}


/*子弹类*/ //应该有子弹基类

function Bullet(that) {
	this.outer = null;
	this.bullet = null;
	this.img
	this.timer = null;
	this.border = 10;
	this.left = false;
	this.top = false;
	this.right = false;
	this.bottom = false;
	this.width = 13;
	this.height = 13;
	this.shoot = false;
	this.alive = true;
	this.count = 0;
	this.shootTimer = null;
	this.exploreTimer = null;
}

Bullet.prototype = {
	init: function(that) {
		var tankLeft = parseFloat(that.tank.style.left);
		var tankTop = parseFloat(that.tank.style.top);
		var tankWidth = that.tank.offsetWidth;
		var tankHeight = that.tank.offsetWidth;
		var outer = document.getElementById("outer");
		var bullet = document.createElement("div");
		var img = document.createElement("img");
		this.outer = outer;
		this.bullet = bullet;
		this.img = img;
		this.outer.appendChild(this.bullet);
		this.bullet.appendChild(this.img);
		this.bullet.style.position = "absolute";
		this.img.src = "images/ball.gif";
		this.bullet.style.width = this.width + "px";
		this.bullet.style.height = this.height + "px";
		if (that.direction == "top") {
			this.bullet.style.top = tankTop - this.height + "px";
			this.bullet.style.left = tankLeft + (tankWidth / 2) - (this.width / 2) + "px";
		} else if (that.direction == "right") {
			this.bullet.style.top = tankTop + (tankHeight / 2) - (this.height / 2) + "px";
			this.bullet.style.left = tankLeft + tankWidth + "px";
		} else if (that.direction == "bottom") {
			this.bullet.style.top = tankTop + tankHeight + "px";
			this.bullet.style.left = tankLeft + (tankWidth / 2) - (this.width / 2) + "px";
		} else if (that.direction == "left") {
			this.bullet.style.top = tankTop + (tankHeight / 2) - (this.height / 2) + "px";
			this.bullet.style.left = tankLeft - this.width + "px";
		} else {//玩家坦克初始发射子弹方向
			this.bullet.style.top = tankTop + "px";
			this.bullet.style.left = tankLeft + (tankWidth / 2) - (this.width / 2) + "px";
		}
		this.bulletMove(that);

	},
	bulletMove: function(dir) {
		var that = this;
		var speed = 1;
		if (dir.direction == "top") { //方向向上
			this.timer = setInterval(function() {
				var top = parseInt(that.bullet.style.top);
				if (top <= 0) {
					that.bullet.style.top = "0px";
					that.outer.removeChild(that.bullet);
					clearInterval(that.timer);
				} else {
					top -= speed;
					that.bullet.style.top = top + "px";
				}
				var direction = "top"
				that.bulletCollision(dir, direction);
			}, 1);
		} else if (dir.direction == "right") { //方向向右
			this.timer = setInterval(function() {
				var left = parseInt(that.bullet.style.left);
				if ((left + that.width ) >= (that.outer.offsetWidth - that.border)) {
					that.bullet.style.left = that.outer.offsetWidth - that.border - that.width + "px";
					that.outer.removeChild(that.bullet);
					clearInterval(that.timer);
				} else {
					left += speed;
					that.bullet.style.left = left + "px";
				}
				var direction = "right"
				that.bulletCollision(dir, direction);
			}, 1);
		} else if (dir.direction == "bottom") { //方向向下
			this.timer = setInterval(function() {
				var top = parseInt(that.bullet.style.top);
				if ((top + that.height ) >= (that.outer.offsetHeight - that.border)) {
					that.bullet.style.top = that.outer.offsetHeight - that.border - that.height + "px";
					that.outer.removeChild(that.bullet);
					clearInterval(that.timer);
				} else {
					top += speed;
					that.bullet.style.top = top + "px";
				}
				var direction = "bottom"
				that.bulletCollision(dir, direction);
			}, 1);

		} else if (dir.direction == "left") { //方向向左
			this.timer = setInterval(function() {
				var left = parseInt(that.bullet.style.left);
				if (left <= 0) {
					that.bullet.style.left = that.border + "px";
					that.outer.removeChild(that.bullet);
					clearInterval(that.timer);
				} else {
					left -= speed;
					that.bullet.style.left = left + "px";
				}
				var direction = "left"
				that.bulletCollision(dir, direction);
			}, 1);
		} else {//子弹撞击坦克
			document.getElementById("outer").removeChild(that.bullet);
			that.timer=null;
			if(that.alive == false){
				clearInterval(that.timer);
			}
		}
	},

	/*bulletExplore : function(){
		var that = this;
			that.bullet.style.top = "0px";
			for(var i=0;i<4;i++){console.log("lalala");
				that.img.src = "images/explode1.gif";
			}
			if(i == 4){
				clearInterval(that.exploreTimer);
			}
		},1000);
		that.outer.removeChild(that.bullet);
		clearInterval(that.timer);

	},*/

	bulletCollision: function(dir, direction) {
		var divAll = document.getElementsByTagName("div");
		for (var i in divAll) {
			if ((divAll[i].className != dir.tank.className) && (divAll[i].className == "tank" || divAll[i].className == "enemy")) {
				if (direction == "top") {
					if (this.bullet.offsetTop == (divAll[i].offsetTop + divAll[i].offsetHeight) && (this.bullet.offsetLeft >= divAll[i].offsetLeft) && ((this.bullet.offsetLeft + this.bullet.offsetWidth) <= (divAll[i].offsetLeft + divAll[i].offsetWidth + divAll[i].offsetWidth))) {
						divAll[i].alive = false;
						this.bullet.style.display="none";
						document.getElementById("outer").removeChild(divAll[i]);
						if(typeof dir.count == "number"){
							dir.count++;
						}
					}
				} else if (direction == "right") {
					if ((this.bullet.offsetLeft + this.bullet.offsetWidth) == divAll[i].offsetLeft && (this.bullet.offsetTop >= divAll[i].offsetTop) && ((this.bullet.offsetTop + this.bullet.offsetHeight) <= (divAll[i].offsetTop + divAll[i].offsetHeight))) {
						divAll[i].alive = false;
						this.bullet.style.display="none";
						document.getElementById("outer").removeChild(divAll[i]);
						if(typeof dir.count == "number"){
							dir.count++;
						}
					}
				} else if (direction == "bottom") {
					if ((this.bullet.offsetTop + this.bullet.offsetHeight) == divAll[i].offsetTop && (this.bullet.offsetLeft >= divAll[i].offsetLeft) && ((this.bullet.offsetLeft + this.bullet.offsetWidth) <= (divAll[i].offsetLeft + divAll[i].offsetWidth + divAll[i].offsetWidth))) {
						divAll[i].alive = false;
						this.bullet.style.display="none";
						document.getElementById("outer").removeChild(divAll[i]);
						if(typeof dir.count == "number"){
							dir.count++;
						}
					}
				} else if (direction == "left") {
					if (this.bullet.offsetLeft == (divAll[i].offsetLeft + divAll[i].offsetWidth) && (this.bullet.offsetTop >= divAll[i].offsetTop) && ((this.bullet.offsetTop + this.bullet.offsetHeight) <= (divAll[i].offsetTop + divAll[i].offsetHeight))) {
						divAll[i].alive = false;
						this.bullet.style.display="none";
						document.getElementById("outer").removeChild(divAll[i]);
						if(typeof dir.count == "number"){
							dir.count++;
						}
					}
				}
			}
		}
	},

}

/*封装AJAX请求函数*/
function getajax(method,url,parameter,fn){
	var httpRequest=null;
	var thisp="";
	for(var i in parameter){
		thisp+=i+"="+parameter[i]+"&";
	}
	thisp=thisp.substr(0,thisp.length-1);

	if(window.XMLHttpRequest){
		httpRequest=new XMLHttpRequest();
	}else{
		httpRequest=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(method=="get"){
		httpRequest.open(method,url+"?"+thisp,true);
		httpRequest.send();
	}else if(method=="post"){
		httpRequest.open(method,url,true);
		httpRequest.send(thisp);
	}

	httpRequest.onreadystatechange=function(){
		var data=null;
		if(httpRequest.status==200){
			if(httpRequest.readyState==4){
				if(typeof(fn)=="function"){
					fn(httpRequest.responseText);
				}

			}
		}else{
			console.log("服务器连接失败！！");
		}
	}
}