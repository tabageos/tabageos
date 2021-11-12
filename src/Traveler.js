(function() { 
	'use strict';
	function Traveler(x, y, width, height, ca, dt) {
		tabageos.TravelerSkeleton.call(this,x,y,width,height);
		this.init(x,y,width,height,ca);
		this._deltaTime = dt || tabageos.TimeKeeper._sae;
	};
	Traveler.prototype.constructor = Traveler;
	Traveler.prototype = Object.create(tabageos.TravelerSkeleton.prototype);
	Traveler.prototype.init = function(x, y, width, height, ca) {
		this.x = x || 0;
		this.y = y || 0;
		this.height = height || 0;
		this.width = width || 0;
		this.travelType = this.easeTo;
		this.boundingMethod = tabageos.BoundMethods.boundTo;
		this._wallObject = null;
		this._canvasAnimation = ca || null;
		this.forceApplier = new tabageos.MoverPoint();
		this.forceHolder = new tabageos.MoverPoint();
		this._w = width || 0;
		this._h = height || 0;
		this.wanderOffset = new tabageos.MoverPoint(0,0);
		this.blankMO = new tabageos.MoverPoint();
		this._veloc = new tabageos.MoverPoint(0,0);
		this._eventDispatcher = new tabageos.EventDispatcher();
		this._middlePoint = new tabageos.MoverPoint();
		this._pos = new tabageos.MoverPoint(x,y);
		this._lastVeloc = new tabageos.MoverPoint(0,0);
		this._lastPos = new tabageos.MoverPoint(x,y);
		this.dX = 0; this.dY = 0;
		this._rect = new tabageos.Rectangle(this.x,this.y,this.width,this.height);
		this.spreadDistance = 10;
		this.circleDistance = 10;
		this.separationDistance = 10;
		this.bypassAvoidDistance = null;
		this.maxForce = 12;
		this.followDistance = this._w;
		this.easeProximity = 2;
		this.wanderProximity = 10;
		this.wanderAngle = 10;
		this.wanderRadius = 20;
		this.wanderRange = 20;
		this.avoidSpace = 20;
		this.avoidee = null;
		this.avoidDistance = 20;
		this.visionDistance = 20;
		this.personalSpace = 20;
		this.mass = 2;
		this.maxSpeed = 5;
		this.flockCount = null;
		this.bird = null;
		this._pathIndex = 0;
		this._hp = new tabageos.MoverPoint();
		this._vp = new tabageos.MoverPoint();
		this._pathEvent = new Event("pathComplete");
		this.listenerStrings = null;
		this.listenerMethods = null;
	};
	Traveler.prototype.travelType = null;
	Traveler.prototype.boundingMethod = null;
	Traveler.prototype.spreadDistance = 10;
	Traveler.prototype.circleDistance = 50;
	Traveler.prototype.separationDistance = 10;
	Traveler.prototype.bypassAvoidDistance = null;
	Traveler.prototype.maxForce = 2;
	Traveler.prototype.forceApplier = null;
	Traveler.prototype.followDistance = 10;
	Traveler.prototype.easeProximity = 2;
	Traveler.prototype.wanderProximity = 10;
	Traveler.prototype.wanderAngle = 5;
	Traveler.prototype.wanderRadius = 20;
	Traveler.prototype.wanderRange = 20;
	Traveler.prototype.wanderOffset = null;
	Traveler.prototype.avoidSpace = 20;
	Traveler.prototype.avoidDistance = 20;
	Traveler.prototype.visionDistance = 10;
	Traveler.prototype.personalSpace = 20;
	Traveler.prototype.mass = 5;
	Traveler.prototype.maxSpeed = 10;
	Traveler.prototype.maxForce = 4;
	Traveler.prototype.dX;
	Traveler.prototype._deltaTime;
	Traveler.prototype._pos = null;
	Traveler.prototype.x = 0;
	Traveler.prototype.y = 0;
	Traveler.prototype._pathIndex = 0;
	Traveler.prototype._hp = null;
	Traveler.prototype._vp = null;
	Traveler.prototype._pathEvent = null;
	Traveler.prototype._lastPos;
	Traveler.prototype._lastVeloc;
	Traveler.prototype._veloc = null;
	Traveler.prototype._canvasAnimation = null;
	Traveler.prototype._eventDispatcher = null;
	Traveler.prototype._destination = null;
	Traveler.prototype._wallObject = null;
	Traveler.prototype._deltaTime = null;
	Traveler.prototype.setWallObject = function(toThis) {
		this._wallObject = toThis;
	};
	Traveler.prototype.getDestination = function() {
		return this._destination;
	};
	Traveler.prototype.setDestination = function(toThis) {
		this._destination = toThis;
	};
	Traveler.prototype.update = function() {
		this.forceApplier.truncate(this.maxForce);
		this.forceApplier.divide(this.mass, 0);
		this._veloc.add(this.forceApplier.multiply(this._deltaTime,0), 0);
		this.forceApplier.reset();
		this._veloc._length = 0;
		this._veloc._angle = 0;
		this._veloc.truncate(this.maxSpeed);
		this._pos.addBy(this._veloc.x * this._deltaTime, this._veloc.y * this._deltaTime, 0);
		if (this._wallObject)
		this.boundingMethod(this, this._wallObject);
		
		this.x = this._pos.x+1-1;
		this.y = this._pos.y+1-1;
	};
	Traveler.prototype.move = function() {
		this.forceApplier.truncate(this.maxForce);
		this.forceApplier.divide(this.mass, 0);
		this._veloc.add(this.forceApplier.multiply(this._deltaTime,0), 0);
		this.forceApplier.reset();
		this._veloc._length = 0;
		this._veloc._angle = 0;
		this._veloc.truncate(this.maxSpeed);
		this._pos.addBy(this._veloc.x * this._deltaTime, this._veloc.y * this._deltaTime, 0);
		if (this._wallObject)
		this.boundingMethod(this, this._wallObject);
		
		this.x = this._pos.x+1-1;
		this.y = this._pos.y+1-1;
	};
	Traveler.prototype.travel = function(to) {
		if (this.travelType != null)
		this.travelType(to||this._destination);
		this.move();
	};
	tabageos.Traveler = Traveler;
})();

