//放大镜Js
var box = document.getElementsByClassName('box')[0];
var infoPic = document.getElementsByClassName('infoPic')[0];
var scaleImg = document.getElementsByClassName('ScaleImg')[0];
var itemdetailCotent = document.getElementsByClassName('itemdetailCotent')[0];
var imgScale = document.getElementsByClassName('imgScale')[0];
//console.log(infoPic.offsetLeft);
function getPosition(e)
{
	var offsetTop = itemdetailCotent.offsetTop + infoPic.offsetTop; //计算容器到顶页面顶部的距离
	var offsetLeft = itemdetailCotent.offsetLeft + infoPic.offsetLeft;//计算容器到页面左面的距离
	var top = e.clientY - offsetTop - box.offsetHeight / 2;   //通过鼠标位置 - 容器的到顶部的距离 - 盒子阴影的宽度/2 
	var left = e.clientX - offsetLeft - box.offsetWidth / 2;  //得到阴影在图片中的位置, 这个值*2 就是放大镜需要的位置
	var mintop = 20; //因为父容器有20的padding 所以这里最小值这位20
	var minleft = 20;
	var maxtop = infoPic.offsetHeight / 2 + 20; //因为阴影盒子占图片1/4 所以最大宽度/2
	var maxleft = infoPic.offsetWidth / 2 + 20;
	var mvleft = 0;
	var mvtop = 0;
//	console.log('top:'+top);
//	console.log('left:'+left);
	if(top < mintop) //临界判断
	{
		box.style.top = mintop + 'px';
		mvtop = mintop - 20;
	}
	else if(top > maxtop)
	{
		box.style.top = maxtop  + 'px';
		mvtop = maxtop - 20;
	}else{
		box.style.top = top  + 'px';
		mvtop = top - 20;
	}
	if(left < minleft)
	{
		box.style.left = minleft  + 'px';
		mvleft = minleft -20;
	}else if(left > maxleft)
	{
		box.style.left = maxleft  + 'px';
		mvleft = maxleft -20;
	}
	else {
		box.style.left = left  + 'px';
		mvleft = left - 20;
	}//放大镜移动
	scaleImg.style.top = -(mvtop * 2) + 'px';
	scaleImg.style.left = -(mvleft * 2) + 'px';
}

infoPic.onmousemove = function(e){
	box.style.display = 'block';
	imgScale.style.display = 'block';
	getPosition(e);
}
infoPic.onmouseleave = function(){
	box.style.display = 'none';
	imgScale.style.display = 'none';
}

//ImgList Hover Js
var itemShowImg = document.getElementsByClassName('itemShowImg');
var itemShow = document.getElementsByClassName('itemShow')[0];
for(var i = 0 ; i < itemShowImg.length ; i++)
{
	
	(function(i){
		itemShowImg[i].onmouseenter = function(){
			for(var j=0 ; j < itemShowImg.length ; j++)
			{
				itemShowImg[j].className = 'itemShowImg';
			}
			this.className = 'itemShowImg itemActive';
			itemShow.getElementsByTagName('img')[0].setAttribute('src','Images/item/gramin' + (i+1) + '.webp');
			scaleImg.setAttribute('src','Images/item/gramin' + (i+1) + '.webp');
		}
	}(i));
}
