window.onload=function(){
	var menuBox=document.getElementById("buttonBox");
	var productBox=document.getElementById("imgBox");
	var menu=[];
	getajax("get","http://datainfo.duapp.com/shopdata/getclass.php",{},function(data){
		if(data == 0){
			console.log("无数据返回");
		}else{
			menu = JSON.parse(data);
			createMenu(menuBox,productBox,menu);
			getJsonp("http://datainfo.duapp.com/shopdata/getGoods.php");
		}
	});
}
function callback(data){
	var productBox=document.getElementById("imgBox");
	createPro(productBox,data);
}

function createMenu(menuBox,productBox,menu){
	for(var i=0;i<menu.length;i++){
		var menuA=document.createElement("button");
		menuA.innerHTML=menu[i].className;
		menuA["index"]=menu[i].classID;
		menuBox.appendChild(menuA);

		menuA.onclick=function(){
			getJsonp("http://datainfo.duapp.com/shopdata/getGoods.php","classID",this.index);
		}
	}
}

function createPro(productBox,product){
	var imgAll=[];
	var arrayHeight=[];
	productBox.innerHTML="";
	for(var i=0;i<product.length;i++){
		var thisp=document.createElement("a");
		thisp.position="absolute";
		thisp.innerHTML='<img  src="'+product[i].goodsListImg+'""><span style="opacity:0">'+product[i].goodsName+'<br/>'+product[i].price+'</span>';
		productBox.appendChild(thisp);
		thisp.timer=null;
		thisp.onmouseover=function(ev){

			var span=this.getElementsByTagName("span")[0];

				FDin(span,this);


		}
		thisp.onmouseout=function(ev){
			var span=this.getElementsByTagName("span")[0];
				FDout(span,this);
		}
	}
	setWtf(productBox,arrayHeight);
}

function setWtf(productBox,arrayHeight){
	var imgAll = productBox.getElementsByTagName("a");
	for(var i=0;i<imgAll.length;i++){
		if(i<3){
			arrayHeight[i] = imgAll[i].offsetHeight;
		}else{
			var minH = Math.min.apply(null,arrayHeight);
			var index = arrayHeight.indexOf(minH);
		}
	}
}



function FDin(span,a){
	//console.log(span);
	var opt=parseFloat(span.style.opacity);
	var speet=0.05;
	clearInterval(a.timer);
	a.timer=setInterval(function(){
		//console.log(opt);
		opt+=speet;
		span.style.opacity=opt;
		if(opt>=1){
			clearInterval(a.timer);
		}
	},50);
}

function FDout(span,a){
	var opt=parseFloat(span.style.opacity);
	var speet=0.05;
	clearInterval(a.timer);
	a.timer=setInterval(function(){
		//console.log(opt);
		opt-=speet;
		span.style.opacity=opt;
		if(opt<=0){
			clearInterval(a.timer);
		}
	},50);
}

function getJsonp(url,parameter,parameterValue){
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
		if(parameterValue){
			thisScript.src=url+ "?" + parameter + "=" + parameterValue;
		}else{
			thisScript.src=url;
		}
		document.body.appendChild(thisScript);
	}

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
		//console.log(httpRequest.status+"__"+httpRequest.readyState);
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