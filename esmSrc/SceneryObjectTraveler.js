import { TravelerSkeleton } from './TravelerSkeleton.js';
import { MapTraveler} from './MapTraveler.js';

	'use strict';
   
    function SceneryObjectTraveler(x,y,width,height, map,ca,dontCloneMap, dt, tileW, tileH, rows, columns) {
		TravelerSkeleton.call(this,x,y,width,height);
		MapTraveler.call(this,x,y,width,height, map,ca,dontCloneMap, dt, tileW, tileH, rows, columns);
		
        this.playerHoldingThis = null;
        this.tileValue = null;this.tileRect = null;
        this.weight = 1;
        this.xDirection = 1;
		this._fromEnemyAi = 0;
    };
	SceneryObjectTraveler.prototype.constructor = SceneryObjectTraveler;
	SceneryObjectTraveler.prototype = Object.create(TravelerSkeleton.prototype);
	Object.assign(SceneryObjectTraveler.prototype, MapTraveler.prototype);
    SceneryObjectTraveler.prototype.playerHoldingThis;
	SceneryObjectTraveler.prototype._fromEnemyAi = 0;
    SceneryObjectTraveler.prototype.weight = 1;
    SceneryObjectTraveler.prototype.xDirection = 1;
    SceneryObjectTraveler.prototype.tileValue = null;
	SceneryObjectTraveler.prototype.tileRect = null;

    export { SceneryObjectTraveler   };



