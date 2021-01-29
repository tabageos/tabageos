(function() { 

	'use strict';
	
	function MovingPlatform(direcX,direcY,x,y,width,height, map,ca,dontCloneMap, dt,tw,th, mr, mc) {
		tabageos.TravelerSkeleton.call(this,x,y,width,height);
		tabageos.MapTraveler.call(this,x,y,width,height, map,ca,dontCloneMap, dt,tw,th,mr,mc);
		this.width = width || 0;
        this.height = height || 0;
        this._middlePoint = new tabageos.MoverPoint();
        this._pos = new tabageos.MoverPoint(x,y);
        this._veloc = new tabageos.MoverPoint(0,0);
        this._lastVeloc = new tabageos.MoverPoint(0,0);
        this._lastPos = new tabageos.MoverPoint(x,y);
        this._deltaTime = dt || tabageos.TimeKeeper._sae;
        this._map = dontCloneMap ? map : tabageos.BlitMath.cloneMultiArray(map);
        this._rect = new tabageos.Rectangle(this.x,this.y,this.width,this.height);
        this._state = 1;
        this.forceApplier = new tabageos.MoverPoint();
        this.forceHolder = new tabageos.MoverPoint();
        this._canvasAnimation = ca || null;
        this._w = width || 0;
        this._h = height || 0;
        this.wanderOffset = new tabageos.MoverPoint(0,0);
        this.blankMO = new tabageos.MoverPoint();
        this._eventDispatcher = new tabageos.EventDispatcher();
        this.x = x || 0;
        this.y = y || 0;
		this._tw = tw;
		this._th = th;
        this._checkHelper = new tabageos.MoverPoint();
		this._inp = new tabageos.MoverPoint();
		this._direcX = direcX || 0;
		this._direcY = (direcY == -1 ? direcY : (direcY || 0));
		this._horizontal = this._direcX == -1 || this._direcX == 1;
	}
	MovingPlatform.prototype.constructor = MovingPlatform;
	MovingPlatform.prototype = Object.create(tabageos.TravelerSkeleton.prototype);
	Object.assign(MovingPlatform.prototype, tabageos.MapTraveler.prototype);
	MovingPlatform.prototype._inp;
	MovingPlatform.prototype._tw;
	MovingPlatform.prototype._th;
	MovingPlatform.prototype._horizontal = 1;
	MovingPlatform.prototype._direcX;
	MovingPlatform.prototype._direcY;
	
	tabageos.MovingPlatform = MovingPlatform;
	
})();


