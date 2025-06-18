import { MoverPoint } from './MoverPoint.js';
import { Rectangle } from './Rectangle.js';
import { CanvasObject } from './CanvasObject.js';
import { EventDispatcher } from './EventDispatcher.js';

	'use strict';
    function LoopingImage(canvas, width, height) {
		EventDispatcher.call(this);
		CanvasObject.call(this,canvas,width,height);
        this.init(canvas, width, height);
        this.bI = 0;
        this.fRect = new Rectangle();
        this.tPoint = new MoverPoint();
    };
	LoopingImage.prototype.constructor = LoopingImage;
	LoopingImage.prototype = Object.create(EventDispatcher.prototype);
	Object.assign(LoopingImage.prototype, CanvasObject.prototype);
    LoopingImage.prototype.fRect = null;
    LoopingImage.prototype.bI = 0;
    LoopingImage.prototype.tPoint = null;
    LoopingImage.prototype.loopHorizontal = function(imgToLoop, w, h, incer) {
        this.fRect.x = this.bI;
        
        this.fRect.y = 0;
        
        this.fRect.width = w;
        
        this.fRect.height = h;
        
        this.tPoint.x = 0;
        this.copyPixels(imgToLoop, this.fRect, this.tPoint, w, h);
        
        if (this.bI > 0) {
            
            this.fRect.x = 0;
            
            this.tPoint.x = w - this.bI;
            
            this.fRect.width = this.bI;
            
            this.copyPixels(imgToLoop, this.fRect, this.tPoint, this.fRect.width, h);
        }
        if (this.bI < w) {
            this.bI += incer || 1;
        } else {
            this.bI = 0;
        }
    };
    export { LoopingImage   };



