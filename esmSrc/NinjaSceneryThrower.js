import { MoverPoint } from './MoverPoint.js';
import { Rectangle } from './Rectangle.js';
import { Event } from './Event.js';
import { EventDispatcher } from './EventDispatcher.js';
import { TimeKeeper } from './TimeKeeper.js';
import { TravelerSkeleton } from './TravelerSkeleton.js';
import { BoundMethods } from './BoundMethods.js';
import { BlitMath } from './BlitMath.js';
import { GeometricMath } from './GeometricMath.js';
import { TileData } from './TileData.js';
import { MapTraveler} from './MapTraveler.js';
import { SceneryObject } from './SceneryObject.js';
import { SceneryObjectTraveler } from './SceneryObjectTraveler.js';
import { BasicNinja } from './BasicNinja.js';
import { seekTouch } from './Utils.js';

	'use strict';
    
    function NinjaSceneryThrower(x,y,width,height, map, ca,dontCloneMap,dt,tWidth,tHeight,mr,mc) {
		TravelerSkeleton.call(this,x,y,width,height);
		BasicNinja.call(this,x,y,width,height, map, ca,dontCloneMap,dt,tWidth,tHeight,mr,mc);
        
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
		
        
    };
	NinjaSceneryThrower.prototype.constructor = NinjaSceneryThrower;
    NinjaSceneryThrower.prototype = Object.create(TravelerSkeleton.prototype); 
	Object.assign(NinjaSceneryThrower.prototype, BasicNinja.prototype);
    NinjaSceneryThrower.prototype.throwStrength = 10;
    NinjaSceneryThrower.prototype.health = 100;
    NinjaSceneryThrower.prototype.holding;
	NinjaSceneryThrower.prototype.holdings;
    NinjaSceneryThrower.prototype.holdingRect;
	NinjaSceneryThrower.prototype._holdingHelperRect;
    NinjaSceneryThrower.prototype._canvasAnimation = null;
    NinjaSceneryThrower.prototype._outAltered;
    NinjaSceneryThrower.prototype.holdingOffsetX = 1;
    NinjaSceneryThrower.prototype.holdingOffsetY = 3;
    NinjaSceneryThrower.prototype.nameOfThrower = "strawHat";

    NinjaSceneryThrower.prototype.alteredPosition = function(xAlterAmount, yAlterAmount) {
        xAlterAmount = xAlterAmount || 0;
        yAlterAmount = yAlterAmount || 0;
        this._outAltered.x = this.x - xAlterAmount;
        this._outAltered.y = this.y - yAlterAmount;
        return this._outAltered;
    };
    NinjaSceneryThrower.prototype.holdingImageRect = function() {
        return this.holdingRect;
    };
    NinjaSceneryThrower.prototype.pickUpTileData = function(td, imageWidthAdjust, imageHeightAdjust) {
        if (!this.holding) {
            this.holding = td;
            this.holdingRect.x = this.holding.value[1] * (this._tw);
            this.holdingRect.y = this.holding.value[0] * (this._th);
            this.holdingRect.width = this._tw;
            this.holdingRect.height = this._th;
            if (imageWidthAdjust) {
                this.holdingRect.width += imageWidthAdjust;
            }
            if (imageHeightAdjust) {
                this.holdingRect.height += imageHeightAdjust;
            }
            return true;
        }
        return false;
    };
	NinjaSceneryThrower.prototype.pickUpAndStoreTileData = function(obj, imageWidthAdjust, imageHeightAdjust, dontReadyThrow) {
		
			this.holdings.push(obj);
			var hi = this.holdings.length - 1;
            this.holdingRect.x = this.holdings[hi].value[1] * (this._tw);
            this.holdingRect.y = this.holdings[hi].value[0] * (this._th);
            this.holdingRect.width = this._tw;
            this.holdingRect.height = this._th;
            if (imageWidthAdjust) {
                this.holdingRect.width += imageWidthAdjust;
            }
            if (imageHeightAdjust) {
                this.holdingRect.height += imageHeightAdjust;
            }
			
			if(!dontReadyThrow) { this._readyNextThrow(); } else { this.holding = null; }
			
            return true;
		
	};
	
	NinjaSceneryThrower.prototype.removeFromStorageByValue = function(tValue) {
		
		var i = 0; var l = this.holdings.length;
		for (i; i < l; i ++) {
			if(this.holdings[i] && this.holdings[i].value) {
				if(this.holdings[i].value[0] == tValue[0] && this.holdings[i].value[1] == tValue[1]) {
					
					this.holdings.splice(i, 1); break;
				}
			} else {
				if(this.holdings[i] && this.holdings[i].tileValue) {
					if(this.holdings[i].tileValue[0] == tValue[0] && this.holdings[i].tileValue[1] == tValue[1]) {
					
						this.holdings.splice(i, 1); break;
					}
				}
			}
		}
	};
	NinjaSceneryThrower.prototype.removeLastFromStorage = function() {
		
		if(this.holdings.length) {
			var sceneobj = this.holdings.pop();
			sceneobj.setX( this.x+1-1 );sceneobj.setY(  this.y+1-1 );
			this.holding = null;
			return sceneobj;
		} else {
			
			return null;
		}
		
		
	};
	
	
	NinjaSceneryThrower.prototype._tempDivs = [];
	NinjaSceneryThrower.prototype._displayStorageClearRect;
	
	
	
	
	NinjaSceneryThrower.prototype.displayStorage = function(img,cameraLayer,backgroundFromRect,bgx,bgy,tw,th, stx, sty, descriptions) {
		
		var i = 0; var l = this.holdings.length; var j = 0; 
		if(!this._displayStorageClearRect) {
			this._displayStorageClearRect = new Rectangle(backgroundFromRect.x + tw + 4, backgroundFromRect.y + th + 4, tw, th);
		}
		var xlc = stx +1-1; var ylc = sty +1-1;
		cameraLayer.copyPixels(img, backgroundFromRect, new MoverPoint( bgx, bgy ), backgroundFromRect.width, backgroundFromRect.height);
		for (i; i < l; i++) { 
			
			var val = this.holdings[i].value ? this.holdings[i].value : this.holdings[i].tileValue;
			
			cameraLayer.copyPixels(img, new Rectangle(val[1]*tw, val[0]*th, tw, th), new MoverPoint( xlc, ylc ), tw, th);
			if(!this._tempDivs[i]) this._tempDivs[i] = document.createElement("div");
			this._tempDivs[i].sceneryThrower = this;
			this._tempDivs[i].cDisplay = cameraLayer;
			this._tempDivs[i]._img = img;
			this._tempDivs[i]._dscr = this._displayStorageClearRect;
			
			var ttle = "";
			if(descriptions && descriptions.length >= 1) {
				for (j = 0; j < descriptions.length; j++) {
					if(descriptions[j][0] == val[0] && descriptions[j][1] == val[1]) {
						ttle = descriptions[j][2];
					}
				}
			}
			this._tempDivs[i].setAttribute("title", ttle);
			this._tempDivs[i].setAttribute("id", val[0]+"v"+val[1]+"");
			this._tempDivs[i].setAttribute("style", "position:absolute;width:"+tw+"px;height:"+th+"px;top:"+ylc+"px;left:"+xlc+"px;cursor:pointer;z-index:99999999999999999999999999999999999999999999999999999999999999999");
			this._tempDivs[i].removeEventListener(seekTouch() ? "touchstart" : "click", this.removeFromDisplayedStorage, false);
			this._tempDivs[i].addEventListener(seekTouch() ? "touchstart" : "click", this.removeFromDisplayedStorage, false);
			cameraLayer.canvas.offsetParent.appendChild(this._tempDivs[i]);
			
			xlc += tw*2;
			if(xlc >= tw*14) {
				
				xlc = stx +1-1;
				ylc += th*2;
			}
		}
	};
	
	
	NinjaSceneryThrower.prototype._removedFromStorage = [];
	
	NinjaSceneryThrower.prototype.removeFromDisplayedStorage = function(e) {
		
		
		var ele = e.target;
		var aVal = ele.id.split("v"); 
		function dep(sx) { 
			return Number(sx.replace("px",""));
		};
		
		aVal[0] = Number(aVal[0]); aVal[1] = Number(aVal[1]);
		ele.sceneryThrower.removeFromStorageByValue(aVal);
		ele.sceneryThrower._removedFromStorage.push(aVal);
		ele.cDisplay.copyPixels(ele._img, ele._dscr, new MoverPoint(dep(ele.style.left), dep(ele.style.top)), dep(ele.style.width), dep(ele.style.height));
		ele.removeEventListener(seekTouch() ? "touchstart" : "click", ele.sceneryThrower.removeFromDisplayedStorage, false);
		ele.offsetParent.removeChild(ele);
		
		
		
	};
	
	NinjaSceneryThrower.prototype.pickUpAndStore = function(obj, imageWidthAdjust, imageHeightAdjust, dontReadyThrow) {
		
			this.holdings.push(obj);
			var hi = this.holdings.length - 1;
            this.holdingRect.x = this.holdings[hi].tileValue[1] * (obj.width);
            this.holdingRect.y = this.holdings[hi].tileValue[0] * (obj.height);
            this.holdingRect.width = obj.width;
            this.holdingRect.height = obj.height;
            if (imageWidthAdjust) {
                this.holdingRect.width += imageWidthAdjust;
            }
            if (imageHeightAdjust) {
                this.holdingRect.height += imageHeightAdjust;
            }
			
			if(!dontReadyThrow) { this._readyNextThrow(); } else { this.holding = null; }
			
            return true;
		
	};
    NinjaSceneryThrower.prototype.pickUp = function(obj, imageWidthAdjust, imageHeightAdjust) {
        if (!this.holding) {
            this.holding = obj;
            this.holdingRect.x = obj.tileValue[1] * (obj.width);
            this.holdingRect.y = obj.tileValue[0] * (obj.height);
            this.holdingRect.width = obj.width;
            this.holdingRect.height = obj.height;
            if (imageWidthAdjust) {
                this.holdingRect.width += imageWidthAdjust;
            }
            if (imageHeightAdjust) {
                this.holdingRect.height += imageHeightAdjust;
            }
            return true;
        }
        return false;
    };
    NinjaSceneryThrower.prototype._throwHolding = function() {
        
		if(this.holdings.indexOf(this.holding) != -1) {
			this.holdings.splice(this.holdings.indexOf(this.holding), 1);
		}
        this.holding = null;
        
    };
	NinjaSceneryThrower.prototype._readyNextThrow = function() {
		
		if(this.holdings.length) {
			
				this.holding = this.holdings[this.holdings.length-1];
				if(this.holding.tileValue) {
					this.holdingRect.x = this.holding.tileValue[1] * (this.holding.width);
					this.holdingRect.y = this.holding.tileValue[0] * (this.holding.height);
					this.holdingRect.width = this.holding.width;
					this.holdingRect.height = this.holding.height;
				} else {
					this.holdingRect.x = this.holding.value[1] * (this._tW);
					this.holdingRect.y = this.holding.value[0] * (this._tH);
					this.holdingRect.width = this._tW;
					this.holdingRect.height = this._tH;
					
				}
		}
		
	};
	NinjaSceneryThrower.prototype.valueFromHolding = function(holdin) {
		
		return (holdin.value || holdin.tileValue);		
	};
	NinjaSceneryThrower.prototype.rectFromHolding = function(holdin) {
		
				if(holdin.tileValue) {
					this._holdingHelperRect.x = holdin.tileValue[1] * (holdin.width);
					this._holdingHelperRect.y = holdin.tileValue[0] * (holdin.height);
					this._holdingHelperRect.width = holdin.width;
					this._holdingHelperRect.height = holdin.height;
				} else {
					this._holdingHelperRect.x = holdin.value[1] * (this._tW);
					this._holdingHelperRect.y = holdin.value[0] * (this._tH);
					this._holdingHelperRect.width = this._tW;
					this._holdingHelperRect.height = this._tH;
				}
		return this._holdingHelperRect;
	};
    NinjaSceneryThrower.prototype.throwSceneryObject = function(w,h,jumps) {
        var scenery;
		
		if(this.holding == null && this.holdings.length) {
			this._readyNextThrow();
		}
		
        if (this.holding) {
            
            scenery = new SceneryObject(this.x+1-1,this.y+1-1,w||this._tw,h||this._th,this._map,null,1, this._deltaTime, this._tw, this._th,this._mapRows,this._mapColumns);
            scenery._jumps = (jumps == 0 ? 0 : 1);
            scenery.playerHoldingThis = this;
            scenery.tileValue = this.holding.value || this.holding.tileValue;
            scenery.tileRect = new Rectangle(this.holdingRect.x,this.holdingRect.y,this.holdingRect.width,this.holdingRect.height);

            this._throwHolding();
			
            return scenery;
        }
        return null;
    };
	NinjaSceneryThrower.prototype.throwSceneryObjectTraveler = function(w,h,jumps,pType) {
        var scenery;
		
		if(this.holding == null && this.holdings.length) {
			this._readyNextThrow();
		}
		
        if (this.holding) {
            
            scenery = pType ? this.holding : new SceneryObjectTraveler(this.x+1-1,this.y+1-1,w||this._tw,h||this._th,this._map,null,1, this._deltaTime, this._tw, this._th,this._mapRows,this._mapColumns);
            scenery.setX(  this.x+1-1 ); scenery.setY( this.y+1-1 );
			scenery._jumps = (jumps == 0 ? 0 : 1);
            scenery.playerHoldingThis = this;
            scenery.tileValue = this.holding.value || this.holding.tileValue;
            scenery.tileRect = new Rectangle(this.holdingRect.x,this.holdingRect.y,this.holdingRect.width,this.holdingRect.height);

            this._throwHolding();
			
            return scenery;
        }
        return null;
    };
    export { NinjaSceneryThrower   };

