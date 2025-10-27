import {MoverSkeleton} from './MoverSkeleton.js';
import {MoverPoint} from './MoverPoint.js';
import {Rectangle} from './Rectangle.js';
import {TimeKeeper} from './TimeKeeper.js';
import {BlitMath} from './BlitMath.js';



	'use strict';
    function MapMover(x,y,width,height, map,ca,dontCloneMap, dt, tw, th,mapRows, mapColumns, usesBlitMathSpecificMapArrays) {
		MoverSkeleton.call(this,x,y,width,height);
        this.width = width || 0;
        this.height = height || 0;
        this._middlePoint = new MoverPoint();
        this._pos = new MoverPoint(x || 0,y || 0);
        this._veloc = new MoverPoint(0,0);
        this._lastVeloc = new MoverPoint(0,0);
        this._lastPos = new MoverPoint(x || 0,y || 0);
        this._deltaTime = dt || TimeKeeper._sae;
        this._map = dontCloneMap ? map : BlitMath.cloneMultiArray(map);
        this._rect = new Rectangle(this.x,this.y,this.width,this.height);
        this._state = 1;
        this.x = x || 0;
        this.y = y || 0;
        this._canvasAnimation = ca || null;
        this._checkHelper = new MoverPoint();
		this._jumps = 0;
		this._jumpSpeed = 4;
		this._jsp = 1;
		this._walkSpeed = 4;
		this._gravityLevel = .285;
		this._pLeft = 0;
		this._npLeft = 0;
		this._pRight = 0;
		this._npRight = 0;
		this._grounded = 0;
		this._unGrounded = 1;
		this._atCeiling = 0;
		this._unCeiling = 1;
		this._mt = usesBlitMathSpecificMapArrays || 0;
		this._mapRows = mapRows || map.length;
		this._mapColumns = mapColumns || map[0].length;
		
		if(this._map && this._map[0] && this._map[0][1] && (typeof this._map[0][1] != 'number' || typeof this._map[0][1] == 'object')) {
			this._mt = 1;
		} else {
			this._mt = 0;
		}
		
		this._tw = tw || this.width;
		this._th = th || this.height;
    }
	MapMover.prototype.constructor = MapMover;
    MapMover.prototype = Object.create(MoverSkeleton.prototype);
	MapMover.prototype._mapRows = 0;
    MapMover.prototype._mapColumns = 0;
    MapMover.prototype.stand = 1;
    MapMover.prototype.walk = 2;
    MapMover.prototype.up = 3;
    MapMover.prototype.down = 4;
    MapMover.prototype._deltaTime = .666666667;
    MapMover.prototype._state = 1;
    MapMover.prototype._jumps = 0;
    MapMover.prototype._jumpSpeed = 4;
    MapMover.prototype._jsp = 1;
    MapMover.prototype._walkSpeed = 4;
    MapMover.prototype._gravityLevel = .285;
    MapMover.prototype._pLeft = 0;
    MapMover.prototype._npLeft = 0;
    MapMover.prototype._pRight = 0;
    MapMover.prototype._npRight = 0;
    MapMover.prototype._grounded = 0;
    MapMover.prototype._unGrounded = 1;
    MapMover.prototype._atCeiling = 0;
    MapMover.prototype._unCeiling = 1;
    MapMover.prototype._checkHelper = null;
    MapMover.prototype._map = null;
    MapMover.prototype._canvasAnimation = null;
    MapMover.prototype._tw = 16;
    MapMover.prototype._th = 16;
	MapMover.prototype._mt = 0;
    MapMover.prototype._directCanvasObject = null;
	MapMover.prototype._autoAnimate = 0;
	MapMover.prototype._autoAnimationThrottle = .5;
	MapMover.prototype.__moveSettings = {};
	
	MapMover.prototype.setupForTileMove = function() {
		
		this.__moveSettings._jumps = this._jumps +1-1;
		this.__moveSettings._deltaTime = this._deltaTime +1-1;
		this.__moveSettings._jumpSpeed = this._jumpSpeed +1-1;
		this.__moveSettings.maxSpeed = this.maxSpeed +1-1;
		this.__moveSettings._walkSpeed = this._walkSpeed +1-1;
		
		this._jumps = 0;
		this._deltaTime = 1;
		this._jumpSpeed = this._tw+1-1;
		this.maxSpeed = this._tw +1-1;
		this._walkSpeed = this._tw+1-1;
		
	};
	MapMover.prototype.backFromTileMove = function() {
		
		if(this.__moveSettings._jumps || this.__moveSettings._walkSpeed) {
			this._jumps = this.__moveSettings._jumps +1-1;
			this._deltaTime = this.__moveSettings._deltaTime +1-1;
			this._jumpSpeed = this.__moveSettings._jumpSpeed +1-1;
			this.maxSpeed = this.__moveSettings.maxSpeed +1-1;
			this._walkSpeed = this.__moveSettings._walkSpeed +1-1;
		}
		
		
	};
	MapMover.prototype.tileMove = function(left,right,up,down) {
		
			if(left && !this._pLeft) {
				this._veloc.x = -this._tw;
			} 
			if(right && !this._pRight) {
				this._veloc.x = this._tw;
			} 
			if(!left && !right) {
				this._veloc.x = 0;
			}
			if(up && !this._atCeiling) {
				this._veloc.y = -this._th;
			} 
			if(down && !this._grounded) {
				this._veloc.y = this._th;
			} 
			if(!up && !down) {
				this._veloc.y = 0;
			}
			this.update(0,1,0);
		
	};
	
    MapMover.prototype.move = function(left,right,up,down) {
           
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
                
                this.update(); return;
            }
            if(this._state == 2) { 
                if (!left && !right) {
                    this._state = 1;
                    this._veloc.x = 0; this._veloc.y = 0;

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

                if (up && !this._atCeiling) {
                    
                    this._jsp = (this._jumpSpeed-2);
                    this._veloc.y = this._jumps ? -(this._jumpSpeed-(this._jumpSpeed-2)) : -this._jumpSpeed;
                    this._state = 3;

                } else if(up && this._atCeiling) {
					if(this._jumps && !this._grounded) { 
						this._state = 3; this._veloc.y = this._walkSpeed;
					}
					
				} else if (!up && !this._grounded) {
                    this._state = 3;

                }
                this.update(); return;
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

                    this._veloc.y += this._gravityLevel * this._deltaTime;
                    
                    if(this._veloc.y > this._jumpSpeed) {
                        this._veloc.y = this._jumpSpeed+1-1;  
                    } 
                
                    if (!up && this._veloc.y > 0) {
                        this._veloc.y = this._veloc.y > this._jumpSpeed ? this._jumpSpeed+1-1 : this._veloc.y;
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

                if (this._grounded) {
                    if (!right && !left) {
                        this._state = 1;
                        this._veloc.x = 0; this._veloc.y = 0;
                        
                    } else  {
                        this._state = 2;
                        this._veloc.y = 0;
                    } 
                } else {
                    
                    if(!this._jumps && down) {
                        this._veloc.y = this._walkSpeed;
                        this._state = 4;
                    } 
                }
                this.update(); return;
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
                this.update(); return;
            }
        
    };
    MapMover.prototype.update = function(dontApplyToXY) {
        this._lastPos.x = this._pos.x +1-1;
        this._lastPos.y = this._pos.y +1-1;
        this._lastVeloc.x = this._veloc.x+1-1;
        this._lastVeloc.y = this._veloc.y+1-1;
        this._unGrounded =  this._grounded+1-1;
        
        this._npRight = this._pRight+1-1;
        this._npLeft = this._pLeft+1-1;
        this._unCeiling = this._atCeiling+1-1;
        
        this._pos.x += this._veloc.x*this._deltaTime;
        this._pos.y += this._veloc.y*this._deltaTime;
        
        var pgy, pgx;
        pgx = this.isLeftPushingOnMap(this._lastPos,this._pos,this._veloc,this._map,this._tw,this._th);
        if(pgx > 0) {
            this._pLeft = 1;
            this._pos.x = pgx +1;
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
        }
        
        pgy = this.isHeadHitOnMap(this._lastPos,this._pos,this._veloc,this._map,this._tw,this._th);
        if(pgy > 0) {
            this._atCeiling = 1;
			if(this._jumps) {
				if(this._pos.y < pgy) this._pos.y = pgy ;
				if(this._veloc.y < 0) this._veloc.y = (this._jumps && !this._grounded) ? this._walkSpeed : 0;//
			} else {
				this._pos.y = pgy;
				this._veloc.y = 0;
			}
	   } else {
            this._atCeiling = 0;
			
        }
        
        if(!dontApplyToXY) {
            this.setX( this._pos.x +1-1 );
            this.setY( this._pos.y +1-1 );
        }
		
		if(this._autoAnimate && this._canvasAnimation) {

            this._canvasAnimation.x = Math.round(this.x);
			this._canvasAnimation.y = Math.round(this.y);
					
			this._canvasAnimation.changeDirectionAnimation(this._veloc.x < 0,this._lastVeloc.x > 0, this._veloc.y < 0, this._veloc.y > 0);
					
			this._canvasAnimation.animate(this._autoAnimationThrottle);
			this._canvasAnimation.blit();
        
        } else if(this._autoAnimate && this._directCanvasObject) {


            this._directCanvasObject.context.fillRect(Math.round(this.x),Math.round(this.y),this.width,this.height);
            


        }
		
    };
    MapMover.prototype.isGroundedOnMap = function(last, curr, veloc, map,tw,th) {
        
       var  bLx = this._pos.x+1-1; var bLy = this._pos.y+this.height +  (Math.abs(this._veloc.y) < th ? ((this._veloc.y < 1 ? 1 : this._veloc.y)) : 1);
        var bRx = this._pos.x + this.width;
        var tile; var gy = -999;var iX = 0; var iY = 0;var cmb = 0;var ciy; var cix;
        
        while(bLx < bRx) {
           
            BlitMath.fasterCheckTileValueAt(bLx,bLy,this._mapRows,this._mapColumns,tw,th,this._checkHelper);
			ciy = this._checkHelper.y; cix = this._checkHelper.x;
			tile = this._map[ciy][cix]; 
            if( (this._mt === 0 && tile != 0)  || ( this._mt === 1 && ((tile[0] != 0 || tile[1] != 0)) )   ) {  
                
				gy = (ciy*th) +1-1;
                if(gy < bLy) {  } else { gy = -1; }
            }
            bLx += (tw > this.width ? this.width : tw) / 4;
            
        } return gy;
    };
	
    MapMover.prototype.isHeadHitOnMap = function(last, curr, veloc, map,tw,th) {
        
        var bLx = this._pos.x+1-1; var bLy = this._pos.y -1 -   (Math.abs(this._veloc.y) < th ? (-(this._veloc.y)) : 0);
        var bRx = this._pos.x + this.width;
        var tile; var gy = -999;var iX = 0; var iY = 0; var cmb = 0;var ciy; var cix;
        while(bLx < bRx) {
           
            BlitMath.fasterCheckTileValueAt(bLx,bLy,this._mapRows,this._mapColumns,tw,th, this._checkHelper);
			ciy = this._checkHelper.y; cix = this._checkHelper.x;
			tile = this._map[ciy][cix];
            if((this._mt === 0 && tile != 0)  || ( this._mt === 1 && ((tile[0] != 0 || tile[1] != 0)) )  ) {
                gy = (ciy*th) +th; 
                if(gy > bLy) {  } else { gy = -1; }
            }
            bLx += (tw > this.width ? this.width : tw);
            
        } return gy;
    };
    MapMover.prototype.isRightPushingOnMap = function(last, curr, veloc, map,tw,th) {
        
        var Tpy = this._pos.y+1-1; var Bty = this._pos.y + this.height;
        var rx = this._pos.x + (this.width) + 1;
        var tile; var gx = -999;var iX = 0; var iY = 0;var cmb = 0;var ciy; var cix;
        while(Tpy < Bty) {
            
            BlitMath.fasterCheckTileValueAt(rx,Tpy,this._mapRows,this._mapColumns,tw,th, this._checkHelper);
			ciy = this._checkHelper.y; cix = this._checkHelper.x;
			tile = this._map[ciy][cix];
            if((this._mt === 0 && tile != 0)  || ( this._mt === 1 && ((tile[0] != 0 || tile[1] != 0)) )  ) {
                gx = (cix*tw) +1-1;
                if(gx < rx) { break; } else { gx = -1; }
            }
            Tpy += (th > this.height ? this.height : th) ;
            
        } return gx;
    };
    MapMover.prototype.isLeftPushingOnMap = function(last, curr, veloc, map,tw,th) {
        
        var Tpy = this._pos.y+1-1; var Bty = this._pos.y + this.height;
        var lx = this._pos.x -1;
        var tile; var gx = -999;var iX = 0; var iY = 0; var cmb = 0;var ciy; var cix;
        while(Tpy < Bty) {
           
            BlitMath.fasterCheckTileValueAt(lx,Tpy,this._mapRows,this._mapColumns,tw,th,this._checkHelper);
			ciy = this._checkHelper.y; cix = this._checkHelper.x;
			tile = this._map[ciy][cix];
            if((this._mt === 0 && tile != 0)  || ( this._mt === 1 && ((tile[0] != 0 || tile[1] != 0)) )  ) {
                gx = (cix*tw) + tw;
                if(gx > lx) { break; } else { gx = -1; }
            }
            Tpy += (th > this.height ? this.height : th) ;
            
        } return gx;
    };
    export { MapMover   };
    



 



