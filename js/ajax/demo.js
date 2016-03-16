window.onload = function () {
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
		var user = getUserMsg("login_box");
		getajax("get","http://datainfo.duapp.com/shopdata/userinfo.php",{status:"register",userID:user.userName,password:user.passWord},function(data){
			if(data==0){
				console.log("用户名重名，请重新注册");
			}else if(data==1){
				console.log("注册成功");
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
				console.log("用户名不存在");
			}else if(data==2){
				console.log("用户名密码不符");
			}else if(data.substr(0,1) == "{"){
				console.log("登陆成功");
			}
		});
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
			console.log()
			code++;
		}
	}
	return code;
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