(function (){
	var logo = {
		type : 'base',
		className : 'logo',
		width : 340,
		height : 45,
		css : {
			position : 'absolute',
			bottom : 0,
			right : 0,
			opacity : 0,
			backgroundImage : 'url(./img/mv_logo.png)',
			backgroundSize : '100% 100%',
		},
		animateIn : {
			opacity : 1,
			bottom : '7%',
			right : '9%'
		},
		animateOut : {
			opacity : 0,
			bottom : 0,
			right : 0
		},
		delay : 100,
	},
		logo_moji = {
			type : 'base',
			className : 'logo_moji',
			html : '新しい興奮と躍動で全身で染めて、<br/>NSX、さらに深まる',
			duration : 600,
			css : {
				position : 'absolute',
				display : 'inline-block',
				fontSize : 20,
				fontWeight : 600,
				color : 'white',
				opacity : 0,
				bottom : '15%',
				right : 0
			},
			animateIn : {
				right : '10%',
				opacity : 1,
				fontSize : 30
			},
			animateOut : {
				right : 0,
				opacity : 0,
				fontSize : 20
			},
			// delay : 400
		},
		page2_title = {
			type : 'base',
			className : 'page2_tittle',
			html : 'その加速フィールを、</br>誰も知らない',
			css : {
				position : 'absolute',
				display : 'inline-block',
				top : '45%',
				left : '10%',
				opacity : 0,
				fontSize : 35,
				lineHeight : 1.4,
				textShadow : '0 0 5px black',
				color : 'white'
			},
			animateIn : {
				opacity : 1
			},
			animateOut : {
				opacity : 0
			}
		},
		page2_titleImg = {
			type : 'base',
			className : 'titleImg',
			html : '<img src="./img/engine_title_01.png" style="height:16px;">',
			css : {
				position : 'absolute',
				top : '60%',
				left : '20%',
				opacity : 0
			},
			animateIn : {
				left : '10%',
				opacity : 1
			},
			animateOut : {
				left : '20%',
				opacity : 0
			}
		}
		,
		page2_content = {
			type : 'base',
			className : 'titleContent',
			html : '<p class = "content">\
						実に1回転目から最大トルクを立ち上げる3基のモーターと､<br/>\
						高回転域で本領を発揮する3.5L V6 DOHCツインターボエンジン｡<br/>\
						この組み合わせが､アクセルを踏み込むと同時にターボラグを<br/>\
						感じさせない瞬発力を生み､強力無比なパワーがどこまでも<br/>\
						続いてゆくかのような､まさにNSXだけの加速フィールをもたらす｡<br/>\
					</p>',
			css : {
				position : 'absolute',
				top : '65%',
				left : '10%',
				opacity : 0
			},
			animateIn : {
				left : '10%',
				opacity : 1
			},
			animateOut : {
				left : '5%',
				opacity : 0
			}
		},
		page2_border = {
			type : 'base',
			className : 'page2_border',
			html : 'ENGINE &nbsp; + &nbsp; 3MOTOR &gt;',
			css : {
				position : 'absolute',
				bottom : '0',
				right : '20%',
				padding : 20 ,
				display : 'line-block',
				border : '1px solid #fff',
				fontSize : 16,
				color : '#fff',
				lineHeight : 1,
				display : 'inline-block',
				cursor : 'pointer',
				opacity : 0
			},
			animateIn : {
				bottom : '10%',
				right : '20%',
				opacity : 1
			},
			animateOut : {
				bottom : '0',
				right : '20%',
				opacity : 0
			}
		},
		page3_title = {
			type : 'base',
			className : 'page3_tittle',
			html : 'コーナーをアクティブに制する､歓び｡',
			css : {
				position : 'absolute',
				display : 'inline-block',
				top : '45%',
				right : '10%',
				opacity : 0,
				fontSize : 35,
				lineHeight : 1.4,
				textShadow : '0 0 5px black',
				color : 'white'
			},
			animateIn : {
				opacity : 1
			},
			animateOut : {
				opacity : 0
			}
		},
		page3_titleImg = {
			type : 'base',
			className : 'titleImg',
			html : '<img src="./img/shawd_title_01a.png" style="height:16px;">',
			css : {
				position : 'absolute',
				top : '60%',
				right : '20%',
				opacity : 0
			},
			animateIn : {
				right : '10%',
				opacity : 1
			},
			animateOut : {
				right : '20%',
				opacity : 0
			}
		},
		page3_content = {
			type : 'base',
			className : 'titleContent',
			html : '<p class = "content" style="text-align:right">\
						フロント左右に配したツインモーターユニットが､<br/>\
						前輪左右のプラス/マイナストルクを自在かつ強力に独立制御する<br/>\
						SPORT HYBRID SH-AWD｡緻密なトルクベクタリングにより<br/>\
						各々の駆動力と減速力がアクティブにコントロールされ､<br/>\
						ドライビングへの意志に限りなく忠実な｢曲がる高性能｣が生まれる｡<br/>\
					</p>',
			css : {
				position : 'absolute',
				top : '65%',
				right : '10%',
				opacity : 0
			},
			animateIn : {
				right : '10%',
				opacity : 1
			},
			animateOut : {
				right : '5%',
				opacity : 0
			}
		},
		page3_border = {
			type : 'base',
			className : 'page3_border',
			html : 'SPORT &nbsp; HYBRID &nbsp; SH-AWD &nbsp; &gt;',
			css : {
				position : 'absolute',
				top : '0',
				right : '20%',
				padding : 20 ,
				border : '1px solid #fff',
				fontSize : 16,
				color : '#fff',
				lineHeight : 1,
				display : 'inline-block',
				cursor : 'pointer',
				opacity : 0
			},
			animateIn : {
				top : '10%',
				right : '20%',
				opacity : 1
			},
			animateOut : {
				top : '0',
				right : '20%',
				opacity : 0
			}
		},
		dynamic1 = {
			type : 'base',
			className : 'dynamicContent',
			width : 900,
			html : '	<h3 style="font-size:35px;line-height: 1.4;">\
							時と場所を選ばない、<br/>高性能を目指して。\
						</h3>\
						<h4 style="margin-top: 30px;" class="title_image">\
							<img src="img/ids_title_01a.png" >\
							<img src="img/ids_title_01b.png" >\
							<img src="img/ids_title_01c.png" >\
						</h4>\
						<p style="margin-top: 30px; font-size: 20px; line-height: 2;letter-spacing : .14em">\
							SPORT HYBRID SH-AWDならではの高性能､高機能を駆使し､<br/>\
							車両のダイナミック性能にかかわる設定を統合/可変する<br/>\
							インテグレーテッド･ダイナミクス･システム｡市街地から<br/>\
							サーキットまで、さまざまな状況に最適化した4つのモードで､<br/>\
							スーパースポーツの走りのステージを大きく広げる｡<br/>\
						</p>',
			css : {
				position : 'absolute',
				top : '35%',
				left : '15%',
				color : 'fff',
				opacity : 0,
				textShadow : '0 0 5px black'
			},
			animateIn : {
				opacity : 1,
			},
			animateOut : {
				opacity : 0
			}
		},
		arrowR = {
			type : 'base',
			className : 'arrow',
			html : '&gt;',
			css : {
				position : 'absolute',
				top : 0,
				opacity : 0,
				right : '5%',
				display : 'inline-block',
				fontSize : 35,
				color : '#fff',
				fontHeight : '200',
				padding : '20px 30px 20px 30px',
				border : '1px solid #fff',
				borderRadius : '50%'
			},
			animateIn : {
				top : '10%',
				opacity : 1

			} ,
			animateOut : {
				top : '0',
				opacity : 0

			}
		},
		arrowL = {
			type : 'base',
			className : 'arrow',
			html : '&lt;',
			css : {
				position : 'absolute',
				top : 0,
				opacity : 0,
				left : '5%',
				display : 'inline-block',
				fontSize : 35,
				color : '#fff',
				fontHeight : '200',
				padding : '20px 30px 20px 30px',
				border : '1px solid #fff',
				borderRadius : '50%'
			},
			animateIn : {
				top : '10%',
				opacity : 1

			} ,
			animateOut : {
				top : '0',
				opacity : 0
			}
		};
		function dynamicModeFactory (src){
			return {
				type : 'base',
				className : 'dynamicModeImg',
				center : true,
				html : '<img src="'+ src +'" style="height:16px">',
				css: {
					position : 'absolute',
					display : 'inline-block',
					bottom : '0',
					opacity : 0
				},
				animateIn : {
					opacity : 1 ,
					bottom : '5%'
				},
				animateOut : {
					opacity : 0 ,
					bottom : 0
				}
			}
		}
		
	//开始创建结构
	pageEngine.init('.wrapper',[])
		.addSection('page1')
			.addComponent(logo)
			.addComponent(logo_moji)
		.addSection('page2')
			.addComponent(page2_title)
			.addComponent(page2_titleImg)
			.addComponent(page2_content)
			.addComponent(page2_border)
		.addSection('page3')
			.addComponent(page3_title)
			.addComponent(page3_titleImg)
			.addComponent(page3_content)
			.addComponent(page3_border)
		.addSection('page4')
			.addSlider('dynamic1')
				.addComponent(dynamic1)
				.addComponent(arrowR)
				.addComponent(dynamicModeFactory('img/ids_mode_01.png'))
			.addSlider('dynamic2')
				.addComponent(dynamic1)
				.addComponent(arrowR)
				.addComponent(arrowL)
				.addComponent(dynamicModeFactory('img/ids_mode_02.png'))
			.addSlider('dynamic3')
				.addComponent(dynamic1)
				.addComponent(arrowR)
				.addComponent(arrowL)
				.addComponent(dynamicModeFactory('img/ids_mode_03.png'))
			.addSlider('dynamic4')
				.addComponent(dynamic1)
				.addComponent(arrowL)
				.addComponent(dynamicModeFactory('img/ids_mode_04.png'))
			.ready();
})();

	