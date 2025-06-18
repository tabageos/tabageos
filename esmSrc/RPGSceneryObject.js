import { MoverPoint } from './MoverPoint.js';
import { Rectangle } from './Rectangle.js';
import { TimeKeeper } from './TimeKeeper.js';
import { MoverSkeleton } from './MoverSkeleton.js';
import { MapMover } from './MapMover.js';
import { BlitMath } from './BlitMath.js';


	'use strict';
    
    function RPGSceneryObject(x,y,width,height,map,ca,dontCloneMap,dt,tw,th,mr,mc) {
		MoverSkeleton.call(this,x,y,width,height);
		MapMover.call(this,x,y,width,height, map,ca,dontCloneMap, dt, tw, th,mr,mc);
        this.width = width || 0;
        this.height = height || 0;
        this._middlePoint = new MoverPoint();
        this._pos = new MoverPoint(x || 0,y || 0);
        this._veloc = new MoverPoint(0,0);
        this._lastVeloc = new MoverPoint(0,0);
        this._lastPos = new MoverPoint(x,y);
        this._deltaTime = dt || TimeKeeper._sae;
        this._map = dontCloneMap ? map : BlitMath.cloneMultiArray(map);
        this._rect = new Rectangle(this.x,this.y,this.width,this.height);
        this._state = 1;
        this.x = x || 0;
        this.y = y || 0;
        this._tH = th || this.height;
        this._tW = tw || this.width;
        this._canvasAnimation = ca || null;
        this.playerHoldingThis = null;
        this.tileValue = null;
        this.weight = 24;
        this.xDirection = 1;
		this._solidSit = 0;this._eHit = 0;
		this.tileRect = null;
        this._checkHelper = new MoverPoint();
    };
	RPGSceneryObject.prototype.constructor = RPGSceneryObject;
	RPGSceneryObject.prototype = Object.create(MoverSkeleton.prototype);
	Object.assign(RPGSceneryObject.prototype, MapMover.prototype);
    RPGSceneryObject.prototype.playerHoldingThis; 
    RPGSceneryObject.prototype.weight = 1;
    RPGSceneryObject.prototype._canvasAnimation = null;
    RPGSceneryObject.prototype.xDirection = 1;
    RPGSceneryObject.prototype.tileValue = null;
    RPGSceneryObject.prototype.tileRect = null;
	RPGSceneryObject.prototype.description = "";
	RPGSceneryObject.prototype.equipsTo = "";
	RPGSceneryObject.prototype.health = 0;
	RPGSceneryObject.prototype.mp = 0;
	RPGSceneryObject.prototype.strength = 0;
    RPGSceneryObject.prototype.stamina = 0;
    RPGSceneryObject.prototype.luck = 0;
    RPGSceneryObject.prototype.magicPower = 0;
	RPGSceneryObject.prototype.abilityDescription = "";
	
    
    export { RPGSceneryObject   };










