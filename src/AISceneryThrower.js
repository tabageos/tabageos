(function() { 
	
	function AISceneryThrower(x,y,width,height, map, ca,dontCloneMap,dt,tWidth,tHeight,mr,mc) {
		tabageos.TravelerSkeleton.call(this, x, y, width, height);
		tabageos.MapTraveler.call(this,x,y,width,height, map,ca,dontCloneMap, dt, tWidth,tHeight, mr, mc);
		tabageos.TravelingSceneryThrower.call(this, x,y, width, height, map, ca, dontCloneMap, dt, tWidth, tHeight, mr, mc);
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
	};
	AISceneryThrower.prototype.constructor = AISceneryThrower;
	AISceneryThrower.prototype = Object.create(tabageos.TravelerSkeleton.prototype);
	Object.assign(AISceneryThrower.prototype, tabageos.MapTraveler.prototype, tabageos.TravelingSceneryThrower.prototype);
	AISceneryThrower.prototype.backUp = 300;
	AISceneryThrower.prototype.watchingThrow = 750;
	AISceneryThrower.prototype.afterAttackDelay = 750;
	AISceneryThrower.prototype._hpt = null;
	AISceneryThrower.prototype._target = null;
	AISceneryThrower.prototype.setTarget = function(t) {
		this._target = t;
	};
	AISceneryThrower.prototype.pickUpMethodToUse = 0;
	
	AISceneryThrower.prototype.smarts = function(level, tw, th) {
		
		var facing = ((this.x < this._target._pos.x && this._leftRightFace === 1) || (this.x > this._target._pos.x + (tw||16) && this._leftRightFace === 0) );
		
		if(!level || level <= 1) {
			this.personalSpace = this.width * 9;
			this.throwStrength = 10;
			return ( this.almostCloseTo(this._target._pos) &&  facing );
			
		}
		if(level && level == 2) {
			
			this.personalSpace = this.width * 4;
			this.throwStrength = 5;
			return ( this.almostCloseTo(this._target._pos) &&  facing );
		}
		if(level && level == 3) {
			
			this.personalSpace = this.width * 2;
			this.throwStrength = 3;
			return ( this.almostCloseTo(this._target._pos) &&  facing );
		}
	};
	
	
	AISceneryThrower.prototype.thinkAboutWhatToDo = function(sceneryArray, sceneryMap, sceneryCheck, sceneryRemoval, tw, th, smartness, tileCheck) {
		var td = tabageos.BlitMath.checkTileValueAt(Math.floor(this.x) , Math.floor(this.y) + (this.height/2), sceneryMap, tw || 16 , th || 16, this._hpt);
		
		if (!this.holding && this.watchingThrow >= this.afterAttackDelay) {
			if (!sceneryCheck(td)) { 
				var closeSceneryX = 0;
				var i = 0;var obj;
				for (i; i < sceneryArray.length; i++) {
					obj = sceneryArray[i]; closeSceneryX = obj.x+1-1;
					if(obj._grounded && tabageos.GeometricMath.testForPointInCircle(this._pos, 360, obj._pos) && obj.y >= this.y - (this.height/2)) {	
						closeSceneryX = obj.x+1-1; break;
					} 
				}
				
				if (closeSceneryX) {  
					var canr = this._leftRightFace === 1;
					
					
					var directioner = closeSceneryX > this.x && !this.pRight ? 0 : (closeSceneryX < this.x && !this.pLeft ? 1 : 0);
					
					this.walkOrJump(directioner, tw, th, closeSceneryX, tileCheck);  
					
					if(this.x >= (closeSceneryX - (tw ? tw : 16)) && this.x <= closeSceneryX + (tw || 16) && Math.abs(obj.y - this.y) <= (th||16)*2 ) {
						if(this.pickUpMethodToUse == 1) {
							this.pickUpAndStore(obj);
						} else {
							this.pickUp(obj);
						}
						sceneryArray.splice(sceneryArray.indexOf(obj),1);
					} else {
						//this.walkOrJump(directioner, tw, th, closeSceneryX, tileCheck);
						
					}
					
				} else {
					if(this._pRight) { 
						this.dX = this._pLeft ? 0 : 1;
					} else if (this._pLeft) {
						this.dX = 0;
					}
					
					this.walkOrJump(this.dX, tw, th,0,tileCheck);
				}
			} else {
				var mtd = tabageos.TileData.make(this._hpt.x * (tw||16) , this._hpt.y * (th||16) , td);
				this.pickUpTileData(mtd); 
				if(sceneryRemoval) sceneryRemoval(mtd);
			}
		} else {
			
			
			var dd = this._target.x < this.x ? 1 : 0;
			
			
			this.walkJumpOrAttack(dd, tw, th, sceneryArray, smartness || 1,tileCheck);
		}
		
	};
	AISceneryThrower.prototype.walkOrJump = function(direc, tw, th, closeSceneryX, tileCheck) { 
		
		var td = tabageos.BlitMath.checkTileValueAt(this.x + (this._veloc.x >= 0  && (!closeSceneryX || closeSceneryX > this.x) ? (this.width*2) : -this.width), this.y + (this.height/2), this._map, tw || 16 , th || 16);
		var upperTd = tabageos.BlitMath.checkTileValueAt(this.x + (this._veloc.x >= 0  && (!closeSceneryX || closeSceneryX > this.x) ? (this.width*2) : -this.width), this.y - (this.height/2), this._map, tw || 16 , th || 16);
		
		var tile = tileCheck ? tileCheck(td) : (td[0] != 0 || td[1] != 0);
		var upTile = tileCheck ? tileCheck(upperTd) : (upperTd[0] !=0 || upperTd[1] != 0);
		
		if(!direc && this.pRight) {
			direc = 1;
		}
		if(direc && this.pLeft) {
			direc = 0;
		}
		if ( ( (tile) || !this._grounded || this.backUp > 250) && this.backUp < 1000 &&  (!upTile) ) {  
			
			
			this.jump(); this.backUp += 33.3; return;
		} else {
			if(this.backUp >= 1000) { this.walk(direc); }
			if ( (tile || upTile) ) {
				this.backUp = 300;
			}
		}
		
		if ( (tile) && this.backUp > 0) { 
			
			if(this.backUp != 300) {this.backUp = 300;} 
			this.backUp -= 33.3;  
			this.walk(direc); return;
		}
		if (this.backUp <= 0) {
			
			this.walk(direc); this.backUp = 300; return;
		} this.walk(direc);
		
	};
	AISceneryThrower.prototype.walkJumpOrAttack = function(direc, tw, th, sceneryArray, smartness,tileCheck) { 
		if (this.watchingThrow < this.afterAttackDelay) {
			this.watchingThrow += 33.3;this.autoAnimation();
		} else { 
			var td = tabageos.BlitMath.checkTileValueAt(this.x + (this._veloc.x >= 1 ? (this.width*2) : -this.width), this.y + (this.height/2), this._map, tw || 16 , th || 16);
			var upperTd = tabageos.BlitMath.checkTileValueAt(this.x + (this._veloc.x >= 1 ? (this.width*2) : -this.width), this.y - (this.height/2), this._map, tw || 16 , th || 16);
			
			var tile = tileCheck ? tileCheck(td) : (td[0] != 0 || td[1] != 0);
			var upTile = tileCheck ? tileCheck(upperTd) : (upperTd[0] !=0 || upperTd[1] != 0);
			
			
			if(!direc && this.pRight) {
				direc = 1;
			}
			if(direc && this.pLeft) {
				direc = 0;
			}
			if ( ((tile) || !this._grounded || this.backUp > 300) && this.backUp < 1000 &&  (!upTile) ) {  
				
				
				this.jump(); this.backUp += 33.3; return;
			} else {
				if(this.backUp >= 1000) this.walk(direc);
				
			}
			
			
			if ( (tile) && this.backUp > 0) { 
				if(this.backUp > 300) {this.backUp = 300;} 
				this.backUp -= 33.3; this.walk(direc); return;
			}
			
			if ( this.smarts(smartness || 1, tw||16, th||16) ) {
				var aiobj;
				aiobj = this.pickUpMethodToUse == 1 ? this.removeLastFromStorage() : this.throwSceneryObjectTraveler(tw || 16, th || 16, 1);
				aiobj.xDirection = this._leftRightFace === 1 ? 1 : 0;
				aiobj._jumpSpeed = this.throwStrength +1-1;
				aiobj._fromEnemyAi = 1;
				aiobj._walkSpeed = (Math.abs(this._veloc.x) >= this._walkSpeed ? 14 : 4);
				aiobj._veloc.y = -(Math.abs(this._veloc.x) < this._walkSpeed ? 2 : 3);aiobj._state = 3;
				aiobj._solidSit = 0;aiobj._eHit = 0;aiobj._grounded = 0;
				sceneryArray.push(aiobj);
				
				this.autoAnimation();
				this.watchingThrow = 0; return;
			} this.walk(direc);
		}
		
	};
	AISceneryThrower.prototype.walk = function(direc) {
		
		this.move(direc ? 1 : 0, direc ? 0 : 1, 0, 0);
	};
	AISceneryThrower.prototype.jump = function(direc) {
		
		this.move(0,0,1,0);
	};
	tabageos.AISceneryThrower = AISceneryThrower;
})();

