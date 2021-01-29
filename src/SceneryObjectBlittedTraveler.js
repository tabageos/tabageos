(function() { 

	'use strict';
   
    function SceneryObjectBlittedTraveler(source, canvasObject, fromRect, x, y, width, height) {
		tabageos.TravelerSkeleton.call(this,x,y,width,height);
		tabageos.Traveler.call(this,x,y,width,height);
		tabageos.BlittedTraveler.call(this,source,canvasObejct,fromRect,x,y,width,height);
        this.init(source, canvasObject, fromRect, x, y, width, height);
        this.playerHoldingThis = null;
        this.tileValue = null;
        this.weight = 1;
        this.xDirection = 1;
    };
	SceneryObjectBlittedTraveler.prototype.constructor = SceneryObjectBlittedTraveler;
	SceneryObjectBlittedTraveler.prototype = Object.create(tabageos.TravelerSkeleton.prototype);
	Object.assign(SceneryObjectBlittedTraveler.prototype, tabageos.Traveler.prototype, tabageos.BlittedTraveler.prototype);
    SceneryObjectBlittedTraveler.prototype.playerHoldingThis;
    SceneryObjectBlittedTraveler.prototype.weight = 1;
    SceneryObjectBlittedTraveler.prototype.xDirection = 1;
    SceneryObjectBlittedTraveler.prototype.tileValue = null;
	SceneryObjectBlittedTraveler.prototype._fromEnemyAi = 0;

    tabageos.SceneryObjectBlittedTraveler = SceneryObjectBlittedTraveler;
})();


