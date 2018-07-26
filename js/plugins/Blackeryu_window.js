//=============================================================
/*
2018.07.26 調整取得角色資料來源自API
*/
//=============================================================

var testWB = Window_Base;

function loadUploadFaceImg(){
	var _actors;
	$.ajax({
		cache:false,
		async: false,
		type:"POST",
		url:"http://localhost:7124/Home/GetPartyActors/",
		success:function(res){
			_actors = res;
		}
	});
	
	return _actors;
}

testWB.prototype.drawFace = function(faceName, faceIndex, x, y, width, height, isRealChar = 0) {
    width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
	
	var bitmap;
	if(isRealChar){
		bitmap = ImageManager.loadFace(faceName);
	}else{
		bitmap = ImageManager.loadFace(faceName);
		var pw = Window_Base._faceWidth;
		var ph = Window_Base._faceHeight;
		var sw = Math.min(width, pw);
		var sh = Math.min(height, ph);
		var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
		var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
		var sx = faceIndex % 4 * pw + (pw - sw) / 2;
		var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
		this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
	}
};

testWB.prototype.drawActorFace = function(actor, x, y, width, height) {
    this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height, actor.isUploadImg());
};

Window_Message.prototype.drawMessageFace = function() {
    this.drawFace($gameMessage.faceName(), $gameMessage.faceIndex(), 0, 0);
    ImageManager.releaseReservation(this._imageReservationId);
};