var config = {
	containerWidth : 1000, //游戏容器宽度
	containerHeight : 700, //游戏容器高度
	pokerWidth : 105,   //扑克牌宽度
	pokerHeight : 150,  //扑克牌高度
	pokersGap : 30,     //手牌的间隙
	topPokersGap : 150, //顶部牌的间隙
	animaDuration : 0.25,
	animationDelay : 0.05,
	containerDom : document.getElementsByClassName('PokerContainer')[0], //桌子的dom元素
	ready : function(){
		
		//设置样式
		this.containerDom.style.border = '1px solid #ccc';
		this.containerDom.style.width = this.containerWidth + 'px';
		this.containerDom.style.height = this.containerHeight + 'px';
		this.containerDom.style.margin = '50px auto';
		this.containerDom.style.position = 'relative';
		
	},
	getCenterPosition : function (){
		var centerX = (this.containerWidth - this.pokerWidth) / 2,
			centerY = (this.containerHeight - this.pokerHeight) / 2;
		return {
			x : centerX,
			y : centerY
		}
	}
}

/**
 * 
 * Poker 建牌的实体类
 * @param {number} number 牌的面值 1-13 -》 a-k ,14 : 小王 ，15 大王
 * @param {number} color 牌的花色 1-4 
 * 
 * **/
function Poker(number,color,left,top,indexZ){
	this.number = number;
	this.color = color;
	this.left = left || 0;
	this.top = top  || 0;
	this.indexZ = indexZ || 1;
	this.pokerDom = document.createElement('img');
	this.pokerDom.style.width = config.pokerWidth + 'px';
	this.pokerDom.style.height = config.pokerHeight + 'px';
	this.pokerDom.style.position = 'absolute';
	this.pokerDom.src = `./img/${this.number}_${this.color}.jpg`;
	this.pokerDom.style.zIndex = this.indexZ;
	this.pokerDom.style.border = '1px solid #111';
	this.pokerDom.style.borderRadius = '10px';
	this.pokerDom.style.transition = 'all .25s ease';
	config.containerDom.appendChild(this.pokerDom);
}

//设置(改变)Poker的位置
Poker.prototype.setPosition = function (left,top){
	this.left = left;
	this.top = top;
	this.pokerDom.style.top = top + 'px';
	this.pokerDom.style.left = left + 'px';
}

//设置(改变)Poker的z-index 层
Poker.prototype.setIndex = function (indexZ){
	this.indexZ = indexZ;
	this.pokerDom.style.zIndex = indexZ;
}

Poker.prototype.setDelay = function(delay){
	this.pokerDom.style.transitionDelay = delay + 's';
}

/**
 * 
 * Player
 * 
 * **/
 
function Player(direction,total,gap){
	this.direction = direction;
	this.total = total;
	this.gap = gap;
	this.myPokers = [];
	//计算firstX and firstY 
	if(this.direction === 'top' || this.direction === 'bottom'){
		var width = (this.total - 1) * this.gap + config.pokerWidth;
		this.firstX = (config.containerWidth - width) / 2;
		if(direction == 'top'){
			this.firstY = 0;
		}else {
			this.firstY = config.containerHeight - config.pokerHeight;
		}
	}
	
	if(this.direction === 'left' || this.direction === 'right'){
		var height = (this.total - 1) * this.gap + config.pokerWidth;
		this.firstY = (config.containerHeight - height) / 2;
		if(direction == 'left'){
			this.firstX = 0;
		}else {
			this.firstX = config.containerWidth - config.pokerWidth;
		}
	}
	
}



Player.prototype.setPosition = function(){
	for (var i = 0 ; i < this.myPokers.length ; i++){
		var poker = this.myPokers[i];
		if(this.direction === 'top' || this.direction ==='bottom'){
			poker.setPosition(this.firstX + i * this.gap,this.firstY);
		}
		if(this.direction === 'left' || this.direction === 'right'){
			poker.setPosition(this.firstX,this.firstY + i * this.gap);
		}
		poker.setIndex(i+1);
	}
}

Player.prototype.getPoker = function (poker){
	this.myPokers.push(poker);
	this.setPosition();
}

Player.prototype.sort = function(){
	
	this.myPokers.sort(function(a,b){
		if(a.number == b.number){
			return a.color - b.color;
		}else {
			return a.number - b.number;
		}
	});
	this.setPosition();
	
}



/**
 * 
 * Deck 
 * 生成一叠牌
 * 
 * **/
 
function Deck (){
	this.players = [];
	this.pokers = [];
	//创建牌对象
	var count = 0;
	for(var i = 1 ; i <= 15 ; i++ ){
		for(var j = 1 ; j <= 4 ; j++){
			count ++;
			var poker = new Poker(i,j);
			this.pokers.push(poker);
			if(i >= 14){
				break;
			}
		}
	}
	this.shuffle(); 
	this.setPosition();
	
}

//洗牌
Deck.prototype.shuffle = function (){
	this.pokers.sort(function(){
		return Math.random() - 0.5;
	})
}
//将折叠牌放在那里
Deck.prototype.setPosition = function (left,top){
	var center = config.getCenterPosition();
	for(var i = 0; i < this.pokers.length ;i++){
		var poker = this.pokers[i];
		poker.setPosition(center['x'] + i * 0.25,center['y'] + i * 0.25);
		poker.setIndex(this.pokers.length - i);
	}
}

Deck.prototype.deal = function (){
	this.players = [
		new Player('left',17,config.pokersGap),
		new Player('bottom',17,config.pokersGap),
		new Player('right',17,config.pokersGap),
		new Player('top',3,config.topPokersGap)
	];
	var cusor = 0;
	for(var i = 0 ; i < this.pokers.length ; i++){
		if(i >= 51){
			cusor = 3;
		}
		this.players[cusor].getPoker(this.pokers[i]);
		this.pokers[i].setDelay(config.animationDelay * i);
		cusor++;
		cusor %= 3;
	}
	var self = this;
	this.pokers[this.pokers.length - 1].pokerDom.addEventListener('transitionend',function(){
		for(var i = 0 ; i < self.pokers.length ; i++){
			self.pokers[i].pokerDom.style.transitionDelay = '0s';
		}
		self.players[0].sort();
		self.players[1].sort();
		self.players[2].sort();
		
	})
}

config.ready();
var deck = new Deck();


config.containerDom.onclick = function (){
	deck.deal();
}