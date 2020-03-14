/*
 * 
 * yamamoto
 */
//顶部JS
//实现鼠标放到导航栏的菜单时,显示子菜单
//选中菜单元素
var div_nav_list = document.getElementsByClassName('nav_list');
//选中子菜单元素
var div_nav_list_menu = document.getElementsByClassName('nav_list_menu');

for(var i = 0; i < div_nav_list.length; i++) {

	(function(i) {
		div_nav_list[i].onmouseover = function() {
			this.style.background = "#FFFFFF";
			div_nav_list_menu[i].style.display = "block";
		}
	}(i));

	(function(i) {
		div_nav_list[i].onmouseleave = function() {
			this.style.background = "#f5f5f5";
			div_nav_list_menu[i].style.display = "none";
		}
	}(i));
}

//Search Section Js

var codeScan = document.getElementsByClassName('codeScan')[0];
var code_hidden = document.getElementsByClassName('code_hidden')[0];

codeScan.onmouseover = function() {
	var c_logo = this.getElementsByTagName('*')[0];
	var c_des = this.getElementsByTagName('*')[1];
	c_logo.style.color = "#FF4400";
	c_des.style.color = "#FF4400";
	code_hidden.style.display = "block";
}

codeScan.onmouseleave = function() {
	var c_logo = this.getElementsByTagName('*')[0];
	var c_des = this.getElementsByTagName('*')[1];
	c_logo.style.color = "";
	c_des.style.color = "";
	code_hidden.style.display = "none";
}

//中部分类Js
var cat = document.getElementsByClassName('cat');
var cat_container = document.getElementsByClassName('cat_container');
var main_left = document.getElementsByClassName('main_left')[0];

for(var i = 0; i < cat.length; i++) {
	(function(i) {

		cat[i].onmouseover = function() {
			cat_container[i].style.display = 'block';
			main_left.style.width = '1280px';
		}
	}(i));

	(function(i) {

		cat[i].onmouseleave = function() {
			cat_container[i].style.display = 'none';
			main_left.style.width = 'auto';
		}
	}(i));

}

//轮播图Js

var slider = document.getElementsByClassName('img_play_container')[0];
var btns = document.getElementsByClassName('navpoint');
var img_play = document.getElementsByClassName('img_play')[0];
var index = 1; //当前图片的位置
var timer;     //计时器,便于鼠标到图片 清除

function btnsshow() { //关联图片索引和小圆点
	for(var i = 0; i < btns.length; i++) {
		// clear all css
		btns[i].className = 'navpoint';
	}
	btns[index - 1].className = 'navpoint on';
}
function move(offset) { //改变图片的function
	var left = slider.style.left;
	var newLeft = parseInt(left) + offset;
	if(parseInt(left) <= -3584) { //临界值判断,如果到了最后一张,就回到第一张的位置
		newLeft = -896;
	}
	console.log(newLeft);
	slider.style.left = newLeft + 'px';
}
function play() { //自动播放的funciotn
	timer = setInterval(function() {
		index += 1;
		if(index > 4) {
			index = 1;
		}
		console.log(index);
		btnsshow();
		move(-896);
	}, 3000);
}
play();
img_play.onmousemove = function() {
	clearInterval(timer);
}
img_play.onmouseleave = function() {
	play();
}
for(var j = 0; j < btns.length; j++) {
	
		(function (j){
			btns[j].onclick = function() {
			clearInterval(timer);
			var selectedIndex = this.getAttribute('index');
			var offset = 896 * (index - selectedIndex);
			console.log(offset);
			index = selectedIndex;
			move(offset);
			btnsshow();
			play();
		}
		}(j));		
}


//猜你喜欢 Js
var guessItem = document.getElementsByClassName('guessItemContainer');
var simira = document.getElementsByClassName('similar');
for(var i = 0; i < guessItem.length; i++) {

	(function(i) {
		guessItem[i].onmousemove = function() {
			simira[i].style.display = "block";
		}
	}(i));

	(function(i) {
		guessItem[i].onmouseleave = function() {
			simira[i].style.display = 'none';
		}
	}(i));

}