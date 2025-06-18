import {Event} from './Event.js';
import {BlitMath} from './BlitMath.js';


	'use strict';
    function PatternActionEvent(tileValue, tileXIndex, tileYIndex, patternIndex, autoCompute, type, x, y) {
		Event.call(this,type);
        this.type = type || "patternActionEvent";
        this.potato = this.potato || {};
		this.target = null;
        this.typeToBe = type;
        this.tileValue = tileValue;
        this.tileXIndex = tileXIndex;
        this.tileYIndex = tileYIndex;
        this.autoCompute = autoCompute;
        this.patternIndex = patternIndex;
        this.x = x || 0;
        this.y = y || 0;
        if (autoCompute) {
            this.x = this.tileXIndex * BlitMath._specs.blitWidth;
            this.y = this.tileYIndex * BlitMath._specs.blitHeight;
        }
    };
	PatternActionEvent.prototype.constructor = PatternActionEvent;
	PatternActionEvent.prototype = Object.create(Event.prototype);
    PatternActionEvent.PATTERN_ACTION_EVENT = "patternActionEvent";
    PatternActionEvent.FUNCTION_ASSIGNMENT = "functionAssignment";
    PatternActionEvent.prototype.tileValue = null;
    PatternActionEvent.prototype.tileXIndex = 0;
    PatternActionEvent.prototype.tileYIndex = 0;
    PatternActionEvent.prototype.patternIndex = 0;
    PatternActionEvent.prototype.typeToBe = null;
    PatternActionEvent.prototype.autoCompute = false;
    PatternActionEvent.prototype.x = 0;
    PatternActionEvent.prototype.y = 0;
    PatternActionEvent.prototype.clone = function() {
        var pae = new PatternActionEvent(this.tileValue,this.tileXIndex,this.tileYIndex,this.patternIndex,this.autoCompute,this.typeToBe,this.x,this.y);
        pae.hitEvent = this.hitEvent || null;
        return pae;
    };
    export { PatternActionEvent   };



