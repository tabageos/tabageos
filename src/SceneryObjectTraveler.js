(function() { 

	'use strict';
   
    function SceneryObjectTraveler(x,y,width,height, map,ca,dontCloneMap, dt, tileW, tileH, rows, columns) {
		tabageos.TravelerSkeleton.call(this,x,y,width,height);
		tabageos.MapTraveler.call(this,x,y,width,height, map,ca,dontCloneMap, dt, tileW, tileH, rows, columns);
		
        this.playerHoldingThis = null;
        this.tileValue = null;
        this.weight = 1;
        this.xDirection = 1;
		this._fromEnemyAi = 0;
    };
	SceneryObjectTraveler.prototype.constructor = SceneryObjectTraveler;
	SceneryObjectTraveler.prototype = Object.create(tabageos.TravelerSkeleton.prototype);
	Object.assign(SceneryObjectTraveler.prototype, tabageos.MapTraveler.prototype);
    SceneryObjectTraveler.prototype.playerHoldingThis;
	SceneryObjectTraveler.prototype._fromEnemyAi = 0;
    SceneryObjectTraveler.prototype.weight = 1;
    SceneryObjectTraveler.prototype.xDirection = 1;
    SceneryObjectTraveler.prototype.tileValue = null;

    tabageos.SceneryObjectTraveler = SceneryObjectTraveler;
})();


