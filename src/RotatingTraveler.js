(function() { 

	'use strict';

	function RotatingTraveler( wd, source, canvas, fromRect, x, y, width, height, rotationImage, rotationFromRect) {

		tabageos.TravelerSkeleton.call(this,x,y,width,height);
		tabageos.Traveler.call(this,x,y,width,height);
		tabageos.BlittedTraveler.call(this,source, canvas, fromRect, x, y, width, height);
		tabageos.WDTraveler.call(this,wd, source, canvas, fromRect, x, y, width, height);
		this.init(source, canvas, fromRect, x, y, width, height);
		this._cWD = wd;
		this._wayDeterminer = wd;
		this.rImageHolder = rotationImage;
		this.rFromRect = rotationFromRect;
		this.roExA = 0;
		
		if (rotationImage) {
			this.rToPoint = new tabageos.MoverPoint(-((this.rImageHolder.width - this.roExA) / 2),-((this.rImageHolder.height - this.roExA) / 2));
			this._brFromRct = new tabageos.Rectangle(0,0,this.rFromRect.width,this.rFromRect.height);
		}
	};
	RotatingTraveler.prototype.constructor = RotatingTraveler;
	RotatingTraveler.prototype = Object.create(tabageos.TravelerSkeleton.prototype);
	Object.assign(RotatingTraveler.prototype, tabageos.Traveler.prototype, tabageos.BlittedTraveler.prototype, tabageos.WDTraveler.prototype);
	RotatingTraveler.prototype.nr;
	
	RotatingTraveler.prototype.getRotation = function() {
		return this.nr;
	};
	RotatingTraveler.prototype.setRotation = function(toThis) {
		this.nr = toThis;
		var rhw = (this.rImageHolder.width - this.roExA) / 2;
		var rhh = (this.rImageHolder.height - this.roExA) / 2;
		this.rImageHolder.context.clearRect(0, 0, this.rImageHolder.width, this.rImageHolder.height);
		this.rImageHolder.context.save();
		this.rImageHolder.context.translate(rhw, rhh);
		this.rImageHolder.context.rotate(((Math.PI) * 2 * (this.nr / 360)));
		this.rImageHolder.copyPixels(this._source, this.rFromRect, this.rToPoint, this.rFromRect.width, this.rFromRect.height);
		this.rImageHolder.context.restore();
	};
	RotatingTraveler.prototype.roExA = 0;
	/**
	* The CanvasObject that holds the image to rotate.
	* @type tabageos.CanvasObject
	*/
	RotatingTraveler.prototype.rImageHolder;
	
	
	
	RotatingTraveler.prototype.rFromRect;
	RotatingTraveler.prototype._brFromRct;
	RotatingTraveler.prototype.rToPoint;
	RotatingTraveler.prototype._aro = 0;
	RotatingTraveler.prototype._defaultAro = 0;
	RotatingTraveler.prototype.alwaysDisplayRotationOnly = function() {
		this._defaultAro = (this._defaultAro == 0 ? 1 : 0);
		this._aro = 1;
	};
	RotatingTraveler.prototype.rotateWithMoverPoint = function(mp, addedY, addedX, offsetPoint) {
		this.nr = Math.atan2((mp.y + (addedY || 0)) - this.y, (mp.x + (addedX || 0)) - this.x) * 180 / Math.PI;
		var rhw = (this.rImageHolder.width - this.roExA) / 2;
		var rhh = (this.rImageHolder.height - this.roExA) / 2;
		this.rImageHolder.context.clearRect(0, 0, this.rImageHolder.width, this.rImageHolder.height);
		this.rImageHolder.context.save();
		this.rImageHolder.context.translate(rhw, rhh);
		this.rImageHolder.context.rotate(((Math.PI) * 2 * (this.nr / 360)));
		this.rImageHolder.copyPixels(this._source, this.rFromRect, this.rToPoint, this.rFromRect.width, this.rFromRect.height);
		this.rImageHolder.context.restore();
	};
	RotatingTraveler.prototype.animateRotationOnly = function() {

		this.animate();
		this.rFromRect.width = this.fromRect.width;
		
		this.rFromRect.height = this.fromRect.height;
		
		this.rFromRect.x = this.fromRect.x;
		this.rFromRect.y = this.fromRect.y;
		this._aro = 1;

	};
	RotatingTraveler.prototype.blit = function(r, p, rop) {
		if (r)
		this.fromRect = r;
		if (p) {
			this.toPoint = p;
		} else {
			this.toPoint.x = this.x+1-1;
			this.toPoint.y = this.y+1-1;
		}
		if (this._aro == 0) {
			this._canvas.copyPixels(this._source, this.fromRect, this.toPoint, this.fromRect.width + this.fromWidthOffset, this.fromRect.height + this.fromHeightOffset);
		} else {
			this._aro = this._defaultAro;
		}
		this._canvas.copyPixels(this.rImageHolder.canvas, this._brFromRct, rop || this.toPoint, this.rFromRect.width, this.rFromRect.height);
	};

	tabageos.RotatingTraveler = RotatingTraveler;
})();


