(function() { 

	'use strict';
	function LoopingImage(canvas, width, height) {
		tabageos.EventDispatcher.call(this);
		tabageos.CanvasObject.call(this,canvas,width,height);
		this.init(canvas, width, height);
		this.bI = 0;
		this.fRect = new tabageos.Rectangle();
		this.tPoint = new tabageos.MoverPoint();
	};
	LoopingImage.prototype.constructor = LoopingImage;
	LoopingImage.prototype = Object.create(tabageos.EventDispatcher.prototype);
	Object.assign(LoopingImage.prototype, tabageos.CanvasObject.prototype);
	LoopingImage.prototype.fRect = null;
	LoopingImage.prototype.bI = 0;
	LoopingImage.prototype.tPoint = null;
	LoopingImage.prototype.loopHorizontal = function(imgToLoop, w, h, incer) {
		this.fRect.x = this.bI;
		
		this.fRect.y = 0;
		
		this.fRect.width = w;
		
		this.fRect.height = h;
		
		this.tPoint.x = 0;
		this.copyPixels(imgToLoop, this.fRect, this.tPoint, w, h);
		
		if (this.bI > 0) {
			
			this.fRect.x = 0;
			
			this.tPoint.x = w - this.bI;
			
			this.fRect.width = this.bI;
			
			this.copyPixels(imgToLoop, this.fRect, this.tPoint, this.fRect.width, h);
		}
		if (this.bI < w) {
			this.bI += incer || 1;
		} else {
			this.bI = 0;
		}
	};
	tabageos.LoopingImage = LoopingImage;
})();


