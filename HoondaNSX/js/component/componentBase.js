function ComponentFactory(config){
	var oDiv = $('<div class="component"></div>');
	config.duration || 600;
	config.width && oDiv.css('width', config.width);
	config.height && oDiv.css('height', config.height);
	config.text && oDiv.text(config.text);
	config.html && oDiv.html(config.html);
	config.className && oDiv.addClass( config.className );
	config.css && oDiv.css(config.css);
	if( config.event ){
		for(var prop in config.event){
			oDiv.on( prop, config.event[prop]);
		}
	}
	oDiv.on('cpLeave', function (){
		var oSelf = $(this);
		setTimeout(function (){
			config.animateOut && oSelf.animate( config.animateOut ,config.duration);
		}, config.delay || 0 );
	});
	oDiv.on('cpLoad', function(){
		var oSelf = $(this);
		setTimeout(function (){
			config.animateIn && oSelf.animate( config.animateIn , config.duration);
		}, config.delay || 0);
	});
	config.center && oDiv.css({position : 'absolute', left : '50%', marginLeft : - (oDiv.outerWidth() / 2 ) } );
	return oDiv;
}
//
