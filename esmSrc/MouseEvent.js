import {Event} from './Event.js';

	'use strict';
    function MouseEvent(type, potato) {
		Event.call(this,type,potato);
        this.type = type || "mouseEvent";
        this.potato = potato;
		this.target = null;
		this.x = 0; this.y = 0;
    };
	MouseEvent.prototype.constructor = MouseEvent;
	MouseEvent.prototype = Object.create(Event.prototype);
    MouseEvent.prototype.x = 0;
    MouseEvent.prototype.y = 0;
    MouseEvent.MOUSE_UP = "mouseUp";
    MouseEvent.MOUSE_DOWN = "mouseDown";
    MouseEvent.MOUSE_EVENT = "mouseEvent";
    MouseEvent.MOUSE_MOVE = "mouseMove";

    export { MouseEvent   };


