import {EventDispatcher} from './EventDispatcher.js';
import {TimeKeeper} from './TimeKeeper.js';
import {ScreenOrganizer} from './ScreenOrganizer.js';
import {Rectangle} from './Rectangle.js';


	'use strict';
    function IrisScreenOrganizer(game, screenClasses, screenConfigs, noWorker) {
		EventDispatcher.call(this);
		ScreenOrganizer.call(this,game,screenClasses,screenConfigs, noWorker);
        this.fullRect = new Rectangle();
        this.init(game, screenClasses, screenConfigs);
    };
	IrisScreenOrganizer.prototype.constructor = IrisScreenOrganizer;
	IrisScreenOrganizer.prototype = Object.create(EventDispatcher.prototype);
	Object.assign(IrisScreenOrganizer.prototype, ScreenOrganizer.prototype);
    IrisScreenOrganizer.prototype.fullRect = null;
    IrisScreenOrganizer.prototype.initializeTransition = function() {
        this.coverShape.setAlpha(1);
        this.rectRef.width = this.coverShape.width;
        this.rectRef.height = this.coverShape.height;
        this.fullRect.x = 0;
        this.fullRect.y = 0;
        this.fullRect.width = this.coverShape.width;
        this.fullRect.height = this.coverShape.height;
        this.coverShape.clear();
       
    };
    IrisScreenOrganizer.prototype.transitionBackward = function() {
        this.rectRef.height += 16 * TimeKeeper._sae;
        var w = this.coverShape.width;
        var h = this.coverShape.height;
        this.coverShape.context.fillStyle = "#000000";
        this.coverShape.context.fillRect(0, 0, w, h);
        this.coverShape.context.save();
        this.coverShape.context.beginPath();
        this.coverShape.context.arc(w / 2, h / 2, this.rectRef.height >= 0 ? this.rectRef.height : 0, 0, Math.PI * 2);
        this.coverShape.context.clip();
        this.coverShape.context.clearRect(0, 0, w, h);
        this.coverShape.context.restore();
		var tbgth = this.coverShape.height > this.coverShape.width ? this.coverShape.height : this.coverShape.width;
        var b = this.rectRef.height >= tbgth;
        if (b) {
            this.rectRef.width = 0;
            this.rectRef.height = tbgth;
        }
        return b;
    };
    IrisScreenOrganizer.prototype.transitionForward = function() { 
        this.rectRef.height -= 16 * TimeKeeper._sae;
        var w = this.coverShape.width;
        var h = this.coverShape.height;
        this.coverShape.context.fillStyle = "#000000";
        this.coverShape.context.fillRect(0, 0, w, h);
        this.coverShape.context.save();
        this.coverShape.context.beginPath();
        this.coverShape.context.arc(w / 2, h / 2, this.rectRef.height >= 0 ? this.rectRef.height : 0, 0, Math.PI * 2);
        this.coverShape.context.clip();
        this.coverShape.context.clearRect(0, 0, w, h);
        this.coverShape.context.restore();
        var b = this.rectRef.height <= 0;
        if (b) {
            this.rectRef.width = 0;
            this.rectRef.height = 0;
        }
        return b;
    };
    export { IrisScreenOrganizer   };


