var pageEngine = {
	//fullpage 入口
	init : function (selector, colorsArray){
		this.oWrapper = $(selector);
		this.colorArrays = colorsArray ;
		this.isSlider = false;
		return this;
	},
	//添加一个竖向的Section
	addSection : function (className){
		this.isSlider = false;
		this.oSection =  $('<div class="section"></div>').addClass(className).appendTo(this.oWrapper);
		return this;
	},
	//添加一个横向的Slider
	addSlider : function (className){
		this.isSlider = true;
		this.oSlider = $('<div class="slider"></div>').addClass(className).appendTo(this.oSection);
		return this;
	},
	//添加小组件
	addComponent : function (config){
		var component = null ; 
		switch(config.type){
			case 'base' :
				component = ComponentFactory( config );
				break;
		};
		this.isSlider ? this.oSlider.append(component) : this.oSection.append(component);
		return this;
	},
	//绑定页面进入,离开的事件
	bindEvent : function (){
		//Section的自定义事件,只有页面上下移动时,才会触发,
		//这个时候子页面有可能时单张的Section,也可能时多张的Slider之一
		this.oWrapper.find('.section').on({
			//页面离开的自定也事件
			sectionLeave : function (){
				//如果section下没有slider 就触发小组件的事件,存在slider的情况下,就找到带有innerActive的slider
				$(this).find('.slider').length == 0 ? $(this).find('.component').trigger('cpLeave') : $(this).find('.slider.innerActive').trigger('slideronLeave');
				
			},
			//页面进入的自定义事件
			sectionLoad : function (){
				
				$(this).find('.slider').length == 0 ? $(this).find('.component').trigger('cpLoad') : $(this).find('.slider.innerActive').trigger('slideronLoad');
			}
		});
		this.oWrapper.find('.slider').on({
			slideronLeave : function (){
				console.log('leave');
				$(this).find('.component').trigger('cpLeave');
			},
			slideronLoad : function (){
				console.log('load');
				$(this).find('.component').trigger('cpLoad');
			}
		})
	
	},
	ready : function (){
		var self = this;
		this.bindEvent();
		this.oWrapper.fullPage({
			colorsArray : this.colorArrays,
			onLeave : function (index,direction){
				//根据传入的方向判断时触发 slider 还是 section,
				//然后再根据索引判断触发哪一个页面的小组件
				if(direction == 'top' || direction == 'bottom'){
					self.oWrapper.find('.section').eq(index).trigger('sectionLeave');
				}
				if(direction == 'left' || direction == 'right'){
					console.log(self.oWrapper.find('.slider.innerActive'));
					self.oWrapper.find('.slider.innerActive').trigger('slideronLeave');
				}
			},
			afterLoad : function (index,direction){
				if(direction == 'left' || direction == 'right'){
					self.oWrapper.find('.slider.innerActive').trigger('slideronLoad');
				}
				if(direction == 'top' || direction == 'bottom'){
					self.oWrapper.find('.section').eq(index).trigger('sectionLoad');
				}
			}
		});
		this.oWrapper.find('.section').eq(0).trigger('sectionLoad');
	}
}