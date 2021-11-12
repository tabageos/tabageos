(function() { 
	
	
	function WeaponHoldingAttacker(x,y,width,height, map, ca,dontCloneMap,dt,tWidth,tHeight,mr,mc, mapOfOriginalTiles, controller, ladderTileValue, attackButtonOneKeyCode, attackButtonTwoKeyCode) {
		tabageos.TravelerSkeleton.call(this, x, y, width, height);
		tabageos.MapTraveler.call(this,x,y,width,height, map,ca,dontCloneMap, dt, tWidth,tHeight, mr, mc);
		tabageos.TravelingSceneryThrower.call(this, x,y, width, height, map, ca, dontCloneMap, dt, tWidth, tHeight, mr, mc);
		tabageos.BasicPlatformer.call(this, x,y, width, height, map, ca, dontCloneMap, dt, tWidth, tHeight, mr, mc, mapOfOriginalTiles, controller, ladderTileValue);
		this.width = width || 0;
		this.height = height || 0;
		this._middlePoint = new tabageos.MoverPoint();
		this._pos = new tabageos.MoverPoint(x,y);
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
		this._tH = tHeight || this.height;
		this._tW = tWidth || this.width;
		this._outAltered = new tabageos.MoverPoint();
		this.holdingRect = new tabageos.Rectangle(0,0,width,height);
		this.holdingOffsetX = 1;
		this.holdingOffsetY = 3;
		this._jumps = 1;
		this.easeProximity = 7;
		this._checkHelper = new tabageos.MoverPoint();
		this.forceApplier = new tabageos.MoverPoint();
		this.forceHolder = new tabageos.MoverPoint();
		this._w = width || 0;
		this._h = height || 0;
		this.wanderOffset = new tabageos.MoverPoint(0,0);
		this.blankMO = new tabageos.MoverPoint();
		this._eventDispatcher = new tabageos.EventDispatcher();
		this.holdings = [];
		this._holdingHelperRect = new tabageos.Rectangle(0,0,0,0);
		this.personalSpace = this.width * 9;
		this._hpt = new tabageos.MoverPoint();
		this._jumpSpeed = 10;
		this.throwStrength = 10;
		if(this._canvasAnimation) {
			this._canvasAnimation.addedAnimationChanges = this._addedToChangeDirectionAni;
			this._canvasAnimation._playerRef = this;
		}
		this._controllerRef = controller;
		this.tileMap = mapOfOriginalTiles;
		this.ladderValue = ladderTileValue;
		
		this._attackB = attackButtonOneKeyCode || 0;
		this._attackC = attackButtonTwoKeyCode || 0;
		if(this._attackB) {
			this._controllerRef.basicArrows.b = this._attackB;
			this._controllerRef.basicWasd.b = this._attackB;
		}
		if(this._attackC[0]) {
			this._comboC = 1;
			this._controllerRef.basicArrows.c = this._attackC[0];
			this._controllerRef.basicWasd.c = this._attackC[0];
		} else if(this._attackC) {
			this._controllerRef.basicArrows.c = this._attackC;
			this._controllerRef.basicWasd.c = this._attackC;
		}
	};
	
	
	WeaponHoldingAttacker.prototype.constructor = WeaponHoldingAttacker;
	WeaponHoldingAttacker.prototype = Object.create(tabageos.TravelerSkeleton.prototype);
	Object.assign(WeaponHoldingAttacker.prototype, tabageos.MapTraveler.prototype, tabageos.TravelingSceneryThrower.prototype, tabageos.BasicPlatformer.prototype);
	
	
	WeaponHoldingAttacker.prototype.crouchHeightOffset = 16;
	WeaponHoldingAttacker.prototype.crouchWidthOffset = 32;
	WeaponHoldingAttacker.prototype.attackWidthOffset = 32;
	WeaponHoldingAttacker.prototype.attackHeightOffset = 32;
	WeaponHoldingAttacker.prototype.attackTwoWidthOffset = 32;
	WeaponHoldingAttacker.prototype.attackTwoHeightOffset = 32;
	WeaponHoldingAttacker.prototype._alternate = 0;
	WeaponHoldingAttacker.prototype._controllerRef = null;
	WeaponHoldingAttacker.prototype._fwoHold = -9999;
	WeaponHoldingAttacker.prototype._fhoHold = -9999;
	WeaponHoldingAttacker.prototype._attackB = 0;
	WeaponHoldingAttacker.prototype._attackC = 0;
	WeaponHoldingAttacker.prototype._comboC = 0;
	WeaponHoldingAttacker.prototype.hurt = 0;
	WeaponHoldingAttacker.prototype.attackTwoName = "attack2";
	
	WeaponHoldingAttacker.prototype.atApexOfAttack = 0;
	WeaponHoldingAttacker.prototype._dashTime = 0;
	WeaponHoldingAttacker.prototype.dashSpeed = 10;
	WeaponHoldingAttacker.prototype._originalWalkSpeed = -7777;
	WeaponHoldingAttacker.prototype.totalDashTime = 500;
	
	WeaponHoldingAttacker.prototype.setupForTopDown = function() {
		this.crouchHeightOffset = 0;
		this.crouchWidthOffset = 0;
		if(this._canvasAnimation) {
			this._canvasAnimation.addedAnimationChanges = this._addedToChangeDirectionAniRpger;
		}
	};
	
	
	WeaponHoldingAttacker.prototype._addedToChangeDirectionAniRpger = function(left, right, up, down, keepAniIndex, noIdle) {
		
		var canidirec;var attal;
		var btns = this._playerRef._controllerRef.buttons;
		canidirec = (this.currentAnimation.indexOf("right") != -1 ? "right" : (this.currentAnimation.indexOf("left") != -1 ? "left" : (this.currentAnimation.indexOf("down") != -1 ? "down" : (this.currentAnimation.indexOf("up") != -1 ? "up" : "")   )) );
		
		if(this._playerRef._fwoHold >= 0) {
			this.fromHeightOffset = this._playerRef._fhoHold+1-1;
			this.fromWidthOffset = this._playerRef._fwoHold+1-1;
		}
		
		this.currentAnimation = this.currentAnimation.replace("idle","");
		
		if(btns.b && !left && !right && !up && this.currentAnimation.indexOf("attack") == -1 && this.currentAnimation != "climb") {
			
			this.currentAnimation = "attack"+canidirec;
			if(this._playerRef._fwoHold == -9999) {
				this._playerRef._fwoHold = this.fromWidthOffset+1-1;
			}
			if(this._playerRef._fhoHold == -9999) {
				this._playerRef._fhoHold = this.fromHeightOffset+1-1;
			}
			this.fromHeightOffset = this._playerRef.attackHeightOffset+1-1;
			this.fromWidthOffset = this._playerRef.attackWidthOffset+1-1;
			this._playerRef.atApexOfAttack = 0;
			
		} else {
			
			if(this.currentAnimation.indexOf("attack") != -1 && this.finishedCurrentAnimation()) {
				if( this._playerRef._fhoHold != -9999 ) {
					this.fromHeightOffset = this._playerRef._fhoHold+1-1;
					this.fromWidthOffset = this._playerRef._fwoHold+1-1;
				}
				this.currentAnimation = this.currentAnimation.replace("attack","");
				this._playerRef.atApexOfAttack = 0;
				this._playerRef._alternate = 0;
				
			} else if (btns.b && this.currentAnimation.indexOf("attack") != -1 && !this.finishedCurrentAnimation()) {
				this.fromHeightOffset = this._playerRef.attackHeightOffset+1-1;
				this.fromWidthOffset = this._playerRef.attackWidthOffset+1-1;
				
				if(this._playerRef._alternate == 0) {
					attal = this.animationSpecs[this.currentAnimation][1].length;
					
					if(this.ani > (attal/4) + 2) { this.ani = attal/4; this._playerRef.atApexOfAttack = 1; }
					if (this.ani < attal/4) { this.ani++; }
					
					this._playerRef._alternate = 1;
				} else {
					
					attal = this.animationSpecs[this.currentAnimation][1].length;
					if(this.ani > (attal/4) + 2) { this._playerRef.atApexOfAttack = 1; }
					
				}
			} else if (!btns.b && this.currentAnimation.indexOf("attack") != -1 && !this.finishedCurrentAnimation()) {
				this.fromHeightOffset = this._playerRef.attackHeightOffset+1-1;
				this.fromWidthOffset = this._playerRef.attackWidthOffset+1-1;
				if(this._playerRef._alternate == 1) {
					this._playerRef._alternate = 0;
				} else {
					
					attal = this.animationSpecs[this.currentAnimation][1].length;
					if(this.ani > (attal/4) + 2) { this._playerRef.atApexOfAttack = 1; }
					
				}
				
			}
			
		}
		
		if(!this._playerRef._comboC && btns.c && this.currentAnimation.indexOf(this._playerRef.attackTwoName) == -1 && this.currentAnimation != "climb") {
			
			
			this.currentAnimation = this._playerRef.attackTwoName+canidirec;
			if(this._playerRef._fwoHold == -9999) {
				this._playerRef._fwoHold = this.fromWidthOffset+1-1;
			}
			if(this._playerRef._fhoHold == -9999) {
				this._playerRef._fhoHold = this.fromHeightOffset+1-1;
			}
			this.fromHeightOffset = this._playerRef.attackTwoHeightOffset+1-1;
			this.fromWidthOffset = this._playerRef.attackTwoWidthOffset+1-1;
			
		} else {
			
			if(!btns.c && this.currentAnimation.indexOf(this._playerRef.attackTwoName) != -1) {
				
				this.currentAnimation = this.currentAnimation.replace(this._playerRef.attackTwoName, "");
				if(this._playerRef._fwoHold >= 0) {
					this.fromHeightOffset = this._playerRef._fhoHold+1-1;
					this.fromWidthOffset = this._playerRef._fwoHold+1-1;
				}
				
			}
			
			
			
		}
		
		
		
		if(this.currentAnimation.indexOf(this._playerRef.attackTwoName) == -1 && this.currentAnimation.indexOf("attack") == -1 && !btns.left && !btns.right && !btns.up && !btns.down && !left && !up && !right && !down) {
			
			
			this.currentAnimation = this.currentAnimation + "idle";
			if(this._playerRef._fwoHold >= 0) {
				this.fromHeightOffset = this._playerRef._fhoHold+1-1;
				this.fromWidthOffset = this._playerRef._fwoHold+1-1;
			}
		}
		
		
		//window.console.log(this.currentAnimation  + "  " + this._playerRef._fwoHold + "  " + this.fromHeightOffset);
		
	};
	
	
	
	
	
	
	
	WeaponHoldingAttacker.prototype._addedToChangeDirectionAni = function(left, right, up, down, keepAniIndex, noIdle) {
		
		
		
		
		
		var canidirec;var attal;
		var btns = this._playerRef._controllerRef.buttons;
		canidirec = (this.currentAnimation.indexOf("right") != -1 ? "right" : (this.currentAnimation.indexOf("left") != -1 ? "left" : (this._playerRef._lastVeloc.x > 0 ? "right" : "left")) );
		
		if(btns.down && (btns.right || btns.left)) {
			
			if(this.currentAnimation.indexOf("duck") != -1) {
				this.currentAnimation = this.currentAnimation.replace("duck","");
			}
			if(this._playerRef._fwoHold > 0) {
				this.fromHeightOffset = this._playerRef._fhoHold+1-1;
				this.fromWidthOffset = this._playerRef._fwoHold+1-1;
			}
		}
		
		if(btns.down && !btns.left && !left && !right && !btns.right && !up && this._playerRef.onLadder == 0) {
			
			this.currentAnimation = "duck"+canidirec;
			if(this._playerRef._fwoHold == -9999) {
				this._playerRef._fwoHold = this.fromWidthOffset+1-1;
			}
			if(this._playerRef._fhoHold == -9999) {
				this._playerRef._fhoHold = this.fromHeightOffset+1-1;
			}
			this.fromHeightOffset = this._playerRef.crouchHeightOffset+1-1;
			this.fromWidthOffset = this._playerRef.crouchWidthOffset+1-1;
			
		} else {
			
			if(this.currentAnimation.indexOf("duck") != -1) {
				this.fromHeightOffset = this._playerRef._fhoHold+1-1;
				this.fromWidthOffset = this._playerRef._fwoHold+1-1;
				this.currentAnimation = this.currentAnimation.replace("duck","");
			}
		}
		
		if(this.currentAnimation.indexOf("duck") == -1) {
			
			if(this.fromWidthOffset == this._playerRef.crouchWidthOffset && this.fromHeightOffset == this._playerRef.crouchHeightOffset) {
				
				this.fromWidthOffset = this._playerRef._fwoHold+1-1;
				this.fromHeightOffset = this._playerRef._fhoHold+1-1;
				
			}
		}
		
		if(btns.b && !left && !right && !up && this.currentAnimation.indexOf("attack") == -1 && this.currentAnimation != "climb") {
			
			this.currentAnimation = "attack"+canidirec;
			if(this._playerRef._fwoHold == -9999) {
				this._playerRef._fwoHold = this.fromWidthOffset+1-1;
			}
			if(this._playerRef._fhoHold == -9999) {
				this._playerRef._fhoHold = this.fromHeightOffset+1-1;
			}
			this.fromHeightOffset = this._playerRef.attackHeightOffset+1-1;
			this.fromWidthOffset = this._playerRef.attackWidthOffset+1-1;
			this._playerRef.atApexOfAttack = 0;
			
		} else {
			
			if(this.currentAnimation.indexOf("attack") != -1 && this.finishedCurrentAnimation()) {
				this.fromHeightOffset = this._playerRef._fhoHold+1-1;
				this.fromWidthOffset = this._playerRef._fwoHold+1-1;
				this.currentAnimation = this.currentAnimation.replace("attack","");
				this._playerRef.atApexOfAttack = 0;
				this._playerRef._alternate = 0;
				
			} else if (btns.b && this.currentAnimation.indexOf("attack") != -1 && !this.finishedCurrentAnimation()) {
				
				
				if(this._playerRef._alternate == 0) {
					attal = this.animationSpecs[this.currentAnimation][1].length;
					
					if(this.ani > (attal/4) + 2) { this.ani = attal/4; this._playerRef.atApexOfAttack = 1; }
					if (this.ani < attal/4) { this.ani++; }
					
					
					
					this._playerRef._alternate = 1;
				} else {
					
					attal = this.animationSpecs[this.currentAnimation][1].length;
					
					if(this.ani > (attal/4) + 2) { this._playerRef.atApexOfAttack = 1; }
					
					
				}
			} else if (!btns.b && this.currentAnimation.indexOf("attack") != -1 && !this.finishedCurrentAnimation()) {
				if(this._playerRef._alternate == 1) {
					this._playerRef._alternate = 0;
				} else {
					
					attal = this.animationSpecs[this.currentAnimation][1].length;
					if(this.ani > (attal/4) + 2) { this._playerRef.atApexOfAttack = 1; }
					
				}
				
			}
			
		}
		
		if(!this._playerRef._comboC && btns.c && this.currentAnimation.indexOf(this._playerRef.attackTwoName) == -1 && this.currentAnimation != "climb") {
			
			
			this.currentAnimation = this._playerRef.attackTwoName+canidirec;
			if(this._playerRef._fwoHold == -9999) {
				this._playerRef._fwoHold = this.fromWidthOffset+1-1;
			}
			if(this._playerRef._fhoHold == -9999) {
				this._playerRef._fhoHold = this.fromHeightOffset+1-1;
			}
			this.fromHeightOffset = this._playerRef.attackTwoHeightOffset+1-1;
			this.fromWidthOffset = this._playerRef.attackTwoWidthOffset+1-1;
			
		}
		
		if(btns.c && this._playerRef._dashTime <= this._playerRef.totalDashTime && this.currentAnimation.indexOf("dash") != -1) {
			
			if(this._playerRef._originalWalkSpeed == -7777) {
				this._playerRef._originalWalkSpeed = this._playerRef._walkSpeed +1-1;
			}
			this._playerRef._walkSpeed = this._playerRef.dashSpeed+1-1;
			this._playerRef._dashTime += 33.3;
			
			
			
		}
		if(this._playerRef._dashTime > this._playerRef.totalDashTime && this.currentAnimation.indexOf("dash") != -1  || (!btns.c && this.currentAnimation.indexOf("dash") != -1) ) {
			if(!btns.c) {
				
				this._playerRef._dashTime = 0;
			}
			
			this._playerRef._walkSpeed = this._playerRef._originalWalkSpeed;
			this.currentAnimation = this.currentAnimation.replace("dash", "");
		}
		if(this.currentAnimation.indexOf("dash") == -1 && this._playerRef._dashTime > 0) {
			
			if(!btns.c) {
				
				this._playerRef._dashTime = 0;
			}
			if(this._playerRef._originalWalkSpeed == -7777) {
				this._playerRef._originalWalkSpeed = this._playerRef._walkSpeed +1-1;
			}
			this._playerRef._walkSpeed = this._playerRef._originalWalkSpeed+1-1;
			
		}
		
		
		
		
		if(this._playerRef.ladderValue) {
			
			this._playerRef.getValuesOfCloseTiles();
			var qpr = this._playerRef;
			if(!up && !left && !right && qpr.valuesMatch(qpr.tileDown, qpr.ladderValue) && !qpr.valuesMatch(qpr.tileUp, qpr.ladderValue)) {
				this._playerRef._veloc.y = 0;
				this._playerRef._grounded = 1;this._playerRef._state = 1;
			}
			if(btns.up && (qpr.valuesMatch(qpr.tileUp, qpr.ladderValue) ||  qpr.valuesMatch(qpr.tile, qpr.ladderValue) ||  qpr.valuesMatch(qpr.tileDown, qpr.ladderValue)) ) {
				this._playerRef._veloc.y = 0;
				this._playerRef._pos.y -= 1;
				this._playerRef.y -= 1;
				this._playerRef.onLadder = 1;
				if(this.animationSpecs.climb) { 
					this.currentAnimation = "climb";
				}
			} else if( (btns.down) && qpr.valuesMatch(qpr.tileDown, qpr.ladderValue) ) {
				this._playerRef._veloc.y = 0;
				this._playerRef._pos.y += 1;
				this._playerRef.y += 1;
				this._playerRef.onLadder = 1;
				if(this.animationSpecs.climb) {
					this.currentAnimation = "climb";
				}
			} else {
				this._playerRef.onLadder = 0;
			}
			
		}
		
	};
	
	tabageos.WeaponHoldingAttacker = WeaponHoldingAttacker;
})();

