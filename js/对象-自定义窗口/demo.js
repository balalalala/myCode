window.onload = function(){
	var D1=null;
	document.getElementById("showD").onclick=function(){
		if(D1 instanceof Dialog){
			D1.show(getUser());
		}else{
			D1=new DragDialog(getUser());
		}
	}
	document.getElementById("closeD").onclick=function(){
		D1.close();
	}

}
/*工厂模式获取数据*/
function getUser(){
	var obj = {
		width:document.getElementById("dialogW").value,
		height:document.getElementById("dialogH").value,
		bgcolor:document.getElementById("dialogC").value,
		title:document.getElementById("dialogTT").value,
		text:document.getElementById("dialogTX").value
	}
	return obj;
}

function Dialog(opt){
	this.height="";
	this.width="";
	this.bgcolor="";
	this.title="";
	this.text="";
	for(var i in opt){
		this[i] = opt[i];
	}

	this.dialogBox=null;
	this.closeBut=null;
	this.titleBox=null;
	this.textBox=null;

}
/*弹窗所拥有的方法*/
Dialog.prototype={
	init:function(){
		var body=document.getElementsByTagName("body")[0];
		var dialogBox = document.createElement("div");
		var closeBut = document.createElement("button");
		var titleBox=document.createElement("h1");
		var titleSpan=document.createElement("span");
		var textBox=document.createElement("p");

		this.dialogBox=dialogBox;
		this.closeBut=closeBut;
		this.titleBox=titleBox;
		this.textBox=textBox;
		this.titleSpan=titleSpan;

		titleBox.appendChild(titleSpan);
		titleBox.appendChild(closeBut);
		dialogBox.appendChild(titleBox);
		dialogBox.appendChild(textBox);
		body.appendChild(dialogBox);
		dialogBox.setAttribute("class","dialog");
		closeBut.innerText="X";

		dialogBox.style.position="absolute";
		dialogBox.style.width=this.width+"px";
		dialogBox.style.height=this.height+"px";
		titleBox.style.backgroundColor=this.bgcolor;
		titleSpan.innerText=this.title;
		textBox.innerHTML=this.text;

		this.addevent();
	},

	addevent:function(){
		var that=this;
		this.closeBut.onclick=function(){
			that.close();
		}
	},

	show:function(){
		for(var i in opt){
			this[i]=opt[i];
		}
		this.dialogBox.style.position="absolute";
		this.dialogBox.style.width=this.width+"px";
		this.dialogBox.style.height=this.height+"px";
		this.titleSpan.innerHTML=this.title;
		this.titleBox.style.backgroundColor=this.bgcolor;
		this.textBox.innerHTML=this.text;
		this.dialogBox.style.display="block";
	},
	close:function(){
		this.dialogBox.style.display="none";
	},
	remove:function(){
		document.getElementsByName("body")[0].removeChild(newdiv);
	}
}

function DragDialog(opt){
	Dialog.call(this,opt);
	this.init();
	this.drag();
}

DragDialog.prototype = new Dialog();
DragDialog.prototype.constructor = DragDialog;

DragDialog.prototype.drag = function(){
	var that = this;
	this.titleBox.onmousedown=function(){

		var d_x=event.pageX,
			d_y=event.pageY;
		var box_x=that.dialogBox.offsetLeft;
		var box_y=that.dialogBox.offsetTop;

		document.onmousemove=function(){
			var m_x=event.pageX,
				m_y=event.pageY;

			var this_x=m_x-d_x,
				this_y=m_y-d_y;

			that.dialogBox.style.left=box_x+this_x+"px";
			that.dialogBox.style.top=box_y+this_y+"px";
		}
		document.onmouseup=function(){
			document.onmousemove=null;
		}
	}
}

