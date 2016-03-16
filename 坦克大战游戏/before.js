window.onload = function() {
	var Jtank = new Tank();
	Jtank.init();
}

function Tank(){
	this.tank = null;
	this.img = null;
	this.height = 40;
	this.width = 40;
	this.left = false;
	this.top = false;
	this.right = false;
	this.bottom = false;
	this.direction = "";
	this.shoot = false;
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
		document.onkeydown = function(e){
			var e = event||ev;
			switch(e && e.keyCode){
				case 37 : that.left = true;that.direction = "left";
				break;
				case 38 : that.top = true;that.direction = "top";
				break;
				case 39 : that.right = true;that.direction = "right";
				break;
				case 40 : that.bottom = true;that.direction = "bottom";
				break;
				case 32 : that.shoot = true;
				break;
			}
		}
		document.onkeyup = function(e){
			var e = event||ev;
			switch(e && e.keyCode){
				case 37 : that.left = false;
				break;
				case 38 : that.top = false;
				break;
				case 39 : that.right = false;
				break;
				case 40 : that.bottom = false;
				break;
				case 32 : that.shoot = false;
				break;
			}
		}
		this.tankStop();
		this.tankMove();
	},

	tankMove:function(){
		var speed = 10;
		var that = this;
		this.timer = setInterval(function(){
			if(that.left){
				that.img.src = "images/tank4.gif";
				that.tank.style.left = that.tank.offsetLeft - speed + "px";
				if(parseFloat(that.tank.style.left)<0){
					var leftEnd = innerWidth - that.width;
					that.tank.style.left = leftEnd + "px";
				}
			}else if(that.top){
				that.img.src = "images/tank1.gif";
				that.tank.style.top = that.tank.offsetTop - speed + "px";
				if(parseFloat(that.tank.style.top)<0){
					var topEnd = innerHeight - that.height;
					that.tank.style.top = topEnd + "px";
				}
			}else if(that.right){
				that.img.src = "images/tank2.gif";
				that.tank.style.left = that.tank.offsetLeft + speed + "px";
				if(parseFloat(that.tank.style.left)>(innerWidth-that.width)){
					that.tank.style.left ="0px";
				}
			}else if(that.bottom){
				that.img.src = "images/tank3.gif";
				that.tank.style.top = that.tank.offsetTop + speed + "px";
				if(parseFloat(that.tank.style.top)>(innerHeight-that.height)){
					that.tank.style.top ="0px";
				}
			}else if(that.shoot){
				that.tankShot(that);
			}
		},50);
	},

	tankStop:function(){
		clearInterval(this.timer);
	},

	tankShot:function(that){
		var bullet = new Bullet();
		this.shotTimer = setTimeout(bullet.init(that),100);
	}

	/*explode:function(){

	}*/
}

function Bullet(){
	this. bullet = null;
	this.timer = null;
	this.left = false;
	this.top = false;
	this.right = false;
	this.bottom = false;
	this.shoot = false;
	this.width = 13;
	this.height = 13;
}

Bullet.prototype = {
	init:function(that){
		var tankLeft = parseFloat(that.tank.style.left);
		var tankTop = parseFloat(that.tank.style.top);
		var tankWidth =that.tank.offsetWidth;
		var tankHeight = that.tank.offsetWidth;
		var bullet = document.createElement("div");
		this.bullet = bullet;
		document.body.appendChild(this.bullet);
		this.bullet.style.position = "absolute";
		this.bullet.style.backgroundImage = "url(images/ball.gif)";
		this.bullet.style.width = this.width + "px";
		this.bullet.style.height = this.height + "px";
		if(that.direction == "top"){
			this.bullet.style.top = tankTop + "px";
			this.bullet.style.left = tankLeft + (tankWidth/2) -(this.width/2)+ "px";
			this.bulletMove(that);
		}else if(that.direction == "right"){
			this.bullet.style.top = tankTop + (tankHeight/2) - (this.height/2) + "px";
			this.bullet.style.left = tankLeft + tankWidth + "px";
			this.bulletMove(that);
		}else if(that.direction == "bottom"){
			this.bullet.style.top = tankTop + tankHeight + "px";
			this.bullet.style.left = tankLeft + (tankWidth/2) - (this.width/2) + "px";
			this.bulletMove(that);
		}else if(that.direction == "left"){
			this.bullet.style.top = tankTop + (tankHeight/2) - (this.height/2)+ "px";
			this.bullet.style.left = tankLeft - this.width+ "px";
			this.bulletMove(that);
		}

	},
	bulletMove:function(dir){
		var that = this;
		var speed = 30;
		if(dir.direction == "top"){//方向向上
			this.timer = setInterval(function(){
				var top = parseFloat(that.bullet.style.top);
				top -= speed;
				that.bullet.style.top = top + "px";
				if(that.bullet.style.top<0){
					clearInterval(that.timer);
					that.bullet.style.display = "none";
				}
			},50);
		}else if(dir.direction == "right"){//方向向右
			this.timer = setInterval(function(){
				var left = parseFloat(that.bullet.style.left);
				if((left + that.width + speed) >= innerWidth){console.log(left+" "+innerWidth);
					that.bullet.style.display = "none";
					that.bullet.style.left = innerWidth + "px";
					clearInterval(that.timer);
				}else{
					left += speed;
					that.bullet.style.left = left + "px";
				}
			},50);
		}else if(dir.direction == "bottom"){//方向向下
			this.timer = setInterval(function(){
				var top = parseFloat(that.bullet.style.top);
				if((top + that.height + speed) >=innerHeight){console.log(top+" "+innerHeight);
					clearInterval(that.timer);
					that.bullet.style.display = "none";
				}else{
					top += speed;
					that.bullet.style.top = top + "px";
				}
			},50);
		}else if(dir.direction == "left"){//方向向左
			this.timer = setInterval(function(){
				var left = parseFloat(that.bullet.style.left);
				left -= speed;
				that.bullet.style.left = left + "px";
				if(that.bullet.style.left<0){
					clearInterval(that.timer);
					that.bullet.style.display = "none";
				}
			},50);
		}
	},
	bulletCollision:function(){

	}

}