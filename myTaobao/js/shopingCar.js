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
