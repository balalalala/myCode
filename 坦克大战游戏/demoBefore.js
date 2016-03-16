window.onload = function() {
	var Jtank = new Tank();
	
	Jtank.init();
}

function Tank(){
	this.tank = null;
	this.img = null;
	this.height = 32;
	this.width = 32;
	this.moveTimer = null;
	this.shotTimer = null;
}

Tank.prototype = {
	init:function(){
		var tank = document.createElement("div");
		var img = document.createElement("img");
		tank.appendChild(img);
		document.body.insertBefore(tank,document.body.firstChild);
		this.tank = tank;
		this.img = img;
		img.src = "images/tank1.gif";
		this.tank.style.position = "absolute";
		var numH = innerHeight-this.tank.offsetHeight;
		var numW = innerWidth-this.tank.offsetWidth;
		this.tank.style.top = innerHeight-this.height + "px";
		this.tank.style.left = innerWidth/2 + "px";
		/*this.tank.style.top = Math.floor(Math.random()*numH + 0)+ "px";
		this.tank.style.left = Math.floor(Math.random()*numW + 0) + "px";*/
		var that = this;
		document.onkeydown = function(ev){
			var e = event||ev;
			that.tankMove(e);
		}
		document.onkeyup = function(){
			clearInterval(that.timer);
		}
	},
	tankMove:function(e){
		var speed = 10;
		var that = this;
		if(e && e.keyCode ==37){
			//this.timer = setInterval(function(){
				that.img.src = "images/tank4.gif";
				var left = parseFloat(that.tank.style.left);
				left -= speed;
				that.tank.style.left = left + "px";
				if(left<0){
					var leftEnd = innerWidth - that.width;
					that.tank.style.left = leftEnd + "px";
				}
			//},50);
		}else if(e && e.keyCode ==38){
			//this.timer = setInterval(function(){
				that.img.src = "images/tank1.gif";
				var top = parseFloat(that.tank.style.top);
				top -= speed;
				that.tank.style.top = top + "px";
				if(top<0){
					var topEnd = innerHeight - that.height;
					that.tank.style.top = topEnd + "px";
				}
			//},50);
		}else if(e && e.keyCode ==39){
			//this.timer = setInterval(function(){
				that.img.src = "images/tank2.gif";
				var left = parseFloat(that.tank.style.left);
				left += speed;
				that.tank.style.left = left + "px";
				if(left>(innerWidth-that.width)){
					that.tank.style.left ="0px";
				}
			//},50);
		}else if(e && e.keyCode ==40){
			//this.timer = setInterval(function(){
				that.img.src = "images/tank3.gif";
				var top = parseFloat(that.tank.style.top);
				top += speed;
				that.tank.style.top = top + "px";
				if(top>(innerHeight-that.height)){
					that.tank.style.top ="0px";
				}
			//},50);
		}else if(e && e.keyCode ==32){
			var left = parseFloat(that.tank.style.left);
			var top = parseFloat(that.tank.style.top);
			var direction = that.img.src.substr(length-5,1);//获取图片方向
			that.tankShot(left,top,direction);//传当前方向的参数和坦克的position,图片方向
		}
	},

	/*tankStop:function(){
		clearInterval(this.timer);
	}*/

	tankShot:function(left,top,direction){
		var bullet = new Bullet();
		this.shotTimer = setTimeout(bullet.init(left,top,this.width,this.height,direction),100);
	}

	/*explode:function(){}*/
}

function Bullet(){
	this. bullet = null;
	this.timer = null;
	this.width = 8;
	this.height = 8;
}

Bullet.prototype = {
	init:function(left,top,width,height,direction){
		var bullet = document.createElement("div");
		this.bullet = bullet;
		document.body.appendChild(this.bullet);
		this.bullet.style.position = "absolute";
		this.bullet.style.width = this.width + "px";
		this.bullet.style.height = this.height + "px";
		if(direction == 1){
			this.bullet.style.backgroundImage = "url(images/bulletTop.gif)";
			this.bullet.style.top = top + "px";console.log(width);
			this.bullet.style.left = left + (width/2) -(this.width/2)+ "px";
			this.bulletMove(direction);
		}else if(direction == 2){
			this.bullet.style.backgroundImage = "url(images/bulletRight.gif)";
			this.bullet.style.top = top + (height/2) - (this.height/2) + "px";
			this.bullet.style.left = left + width + "px";
			this.bulletMove(direction);
		}else if(direction == 3){
			this.bullet.style.backgroundImage = "url(images/bulletBottom.gif)";
			this.bullet.style.top = top + height + "px";
			this.bullet.style.left = left + (width/2) - (this.width/2) + "px";
			this.bulletMove(direction);
		}else if(direction == 4){
			this.bullet.style.backgroundImage = "url(images/bulletLeft.gif)";
			this.bullet.style.top = top + (height/2) - (this.height/2)+ "px";
			this.bullet.style.left = left - this.width+ "px";
			this.bulletMove(direction);
		}

	},
	bulletMove:function(direction){
		var that = this;
		var speed = 10;
		if(direction == 1){//方向向上
			this.timer = setInterval(function(){
				var top = parseFloat(that.bullet.style.top);
				top -= speed;
				that.bullet.style.top = top + "px";
				if(that.bullet.style.top<0){
					that.bullet=null;
				}
			},50);
		}else if(direction == 2){//方向向右
			this.timer = setInterval(function(){
				var left = parseFloat(that.bullet.style.left) + speed + speed;
				if(left >= innerWidth){
					clearInterval(that.timer);
					that.bullet.style.display = "none";
				}else{
					left += speed;
					that.bullet.style.left = left + "px";
				}
			},50);
		}else if(direction == 3){//方向向下
			this.timer = setInterval(function(){
				var top = parseFloat(that.bullet.style.top) + speed;
				if(top >=innerHeight){
					clearInterval(that.timer);
					that.bullet.style.display = "none";
				}else{
					top += speed;
					that.bullet.style.top = top + "px";
				}
			},50);
		}else if(direction == 4){//方向向左
			this.timer = setInterval(function(){
				var left = parseFloat(that.bullet.style.left);
				left -= speed;
				that.bullet.style.left = left + "px";
				if(that.bullet.style.left<0){
					that.bullet=null;
				}
			},50);
		}
	},
	bulletCollision:function(){

	}

}