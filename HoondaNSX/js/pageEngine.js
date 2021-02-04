var pageEngine = {
	init : function (selector, colorsArray){
		this.oWrapper = $(selector);
		this.colorArrays = colorsArray ;
		this.isSlider = false;
		return this;
	},
	addSection : function (className){
		this.isSlider = false;
		this.oSection =  $('<div class="section"></div>').addClass(className).appendTo(this.oWrapper);
		return this;
	},
	addSlider : function (className){
		this.isSlider = true;
		this.oSlider = $('<div class="slider"></div>').addClass(className).appendTo(this.oSection);
		return this;
	},
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
	bindEvent : function (){
		this.oWrapper.find('.section').on({
			sectionLeave : function (){
				$(this).find('.component').trigger('cpLeave');
			},
			sectionLoad : function (){
				$(this).find('.component').trigger('cpLoad');
			},
		});
	
	
		
	},
	ready : function (){
		var self = this;
		this.bindEvent();
		this.oWrapper.fullPage({
			colorsArray : this.colorArrays,
			onLeave : function (index,direction){
				if(direction == 'top' || direction == 'bottom'){
					self.oWrapper.find('.section').eq(index).trigger('sectionLeave');
				}
				if(direction == 'left' || direction == 'right'){
				}
			},
			afterLoad : function (index,direction){
				if(direction == 'left' || direction == 'right'){
				}
				if(direction == 'top' || direction == 'bottom'){
					self.oWrapper.find('.section').eq(index).trigger('sectionLoad');
				}
			}
		});
		this.oWrapper.find('.section').eq(0).trigger('sectionLoad');
	}
}