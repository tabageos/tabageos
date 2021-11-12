(function() { 
	'use strict';
	function TravelerSkeleton(x, y, width, height) {
		this.forceApplier = new tabageos.MoverPoint();
		this.forceHolder = new tabageos.MoverPoint();
		this._w = width || 0;
		this._h = height || 0;
		this.wanderOffset = new tabageos.MoverPoint(0,0);
		this.blankMO = new tabageos.MoverPoint();
		this._veloc = new tabageos.MoverPoint();
		this._eventDispatcher = new tabageos.EventDispatcher();
		this.width = width || 0;
		this.height = height || 0;
		this._middlePoint = new tabageos.MoverPoint();
		this._pos = new tabageos.MoverPoint(x,y);
		this._lastVeloc = new tabageos.MoverPoint(0,0);
		this._lastPos = new tabageos.MoverPoint(x,y);
		this.x = x || 0;
		this.y = y || 0;
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
		this._pathEvent = new tabageos.Event("pathComplete");
		this.listenerStrings = null;
		this.listenerMethods = null;
	};
	TravelerSkeleton.prototype.constructor = TravelerSkeleton;
	TravelerSkeleton.prototype.spreadDistance = 10;
	TravelerSkeleton.prototype.circleDistance = 10;
	TravelerSkeleton.prototype.separationDistance = 10;
	TravelerSkeleton.prototype.bypassAvoidDistance = null;
	TravelerSkeleton.prototype.maxForce = 12;
	TravelerSkeleton.prototype.forceApplier = null;
	TravelerSkeleton.prototype.followDistance = null;
	TravelerSkeleton.prototype.easeProximity = 2;
	TravelerSkeleton.prototype.wanderProximity = 10;
	TravelerSkeleton.prototype.wanderAngle = 10;
	TravelerSkeleton.prototype.wanderRadius = 20;
	TravelerSkeleton.prototype.wanderRange = 20;
	TravelerSkeleton.prototype.wanderOffset = null;
	TravelerSkeleton.prototype.avoidSpace = 20;
	TravelerSkeleton.prototype.avoidee = null;
	TravelerSkeleton.prototype.avoidDistance = 20;
	TravelerSkeleton.prototype.visionDistance = 20;
	TravelerSkeleton.prototype.personalSpace = 20;
	TravelerSkeleton.prototype.mass = 2;
	TravelerSkeleton.prototype.maxSpeed = 5;
	TravelerSkeleton.prototype._veloc = null;
	TravelerSkeleton.prototype.forceHolder = null;
	TravelerSkeleton.prototype.blankMO = null;
	TravelerSkeleton.prototype.flockCount = null;
	TravelerSkeleton.prototype.bird = null;
	TravelerSkeleton.prototype._eventDispatcher = null;
	TravelerSkeleton.prototype._pathIndex = 0;
	TravelerSkeleton.prototype.path = null;
	TravelerSkeleton.prototype._pathEvent = null;
	TravelerSkeleton.prototype.listenerStrings = null;
	TravelerSkeleton.prototype.listenerMethods = null;
	TravelerSkeleton.prototype._pos = null;
	TravelerSkeleton.prototype._lastPos = null;
	TravelerSkeleton.prototype._lastVeloc = null;
	TravelerSkeleton.prototype._rect = null;
	TravelerSkeleton.prototype.dX = null;
	TravelerSkeleton.prototype.x = null;
	TravelerSkeleton.prototype.dY = null;
	TravelerSkeleton.prototype.y = null;
	TravelerSkeleton.prototype.width = null;
	TravelerSkeleton.prototype.height = null;
	TravelerSkeleton.prototype._hp = null;
	TravelerSkeleton.prototype._vp = null;
	TravelerSkeleton.prototype._middlePoint = null;
	TravelerSkeleton.prototype.getHeight = function() {
		return this.height;
	};
	TravelerSkeleton.prototype.getVerticalDirection = function() {
		return this.dY;
	};
	TravelerSkeleton.prototype.getHorizontalDirection = function() {
		return this.dX;
	};
	TravelerSkeleton.prototype.getWidth = function() {
		return this.width;
	};
	TravelerSkeleton.prototype.getPosition = function() {
		return this._pos;
	};
	TravelerSkeleton.prototype.setPosition = function(toThis) {
		this._pos = toThis;
		this.x = this._pos.x+1-1;
		this.y = this._pos.y+1-1;
	};
	TravelerSkeleton.prototype.getVelocity = function() {
		return this._veloc;
	};
	TravelerSkeleton.prototype.setVelocity = function(toThis) {
		this._veloc = toThis;
	};
	TravelerSkeleton.prototype.getX = function() {
		return this.x;
	};
	TravelerSkeleton.prototype.setX = function(toThis, notDX) {
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
	TravelerSkeleton.prototype.getY = function() {
		return this.y;
	};
	TravelerSkeleton.prototype.setY = function(toThis, notDY) {
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
	TravelerSkeleton.prototype.getMiddle = function() {
		this._middlePoint.reset();
		this._middlePoint.x = this.x + (this.width >> 1);
		this._middlePoint.y = this.y + (this.height >> 1);
		return this._middlePoint;
	};
	TravelerSkeleton.prototype.getRectangle = function(wOffset,hOffset) {
		
		this._rect.x = this.x+1-1;
		this._rect.y = this.y+1-1;
		this._rect.width = this.width+1-1 + (wOffset||0);
		this._rect.height = this.height+1-1 + (hOffset||0);
		return this._rect;
		
	};
	TravelerSkeleton.prototype.update = function() {
		this._lastPos.x = this._pos.x +1-1;
		this._lastPos.y = this._pos.y +1-1;
		this._lastVeloc.x = this._veloc.x+1-1;
		this._lastVeloc.y = this._veloc.y+1-1;
		this._unGrounded = this._grounded+1-1;
		this._npRight = this._pRight+1-1;
		this._npLeft = this._pLeft+1-1;
		this._unCeiling = this._atCeiling+1-1;
	};
	TravelerSkeleton.prototype.getMaxForceSquared = function() {
		return this.maxForce * this.maxForce;
	};
	TravelerSkeleton.prototype.getPathIndex = function() {
		return this._pathIndex;
	};
	TravelerSkeleton.prototype.setPathIndex = function(toThis) {
		this._pathIndex = toThis;
	};
	TravelerSkeleton.prototype.separate = function(withThese, separatePriority) {
		this.getSeparationForce(withThese);
		if (separatePriority > 1)
		this.forceApplier.multiply(separatePriority, 0);
		
	};
	TravelerSkeleton.prototype.separateFromThis = function(mover) {
		var difference;
		var distance;
		distance = tabageos.MoverPoint.distBetween(this._pos, mover.getPosition());
		if (distance > 0 && distance < this.separationDistance) {
			this._hp.x = this._pos.x; this._hp.y = this._pos.y;
			this._hp.subtract(mover.getPosition(), 0);
			this._hp.multiply(distance,0);
			this.forceApplier.add(this._hp, 0);
		}
	};
	TravelerSkeleton.prototype.getSteerForce = function(target, ease, easeDistance) {
		this._hp.x = target.x; this._hp.y = target.y;
		var steeringForce = this._hp;
		steeringForce.subtract(this._pos, 0);
		var distance = this._pos.dist(steeringForce.normalize());
		if (distance > 0) {
			if (distance < easeDistance && ease) {
				steeringForce.multiply(this.maxSpeed * (distance / easeDistance), 0);
			} else {
				steeringForce.multiply(this.maxSpeed, 0);
			}
			steeringForce.subtract(this._veloc, 0);
			if (steeringForce.getSquaredLength() > this.getMaxForceSquared()) {
				steeringForce.truncate(this.maxForce);
			}
		}
		return steeringForce;
	};
	TravelerSkeleton.prototype.flee = function(mp) {
		this._hp.x = mp.x; this._hp.y = mp.y;
		var targetVeloc = this._hp.subtract(this._pos, 0);
		targetVeloc.normalize();
		targetVeloc.multiply(this.maxSpeed, 0);
		var force = targetVeloc.subtract(this._veloc, 0);
		this.forceApplier.subtract(force, 0);
	};
	TravelerSkeleton.prototype.easeTo = function(mp) {
		this._hp.x = mp.x+1-1; this._hp.y = mp.y+1-1;
		var targetVeloc = this._hp.subtract(this._pos, 0);
		targetVeloc.normalize();
		var distance = this._pos.dist(mp);
		if (distance > this.easeProximity) {
			targetVeloc.multiply(this.maxSpeed, 0);
		} else {
			var easing = this.maxSpeed * distance / this.easeProximity;
			targetVeloc.multiply(easing, 0);
		}
		var force = targetVeloc.subtract(this._veloc, 0);
		this.forceApplier.add(force, 0);
	};
	TravelerSkeleton.prototype.getSeparationForce = function(fromThese) {
		
		
		
		
		
		var distance;
		var count = 0;
		var mover;
		var i = 0;
		for (i = 0; i < fromThese.length; i++) {
			mover = fromThese[i];
			distance = tabageos.MoverPoint.distBetween(this._pos, mover.getPosition());
			if (distance > 0 && distance < this.separationDistance) {
				this._hp.x = this._pos.x; this._hp.y = this._pos.y;
				this._hp.subtract(mover.getPosition(), 0);
				this._hp.multiply(distance,0);
				
				
				
				this.forceApplier.add(this._hp, 0);
				count++;
			}
		}
		if (count > 0) {
			this.forceApplier.multiply(1 / count, 0);
		}
		
	};
	TravelerSkeleton.prototype.canSeeThis = function(mp) {
		var result = false;
		this._hp.x = mp.x; this._hp.y = mp.y;
		if (this._pos.dist(mp) > this.visionDistance)
		return result;
		this._vp.x = this._veloc.x; this._vp.y = this._veloc.y;
		var sight = this._vp.normalize();
		var distanceDifference = this._hp.subtract(this._pos, 0);
		var dotProduct = distanceDifference.dotProduct(sight);
		if (dotProduct < 0) {
			result = false;
		} else {
			result = true;
		}
		return result;
	};
	TravelerSkeleton.prototype.getAlignmentForce = function(withThese) {
		
		
		var distance;
		var count = 0;
		var mover;
		var i = 0;
		for (i = 0; i < withThese.length; i++) {
			mover = withThese[i];
			distance = tabageos.MoverPoint.distBetween(this._pos, mover.getPosition());
			if (distance > 0 && distance < this.separationDistance) {
				this.forceApplier.add(mover._veloc, 0);
				count++;
			}
		}
		if (count > 0) {
			this.forceApplier.multiply(1 / count, 0);
			if (this.forceApplier.getSquaredLength() > this.getMaxForceSquared()) {
				this.forceApplier.truncate(this.maxForce);
			}
		}
		
	};
	TravelerSkeleton.prototype.almostCloseTo = function(mp) {
		return this._pos.dist(mp) < this.personalSpace;
	};
	TravelerSkeleton.prototype.getCohesionForce = function(withThese) {
		
		
		var distance;
		var count = 0;
		var mover;
		var i = 0;
		for (i = 0; i < withThese.length; i++) {
			mover = withThese[i];
			distance = tabageos.MoverPoint.distBetween(this._pos, mover.getPosition());
			if (distance > 0 && distance < this.personalSpace) {
				this.forceApplier.add(mover.getPosition(), 0);
				count++;
			}
		}
		if (count > 0) {
			this.forceApplier.multiply(1 / count, 0);
			this.forceApplier = this.getSteerForce(this.forceApplier, true, this.personalSpace);
			
		}
		
	};
	TravelerSkeleton.prototype.easeAwayFrom = function(mp) {
		if (this._pos.dist(mp) < this.avoidDistance || this.bypassAvoidDistance > 0) {
			
			this._hp.x = mp.x; this._hp.y = mp.y;
			var targetVeloc = this._hp.subtract(this._pos, 0);
			targetVeloc.normalize();
			var distance = this._pos.dist(mp);
			if (distance < this.easeProximity) {
				targetVeloc.multiply(this.maxSpeed, 0);
			} else {
				var easing = this.maxSpeed * distance / this.easeProximity;
				targetVeloc.multiply(easing, 0);
			}
			var force = targetVeloc.subtract(this._veloc, 0);
			
			
			this.forceApplier.subtract(force, 0);
		}
	};
	TravelerSkeleton.prototype.chase = function(target) {
		var chaseTime = this._pos.dist(target._pos) / this.maxSpeed;
		this._hp.x = target._pos.x; this._hp.y = target._pos.y;
		this._vp.x = target._veloc.x; this._vp.y = target._veloc.y;
		var heading = this._hp.add(this._vp.multiply(chaseTime, 0), 0);
		this.easeTo(heading);
	};
	TravelerSkeleton.prototype.getHideSpot = function(currentPosition, radius, from) {
		var dist = (this.personalSpace * 2) + radius;
		this._hp.x = currentPosition.x; this._hp.y = currentPosition.y;
		var ideal = this._hp.subtract(from._pos, 0).normalize();
		return ideal.multiply(dist, 0).add(currentPosition, 0);
	};
	TravelerSkeleton.prototype.hide = function(behindThese, from) {
		var closetObstacleDistance = -9999;
		var i = -1;
		var m;
		var check;
		var spot;
		var dist;
		while (i != behindThese.length - 1) {
			i++;
			m = behindThese[i];
			if (m) {
				check = this.getHideSpot(m._pos, m.width, from);
				dist = check.dist(this._pos);
				if (dist < closetObstacleDistance) {
					closetObstacleDistance = dist;
					spot = check;
				}
			}
		}
		if (closetObstacleDistance != -9999) {
			this.easeTo(spot);
		}
	};
	TravelerSkeleton.prototype.wander = function() {
		this._hp.x = this._veloc.x; this._hp.y = this._veloc.y;
		this._hp._angle = this._veloc._angle; this._hp._length = this._veloc._length;
		this._hp.normalize().multiply(this.wanderProximity, 0);
		this.wanderOffset.setLength(this.wanderRadius);
		this.wanderOffset.setAngle(this.wanderAngle);
		this.wanderAngle += Math.random() * this.wanderRange - this.wanderRange * .5;
		this._hp.add(this.wanderOffset, 0);
		this.forceApplier.add(this._hp, 0);
	};
	TravelerSkeleton.prototype.evade = function(target) {
		var chaseTime = this._pos.dist(target._pos) / this.maxSpeed;
		this._hp.x = target._pos.x; this._hp.y = target._pos.y;
		this._vp.x = target._veloc.x; this._vp.y = target._veloc.y;
		var heading = this._hp.subtract(this._vp.multiply(chaseTime,0), 0);
		this.easeAwayFrom(heading);
	};
	TravelerSkeleton.prototype.avoid = function(moverSkeleton) {
		var away = true;
		
		
		this.avoidee = moverSkeleton;
		this._vp.x = this._veloc.x; this._vp.y = this._veloc.y;this._vp._angle = this._veloc._angle;this._vp._length=this._veloc._length;
		var myDirection = this._vp.normalize();
		var distanceDifference = this.avoidee.getMiddle().subtract(this._pos);
		var dotProduct = distanceDifference.dotProduct(myDirection);
		if (dotProduct > 0) {
			var lineOfSight = myDirection.multiply(this.avoidDistance);
			var future = myDirection.multiply(dotProduct);
			var howFar = future.subtract(distanceDifference).getLength();
			if (howFar < (this.avoidee.width * 2) + this.avoidSpace && future.getLength() < lineOfSight.getLength()) {
				var force = myDirection.multiply(this.maxSpeed);
				force.setAngle(force.getAngle() + (distanceDifference.sign(this._vp) * Math.PI / 2));
				force.multiply(1 - future.getLength() / lineOfSight.getLength(), 0);
				this.forceApplier.add(force, 0);
				this._veloc.multiply(future.getLength() / lineOfSight.getLength(), 0);
				away = false;
			} else {
				away = true;
			}
		}
		
		return away;
	};
	TravelerSkeleton.prototype.avoidThese = function(these) {
		var away = true;
		var i = 0;
		for (i = 0; i < these.length; i++) {
			this.avoidee = these[i];
			this._vp.x = this._veloc.x; this._vp.y = this._veloc.y;this._vp._angle = this._veloc._angle;this._vp._length=this._veloc._length;
			var myDirection = this._vp.normalize();
			var distanceDifference = this.avoidee.getMiddle().subtract(this._pos);
			var dotProduct = distanceDifference.dotProduct(myDirection);
			if (dotProduct > 0) {
				var lineOfSight = myDirection.multiply(this.avoidDistance);
				var future = myDirection.multiply(dotProduct);
				var howFar = future.subtract(distanceDifference).getLength();
				if (howFar < (this.avoidee.width * 2) + this.avoidSpace && future.getLength() < lineOfSight.getLength()) {
					var force = myDirection.multiply(this.maxSpeed);
					force.setAngle(force.getAngle() + (distanceDifference.sign(this._veloc) * Math.PI / 2));
					force = force.multiply(1 - future.getLength() / lineOfSight.getLength());
					this.forceApplier = this.forceApplier.add(force, 1);
					this._veloc = this._veloc.multiply(future.getLength() / lineOfSight.getLength(), 1);
					away = false;
				} else {
					away = true;
				}
			}
		}
		return away;
	};
	TravelerSkeleton.prototype.seek = function(mp) {
		this._hp.x = mp.x+1-1; this._hp.y = mp.y+1-1;
		this._hp.subtract(this._pos, 0);
		this._hp.normalize();
		this._hp.multiply(this.maxSpeed, 0);
		this.forceApplier.add(this._hp.subtract(this._veloc, 0), 0);
	};
	TravelerSkeleton.prototype.followPath = function(path, loopPath) {
		var nextMO = path[this._pathIndex];
		if (!nextMO)
		return;
		if (this._pos.dist(nextMO) < this.followDistance) {
			if (this._pathIndex >= path.length - 1) {
				this.dispatchEvent(this._pathEvent);
				if (loopPath)
				this._pathIndex = 0;
			} else {
				this._pathIndex += 1;
			}
			return;
		}
		this.seek(nextMO);
	};
	
	TravelerSkeleton.prototype.circle = function(mp) {
		
		var l = Math.sqrt((this._pos.x - mp.x) * (this._pos.x - mp.x) + (this._pos.y - mp.y) * (this._pos.y - mp.y));
		var thex = (this._pos.x - mp.x) / l;
		var they = (this._pos.y - mp.y) / l;
		var destx = mp.x + (thex*this.circleDistance) - this._pos.x + this._veloc.x;
		var desty = mp.y + (they*this.circleDistance) - this._pos.y + this._veloc.y;
		this.forceApplier.x = destx;
		this.forceApplier.y = desty;
		this.forceApplier._length = 0;
		this.forceApplier._angle = 0;
		
	};
	TravelerSkeleton.prototype.addEventListener = function(type, listenerString, object) {
		this._eventDispatcher.addEventListener(type, listenerString, object);
	};
	TravelerSkeleton.prototype.removeEventListener = function(type, listenerString, object) {
		return this._eventDispatcher.removeEventListener(type, listenerString, object);
	};
	TravelerSkeleton.prototype.dispatchEvent = function(event) {
		return this._eventDispatcher.dispatchEvent(event);
	};
	TravelerSkeleton.prototype.flock = function(withThese, separatePriority, alignPriority, cohesionPriority) {
		this.separate(withThese, separatePriority );
		this.align(withThese, alignPriority || 1);
		this.cohesion(withThese, cohesionPriority || 1);
	};
	TravelerSkeleton.prototype.align = function(withThese, priority) {
		this.getAlignmentForce(withThese);
		if (priority > 1)
		this.forceApplier.multiply(priority, 0);
	};
	TravelerSkeleton.prototype.cohesion = function(withThese, cohesionPriority) {
		this.getCohesionForce(withThese);
		if (cohesionPriority > 1)
		this.forceApplier.multiply(cohesionPriority, 0);
	};
	tabageos.TravelerSkeleton = TravelerSkeleton;
})();



