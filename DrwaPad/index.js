var sketch = {
			wrapper: document.getElementsByClassName('wrapper')[0],
			stage: document.getElementsByClassName('stage')[0],
			tools: document.getElementsByClassName('tools')[0],
			colorContainer: document.getElementsByClassName('colorContainer')[0],
			colorList: document.getElementsByClassName('colorList')[0],
			shortCut: document.getElementsByClassName('shortCut')[0],
			sentaku: '',
			//assint var
			colorBoard: false,
			isSentaku: false,
			drawType: 'draw',
			clipBoard: [],
			shortCutCache: '',
			sentakuCanvas: '',
			clickDownX: 0,
			clickDownY: 0,
			copyImg: '',
			//tools setting
			canEraser: document.getElementById('canEraser'), //eraser
			canPen: document.getElementById('canPen'), //pen
			canPenCil: document.getElementById('canPenCil'), // pencil
			canBrush: document.getElementById('canBrush'), //brush
			canPaint: document.getElementById('canPaint'), //paint
			canCancel: document.getElementById('canCancel'), //cancel this
			canClear: document.getElementById('canClear'), //clear All
			//draw seting
			canMain: document.getElementById('canMain'),
			mainCtx: canMain.getContext('2d'),
			sentakuTempCtx : '',
			init: function() {
				var self = this;
				this.wrapper.className = 'wrapper';
				setTimeout(function() {
					self.colorContainer.style.transition = 'all .5s ease';
				}, 1000);
				this.toolsInit(); //初始化 左侧工具栏
				this.draw();
				this.bindEvent();
			},



			toolsInit: function() {
				//eraser 初始化
				var eraserCtx = this.canEraser.getContext('2d');
				eraserCtx.beginPath();
				eraserCtx.fillStyle = '#414b4c'
				eraserCtx.fillRect(0, 0, 90, 60);
				eraserCtx.beginPath();
				eraserCtx.fillStyle = '#fff';
				eraserCtx.font = '30px georgia';
				eraserCtx.fillText('eraser', 0, 55);
				eraserCtx.beginPath();
				eraserCtx.save();
				eraserCtx.translate(92, 0);
				eraserCtx.fillStyle = '#414b4c';
				eraserCtx.fillRect(0, 1, 25, 58)
				eraserCtx.closePath();
				//pen 初始化
				var penCtx = this.canPen.getContext('2d');
				penCtx.beginPath();
				penCtx.fillStyle = '#414b4c';
				penCtx.fillRect(0, 0, 40, 50);
				penCtx.fillRect(41, 0, 170, 50);
				penCtx.fillRect(212, 2, 30, 46);
				penCtx.beginPath();
				penCtx.fillStyle = '#fff';
				penCtx.font = '30px georgia';
				penCtx.fillText('Pen', 130, 45);
				penCtx.beginPath();
				penCtx.fillStyle = '#414b4c';
				penCtx.lineJoin = 'round';
				penCtx.moveTo(242, 10);
				penCtx.lineTo(250, 8);
				penCtx.lineTo(280, 20);
				penCtx.lineTo(280, 35);
				penCtx.lineTo(250, 45);
				penCtx.lineTo(242, 43);
				penCtx.stroke();
				penCtx.beginPath();
				penCtx.lineWidth = 3;
				penCtx.moveTo(280, 27);
				penCtx.lineTo(330, 27)
				penCtx.closePath();
				penCtx.stroke();
				//pencil 初始化
				var pencilCtx = canPenCil.getContext('2d');
				pencilCtx.beginPath();
				pencilCtx.fillStyle = '#414b4c';
				pencilCtx.strokeRect(0, 2, 15, 26);
				pencilCtx.beginPath();
				pencilCtx.fillStyle = '#414b4c';
				pencilCtx.fillRect(15, 0, 260, 40);
				pencilCtx.beginPath();
				pencilCtx.fillStyle = '#fff';
				pencilCtx.font = '30px georgia';
				pencilCtx.fillText('Pencil', 160, 27);
				pencilCtx.beginPath();
				pencilCtx.fillStyle = '#414b4c';
				pencilCtx.moveTo(275, 1);
				pencilCtx.lineTo(330, 15);
				pencilCtx.lineTo(275, 28);
				pencilCtx.stroke();
				pencilCtx.beginPath();
				pencilCtx.moveTo(330, 15);
				pencilCtx.lineTo(310, 11);
				pencilCtx.lineTo(310, 20);
				pencilCtx.lineTo(330, 15);
				pencilCtx.fill();
				pencilCtx.stroke();
				pencilCtx.closePath();
				//毛笔 初始化
				var brushCtx = canBrush.getContext('2d');
				brushCtx.beginPath();
				brushCtx.fillStyle = '#414b4c';
				brushCtx.save();
				brushCtx.scale(0.5, 1);
				brushCtx.arc(20, 20, 15, Math.PI / 2, Math.PI / 2 * 3, 0);
				brushCtx.closePath();
				brushCtx.stroke();
				brushCtx.fill();
				brushCtx.beginPath();
				brushCtx.restore();
				// brushCtx.fillRect(10,5,220,30);
				brushCtx.moveTo(10, 5);
				brushCtx.lineTo(230, 7);
				brushCtx.lineTo(230, 33);
				brushCtx.lineTo(10, 35);
				brushCtx.stroke();
				brushCtx.fill();
				brushCtx.beginPath();
				brushCtx.fillStyle = '#fff';
				brushCtx.font = '30px georgia';
				brushCtx.fillText('Chinese Brush', 20, 32);
				brushCtx.beginPath();
				brushCtx.fillStyle = '#414b4c';
				brushCtx.moveTo(233, 9);
				brushCtx.quadraticCurveTo(260, 0, 300, 20);
				brushCtx.quadraticCurveTo(260, 40, 233, 31);
				brushCtx.closePath();
				brushCtx.fill();
				brushCtx.stroke();
				//Paint 初始化
				var paintCtx = canPaint.getContext('2d');
				paintCtx.beginPath();
				paintCtx.strokeRect(0, 0, 20, 70);
				paintCtx.lineWidth = .2;
				//尾部条纹
				for (var height = 10; height < 70; height += 10) {
					paintCtx.beginPath();
					paintCtx.moveTo(20, height);
					paintCtx.lineTo(0, height);
					paintCtx.stroke();
				}
				paintCtx.beginPath();
				paintCtx.lineWidth = 1;
				paintCtx.moveTo(20, 0);
				paintCtx.lineTo(250, 5);
				paintCtx.lineTo(250, 65);
				paintCtx.lineTo(20, 70);
				paintCtx.fillStyle = '#414b4c';
				paintCtx.fill();
				paintCtx.stroke();
				paintCtx.beginPath();
				paintCtx.font = '30px georgia';
				paintCtx.fillStyle = '#fff';
				paintCtx.fillText('Color', 150, 55);
				paintCtx.beginPath();
				paintCtx.fillStyle = '#414b4c';
				paintCtx.moveTo(250, 5);
				paintCtx.lineTo(265, 20);
				paintCtx.lineTo(265, 45);
				paintCtx.lineTo(250, 65);
				paintCtx.stroke();
				paintCtx.beginPath();
				// paintCtx.moveTo(265,20);
				paintCtx.fillRect(265, 20, 10, 25);
				//cancel
				var cancelCtx = canCancel.getContext('2d');
				cancelCtx.beginPath();
				cancelCtx.fillStyle = '#414b4c';
				cancelCtx.fillRect(0, 0, 200, 60);
				cancelCtx.beginPath();
				cancelCtx.fillStyle = '#fff';
				cancelCtx.font = '30px georgia';
				cancelCtx.fillText('Cancel This', 30, 55);
				//clear
				var clearCtx = canClear.getContext('2d');
				clearCtx.beginPath();
				clearCtx.fillStyle = '#414b4c';
				clearCtx.moveTo(0, 0);
				clearCtx.lineTo(50, 0);
				for (var height = 0; height <= 70; height += 10) {
					var fuckWidth = 50;
					if (height / 10 % 2 != 0) {
						fuckWidth = 30;
					}
					clearCtx.lineTo(fuckWidth, height);

				}
				clearCtx.lineTo(0, 70);
				clearCtx.fill();
				clearCtx.stroke();
				clearCtx.beginPath();
				clearCtx.moveTo(55, 0);
				for (var height = 10; height <= 80; height += 10) {
					var fuckWidth = 35;
					if (height / 10 % 2 == 0) {
						fuckWidth = 55;
					}
					clearCtx.lineTo(fuckWidth, height);
				}
				clearCtx.lineTo(200, 70);
				clearCtx.lineTo(200, 0);
				clearCtx.closePath();
				clearCtx.fill()
				clearCtx.stroke();
				clearCtx.beginPath();
				clearCtx.font = '30px georgia';
				clearCtx.fillStyle = '#fff';
				clearCtx.fillText('Clear', 120, 60);
			},

			bindEvent: function() {
				var self = this;
				this.tools.onclick = function(e) {
					var target = e.target.id;
					self.sentaku ? self.stage.removeChild(self.sentaku) : '';
					self.sentaku = '';
					switch (target) {
						case 'canPen':
							self.mainCtx.strokeStyle = '#000';
							self.mainCtx.fillStyle = '#000';
							self.mainCtx.lineWidth = 3;
							self.drawType = 'draw';
							break;
						case 'canPenCil':
							console.log('pencil')
							self.mainCtx.lineWidth = 0.5;
							self.mainCtx.strokeStyle = '#696969';
							self.mainCtx.fillStyle = '#696969';
							self.drawType = 'draw';
							break;
						case 'canBrush':
							self.mainCtx.strokeStyle = '#000'
							self.mainCtx.fillStyle = '#000'
							self.mainCtx.lineJoin = 'round';
							self.mainCtx.lineCap = 'round';
							self.mainCtx.lineWidth = 10;
							self.drawType = 'draw';
							break;
						case 'canEraser':
							self.mainCtx.fillStyle = '#fff';
							self.mainCtx.strokeStyle = '#fff';
							self.mainCtx.lineWidth = 30;
							self.drawType = 'draw';
							break;
						case 'canClear':
							self.mainCtx.clearRect(0, 0, self.stage.offsetWidth, self.stage.offsetHeight);
							self.clipBoard = [];
							break;
						case 'canPaint':
							if (self.colorBoard == false) {
								self.colorContainer.display = 'block';
								self.colorContainer.className = 'colorContainer active';
								self.colorBoard = true;
							} else {
								self.colorContainer.display = 'none';
								self.colorContainer.className = 'colorContainer';
								self.colorBoard = false;
							}
							break;
						case 'canCancel':
							if (self.clipBoard[0]) {
								self.mainCtx.putImageData(self.clipBoard.pop(), 0, 0);
							}
							break;
					}

				}

				this.colorContainer.onclick = function(e) {
					var target = e.target;
					if (target.nodeName == 'LI') {
						var targetColor = target.style.backgroundColor;
						self.mainCtx.fillStyle = targetColor + '';
						self.mainCtx.strokeStyle = targetColor + '';
					}


				}

				this.shortCut.onclick = function(e) {

					var target = e.target.className;
					self.sentaku ? self.stage.removeChild(self.sentaku) : '';
					self.sentaku = '';
					switch (target) {
						case 'rect':
							self.drawType = 'drawRect';
							break;
						case 'line':
							self.drawType = 'drawLine';
							break;
						case 'circle':
							self.drawType = 'drawCircle';
							break;
						case 'choise':
							self.drawType = 'sentaku';
							break;
					}
				}

			},

			draw: function() {
				var self = this,
					offsetTop = this.stage.offsetTop,
					offsetLeft = this.stage.offsetLeft,
					disX = 0,
					disY = 0

				//绑定事件
				canMain.onmousedown = function(e) {
					var target = e.target;
					self.clickDownX = disX = e.pageX - offsetLeft;
					self.clickDownY = disY = e.pageY - offsetTop;
					self.mainCtx.beginPath();
					self.mainCtx.moveTo(disX, disY);
					//收起colorContainer
					if (self.colorBoard) {
						self.colorBoard = false;
						self.colorContainer.style = 'none';
						self.colorContainer.className = 'colorContainer';
					}
					//存储当前画布的内容
					self.clipBoard.push(self.mainCtx.getImageData(0, 0, self.stage.offsetWidth, self.stage.offsetHeight));
					if (self.drawType == 'drawRect' || self.drawType == 'drawLine' || self.drawType == 'drawCircle') {
						//当画笔是 rect 的时候 存储原来的画面
						self.shortCutCache = self.mainCtx.getImageData(0, 0, self.stage.offsetWidth, self.stage.offsetHeight);
					}

					if (self.drawType == 'sentaku') {
						if (self.sentaku != '') {
							self.stage.removeChild(self.sentaku);
							self.sentaku = '';
						}
						var tempSentaku = document.createElement('div'),
							tempCanvas = document.createElement('canvas');
						self.sentakuTempCtx  = tempCanvas.getContext('2d');
						tempSentaku.appendChild(tempCanvas);
						tempSentaku.className = 'sentaku';
						tempSentaku.style.top = disY + 'px';
						tempSentaku.style.left = disX + 'px';
						tempCanvas.id = 'demo';
						tempCanvas.setAttribute('width', '0px');
						tempCanvas.setAttribute('height', '0px');
						tempCanvas.onmousedown = function(e) {
							var mouseDownX = e.pageX - tempSentaku.offsetLeft,
								mouseDownY = e.pageY - tempSentaku.offsetTop;
								self.copyImg = self.mainCtx.getImageData(tempSentaku.offsetLeft, tempSentaku.offsetTop, this.offsetWidth, this.offsetHeight);
								self.mainCtx.clearRect(tempSentaku.offsetLeft, tempSentaku.offsetTop, this.offsetWidth, this.offsetHeight);
							// 
							document.onmousemove = function(e) {
								tempSentaku.style.left = e.pageX - mouseDownX + 'px';
								tempSentaku.style.top = e.pageY - mouseDownY + 'px';
								self.sentakuTempCtx.clearRect(0, 0, tempCanvas.offsetWdith, tempCanvas.offsetHeight);
								console.log()
								self.sentakuTempCtx.putImageData(self.copyImg,0, 0);
							}
							tempCanvas.onmouseup = function(e) {
								document.onmousemove = null;
								self.mainCtx.putImageData(self.copyImg, tempSentaku.offsetLeft, tempSentaku.offsetTop);
								
							}

						}
						self.sentaku = tempSentaku;
						self.stage.appendChild(tempSentaku);
						document.onmousemove = function(e) {
							var tempCanWidth = e.pageX - self.stage.offsetLeft - disX,
								tempCanHeight = e.pageY - self.stage.offsetTop - disY;
							tempCanvas.setAttribute('width', tempCanWidth + 'px');
							tempCanvas.setAttribute('height', tempCanHeight + 'px');
						}
						document.onmouseup = function(e) {
							document.onmousemove = null;
						}
				}



						canMain.onmousemove = function(e) {

							//draw
							if (self.drawType == 'draw') {
								disX = e.pageX - offsetLeft;
								disY = e.pageY - offsetTop;
								self.mainCtx.lineTo(disX, disY);
								self.mainCtx.stroke();
							}

							//drawRect
							if (self.drawType == 'drawRect') {
								//加载原画面
								self.mainCtx.clearRect(0, 0, self.stage.offsetWidth, self.stage.offsetHeight);
								self.mainCtx.putImageData(self.shortCutCache, 0, 0);
								//根据鼠标拖动的对角线strokeRect
								var width = e.pageX - offsetLeft - disX,
									height = e.pageY - offsetTop - disY;
								self.mainCtx.strokeRect(disX, disY, width, height);
							}

							//drawLine
							if (self.drawType == 'drawLine') {
								self.mainCtx.clearRect(0, 0, self.stage.offsetWidth, self.stage.offsetHeight);
								self.mainCtx.putImageData(self.shortCutCache, 0, 0);
								self.mainCtx.beginPath();
								self.mainCtx.moveTo(disX, disY);
								self.mainCtx.lineTo(e.pageX - offsetLeft, e.pageY - offsetTop);
								self.mainCtx.closePath();
								self.mainCtx.stroke();
							}

							if (self.drawType == 'drawCircle') {
								self.mainCtx.clearRect(0, 0, self.stage.offsetWidth, self.stage.offsetHeight);
								self.mainCtx.putImageData(self.shortCutCache, 0, 0);
								self.mainCtx.beginPath();
								var endPointX = e.pageX - self.stage.offsetLeft,
									endPointY = e.pageY - self.stage.offsetTop,
									rectWidth = endPointX - disX,
									rectHeight = endPointY - disY,
									radius = 0,
									originX = 0,
									originY = 0;

								if (Math.abs(rectWidth) >= Math.abs(rectHeight)) {
									radius = rectHeight / 2;
									originX = disX + rectHeight / 2;
									originY = disY + rectHeight / 2;
								} else {
									radius = rectWidth / 2;
									originX = disX + rectWidth / 2;
									originY = disY + rectWidth / 2;
								}
								self.mainCtx.arc(originX, originY, Math.abs(radius), 0, Math.PI * 2, 0);
								self.mainCtx.stroke();
							}




						}
					}
				
				canMain.onmouseup = function(e) {
					self.mainCtx.closePath();
					canMain.onmousemove = null;
					self.shortCutCache = '';
				}

				canMain.onmouseleave = function(e) {

					self.mainCtx.closePath();
					canMain.onmousemove = null;
					self.shortCutCache = '';

				}





			}



		}

		sketch.init();
