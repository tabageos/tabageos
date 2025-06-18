
	'use strict';
    function Event(type, potato) {
        this.type = type || "event";
        this.potato = potato || {};
		this.target = null;
    };
	Event.prototype.type = "";
    Event.prototype.potato = null;
    Event.prototype.target = null;
	Event.prototype.constructor = Event;
	Event.prototype.preventDefault = function() {
		
	};
    export { Event   };



