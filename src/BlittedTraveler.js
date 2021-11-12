(function() { 

	'use strict';

	function BlittedTraveler(source, canvasObject, fromRect, x, y, width, height, dt) {
		tabageos.TravelerSkeleton.call(this,x,y,width,height);
		tabageos.Traveler.call(this,x,y,width,height);
		if (source || canvasObject) {
			this.init(source, canvasObject, fromRect, x, y, width, height);
		}
		this.health = 100;
		this._deltaTime = dt || tabageos.TimeKeeper._sae;
	};
	BlittedTraveler.prototype.constructor = BlittedTraveler;
	BlittedTraveler.prototype = Object.create(tabageos.TravelerSkeleton.prototype);
	Object.assign(BlittedTraveler.prototype, tabageos.Traveler.prototype);
	BlittedTraveler.prototype.init = function(source, canvasObject, fromRect, x, y, width, height) {
		this._source = source;
		this._canvas = canvasObject;
		this.toPoint = new tabageos.MoverPoint();
		this.fromRect = fromRect || new tabageos.Rectangle(0,0,32,32);
		this.x = x || 0;
		this.y = y || 0;
		this.height = height || 0;
		this.width = width || 0;
		this.travelType = null;
		this.blankRect = new tabageos.Rectangle();
		this.boundingMethod = tabageos.BoundMethods.bounceOff;
		this.mass = 10;
		this.avoidSpace = 35;
		this.maxSpeed = 14;
		this.maxForce = 25;
		this.personalSpace = 20;
		this.visionDistance = 20;
		this.circleDistance = 20;
		this.spreadDistance = 20;
		this.separationDistance = 20;
		this.bypassAvoidDistance = null;
		this.followDistance = 20;
		this.easeProximity = 20;
		this.wanderProximity = 20;
		this.wanderAngle = 30;
		this.wanderRadius = 20;
		this.wanderRange = 20;
		this.avoidDistance = 20;
		this.health = 100;
		this.fromWidthOffset = 0;
		this.fromHeightOffset = 0;
		this._blitType = 0;
	};
	BlittedTraveler.prototype.fromRect = null;
	BlittedTraveler.prototype.fromWidthOffset = 0;
	BlittedTraveler.prototype.fromHeightOffset = 0;
	BlittedTraveler.prototype.alphaPoint = null;
	BlittedTraveler.prototype.fillColor = null;
	BlittedTraveler.prototype.mergeAlpha = null;
	BlittedTraveler.prototype.toPoint = null;
	BlittedTraveler.prototype.blankRect = null;
	BlittedTraveler.prototype.alphaBitmapData = null;
	BlittedTraveler.prototype.travelType = null;
	BlittedTraveler.prototype.boundingMethod = null;
	BlittedTraveler.prototype.personalSpace = 20;
	BlittedTraveler.prototype.visionDistance = 20;
	BlittedTraveler.prototype.circleDistance = 20;
	BlittedTraveler.prototype.spreadDistance = 20;
	BlittedTraveler.prototype.separationDistance = 20;
	BlittedTraveler.prototype.bypassAvoidDistance = null;
	BlittedTraveler.prototype.maxForce = 20;
	BlittedTraveler.prototype.forceApplier = null;
	BlittedTraveler.prototype.followDistance = 20;
	BlittedTraveler.prototype.easeProximity = 20;
	BlittedTraveler.prototype.wanderProximity = 20;
	BlittedTraveler.prototype.wanderAngle = 30;
	BlittedTraveler.prototype.wanderRadius = 20;
	BlittedTraveler.prototype.wanderRange = 20;
	BlittedTraveler.prototype.wanderOffset = null;
	BlittedTraveler.prototype.avoidDistance = 20;
	BlittedTraveler.prototype.health = 100;
	BlittedTraveler.prototype.avoidSpace = 20;
	BlittedTraveler.prototype.mass = 5;
	BlittedTraveler.prototype.maxSpeed = 20;
	BlittedTraveler.prototype._source = null;
	BlittedTraveler.prototype._canvas = null;
	BlittedTraveler.prototype._blitType = null;
	BlittedTraveler.prototype._destination = null;
	BlittedTraveler.prototype._wallObject = null;
	BlittedTraveler.prototype._deltaTime = null;
	BlittedTraveler.prototype.getDestination = function() {
		return this._destination;
	};
	BlittedTraveler.prototype.setDestination = function(toThis) {
		this._destination = toThis;
	};
	BlittedTraveler.prototype.getSource = function() {
		return this._source;
	};
	BlittedTraveler.prototype.setSource = function(toThis) {
		this._source = toThis;
	};
	BlittedTraveler.prototype.getBlitType = function() {
		var s = tabageos.BlittedTraveler.JUST_COPY;
		if (this._blitType == 1)
		s = tabageos.BlittedTraveler.FILL_RECT_THEN_COPY;
		if (this._blitType == 2)
		s = tabageos.BlittedTraveler.COPY_THEN_COPY;
		return s;
	};
	BlittedTraveler.JUST_COPY = "justCopy";
	BlittedTraveler.FILL_RECT_THEN_COPY = "fillRectTheCopy";
	BlittedTraveler.COPY_THEN_COPY = "copyThenCopy";
	BlittedTraveler.prototype.setBlitType = function(toThis) {
		if (toThis == tabageos.BlittedTraveler.JUST_COPY)
		this._blitType = 0;
		if (toThis == tabageos.BlittedTraveler.FILL_RECT_THEN_COPY)
		this._blitType = 1;
		if (toThis == tabageos.BlittedTraveler.COPY_THEN_COPY) {
			if (!this.blankRect.width || !this.blankRect.height) {
				throw new Error("blankRect has no width or height, please set blankRect for copy_then_copy style blitting");
			}
			this._blitType = 2;
		}
	};
	BlittedTraveler.prototype.getCanvas = function() {
		return this._canvas || null;
	};
	BlittedTraveler.prototype.setCanvas = function(toThis) {
		this._canvas = toThis;
	};
	BlittedTraveler.prototype.getWallObject = function() {
		return this._wallObject;
	};
	BlittedTraveler.prototype.setWallObject = function(toThis) {
		this._wallObject = toThis;
	};
	BlittedTraveler.prototype.update = function() {
		
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
		this._autoAnimation();
	};
	BlittedTraveler.prototype.move = function() {
		
		this.forceApplier.truncate(this.maxForce);
		this.forceApplier.divide(this.mass, 0);
		this._veloc.add(this.forceApplier.multiply(this._deltaTime,0), 0);
		this.forceApplier.reset();
		this._veloc._length = 0;
		this._veloc._angle = 0;
		this._veloc.truncate(this.maxSpeed);
		this._pos.addBy(this._veloc.x * this._deltaTime, this._veloc.y * this._deltaTime, 0);
		if (this._wallObject) { 
			this.boundingMethod(this, this._wallObject);
		} 
		
		this.x = this._pos.x+1-1;
		this.y = this._pos.y+1-1;
		this._autoAnimation();
	};
	BlittedTraveler.prototype._autoAnimation = function() {

		if(this._autoAnimate && this._source && this.currentAnimation.length >= 1) {

			this.changeDirectionAnimation(this._veloc.x < 0,this._lastVeloc.x > 0, this._veloc.y < 0, this._veloc.y > 0);
			
			this.animate();
			this.blit();
			
		} else if(this._autoAnimate) {

			this._canvas.context.fillRect(this.x,this.y,this.width,this.height);
			
		}

	};
	BlittedTraveler.prototype.travel = function() {
		if (this.travelType != null)
		this.travelType(this._destination);
		this.move();
		if(!this._autoAnimate) this.blit();
	};
	BlittedTraveler.prototype.checkFutureWayIsClear = function(wd) {
		var futurePosition = this._pos.add(this._veloc.clone().truncate(this.maxSpeed));
		return wd.wayIsClear(futurePosition.x, futurePosition.y);
	};
	BlittedTraveler.prototype.checkCurrentWayIsClear = function(wd) {
		return wd.wayIsClear(this.x, this.y);
	};
	BlittedTraveler.prototype.checkPastWayIsClear = function(wd) {
		var pastPosition = this._pos.subtract(this._veloc.clone().truncate(this.maxSpeed));
		return wd.wayIsClear(pastPosition.x, pastPosition.y);
	};
	BlittedTraveler.prototype.blit = function(r, p, igf) {
		if (r)
		this.fromRect = r;
		if (p) {
			this.toPoint = p;
		} else if (!igf) {
			this.toPoint.x = this.x - (this.fromWidthOffset != 0 ? this.fromWidthOffset/2 : 0);
			this.toPoint.y = this.y - this.fromHeightOffset;
		} else if(igf) {
			this.toPoint.x = this.x;
			this.toPoint.y = this.y;
		}
		if (this._blitType == 1)
		this._canvas.fillRect(this.fromRect, this.fillColor);
		if (this._blitType == 2)
		this._canvas.copyPixels(this._source, this.blankRect, this.toPoint);
		this._canvas.copyPixels(this._source, this.fromRect, this.toPoint, this.fromRect.width, this.fromRect.height);
	};
	
	BlittedTraveler.prototype.currentAnimation = "";
	BlittedTraveler.prototype.animationSpecs = {
left: [4, [1, 2, 3, 4, 5, 6, 7]]
	};
	BlittedTraveler.prototype.animationIndexOrder;
	BlittedTraveler.prototype.ani = 0;
	BlittedTraveler.prototype.blitIndex;
	BlittedTraveler.prototype.fromXOffset = 0;
	BlittedTraveler.prototype.fromYOffset = 0;
	BlittedTraveler.prototype.lastAnim = "";
	BlittedTraveler.prototype.toPoint;
	BlittedTraveler.prototype.onlyHorizontalAnimations = 0;
	BlittedTraveler._onlyHorizontalAni = 0;
	BlittedTraveler.prototype.addedAnimationChanges = null;
	BlittedTraveler.prototype._cpos;
	BlittedTraveler.prototype._addedPos;
	BlittedTraveler.prototype._playerRef = null;
	BlittedTraveler.prototype._inDelay = 0;
	BlittedTraveler.prototype._autoAnimate = 0;
	BlittedTraveler.prototype.defineAnimation = function(animationName, arrayOfXYIndexValues, yIndex) {
		
		this.animationSpecs[animationName] = [yIndex || 1, arrayOfXYIndexValues];  
		
	};
	BlittedTraveler.prototype.getPosition = function() {
		return this._pos;
	};
	BlittedTraveler.prototype.getCAPosition = function(addedX, addedY) {
		if (!this._cpos || !this._addedPos) {
			this._cpos = new tabageos.MoverPoint();
			this._addedPos = new tabageos.MoverPoint();
		}
		this._cpos.x = this.x;
		this._cpos.y = this.y;
		if (addedX || addedY) {
			this._addedPos.x = this.x + (addedX || 0);
			this._addedPos.y = this.y + (addedY || 0)
		}
		return ((addedX || addedY) ? this._addedPos : this._cpos);
	};
	BlittedTraveler.prototype.changeLeftRightUpDownAnimation = function(left,right,up,down, dontKeepAniIndex) {
		
		if(!up && !down && !left && !right && this.lastAnim) {
			this.currentAnimation = this.lastAnim;
		} else {
			this.currentAnimation = up ? "up" : (down ? "down" : (left ? "left" : "right"));
		}
		if (!dontKeepAniIndex) {
			this.lastAnim = this.currentAnimation;
		}
		
	};
	BlittedTraveler.prototype.changeFaceAnimation = function(toFace, keepAniIndex) {
		
		if (this.y >= toFace.y + toFace.height ) {
			this.currentAnimation = "up";
		}
		if (this.y + this.height < toFace.y  ) {
			this.currentAnimation = "down";
		}
		if (this.x > toFace.x + toFace.width) {
			this.currentAnimation = "left";
		}
		if (this.x + this.width < toFace.x ) {
			this.currentAnimation = "right";
		}
		if (keepAniIndex) {
			this.lastAnim = this.currentAnimation;
		}
		
	};
	
	BlittedTraveler.prototype.getDirectionOfAnimation = function(currentAni, onlyLeftRight, onlyUpDown) {
		
		var r = "";
		if(!onlyUpDown) {
			if(currentAni.indexOf("left") != -1) r = "left";
			if(currentAni.indexOf("right") != -1) r = "right";
		}
		if(!onlyLeftRight) {
			if(currentAni.indexOf("up") != -1) r = "up";
			if(currentAni.indexOf("down") != -1) r = "down";
		}
		return r;
		
	};
	
	BlittedTraveler.prototype.changeDirectionAnimation = function(left, right, up, down, keepAniIndex, noIdle) {
		var helda = this.currentAnimation + "";
		this.currentAnimation = (up ? "up" : (down ? "down" : "")) + (left ? "left" : (right ? "right" : (((up || down) && this.lastAnim.match("left")) ? "left" : (((up || down) && this.lastAnim.match("right")) ? "right" : ""))));
		if (this.currentAnimation.length <= 0) {
			this.currentAnimation = this.lastAnim.replace("idle", "").replace("down", "").replace("up", "") + (noIdle ? "" : "idle");
		}
		if (this.currentAnimation.length <= 0) {
			this.currentAnimation = helda;
		}
		if (keepAniIndex) {
			this.lastAnim = this.currentAnimation;
		}

		if(this.addedAnimationChanges && this._playerRef) {
			
			this.addedAnimationChanges(left, right, up, down, keepAniIndex, noIdle);
		}

	};
	BlittedTraveler.prototype.animate = function(thrott) {
		this.blitIndex = this.animationSpecs[this.currentAnimation] ? this.animationSpecs[this.currentAnimation][0] : this.blitIndex;
		this.animationIndexOrder = this.animationSpecs[this.currentAnimation] ? this.animationSpecs[this.currentAnimation][1] : this.animationIndexOrder;
		if (this.ani >= this.animationIndexOrder.length - 1) {
			this.ani = 0;
		} else {
			this.ani += (thrott || (this.onlyHorizontalAnimations === 0 ? 2 : 1) );
		}
		if (this.currentAnimation != this.lastAnim || (this.onlyHorizontalAnimations === 0 && this.ani > this.animationIndexOrder.length - 2) ) {
			this.ani = 0;
		}
		this.lastAnim = this.currentAnimation;
		var ain = Math.floor(this.ani); if(ain % 2 != 0) { ain = ain -1; }
		var aival = this.animationIndexOrder[ain];
		if(this.onlyHorizontalAnimations === 0) { 
			
			this.fromRect.x = this.animationIndexOrder[ain] * (this.width + this.fromXOffset);
			this.fromRect.y = this.animationIndexOrder[ain+1] * (this.height + this.fromYOffset);
			
		} else {
			this.fromRect.x = this.animationIndexOrder[ain] * (this.width + this.fromXOffset);
			this.fromRect.y = this.blitIndex * (this.height + this.fromYOffset);
		}
		this.fromRect.width = this.width + this.fromWidthOffset;
		this.fromRect.height = this.height + this.fromHeightOffset;
	};
	BlittedTraveler.prototype.finishedCurrentAnimation = function() {
		if(!this.animationSpecs[this.currentAnimation]) {
			return false; 
		} else {
			return (this.ani >= this.animationSpecs[this.currentAnimation][1].length - 1);
		}
	};
	BlittedTraveler.prototype._throttRef;
	BlittedTraveler.prototype._cBB;
	BlittedTraveler.prototype.delayedAnimateAndBlit = function(thrott, milliSecondDelay, animation,clearBeforeBlitt) {
		this._inDelay = 1;
		if(animation) {
			this.currentAnimation = animation;
		}
		this._throttRef = thrott || 0;
		this._cBB = clearBeforeBlitt || 0;
		var ref = this;
		window.setTimeout(function(e) { ref._delayedFunction(); }, milliSecondDelay);
	};
	BlittedTraveler.prototype._delayedFunction = function(e) {
		if(this._inDelay) {
			this.animate(this._throttRef);
			if(this._cBB) {
				this._canvas.context.clearRect(this.x,this.y,this.width,this.height);
			}
			this.blit();
			this._inDelay = 0;
		}
	};
	BlittedTraveler.prototype.basicDepthSort = function(bt, topCanvas, bottomCanvas, sortRadius, offset) {
		var sorted = false;
		if (tabageos.GeometricMath.testForPointInCircle(this._pos, sortRadius, bt._pos)) {
			if (this.y > bt.y + offset) {
				this._canvas = topCanvas;
				bt._canvas = bottomCanvas;
			} else {
				this._canvas = bottomCanvas;
				bt._canvas = topCanvas;
			}
			sorted = true;
		}
		return sorted;
	};
	tabageos.BlittedTraveler = BlittedTraveler;
})();


