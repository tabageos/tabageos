import { MoverPoint } from './MoverPoint.js';
import { Rectangle } from './Rectangle.js';
import { TimeKeeper } from './TimeKeeper.js';
import { MoverSkeleton } from './MoverSkeleton.js';
import { MapMover } from './MapMover.js';
import { BlitMath } from './BlitMath.js';

	'use strict';
    
    function SceneryObject(x,y,width,height,map,ca,dontCloneMap,dt,tw,th,mr,mc) {
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
	SceneryObject.prototype.constructor = SceneryObject;
	SceneryObject.prototype = Object.create(MoverSkeleton.prototype);
	Object.assign(SceneryObject.prototype, MapMover.prototype);
    SceneryObject.prototype.playerHoldingThis; 
    SceneryObject.prototype.weight = 1;
    SceneryObject.prototype._canvasAnimation = null;
    SceneryObject.prototype.xDirection = 1;
    SceneryObject.prototype.tileValue = null;
    SceneryObject.prototype.tileRect = null;
	SceneryObject.prototype._eHit = 0;
	SceneryObject.prototype._solidSit = 0;
    
    export { SceneryObject   };



