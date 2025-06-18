import { MoverPoint } from './MoverPoint.js';
import { Rectangle } from './Rectangle.js';
import { TimeKeeper } from './TimeKeeper.js';
import { TravelerSkeleton } from './TravelerSkeleton.js';
import { Traveler } from './Traveler.js';
import { BlittedTraveler } from './BlittedTraveler.js';



	'use strict';

    function WDTraveler(wayDeterminer, source, canvasObject, fromRect, x, y, width, height, dt) {
		TravelerSkeleton.call(this,x,y,width,height);
		Traveler.call(this,x,y,width,height);
		BlittedTraveler.call(this, source, canvasObject, fromRect, x, y, width, height, dt);
        this.health = 100;
        this._wayDeterminer = wayDeterminer;
        this.init(source, canvasObject, fromRect, x, y, width, height);
		this.ani = 0;
		this.vCheckOffset = 0;
		this.lastAnim = "";
		this.currentAnimation = "";
		this.animationSpecs = {};
		this.animationIndexOrder = null;
		this.fromHeightOffset = 0;
		this.fromWidthOffset = 0;
		this.fromXOffset = 0;
		this.fromYOffset = 0;
		this.hCheckOffsetRight = 0;
		this.hCheckOffset = 0;
		this.blitIndex = 0;
		this._cBB = 0;
		this._throttRef = 0;
		this._inDelay = 0;
		this._cpos = null;
		this._addedPos =null;
		this._deltaTime = dt || TimeKeeper._sae;
    };
	WDTraveler.prototype.constructor = WDTraveler;
    WDTraveler.prototype = Object.create(TravelerSkeleton.prototype);
	Object.assign(WDTraveler.prototype, Traveler.prototype, BlittedTraveler.prototype);
    
    WDTraveler.prototype.currentAnimation = "";
    WDTraveler.prototype.animationSpecs = {};
    WDTraveler.prototype.animationIndexOrder = [];
    WDTraveler.prototype.ani = 0;
    WDTraveler.prototype.lastAnim = "";
    WDTraveler.prototype.fromHeightOffset = 0;
    WDTraveler.prototype.fromWidthOffset = 0;
    WDTraveler.prototype.fromXOffset = 0;
    WDTraveler.prototype.fromYOffset = 0;
    WDTraveler.prototype.hCheckOffsetRight = 0;
    WDTraveler.prototype.hCheckOffset = 0;
    WDTraveler.prototype.blitIndex = 0;
    WDTraveler.prototype.sae = null;
    WDTraveler.prototype._wic = null;
	WDTraveler.prototype._cpos = null;
	WDTraveler.prototype._addedPos = null;
    WDTraveler.prototype._wayDeterminer = null;
    WDTraveler.prototype._moveY = null;
    WDTraveler.prototype.vCheckOffsetUp = 0;
    WDTraveler.prototype.vCheckOffset = 0;
    WDTraveler.prototype._moveX = null;
	WDTraveler.prototype._deltaTime = null;
    
	WDTraveler.prototype._throttRef;
    WDTraveler.prototype._cBB;
	WDTraveler.prototype._inDelay = 0;
    
	WDTraveler.prototype.getUnreferencedPosition = function(addedX, addedY) {
        if (!this._cpos || !this._addedPos) {
            this._cpos = new MoverPoint();
            this._addedPos = new MoverPoint();
        }
        this._cpos.x = this.x;
        this._cpos.y = this.y;
        if (addedX || addedY) {
            this._addedPos.x = this.x + (addedX || 0);
            this._addedPos.y = this.y + (addedY || 0)
        }
        return ((addedX || addedY) ? this._addedPos : this._cpos);
    };
    
    WDTraveler.prototype.getBottomY = function() {
        return this.y + this.height;
    };
    WDTraveler.prototype.getMiddleY = function() {
        return this.y + (this.height / 2);
    };
    WDTraveler.prototype.getTopY = function() {
        return this.y+1-1;
    };
    WDTraveler.prototype.getRightX = function() {
        return this.x + this.width;
    };
    WDTraveler.prototype.getMiddleX = function() {
        return this.x + (this.width / 2);
    };
    WDTraveler.prototype.getLeftX = function() {
        return this.x+1-1;
    };
    WDTraveler.prototype.move = function() {
		
		this.forceApplier.truncate(this.maxForce);
        this.forceApplier.divide(this.mass, 0);
        var ovx = this._veloc.x+1-1; var ovy = this._veloc.y+1-1;
		this._veloc.add(this.forceApplier.multiply(this._deltaTime,0), 0);
        this.forceApplier.reset();
		this._veloc._length = 0;
        this._veloc._angle = 0;
        this._veloc.truncate(this.maxSpeed);

        var xDirec = this._pos.x + this._veloc.x < this._pos.x ? -1 : 1;
        var yDirec = this._pos.y + this._veloc.y < this._pos.y ? -1 : 1;
        var pNewX = this._pos.x + (this._veloc.x * this._deltaTime);
        var pNewY = this._pos.y + (this._veloc.y * this._deltaTime);
        this._moveX = this.landCheckHorizontal(xDirec, pNewX);
        this._moveY = this.landCheckVertical(yDirec, pNewY);
        if (this._moveX) {
            this._pos.x = pNewX;
        } else {
            this._veloc.x = ovx;
        }
        if (this._moveY) {
            this._pos.y = pNewY;
        } else {
            this._veloc.y = ovy;
        }
        if (this._wallObject) { 
            this.boundingMethod(this, this._wallObject);
		} 
		
        if (this._moveX)
            this.x = this._pos.x+1-1;
        if (this._moveY)
            this.y = this._pos.y+1-1;

        this._autoAnimation();
    };
    WDTraveler.prototype.landCheckHorizontal = function(leftRight) {
        var result = 0;
        var toCheck = leftRight == -1 ? this.x - this.hCheckOffset : this.x + this.width + this.hCheckOffsetRight;
        if (this._wayDeterminer.wayIsClear(toCheck, this.getMiddleY())) {
            result = 1;
        }
        return result;
    };
    WDTraveler.prototype.landCheckVertical = function(topBottom) {
        var result = 0;
        var toCheck = topBottom == -1 ? this.getTopY() - this.vCheckOffsetUp : this.getBottomY() + this.vCheckOffset;
        if (this._wayDeterminer.wayIsClear(this.getMiddleX(), toCheck)) {
            result = 1;
        }
        return result;
    };
    export { WDTraveler   };



