window.onload = function(){
	function addDrag(){
		var main = document.getElementById("main");
		var place = main.getElementsByTagName("div");
		var img = document.getElementsByTagName("img");
		var count = 0;
		for(var i=0;i<img.length;i++){
			img[i].index = i;
			img[i].onmousedown = function(){
				event.preventDefault();
				var b_x = event.clientX , b_y = event.clientY;
				var box_x = this.offsetLeft , box_y = this.offsetTop;
				document.index = this.index;
				document.onmousemove = function(){
					var n_x = event.clientX , n_y = event.clientY;
					img[this.index].style.left = n_x - b_x + box_x + "px";
					img[this.index].style.top = n_y - b_y + box_y + "px";
					if(n_x>50&&n_x<350&&n_y>50&&n_y<350){
						img[this.index].style.left = "100px";
						img[this.index].style.top = "100px";
					}else if(n_x>250&&n_x<550&&n_y>50&&n_y<350){
						img[this.index].style.left = "300px";
						img[this.index].style.top = "100px";
					}
					else if(n_x>450&&n_x<750&&n_y>50&&n_y<350){
						img[this.index].style.left = "500px";
						img[this.index].style.top = "100px";
					}
					else if(n_x>50&&n_x<350&&n_y>250&&n_y<550){
						img[this.index].style.left = "100px";
						img[this.index].style.top = "300px";
					}else if(n_x>250&&n_x<550&n_y>250&&n_y<550){
						img[this.index].style.left = "300px";
						img[this.index].style.top = "300px";
					}
					else if(n_x>450&&n_x<750&&n_y>250&&n_y<550){
						img[this.index].style.left = "500px";
						img[this.index].style.top = "300px";
					}
					else if(n_x>50&&n_x<350&&n_y>450&&n_y<750){
						img[this.index].style.left = "100px";
						img[this.index].style.top = "500px";
					}else if(n_x>250&&n_x<550&&n_y>450&&n_y<750){
						img[this.index].style.left = "300px";
						img[this.index].style.top = "500px";
					}
					else if(n_x>450&&n_x<750&&n_y>450&&n_y<750){
						img[this.index].style.left = "500px";
						img[this.index].style.top = "500px";
					}
				}
				document.onmouseup = function(){
					document.onmousemove=null;
					document.onmouseup=null;
				}
			}
		}
	}
	addDrag();
}