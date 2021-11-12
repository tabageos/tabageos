(function() { 
	'use strict';
	function WayDeterminer(transparencyColor, canvasObject, arrayOfCanvasObjects) {
		WayDeterminer.transColor = transparencyColor;
		this._bmdRef = canvasObject;
		this.multipleBitmapDatas = arrayOfCanvasObjects;
		this._lastBitmapHit = null;
	};
	WayDeterminer.prototype.constructor = WayDeterminer;
	WayDeterminer.transColor = 0;
	WayDeterminer.bitmapData = null;
	WayDeterminer.prototype._lastBitmapHit = null;
	WayDeterminer.prototype._bmdRef = null;
	WayDeterminer.prototype._defaultReturn = false;
	WayDeterminer.prototype.multipleBitmapDatas = null;
	WayDeterminer.prototype.wayIsClear = function(x, y) {
		var bmd = this._bmdRef ? this._bmdRef : WayDeterminer.bitmapData;
		if (!bmd)
		return this._defaultReturn;
		var color = bmd.getPixel(x, y);
		
		if (color == WayDeterminer.transColor || color == 0) {
			return true;
		} else {
			return false;
		}
	};
	WayDeterminer.prototype.multipleWaysClear = function(x, y, bitmapDatas) {
		var result = false;
		var bmd;
		var color;
		var trans;
		var a = bitmapDatas || this.multipleBitmapDatas;
		var i = 0;
		for (i = 0; i < a.length; i++) {
			bmd = a[i];
			color = bmd.getPixel(x, y);
			result = (color == WayDeterminer.transColor || color == 0);
			if (!result)
			break;
		}
		return result;
	};
	WayDeterminer.prototype.multipleWaysClearAndRegister = function(x, y, bitmapDatas) {
		var result = false;
		var bmd;
		var color;
		var trans;
		var a = bitmapDatas || this.multipleBitmapDatas;
		var i = 0;
		for (i = 0; i < a.length; i++) {
			bmd = a[i];
			color = bmd.getPixel(x, y);
			result = color == WayDeterminer.transColor;
			if (!result) {
				this._lastBitmapHit = bmd;
				break;
			}
		}
		return result;
	};
	tabageos.WayDeterminer = WayDeterminer;
})();

