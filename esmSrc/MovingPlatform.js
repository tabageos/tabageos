import { MoverPoint } from './MoverPoint.js';
import { Rectangle } from './Rectangle.js';
import { Event } from './Event.js';
import { EventDispatcher } from './EventDispatcher.js';
import { TimeKeeper } from './TimeKeeper.js';
import { TravelerSkeleton } from './TravelerSkeleton.js';
import { BoundMethods } from './BoundMethods.js';
import { BlitMath } from './BlitMath.js';
import { MapTraveler} from './MapTraveler.js';

	'use strict';
	
	function MovingPlatform(direcX,direcY,x,y,width,height, map,ca,dontCloneMap, dt,tw,th, mr, mc) {
		TravelerSkeleton.call(this,x,y,width,height);
		MapTraveler.call(this,x,y,width,height, map,ca,dontCloneMap, dt,tw,th,mr,mc);
		this.width = width || 0;
        this.height = height || 0;
        this._middlePoint = new MoverPoint();
        this._pos = new MoverPoint(x,y);
        this._veloc = new MoverPoint(0,0);
        this._lastVeloc = new MoverPoint(0,0);
        this._lastPos = new MoverPoint(x,y);
        this._deltaTime = dt || TimeKeeper._sae;
        this._map = dontCloneMap ? map : BlitMath.cloneMultiArray(map);
        this._rect = new Rectangle(this.x,this.y,this.width,this.height);
        this._state = 1;
        this.forceApplier = new MoverPoint();
        this.forceHolder = new MoverPoint();
        this._canvasAnimation = ca || null;
        this._w = width || 0;
        this._h = height || 0;
        this.wanderOffset = new MoverPoint(0,0);
        this.blankMO = new MoverPoint();
        this._eventDispatcher = new EventDispatcher();
        this.x = x || 0;
        this.y = y || 0;
		this._tw = tw;
		this._th = th;
        this._checkHelper = new MoverPoint();
		this._inp = new MoverPoint();
		this._direcX = direcX || 0;
		this._direcY = (direcY == -1 ? direcY : (direcY || 0));
		this._horizontal = this._direcX == -1 || this._direcX == 1;
	}
	MovingPlatform.prototype.constructor = MovingPlatform;
	MovingPlatform.prototype = Object.create(TravelerSkeleton.prototype);
	Object.assign(MovingPlatform.prototype, MapTraveler.prototype);
	MovingPlatform.prototype._inp;
	MovingPlatform.prototype._tw;
	MovingPlatform.prototype._th;
	MovingPlatform.prototype._horizontal = 1;
	MovingPlatform.prototype._direcX;
	MovingPlatform.prototype._direcY;
	
	export { MovingPlatform   };
	



