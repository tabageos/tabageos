(function() { 
	'use strict';
	
	function SceneryObject(x,y,width,height,map,ca,dontCloneMap,dt,tw,th,mr,mc) {
		tabageos.MoverSkeleton.call(this,x,y,width,height);
		tabageos.MapMover.call(this,x,y,width,height, map,ca,dontCloneMap, dt, tw, th,mr,mc);
		this.width = width || 0;
		this.height = height || 0;
		this._middlePoint = new tabageos.MoverPoint();
		this._pos = new tabageos.MoverPoint(x || 0,y || 0);
		this._veloc = new tabageos.MoverPoint(0,0);
		this._lastVeloc = new tabageos.MoverPoint(0,0);
		this._lastPos = new tabageos.MoverPoint(x,y);
		this._deltaTime = dt || tabageos.TimeKeeper._sae;
		this._map = dontCloneMap ? map : tabageos.BlitMath.cloneMultiArray(map);
		this._rect = new tabageos.Rectangle(this.x,this.y,this.width,this.height);
		this._state = 1;
		this.x = x || 0;
		this.y = y || 0;
		this._tH = th || this.height;
		this._tW = tw || this.width;
		this._canvasAnimation = ca || null;
		this.playerHoldingThis = null;
		this.tileValue = null;
		this.weight = 24;
		this.xDirection = 1;
		this._solidSit = 0;this._eHit = 0;
		this.tileRect = null;
		this._checkHelper = new tabageos.MoverPoint();
	};
	SceneryObject.prototype.constructor = SceneryObject;
	SceneryObject.prototype = Object.create(tabageos.MoverSkeleton.prototype);
	Object.assign(SceneryObject.prototype, tabageos.MapMover.prototype);
	SceneryObject.prototype.playerHoldingThis; 
	SceneryObject.prototype.weight = 1;
	SceneryObject.prototype._canvasAnimation = null;
	SceneryObject.prototype.xDirection = 1;
	SceneryObject.prototype.tileValue = null;
	SceneryObject.prototype.tileRect = null;
	SceneryObject.prototype._eHit = 0;
	SceneryObject.prototype._solidSit = 0;
	
	tabageos.SceneryObject = SceneryObject;
})();

(function() {

	'use strict';
	
	function SceneryThrower(x,y,width,height, map, ca,dontCloneMap,dt,tWidth,tHeight,mr,mc) {
		tabageos.MoverSkeleton.call(this,x,y,width,height);
		tabageos.MapMover.call(this,x,y,width,height, map, ca,dontCloneMap,dt,tWidth,tHeight,mr,mc);
		
		this.width = width || 0;
		this.height = height || 0;
		this._middlePoint = new tabageos.MoverPoint();
		this._pos = new tabageos.MoverPoint(x || 0,y || 0);
		this._veloc = new tabageos.MoverPoint(0,0);
		this._lastVeloc = new tabageos.MoverPoint(0,0);
		this._lastPos = new tabageos.MoverPoint(x,y);
		this._deltaTime = dt || tabageos.TimeKeeper._sae;
		this._map = dontCloneMap ? map : tabageos.BlitMath.cloneMultiArray(map);
		this._state = 1;
		this.x = x || 0;
		this.y = y || 0;
		this._rect = new tabageos.Rectangle(this.x,this.y,this.width,this.height);
		this._canvasAnimation = ca || null;
		this._tH = tHeight || 16;
		this._tW = tWidth || 16;
		this._outAltered = new tabageos.MoverPoint();
		this.holdingRect = new tabageos.Rectangle(0,0,width,height);
		this.holdingOffsetX = 1;
		this.holdingOffsetY = 3;
		this.health = 100;
		this.holding = null;
		this.nameOfThrower = "strawHat";
		this._checkHelper = new tabageos.MoverPoint();
	};
	SceneryThrower.prototype.constructor = SceneryThrower;
	SceneryThrower.prototype = Object.create(tabageos.MoverSkeleton.prototype); 
	Object.assign(SceneryThrower.prototype, tabageos.MapMover.prototype);
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
			
			scenery = new tabageos.SceneryObject(this.x+1-1,this.y+1-1,w||this._tw,h||this._th,this._map,null,1,this._deltaTime, this._tw, this._th,this._mapRows,this._mapColumns);
			scenery._jumps = jumps || 0;
			scenery.playerHoldingThis = this;
			scenery.tileValue = this.holding.value || this.holding.tileValue;
			scenery.tileRect = new tabageos.Rectangle(this.holdingRect.x,this.holdingRect.y,this.holdingRect.width,this.holdingRect.height);

			this._throwHolding();
			return scenery;
		}
		return null;
	};
	tabageos.SceneryThrower = SceneryThrower;
})();


