$.fn.extend({
	fullPage : function (config){
		//初始化一些公共变量
		var colorsArray = config.colorsArray,
			commonStyle = {width : '100%' , height : '100%'}, 
			oWrapper = $(this),
			oSection = oWrapper.find('.section'),
			clientHeight = $(window).outerHeight(),
			clientWidth = $(window).outerWidth(),
			curIndex = 0,
			lock = true;
			
		
		//开始初始化结构的样式
		//为html,body,wrapper,section添加一些公共的样式
		$('html')
			.add('body')
				.css({position : 'relative', overflow : 'hidden', margin : 0 , padding : 0})
					.add(oWrapper)
						.add(oSection)
							.css(commonStyle);
							
		oWrapper
			.css({position : 'absolute', top : 0, left : 0});
		oSection
			.each(function (index, ele){
				$(ele)
					.css({backgroundColor : colorsArray[index], position : 'relative'})
						.find('.slider')
							.eq(0).addClass('innerActive').end()
								.css({float: 'left', width : clientWidth, height : clientHeight , position : 'relative'})
									.wrapAll('<div class="sliderWrap"></div>')
			})
				.find('.sliderWrap')
					.each(function (index, ele){
						$(ele)
							.css({position : 'absolute', top : 0 , left : 0 ,height : '100%', width : $(ele).find('.slider').size() * clientWidth});
					});
		oSection.eq(0).addClass('active');
	
		//js移动
		$(document).on('keydown',function(e){
			if(e.which == '37' || e.which == '39'){
				//左右
				var oSliderWrap = $('.active .sliderWrap'),
					innerActive = oSliderWrap.find('.innerActive');
					
				if(oSliderWrap.length != 0){ //判断当前active 下面是否有 sliderWrap 没有还左右动个毛
					if(lock){				
						lock = false;		//上锁,在运动结束的回调函数中解锁
						var newLeft = oSliderWrap.offset().left,
						directionX = '';	
							//键位 + 临界判断
							if(e.which == '37' && innerActive.index() != 0){ 
								directionX = 'left';
								config.onLeave(innerActive.index(),directionX);
								newLeft += clientWidth;
								//键位 + 临界判断
							}else if(e.which == '39' && innerActive.index() != oSliderWrap.find('.slider').size() - 1 ){
								directionX = 'right';
								config.onLeave(innerActive.index() , directionX);
								newLeft -= clientWidth;
							}
							
						oSliderWrap.animate({
							left : newLeft	
						}, 500, 'swing', function (){
							//运动的回调函数
							//解锁
							lock = true;
							if(directionX == 'left'){
								//标记当前页面为Active
								innerActive.removeClass('innerActive').prev('.slider').addClass('innerActive');
								//触发也面进入事件(传入索引,以及方向)
								config.afterLoad(innerActive.index() - 1, directionX);
							}else if(directionX == 'right'){
								innerActive.removeClass('innerActive').next('.slider').addClass('innerActive');
								config.afterLoad(innerActive.index() + 1, directionX);
								
							}
						});
					}
				}
				
			}else if(e.which == '38' || e.which == '40'){
				//上下
				if(lock){
					lock = false;
					var newTop = oWrapper.offset().top,
					direction = '';	
					if(curIndex != 0 && e.which == '38'){
						direction = 'top';
						config.onLeave(curIndex, direction);
						curIndex--;
						newTop += clientHeight;
					}
					else if(e.which == '40' && curIndex != oSection.size() - 1 ){
						direction = 'bottom';
						config.onLeave(curIndex , direction);
						curIndex++;
						newTop -= clientHeight;
					}
					
					oWrapper.animate ({
						top : newTop
						}, 500, 'swing',function(){
							lock = true;
							oSection.eq(curIndex).addClass('active');
							if(direction == 'top'){
								oSection.eq(curIndex + 1).removeClass('active');
								config.afterLoad(curIndex, direction);
							}else if(direction == 'bottom'){
								oSection.eq(curIndex - 1).removeClass('active');
								config.afterLoad(curIndex, direction);
							}
					});
				}
			}
			
		});
	}
});