(function() { 

	'use strict';
	
	/*
	* A BasicNinja moves around in a tiled map using velocity, basic jumping and collisions are handled,
	*  and it can wall jump and double jump.
	*
	*/
	function BasicNinja(x,y,width,height, map,ca,dontCloneMap, dt, tileW, tileH, mapRows, mapColumns, useBlitMathSpecificArrays) {
		tabageos.TravelerSkeleton.call(this,x,y,width,height);
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
		if(this._canvasAnimation) {
			this._canvasAnimation.addedAnimationChanges = this._addedToChangeDirectionAnimation;
			this._canvasAnimation._playerRef = this;
		}
		this._w = width || 0;
		this._h = height || 0;
		this.wanderOffset = new tabageos.MoverPoint(0,0);
		this.blankMO = new tabageos.MoverPoint();
		this._eventDispatcher = new tabageos.EventDispatcher();
		this.x = x || 0;
		this.y = y || 0;
		this._checkHelper = new tabageos.MoverPoint();
		this._jumps = 1;
		this._jumpSpeed = 4;
		this._jsp = 1;
		this._walkSpeed = 4;
		this._gravityLevel = .285;
		this.health = 100;
		this._pLeft = 0;
		this._npLeft = 0;
		this._pRight = 0;
		this._npRight = 0;
		this._grounded = 0;
		this._unGrounded = 1;
		this._atCeiling = 0;
		this._unCeiling = 1;
		this._wallObject = null;
		this.boundingMethod = tabageos.BoundMethods.bounceOff;
		this.path = [];
		this._mapRows = mapRows || map.length;
		this._mapColumns = mapColumns || map[0].length;
		this._tw = tileW || this.width;
		this._th = tileH || this.height;
		this.destination = new tabageos.MoverPoint();
		this._mt = useBlitMathSpecificArrays || 0;
		
		if(this._map && this._map[0] && this._map[0][1] && (typeof this._map[0][1] == 'array' || typeof this._map[0][1] == 'object')) {
			this._mt = 1;
		} else {
			this._mt = 0;
		}
		
	};
	BasicNinja.prototype.constructor = BasicNinja;
	BasicNinja.prototype = Object.create(tabageos.TravelerSkeleton.prototype);
	BasicNinja.prototype._mapRows = 0;
	BasicNinja.prototype._mapColumns = 0;
	BasicNinja.prototype.stand = 1;
	BasicNinja.prototype.walk = 2;
	BasicNinja.prototype.up = 3;
	BasicNinja.prototype._canvasAnimation = null;
	BasicNinja.prototype._directCanvasObject = null;
	BasicNinja.prototype.down = 4;
	BasicNinja.prototype._deltaTime = .666666667;
	BasicNinja.prototype._state = 1;
	BasicNinja.prototype._checkHelper;
	BasicNinja.prototype._jumps = 1;
	BasicNinja.prototype.forceGrounded = 0;
	BasicNinja.prototype._jumpSpeed = 4;
	BasicNinja.prototype._jsp = 1;
	BasicNinja.prototype._walkSpeed = 4;
	BasicNinja.prototype._gravityLevel = .285;
	BasicNinja.prototype._pLeft = 0;
	BasicNinja.prototype._npLeft = 0;
	BasicNinja.prototype._pRight = 0;
	BasicNinja.prototype._npRight = 0;
	BasicNinja.prototype._grounded = 0;
	BasicNinja.prototype._unGrounded = 1;
	BasicNinja.prototype.health = 100;
	BasicNinja.prototype._atCeiling = 0;
	BasicNinja.prototype._unCeiling = 1;
	BasicNinja.prototype._map = null;
	BasicNinja.prototype._tw = 16;
	BasicNinja.prototype._th = 16;
	BasicNinja.prototype._wallObject = null;
	BasicNinja.prototype.boundingMethod = null;
	BasicNinja.prototype.destination = null;
	BasicNinja.prototype._mt = 1;
	BasicNinja.prototype._autoAnimate = 0;
	BasicNinja.prototype._inDoubleJump = 0;
	BasicNinja.prototype._onWall = 0;
	BasicNinja.prototype._autoAnimationThrottle = .5;
	BasicNinja.prototype._leftRightFace = 0;
	
	
	BasicNinja.prototype.move = function(left,right,up,down,dontApplyForce,dontCollide,easeFuncString) {
		
		if(this._state == 1) {
			
			this._veloc.x = 0; this._veloc.y = 0;

			if (!this._grounded || this._atCeiling) {
				this._state = 3;

			} else if ((left && !right) || (right && !left)) {
				this._state = 2;

			} else if (up && !this._atCeiling) {
				
				this._jsp = (this._jumpSpeed-2);
				this._veloc.y = this._jumps ? -(this._jumpSpeed-(this._jumpSpeed-2)) : -this._jumpSpeed;
				this._state = 3;
				
			} else if( !up && !this._jumps && down) {
				
				this._veloc.y = this._walkSpeed;
				this._state = 4;
			}
			
			this.update(0,dontApplyForce, dontCollide); return;
		}
		if(this._state == 2) { 
			if (!left && !right) {
				this._state = 1;
				this._veloc.x = 0; this._veloc.y = 0;

			} else if (right) {
				if (this._pRight) {
					this._veloc.x = 0;
				} else {
					if(easeFuncString) {
						
					} else {
						this._veloc.x = this._walkSpeed;
					}
					
				}
				
			} else if (left) {
				if (this._pLeft) {
					this._veloc.x = 0;
				} else {
					if(easeFuncString) {
						
					} else {
						this._veloc.x = -this._walkSpeed;
					}
					
				}
			} 

			if (up && !this._atCeiling) {
				
				this._jsp = (this._jumpSpeed-2);
				this._veloc.y = this._jumps ? -(this._jumpSpeed-(this._jumpSpeed-2)) : -this._jumpSpeed;
				this._state = 3;

			} else if(up && this._atCeiling) {
				if(this._jumps && !this._grounded) {
					this._state = 3;this._veloc.y = this._walkSpeed;
				}
				
			} else if (!up && !this._grounded) {
				this._state = 3;

			}
			this.update(0,dontApplyForce, dontCollide); return;
		}

		if(this._state ==3) { 
			
			if(!this._jumps) {
				if(up && !this._atCeiling) {
					this._veloc.y = -this._walkSpeed;
				} else {
					this._veloc.y = 0;
				}
				if(!up) {
					if(!left && !right && !down) {
						this._state = 1; this._veloc.x = 0; this._veloc.y = 0;
					} else if ((left || right) && !down) {
						this._state = 2;this._veloc.y = 0;
					} else if(down) {
						this._state = 4;this._veloc.y = this._walkSpeed;
					}
				}
			} else { 
				
				if(up && !this._atCeiling && this._veloc.y > -this._jumpSpeed && this._jsp != 0) {
					this._jsp -= 1; this._veloc.y = -(this._jumpSpeed-this._jsp); 
				} else {
					this._jsp = 0;
					
				}

				if(this._jsp == 0 && !up) {
					if(this._inDoubleJump === 0) {
						this._inDoubleJump = 1;
					}
				}

				this._veloc.y += this._gravityLevel * this._deltaTime;
				
				if(this._veloc.y > this._jumpSpeed) {
					this._veloc.y = this._jumpSpeed+1-1;  
				} 
				
				if (!up && this._veloc.y > 0) {
					this._veloc.y = this._veloc.y > this._jumpSpeed ? this._jumpSpeed+1-1 : this._veloc.y;
				}
				
				if(this._inDoubleJump === 1 && up && !this._atCeiling) {
					
					this._jsp -= 1; this._veloc.y = -(this._jumpSpeed-this._jsp);
					
					this._inDoubleJump = 2;
				}
				
			}
			
			if (!right && !left) {
				this._veloc.x = 0;
				
				
			} else if (right) {
				if (this._pRight) {
					this._veloc.x = 0;
					if(!this._grounded ) { 
						
						this._veloc.y = this._jumpSpeed / 4;
						this._onWall = 1;
						
					} 
					
				} else {
					
					if (!this._grounded && this._onWall == 1 && up && this._jumps) {
						
						this._jsp -= 1; this._veloc.y = -(this._jumpSpeed-this._jsp);
						
						this._onWall = 0;
						
					}
					
					this._veloc.x = this._walkSpeed;
				}
				
			} else if (left) {
				if (this._pLeft) {
					this._veloc.x = 0;
					if(!this._grounded ) {
						
						this._veloc.y = this._jumpSpeed / 4;
						this._onWall = 1;
						
					} 
				} else {
					
					if (!this._grounded && this._onWall == 1 && up && this._jumps && this._pRight) { 
						
						this._jsp -= 1; this._veloc.y = -(this._jumpSpeed-this._jsp);
						
						this._onWall = 0;
						
					}
					
					this._veloc.x = -this._walkSpeed;
				}
			}

			if (this._grounded) {
				if (!right && !left) {
					this._state = 1;
					this._veloc.x = 0; this._veloc.y = 0;
					
				} else  {
					this._state = 2;
					this._veloc.y = 0;
				} 
				this._inDoubleJump = 0;
			} else {
				
				if(!this._jumps && down) {
					this._veloc.y = this._walkSpeed;
					this._state = 4;
				} 
			}
			this.update(0,dontApplyForce, dontCollide); return;
		}
		
		if(!this._jumps && this._state == 4) { 
			if(down && !this._grounded) {
				this._veloc.y = this._walkSpeed;
			} else {
				this._veloc.y = 0;
			}
			if(!down) {
				if(!left && !right) {
					this._state = 1; this._veloc.x = 0; this._veloc.y = 0;
				} else {
					this._state = 2;this._veloc.y = 0;
				}
			}
			
			if (!right && !left) {
				this._veloc.x = 0;
			} else if (right) {
				if (this._pRight)
				this._veloc.x = 0;
				else
				this._veloc.x = this._walkSpeed;
				
			} else if (left) {
				if (this._pLeft)
				this._veloc.x = 0;
				else
				this._veloc.x = -this._walkSpeed;
			}
			
			if (this._atCeiling) {
				if (!right && !left) {
					this._state = 1;
					this._veloc.x = 0; this._veloc.y = 0;
					
				} else  {
					this._state = 2;
					this._veloc.y = 0;
				} 
			}
			this.update(0,dontApplyForce, dontCollide); return;
		}
		
	};
	
	
	BasicNinja.prototype._addedToChangeDirectionAnimation = function(left, right, up, down, keepAniIndex, noIdle) {
		
		if(this._playerRef._onWall === 1) {
			if(this._playerRef._pLeft) {
				this.currentAnimation = "onwallleft";
			} else if(this._playerRef._pRight) {
				this.currentAnimation = "onwallright";
			}
		}
		if(this._playerRef._inDoubleJump === 2 && (this._playerRef._veloc.y < 0 ) ) {
			var direc = this.getDirectionOfAnimation(this.currentAnimation, 1);
			
			this.currentAnimation = "flip" + direc;
		}
	};
	
	BasicNinja.prototype.update = function(dontApplyToXY, dontApplyForce, dontCollide) {
		
		if(this._lastPos.x < this._pos.x) {
			
			this._leftRightFace = 1;//right
		}
		if(this._lastPos.x > this._pos.x) {
			
			this._leftRightFace = 0;
		}
		
		
		this._lastPos.x = this._pos.x +1-1;
		this._lastPos.y = this._pos.y +1-1;
		this._lastVeloc.x = this._veloc.x+1-1;
		this._lastVeloc.y = this._veloc.y+1-1;
		this._unGrounded =  this._grounded+1-1;
		
		this._npRight = this._pRight+1-1;
		this._npLeft = this._pLeft+1-1;
		this._unCeiling = this._atCeiling+1-1;
		
		if(!dontApplyForce) {
			this.forceApplier.truncate(this.maxForce);
			this.forceApplier.divide(this.mass, 0);
			this._veloc.add(this.forceApplier.multiply(this._deltaTime,0), 0);
			this.forceApplier.reset();
			this._veloc._length = 0;
			this._veloc._angle = 0;
			this._veloc.truncate(this.maxSpeed);
		}
		this._pos.addBy(this._veloc.x * this._deltaTime, this._veloc.y * this._deltaTime, 0);
		
		if(!dontCollide) {
			var pgy, pgx;
			pgx = this.isLeftPushingOnMap(this._lastPos,this._pos,this._veloc,this._map,this._tw,this._th);
			if(pgx > 0) {
				this._pLeft = 1;
				this._pos.x = pgx;
				this._veloc.x = 0;
			} else {
				
				this._pLeft = 0;
			}
			
			pgx = this.isRightPushingOnMap(this._lastPos,this._pos,this._veloc,this._map,this._tw,this._th);
			if(pgx > 0) {
				this._pRight = 1;
				this._pos.x = pgx - this.width;
				this._veloc.x = 0;
			} else {
				
				this._pRight = 0;
			}
			
			pgy = this.isGroundedOnMap(this._lastPos,this._pos,this._veloc,this._map,this._tw,this._th);
			if(pgy > 0){
				this._grounded = 1;
				this._pos.y = pgy - this.height;
				this._veloc.y = 0;
			} else {
				this._grounded = 0;
				if(this.forceGrounded && this._jumps) {
					this._state = 3;this._veloc.y = this._walkSpeed; 
				}
			}
			
			pgy = this.isHeadHitOnMap(this._lastPos,this._pos,this._veloc,this._map,this._tw,this._th);
			if(pgy > 0) {
				this._atCeiling = 1;
				if( this._pos.y < pgy) this._pos.y = pgy ;
				if(this._veloc.y < 0) this._veloc.y = (this._jumps && !this._grounded) ? this._walkSpeed : 0;
			} else {
				this._atCeiling = 0;
				
			}
			
			if (this._wallObject) {
				this.boundingMethod(this, this._wallObject);
			}
			
		}
		if(!dontApplyToXY) {
			this.x = Math.round(this._pos.x +1-1);
			this.y = Math.round(this._pos.y +1-1);
		}

		if(this._autoAnimate && this._canvasAnimation) {

			this._canvasAnimation.x = this.x;
			this._canvasAnimation.y = this.y;
			
			this._canvasAnimation.changeDirectionAnimation(this._veloc.x < 0,this._lastVeloc.x > 0, this._veloc.y < 0, this._veloc.y > 0);
			
			this._canvasAnimation.animate(this._autoAnimationThrottle);
			this._canvasAnimation.blit();
			
		} else if(this._autoAnimate && this._directCanvasObject) {


			this._directCanvasObject.context.fillRect(this.x,this.y,this.width,this.height);
			


		}

	};
	BasicNinja.prototype.autoAnimation = function() {
		
		if(this._autoAnimate && this._canvasAnimation) {

			this._canvasAnimation.x = this.x;
			this._canvasAnimation.y = this.y;
			
			this._canvasAnimation.changeDirectionAnimation(this._veloc.x < 0,this._lastVeloc.x > 0, this._veloc.y < 0, this._veloc.y > 0);
			
			this._canvasAnimation.animate(this._autoAnimationThrottle);
			this._canvasAnimation.blit();
			
		} else if(this._autoAnimate && this._directCanvasObject) {


			this._directCanvasObject.context.fillRect(this.x,this.y,this.width,this.height);
			


		}
		
		
	};
	BasicNinja.prototype.isGroundedOnMap = function(last, curr, veloc, map,tw,th) {
		
		var  bLx = this._pos.x+1-1; var bLy = this._pos.y+this.height +  ((this._veloc.y < 1 ? 1 : this._veloc.y));
		var bRx = this._pos.x + this.width;
		var tile; var gy = -999;var iX = 0; var iY = 0;var cmb;var cix; var ciy;
		
		while(bLx < bRx) {
			
			tabageos.BlitMath.fasterCheckTileValueAt(bLx,bLy,this._mapRows,this._mapColumns,tw,th,this._checkHelper);
			ciy = this._checkHelper.y; cix = this._checkHelper.x;
			tile = this._map[ciy][cix];
			if((this._mt === 0 && tile != 0)  || ( this._mt === 1 && ((tile[0] != 0 || tile[1] != 0)) )) {
				gy = (ciy*th) +1-1;
				if(gy < bLy) {  } else { gy = -1; }
			}
			bLx += (tw > this.width ? this.width : tw) / 4;
			
		} return gy;
	};
	BasicNinja.prototype.isHeadHitOnMap = function(last, curr, veloc, map,tw,th) {
		
		var bLx = this._pos.x+1-1; var bLy = this._pos.y -1 - (-(this._veloc.y));
		var bRx = this._pos.x + this.width;
		var tile; var gy = -999;var iX = 0; var iY = 0;var cmb = 0;var cix; var ciy;
		while(bLx < bRx) {
			
			cmb = tabageos.BlitMath.fasterCheckTileValueAt(bLx,bLy,this._mapRows,this._mapColumns,tw,th, this._checkHelper);
			ciy = this._checkHelper.y; cix = this._checkHelper.x;
			tile = this._map[ciy][cix];
			if((this._mt === 0 && tile != 0)  || ( this._mt === 1 && ((tile[0] != 0 || tile[1] != 0)) )) {
				gy = (ciy*th) +th; 
				if(gy > bLy) {  } else { gy = -1; }
			}
			bLx += (tw > this.width ? this.width : tw);
			
		} return gy;
	};
	BasicNinja.prototype.isRightPushingOnMap = function(last, curr, veloc, map,tw,th) {
		
		var Tpy = this._pos.y+1-1; var Bty = this._pos.y + this.height;
		var rx = this._pos.x + (this.width) + 1;
		var tile; var gx = -999;var iX = 0; var iY = 0;var cmb = 0;var cix; var ciy;
		while(Tpy < Bty) {
			
			cmb = tabageos.BlitMath.fasterCheckTileValueAt(rx,Tpy,this._mapRows,this._mapColumns,tw,th, this._checkHelper);
			ciy = this._checkHelper.y; cix = this._checkHelper.x;
			tile = this._map[ciy][cix];
			if((this._mt === 0 && tile != 0)  || ( this._mt === 1 && ((tile[0] != 0 || tile[1] != 0)) )) {
				gx = (cix*tw) +1-1;
				if(gx < rx) { break; } else { gx = -1; }
			}
			Tpy += (th > this.height ? this.height : th) ;
			
		} return gx;
	};
	BasicNinja.prototype.isLeftPushingOnMap = function(last, curr, veloc, map,tw,th) {
		
		var Tpy = this._pos.y+1-1; var Bty = this._pos.y + this.height;
		var lx = this._pos.x -1;
		var tile; var gx = -999;var iX = 0; var iY = 0;var cmb = 0;var cix; var ciy;
		while(Tpy < Bty) {
			
			cmb = tabageos.BlitMath.fasterCheckTileValueAt(lx,Tpy,this._mapRows,this._mapColumns,tw,th, this._checkHelper);
			ciy = this._checkHelper.y; cix = this._checkHelper.x;
			tile = this._map[ciy][cix];
			if((this._mt === 0 && tile != 0)  || ( this._mt === 1 && ((tile[0] != 0 || tile[1] != 0)) )) {
				gx = (cix*tw) + tw;
				if(gx > lx) { break; } else { gx = -1; }
			}
			Tpy += (th > this.height ? this.height : th) ;
			
		} return gx;
	};
	tabageos.BasicNinja = BasicNinja;
	
})();

