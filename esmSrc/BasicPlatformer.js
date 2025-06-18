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
	
	
	function BasicPlatformer(x,y,width,height, map, ca,dontCloneMap,dt,tWidth,tHeight,mr,mc, mapOfOriginalTiles, controller, ladderTileValue) {
		TravelerSkeleton.call(this, x, y, width, height);
		MapTraveler.call(this,x,y,width,height, map,ca,dontCloneMap, dt, tWidth,tHeight, mr, mc);
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
		this.tileMap = mapOfOriginalTiles;
		this._controllerRef = controller;
		this.ladderValue = ladderTileValue;
		this._hlpp = new MoverPoint();
		
	};
	BasicPlatformer.prototype.constructor = BasicPlatformer;
	BasicPlatformer.prototype = Object.create(TravelerSkeleton.prototype);
	Object.assign(BasicPlatformer.prototype, MapTraveler.prototype, TravelingSceneryThrower.prototype);
	
	
	BasicPlatformer.prototype.onLadder = 0;
	BasicPlatformer.prototype.onMovingPlatform = 0;
	BasicPlatformer.prototype.ladderValue = 0;
	
	BasicPlatformer.prototype.tileMap = null;
	
	BasicPlatformer.prototype.tile = null;
	BasicPlatformer.prototype.tilelUp = null;
	BasicPlatformer.prototype.tileDown = null;
	BasicPlatformer.prototype.tileLeft = null;
	BasicPlatformer.prototype.tileRight = null;
	BasicPlatformer.prototype._hlpp = null;
	
	BasicPlatformer.prototype.getValuesOfCloseTiles = function(map) {
		
		var fpx = Math.floor(this.x);
        var fpy = Math.floor(this.y);
		
        this.tile = BlitMath.checkTileValueAt(fpx,fpy,map||this.tileMap,this._tW,this._tH);
        this.tileUp = BlitMath.checkTileValueAt(fpx,fpy-this._tH,map||this.tileMap,this._tW,this._tH);
        this.tileDown = BlitMath.checkTileValueAt(fpx,fpy+this._tH,map||this.tileMap,this._tW,this._tH);
        this.tileLeft = BlitMath.checkTileValueAt(fpx-this._tW,fpy,map||this.tileMap,this._tW,this._tH);
        this.tileRight = BlitMath.checkTileValueAt(fpx+this._tW,fpy,map||this.tileMap,this._tW,this._tH);
		
	};
	
	BasicPlatformer.prototype.valuesMatch = function(val1, val2) {
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
	
	BasicPlatformer.prototype._addedToChangeDirectionAni = function(left, right, up, down, keepAniIndex, noIdle) {
		var btns = this._playerRef._controllerRef.buttons;
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
	
	export { BasicPlatformer   };
	




