import { MoverPoint } from './MoverPoint.js';
import { Rectangle } from './Rectangle.js';
import { Event } from './Event.js';
import { EventDispatcher } from './EventDispatcher.js';
import { TimeKeeper } from './TimeKeeper.js';
import { MoverSkeleton } from './MoverSkeleton.js';
import { SimpleIsoAnimation } from './SimpleIsoAnimation.js';

	'use strict';
    
            function SimpleIsoBox(x,y,z,width,height,depth, fromRect) {
				MoverSkeleton.call(this,x,y,width,height);
                this.width = width || 0;
                this.height = height || 0;
                this._middlePoint = new MoverPoint();
                this._pos = new MoverPoint(x || 0,y || 0);
                this._veloc = new MoverPoint(0,0);
                this._lastVeloc = new MoverPoint(0,0);
                this._lastPos = new MoverPoint(x || 0,y || 0);
                this.x = x || 0;
                this.y = y || 0;
                this._rect = new Rectangle(this.x,this.y,this.width,this.height);
                this.z = z || 0;
                this.dX = 0; this.dY = 0;this.face = 1;
                this.depth = depth || this.height+1-1;
                this._passCalcs = {x1:0,y1:0,x2:0,y2:0,x3:0,y3:0};
                this._ddX = 0;
                this._ddY = 0;
                this.moveLimits = [];
				this.directions = {
					1:"north",
					3:"south",
					2:"east",
					4:"west",
					6:"northeast",
					7:"southeast",
					5:"northwest",
					8:"southwest"
				};
				fromRect = fromRect || new Rectangle(0,0,width,height);
				this.animation = new SimpleIsoAnimation({},{},fromRect,x,y,width,height);
				this.animation.animationSpecs = {
					
					"anim":[fromRect.y/height, [fromRect.x/width, fromRect.y/height]]
				};
				this.animation.currentAnimation = "anim";
            }
            SimpleIsoBox.prototype.constructor = SimpleIsoBox;
            SimpleIsoBox.prototype = Object.create(MoverSkeleton.prototype);
            SimpleIsoBox.prototype.z = 0;
            SimpleIsoBox.prototype.depth = 100;
            SimpleIsoBox.prototype.face = 1;
            SimpleIsoBox.prototype.moveLimits = [];
			SimpleIsoBox.prototype.animation = null;
			
            
            SimpleIsoBox.prototype.directions = {
                1:"north",
                3:"south",
                2:"east",
                4:"west",
                6:"northeast",
                7:"southeast",
                5:"northwest",
                8:"southwest"
            };
            
            SimpleIsoBox.prototype.directionFacing = function() {
                return this.directions[this.face];
            };
			//new
			SimpleIsoBox.prototype.basicDirectionFacing = function() {
				var re = "north";
				if(this._veloc.x <= -1) {
					
					re ="west";
					
				}
				if(this._veloc.x >= 1) {
					
					re = "east";
					
				}
				if(this._veloc.y <= -1) {
					
					re = "north";
					
				}
				if(this._veloc.y >= 1) {
					
					re = "south";
					
				}
				return re;
				
			};
			
            
            SimpleIsoBox.prototype.getX = function() {
                return this.x;
            };
            SimpleIsoBox.prototype.setX = function(toThis) {
                if (toThis > this.x) {
                    this.dX = 1;
                    
                    if (this.dY == 0) {
                        this.face = 2;
                    } else if (this.dY==1) {
                        this.face = 7;
                       
                    } else {
                        this.face = 6;
                        
                        
                    }
                }
                if (toThis < this.x) {
                    this.dX = -1;
                    
                    if (this.dY == 0) {
                        this.face = 4;
                    } else if (this.dY==1) {
                        this.face = 8;
                       
                        
                    } else {
                        this.face = 5;
                       
                    }
                }
                if (toThis == this.x) {
                    this.dX = 0;
                    
                    if (this.dY == 0) {
                        
                    } else if (this.dY==1) {
                        this.face = 3;
                    } else {
                        this.face = 1;
                    }
                }
                this.x = toThis+1-1;
                this._pos.x = toThis+1-1;
            };
            SimpleIsoBox.prototype.getY = function() {
                return this.y;
            };
            SimpleIsoBox.prototype.setY = function(toThis) {
                if (toThis > this.y) {
                    this.dY = 1;
                    
                    if(this.dX == 0) {
                       this.face = 3;
                       
                    } else if (this.dX == 1) {
                        this.face =  7;
                        
                    } else {
                        this.face = 8;
                       
                       
                    }
                }
                if (toThis < this.y) {
                    this.dY = -1;
                    
                    if(this.dX == 0) {
                       this.face = 1;
                       
                    } else if (this.dX == 1) {
                        this.face = 6;
                       
                       
                    } else {
                        this.face = 5;
                      
                    }
                }
                if (toThis == this.y) {
                    this.dY = 0;
                    
                    if(this.dX == 0) {
                        
                    } else if(this.dX == 1) {
                        this.face = 2;
                    } else {
                        this.face = 4;
                    }
                }
                this.y = toThis+1-1;
                this._pos.y = toThis+1-1;
            };
            
            
            SimpleIsoBox.prototype._ddX = 0;
            SimpleIsoBox.prototype._ddY = 0;
            
            /*
            *
            *  Sets ._ddX and ._ddY
            *  @param altCheck you can pass in another MoverSkeleton to check,
            *    in that case ._ddX and ._ddY would denote its future direction.
            *    altCheck would be typically used with the .traveler of 
            *    SimpleIsoCharacters that extend SimpleIsoBox.
            *
            */
            SimpleIsoBox.prototype.desiredDirection = function(left,right,up,down, altCheck) {
                var xh = this.x +1-1;
                var yh = this.y +1-1;
                var dxh = this.dX+1-1;
                var dyh = this.dY+1-1;
                this.dX = 0; this.dY = 0;
                var actualCheck = altCheck || this;
                
                if(up) {
                    this.setY(actualCheck.y-actualCheck._veloc.y);
                }
                if(down) {
                    this.setY(actualCheck.y+actualCheck._veloc.y);
                }

                if(left) {
                    this.setX(actualCheck.x-actualCheck._veloc.x);
                }

                if(right) {
                    this.setX(actualCheck.x+actualCheck._veloc.x);
                }
                this._ddX = this.dX+1-1;
                this._ddY = this.dY+1-1;
                
                this.x = xh; this.y = yh;
                this._pos.x = xh; this._pos.y = yh;
                this.dX = dxh;this.dY=dyh;
            };
            
            
            /*
            *  Unlike MapMovers.move method, for this method we do pass in
            *  the directions we want to go instead of the directions we are going.
            *  So we can just pass in whether or not the left button is pressed, etc.
            *  
            *  @param npv  an Array containing the values that the box should collide with.
            *  @param offd  offsetDivision for the canPassOnMap call, see canPassOnMap
            *  @param offm  offsetMinus for the canPassOnMap call, see canPassOnMap
            */
            SimpleIsoBox.prototype.move = function(left,right,up,down, map, tw, th, npv, offd, offm) {
                this.dX = 0; this.dY = 0;
                this.desiredDirection(left,right,up,down);
                var toMove = 1;
                if(map) { 
                    if(!this.canPassOnMap(map, tw||this.width,th||this.height, npv, offd, offm)) {
                        toMove = 0;
                    }
                }
                var xsee = this.x+1-1; var ysee = this.y+1-1;
                if(toMove) {
                    if(up) {
                       this.setY(this.y-this._veloc.y);
                    }
                    if(down) {
                       this.setY(this.y+this._veloc.y);
                    }

                    if(left) {
                        this.setX(this.x-this._veloc.x);
                    }

                    if(right) {
                       this.setX(this.x+this._veloc.x);
                    }
                }
                if(xsee == this.x && ysee == this.y) { toMove = 0; }
                
                return toMove;
            };
			
			
            
            SimpleIsoBox.prototype._passCalcs = {x1:0,y1:0,x2:0,y2:0,x3:0,y3:0};
            
            /*
            *  Used along with .setX and .setY or the .move function.
            *  If .x and .y are updated manually this method will not compute properly.
            *  .move encapsulates this method
            *  ._ddX denoting future x direction and ._ddY denoting future y direction
            *  are used by this method.
            *
            *  Manual use of this method would be;
            *  this.desiredDirection();
            *  if(this.canPassOnMap()) {   this.setX(); this.setY(); }
            *  
            *  The .move method encapsulates all those calls.
            *
            *  @param offsetDivision The number that tw and th are divided by to account for screen/iso offset
            *                        the default is 2, this number will cause the box to be closer or farther away from walls during collisions
            *                        this number has a lesser effect than offsetMinus and should be from 1 to tw.
            *  @param offsetMinus the total offset is subtracted by this number, use this to bring the box closer or farther away from collisions,
            *                     which means, when stopped, how close or far it is from the wall or object, default is 0,
            *                     a game that has all boxes and scenery the same size does not really need to mess with any of the offsets.
            *  Both offsetDivision and Minus can be set during .move calls as well.
            * .move fully encapsulates this method and all its params.
            */
            SimpleIsoBox.prototype.canPassOnMap = function(map,tw,th,noPassValues,offsetDivision, offsetMinus) {
                var result=1;
                var tih = th||this.height;
                var tiw = tw||this.width;
                var vxOffset = Math.abs(this._veloc.x)-((tw/(offsetDivision||2))*-this._ddX) - (offsetMinus||0);
                var vyOffset = Math.abs(this._veloc.y)-((th/(offsetDivision||2))*-this._ddY) - (offsetMinus||0);
                var TLx=this.x  + vxOffset+ (this._veloc.x * this._ddX);
                var TLy=this.y  + vyOffset+ (this._veloc.y * this._ddY);
                var TRx=TLx+ (tiw);
                var TRy=TLy;
                var BRx=TRx;
                var BRy=TLy+ (tih);
                var BLx=TLx;
                var BLy=BRy;
                this._passCalcs.x3 = -99999; this._passCalcs.y3 = -99999;
                
                switch (this.face) {
                    case 1:
                        this._passCalcs.x1 = TLx;this._passCalcs.y1 = TLy;
                        this._passCalcs.x2 = TRx;this._passCalcs.y2 = TRy;
                    break;
                    case 3:
                        this._passCalcs.x1 = BLx;this._passCalcs.y1 = BLy;
                        this._passCalcs.x2 = BRx;this._passCalcs.y2 = BRy;
                    break;
                    case 2:
                        this._passCalcs.x1 = BRx;this._passCalcs.y1 = BRy;
                        this._passCalcs.x2 = TRx;this._passCalcs.y2 = TRy;
                    break;
                    case 4:
                        this._passCalcs.x1 = TLx;this._passCalcs.y1 = TLy;
                        this._passCalcs.x2 = BLx;this._passCalcs.y2 = BLy;
                    break;
                    case 6:
                        this._passCalcs.x1 = TRx;this._passCalcs.y1 = TRy;
                        this._passCalcs.x2 = BRx;this._passCalcs.y2 = BRy;
                        this._passCalcs.x3 = TLx;this._passCalcs.y3 = TLy;
                    break;
                    case 7:
                        this._passCalcs.x1 = TRx;this._passCalcs.y1 = TRy;
                        this._passCalcs.x2 = BRx;this._passCalcs.y2 = BRy;
                        this._passCalcs.x3 = BLx;this._passCalcs.y3 = BLy;
                    break;
                    case 5:
                        this._passCalcs.x1 = TRx;this._passCalcs.y1 = TRy;
                        this._passCalcs.x2 = BLx;this._passCalcs.y2 = BLy;
                        this._passCalcs.x3 = TLx;this._passCalcs.y3 = TLy;
                    break;
                    case 8:
                        this._passCalcs.x1 = TLx;this._passCalcs.y1 = TLy;
                        this._passCalcs.x2 = BRx;this._passCalcs.y2 = BRy;
                        this._passCalcs.x3 = BLx;this._passCalcs.y3 = BLy;
                    break;
                }
               
                var i = 0; var l = noPassValues.length; var v;var check;
                if(map[Math.floor(this._passCalcs.y1/tih)] 
                   && map[Math.floor(this._passCalcs.y1/tih)][Math.floor(this._passCalcs.x1/tiw)]) {
                    check = map[Math.floor(this._passCalcs.y1/tih)][Math.floor(this._passCalcs.x1/tiw)];
                     for(  i; i < l; i++ ) { v = noPassValues[i];
                        if((check == v) || (check && check[0] >= 0 && check[0] == v[0] && check[1] == v[1])  ) {
                            result = 0;
                        }
                    }
                } else { return 0; }
                if(map[Math.floor(this._passCalcs.y2/tih)] 
                   && map[Math.floor(this._passCalcs.y2/tih)][Math.floor(this._passCalcs.x2/tiw)]) {
                    check = map[Math.floor(this._passCalcs.y2/tih)][Math.floor(this._passCalcs.x2/tiw)]; i = 0; 
                     for(  i; i < l; i++ ) { v = noPassValues[i];
                        if((check == v) || (check && check[0] >= 0 && check[0] == v[0] && check[1] == v[1])  ) {
                            result = 0;
                        }
                    }
                } else { return 0; }
                if(this._passCalcs.x3 != -99999) {
                    if(map[Math.floor(this._passCalcs.y3/tih)] 
                       && map[Math.floor(this._passCalcs.y3/tih)][Math.floor(this._passCalcs.x3/tiw)]) {
                        check =  map[Math.floor(this._passCalcs.y3/tih)][Math.floor(this._passCalcs.x3/tiw)]; i = 0; 
                         for(  i; i < l; i++ ) { v = noPassValues[i];
                            if((check == v) || (check && check[0] >= 0 && check[0] == v[0] && check[1] == v[1])  ) {
                                result = 0;
                            }
                        }
                    } else { return 0; }
                } return result;
                
            };
            export { SimpleIsoBox   };

            
