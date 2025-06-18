import { MoverPoint } from './MoverPoint.js';
import { Rectangle } from './Rectangle.js';
import { Event } from './Event.js';
import { EventDispatcher } from './EventDispatcher.js';
import { TimeKeeper } from './TimeKeeper.js';
import { TravelerSkeleton } from './TravelerSkeleton.js';
import { BoundMethods } from './BoundMethods.js';
import { BlitMath } from './BlitMath.js';
import { Traveler } from './Traveler.js';
import { BlittedTraveler } from './BlittedTraveler.js';


	'use strict';
   
    function SceneryObjectBlittedTraveler(source, canvasObject, fromRect, x, y, width, height) {
		TravelerSkeleton.call(this,x,y,width,height);
		Traveler.call(this,x,y,width,height);
		BlittedTraveler.call(this,source,canvasObject,fromRect,x,y,width,height);
        this.init(source, canvasObject, fromRect, x, y, width, height);
        this.playerHoldingThis = null;
        this.tileValue = null;
		this.tileRect = null;
        this.weight = 1;
        this.xDirection = 1;
    };
	SceneryObjectBlittedTraveler.prototype.constructor = SceneryObjectBlittedTraveler;
	SceneryObjectBlittedTraveler.prototype = Object.create(TravelerSkeleton.prototype);
	Object.assign(SceneryObjectBlittedTraveler.prototype, Traveler.prototype, BlittedTraveler.prototype);
    SceneryObjectBlittedTraveler.prototype.playerHoldingThis;
    SceneryObjectBlittedTraveler.prototype.weight = 1;
    SceneryObjectBlittedTraveler.prototype.xDirection = 1;
    SceneryObjectBlittedTraveler.prototype.tileValue = null;
	SceneryObjectBlittedTraveler.prototype.tileRect = null;
	SceneryObjectBlittedTraveler.prototype._fromEnemyAi = 0;

    export { SceneryObjectBlittedTraveler   };



