(function() { 
	'use strict';
    function ScreenChangeEvent(scn, type, potato) {
		tabageos.Event.call(this,type,potato);
		this.target = null;
        this.screenChangeNumber = scn || 0;
        this.type = type || "screenChange";
        this.potato = potato || {};
    }
    ;
	ScreenChangeEvent.prototype.constructor = ScreenChangeEvent;
	ScreenChangeEvent.prototype = Object.create(tabageos.Event.prototype);
    ScreenChangeEvent.prototype.screenChangeNumber = 0;
    ScreenChangeEvent.SCREEN_CHANGE = "screenChange";
    ScreenChangeEvent.COVER = "cover";
    ScreenChangeEvent.UNCOVER = "unCover";
    ScreenChangeEvent.UNDER_COVER_CHANGES_COMPLETE = "underCoverChangesComplete";
    tabageos.ScreenChangeEvent = ScreenChangeEvent;
})();



