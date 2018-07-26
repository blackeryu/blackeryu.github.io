//=============================================================
/*

*/
//=============================================================

Window_MenuCommand.prototype.makeCommandList = function() {
    this.addMainCommands();
    this.addOriginalCommands();
    this.addOptionsCommand();
    this.addSaveCommand();
    this.addGameEndCommand();
};

Window_MenuCommand.prototype.addOriginalCommands = function() {
	this.addCommand("怪物圖鑑", 'status', enabled);
};



var blacker_create = Scene_Menu.prototype.create;

Scene_Menu.prototype.create = function() {
	blacker_create.call(this);
	
	this._customWindow = new Window_Cust();
	this._customWindow.y = 340
	this.addChild(this._customWindow);
};


//建立新視窗
function Window_Cust() {
    this.initialize.apply(this, arguments);
}

Window_Cust.prototype = Object.create(Window_Base.prototype);
Window_Cust.prototype.constructor = Window_Cust;

Window_Cust.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_Cust.prototype.windowWidth = function() {
    return 240;
};

Window_Cust.prototype.windowHeight = function() {
    return this.fittingHeight(2);
};

//內容更新
Window_Cust.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    this.drawCurrencyValue(this.value(), this.currencyUnit(), x, 0, width);
};

Window_Cust.prototype.value = function() {
    return getCurrentGold();
};

function getCurrentGold(){
	var _gold;
	$.ajax({
		cache:false,
		async: false,
		type:"POST",
		url:"http://localhost:7124/Home/GetPartyMoney/",
		success:function(res){
			_gold = res;
		}
	});
	
	return _gold;
}

Window_Cust.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

//視窗基底呼叫
Window_Cust.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};