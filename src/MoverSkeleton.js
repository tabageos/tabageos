(function() { 
	'use strict';
    function MoverSkeleton(x, y, width, height) {
        this.width = width || 0;
        this.height = height || 0;
        this._middlePoint = new tabageos.MoverPoint();
        this._pos = new tabageos.MoverPoint(x,y);
        this._veloc = new tabageos.MoverPoint(0,0);
        this._lastVeloc = new tabageos.MoverPoint(0,0);
        this._lastPos = new tabageos.MoverPoint(x,y);
        this.x = x || 0;
        this.y = y || 0;
		this.maxSpeed = 20;
		this.mass = 2;
		this.dX = null;
		this.dY = null;
        this._rect = new tabageos.Rectangle(this.x,this.y,this.width,this.height);
    };
	MoverSkeleton.prototype.constructor = MoverSkeleton;
    MoverSkeleton.prototype.maxSpeed = 20;
    MoverSkeleton.prototype.mass = 2;
    MoverSkeleton.prototype._veloc = null;
    MoverSkeleton.prototype._pos = null;
    MoverSkeleton.prototype._lastPos = null;
    MoverSkeleton.prototype._lastVeloc = null;
    MoverSkeleton.prototype._rect = null;
    MoverSkeleton.prototype.dX = null;
    MoverSkeleton.prototype.x = null;
    MoverSkeleton.prototype.dY = null;
    MoverSkeleton.prototype.y = null;
    MoverSkeleton.prototype.width = null;
    MoverSkeleton.prototype.height = null;
    MoverSkeleton.prototype._middlePoint = null;
    MoverSkeleton.prototype.getHeight = function() {
        return this.height;
    };
    MoverSkeleton.prototype.getVerticalDirection = function() {
        return this.dY;
    };
    MoverSkeleton.prototype.getHorizontalDirection = function() {
        return this.dX;
    };
    MoverSkeleton.prototype.getWidth = function() {
        return this.width;
    };
    MoverSkeleton.prototype.getPosition = function() {
        return this._pos;
    };
    MoverSkeleton.prototype.setPosition = function(toThis) {
        this._pos = toThis;
        this.x = this._pos.x+1-1;
        this.y = this._pos.y+1-1;
    };
    MoverSkeleton.prototype.getVelocity = function() {
        return this._veloc;
    };
    MoverSkeleton.prototype.setVelocity = function(toThis) {
        this._veloc = toThis;
    };
    MoverSkeleton.prototype.getX = function() {
        return this.x;
    };
    MoverSkeleton.prototype.setX = function(toThis, notDX) {
		if(!notDX) {
			if (toThis > this.x) {
				this.dX = 1;
			}
			if (toThis < this.x) {
				this.dX = -1;
			}
			if (toThis == this.x) {
				this.dX = 0;
			}
		}
        this.x = toThis+1-1;
        this._pos.x = toThis+1-1;
    };
    MoverSkeleton.prototype.getY = function() {
        return this.y;
    };
    MoverSkeleton.prototype.setY = function(toThis, notDY) {
		if(!notDY) {
			if (toThis > this.y) {
				this.dY = 1;
			}
			if (toThis < this.y) {
				this.dY = -1;
			}
			if (toThis == this.y) {
				this.dY = 0;
			}
		}
        this.y = toThis+1-1;
        this._pos.y = toThis+1-1;
    };
    MoverSkeleton.prototype.getMiddle = function() {
        this._middlePoint.reset();
        this._middlePoint.x = this.x + (this.width >> 1);
        this._middlePoint.y = this.y + (this.height >> 1);
        return this._middlePoint;
    };
    MoverSkeleton.prototype.getRectangle = function(wOffset,hOffset) {
        
        this._rect.x = this.x+1-1;
        this._rect.y = this.y+1-1;
        this._rect.width = this.width+1-1 + (wOffset||0);
        this._rect.height = this.height+1-1 + (hOffset||0);
        return this._rect;
        
    };
    MoverSkeleton.prototype.update = function() {
        this._lastPos.x = this._pos.x +1-1;
        this._lastPos.y = this._pos.y +1-1;
        this._lastVeloc.x = this._veloc.x+1-1;
        this._lastVeloc.y = this._veloc.y+1-1;
        this._unGrounded = this._grounded+1-1;
        this._npRight = this._pRight+1-1;
        this._npLeft = this._pLeft+1-1;
        this._unCeiling = this._atCeiling+1-1;
    };
    tabageos.MoverSkeleton = MoverSkeleton;
})();


//
