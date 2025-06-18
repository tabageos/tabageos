import {MoverSkeleton} from './MoverSkeleton.js';
import {MapMover} from './MapMover.js';

	'use strict';
    
    function SceneryThrower(x,y,width,height, map, ca,dontCloneMap,dt,tWidth,tHeight,mr,mc) {
		MoverSkeleton.call(this,x,y,width,height);
		MapMover.call(this,x,y,width,height, map, ca,dontCloneMap,dt,tWidth,tHeight,mr,mc);
        
        this.width = width || 0;
        this.height = height || 0;
        this._middlePoint = new MoverPoint();
        this._pos = new MoverPoint(x || 0,y || 0);
        this._veloc = new MoverPoint(0,0);
        this._lastVeloc = new MoverPoint(0,0);
        this._lastPos = new MoverPoint(x,y);
        this._deltaTime = dt || TimeKeeper._sae;
        this._map = dontCloneMap ? map : BlitMath.cloneMultiArray(map);
        this._state = 1;
        this.x = x || 0;
        this.y = y || 0;
        this._rect = new Rectangle(this.x,this.y,this.width,this.height);
        this._canvasAnimation = ca || null;
        this._tH = tHeight || 16;
        this._tW = tWidth || 16;
        this._outAltered = new MoverPoint();
        this.holdingRect = new Rectangle(0,0,width,height);
        this.holdingOffsetX = 1;
        this.holdingOffsetY = 3;
		this.health = 100;
		this.holding = null;
		this.nameOfThrower = "strawHat";
        this._checkHelper = new MoverPoint();
    };
	SceneryThrower.prototype.constructor = SceneryThrower;
    SceneryThrower.prototype = Object.create(MoverSkeleton.prototype); 
	Object.assign(SceneryThrower.prototype, MapMover.prototype);
    SceneryThrower.prototype.throwStrength = 10;
    SceneryThrower.prototype.health = 100;
    SceneryThrower.prototype.holding;
    SceneryThrower.prototype.holdingRect;
    SceneryThrower.prototype._canvasAnimation = null;
    SceneryThrower.prototype._outAltered;
    SceneryThrower.prototype.holdingOffsetX = 1;
    SceneryThrower.prototype.holdingOffsetY = 3;
    SceneryThrower.prototype.nameOfThrower = "strawHat";

    SceneryThrower.prototype.alteredPosition = function(xAlterAmount, yAlterAmount) {
        xAlterAmount = xAlterAmount || 0;
        yAlterAmount = yAlterAmount || 0;
        this._outAltered.x = this.x - xAlterAmount;
        this._outAltered.y = this.y - yAlterAmount;
        return this._outAltered;
    };
    SceneryThrower.prototype.holdingImageRect = function() {
        return this.holdingRect;
    };
    SceneryThrower.prototype.pickUpTileData = function(td, imageWidthAdjust, imageHeightAdjust) {
        if (!this.holding) {
            this.holding = td;
            this.holdingRect.x = this.holding.value[1] * (this._tw);
            this.holdingRect.y = this.holding.value[0] * (this._th);
            this.holdingRect.width = this._tw;
            this.holdingRect.height = this._th;
            if (imageWidthAdjust) {
                this.holdingRect.width += imageWidthAdjust;
            }
            if (imageHeightAdjust) {
                this.holdingRect.height += imageHeightAdjust;
            }
            return true;
        }
        return false;
    };
    SceneryThrower.prototype.pickUp = function(obj, imageWidthAdjust, imageHeightAdjust) {
        if (!this.holding) {
            this.holding = obj;
            this.holdingRect.x = obj.tileValue[1] * (obj.width);
            this.holdingRect.y = obj.tileValue[0] * (obj.height);
            this.holdingRect.width = obj.width;
            this.holdingRect.height = obj.height;
            if (imageWidthAdjust) {
                this.holdingRect.width += imageWidthAdjust;
            }
            if (imageHeightAdjust) {
                this.holdingRect.height += imageHeightAdjust;
            }
            return true;
        }
        return false;
    };
    SceneryThrower.prototype._throwHolding = function() {
        
        this.holding = null;
        
    };
	
    SceneryThrower.prototype.throwSceneryObject = function(w,h,jumps) {
        var scenery;
        if (this.holding) {
            
            scenery = new SceneryObject(this.x+1-1,this.y+1-1,w||this._tw,h||this._th,this._map,null,1,this._deltaTime, this._tw, this._th,this._mapRows,this._mapColumns);
            scenery._jumps = jumps || 0;
            scenery.playerHoldingThis = this;
            scenery.tileValue = this.holding.value || this.holding.tileValue;
            scenery.tileRect = new Rectangle(this.holdingRect.x,this.holdingRect.y,this.holdingRect.width,this.holdingRect.height);

            this._throwHolding();
            return scenery;
        }
        return null;
    };
    
export { SceneryThrower };