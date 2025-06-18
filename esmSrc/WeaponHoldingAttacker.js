import { MoverPoint } from './MoverPoint.js';
import { Rectangle } from './Rectangle.js';
import { Event } from './Event.js';
import { EventDispatcher } from './EventDispatcher.js';
import { TimeKeeper } from './TimeKeeper.js';
import { TravelerSkeleton } from './TravelerSkeleton.js';
import { BoundMethods } from './BoundMethods.js';
import { BlitMath } from './BlitMath.js';
import { MapTraveler} from './MapTraveler.js';
import { SceneryObject } from './SceneryObject.js';
import { SceneryObjectTraveler } from './SceneryObjectTraveler.js';
import { TravelingSceneryThrower } from './TravelingSceneryThrower.js';

'use strict';

	
	function WeaponHoldingAttacker(x,y,width,height, map, ca,dontCloneMap,dt,tWidth,tHeight,mr,mc, mapOfOriginalTiles, controller, ladderTileValue, attackButtonOneKeyCode, attackButtonTwoKeyCode) {


		//TravelerSkeleton.call(this, x, y, width, height);
		//MapTraveler.call(this,x,y,width,height, map,ca,dontCloneMap, dt, tWidth,tHeight, mr, mc);
		TravelingSceneryThrower.call(this, x,y, width, height, map, ca, dontCloneMap, dt, tWidth, tHeight, mr, mc);

		//this.init(x,y, width, height, map, ca, dontCloneMap, dt, tWidth, tHeight, mr, mc);

		this.width = width || 0;
			this.height = height || 0;
			this._middlePoint = new MoverPoint();
			this._pos = new MoverPoint(x,y);
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
			this._tH = tHeight || this.height;
			this._tW = tWidth || this.width;
			this._outAltered = new MoverPoint();
			this.holdingRect = new Rectangle(0,0,width,height);
			this.holdingOffsetX = 1;
			this.holdingOffsetY = 3;
			this._jumps = 1;
			this.easeProximity = 7;
			this._checkHelper = new MoverPoint();
			this.forceApplier = new MoverPoint();
			this.forceHolder = new MoverPoint();
			this._w = width || 0;
			this._h = height || 0;
			this.wanderOffset = new MoverPoint(0,0);
			this.blankMO = new MoverPoint();
			this._eventDispatcher = new EventDispatcher();
			this.holdings = [];
			this._holdingHelperRect = new Rectangle(0,0,0,0);
			this.personalSpace = this.width * 9;
			this._hpt = new MoverPoint();
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
			
			if(this._attackC) { 
				this._controllerRef.basicArrows.c = this._attackC;
				this._controllerRef.basicWasd.c = this._attackC;
			}
	};
	
	
	WeaponHoldingAttacker.prototype.constructor = WeaponHoldingAttacker;
	WeaponHoldingAttacker.prototype = Object.create(TravelerSkeleton.prototype);
	Object.assign(WeaponHoldingAttacker.prototype,  MapTraveler.prototype, TravelingSceneryThrower.prototype);



	WeaponHoldingAttacker.prototype.onLadder = 0;
	WeaponHoldingAttacker.prototype.onMovingPlatform = 0;
	WeaponHoldingAttacker.prototype.ladderValue = 0;
	
	WeaponHoldingAttacker.prototype.tileMap = null;
	
	WeaponHoldingAttacker.prototype.tile = null;
	WeaponHoldingAttacker.prototype.tilelUp = null;
	WeaponHoldingAttacker.prototype.tileDown = null;
	WeaponHoldingAttacker.prototype.tileLeft = null;
	WeaponHoldingAttacker.prototype.tileRight = null;
	WeaponHoldingAttacker.prototype._hlpp = null;
	
	WeaponHoldingAttacker.prototype.getValuesOfCloseTiles = function(map) {
		
		var fpx = Math.floor(this.x);
        	var fpy = Math.floor(this.y);
		
        	this.tile = BlitMath.checkTileValueAt(fpx,fpy,map||this.tileMap,this._tW,this._tH);
        	this.tileUp = BlitMath.checkTileValueAt(fpx,fpy-this._tH,map||this.tileMap,this._tW,this._tH);
        	this.tileDown = BlitMath.checkTileValueAt(fpx,fpy+this._tH,map||this.tileMap,this._tW,this._tH);
        	this.tileLeft = BlitMath.checkTileValueAt(fpx-this._tW,fpy,map||this.tileMap,this._tW,this._tH);
        	this.tileRight = BlitMath.checkTileValueAt(fpx+this._tW,fpy,map||this.tileMap,this._tW,this._tH);
		
	};
	
	WeaponHoldingAttacker.prototype.valuesMatch = function(val1, val2) {
		var r = false;
		if(val1[0] || val1[0] === 0) {
			var i = 0; var l = val1.length;
			for(i; i < l;i++) {
				if(val1[i] != val2[i]) {
					r = false; break;
				} else { r = true; }
			}
		} else {
			if(val1 == val2) { r = true; }
		}
		return r;
	};
	
	
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
			
		} else {
			
			if(this.currentAnimation.indexOf(this._playerRef.attackTwoName) != -1 && this.ani >= (this.animationSpecs[this._playerRef.attackTwoName+canidirec][1].length-3) ) {
				this.fromHeightOffset = this._playerRef._fhoHold+1-1;
				this.fromWidthOffset = this._playerRef._fwoHold+1-1;
				this.currentAnimation = this.currentAnimation.replace(this._playerRef.attackTwoName,"");
				this._playerRef.atApexOfAttack = 0;
				this._playerRef._alternate = 0;
				
			}
			
			
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
	
	export { WeaponHoldingAttacker   };


