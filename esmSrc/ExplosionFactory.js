import { GeometricMath } from './GeometricMath.js';
import { Rectangle } from './Rectangle.js';
import { MoverPoint } from './MoverPoint.js';

	'use strict';
    
    function ExplosionFactory(eWidth, eHeight, countStop, spriteSheetX, spriteSheetY) {
        this.explosionRect = new Rectangle(0,0,eWidth,eHeight);
        this.explosionPoint = new MoverPoint();
        this.explosions = [];
        this.explosionHold = [];
        this.eWidth = eWidth;
        this.eHeight = eHeight;
        this.sFromX = spriteSheetX || 96;
        this.sFromY = spriteSheetY || 0;
        this.countStop = countStop;
        this.readyExplosions(51);
    };
	ExplosionFactory.prototype.constructor = ExplosionFactory;
    ExplosionFactory.prototype.eWidth;
    ExplosionFactory.prototype.eHeight;
    ExplosionFactory.prototype.countStop = 6;
    ExplosionFactory.prototype.explosions = [];
    ExplosionFactory.prototype.explosionRect;
    ExplosionFactory.prototype.explosionPoint;
    ExplosionFactory.prototype.sFromX = 96;
    ExplosionFactory.prototype.sFromY = 0;
    ExplosionFactory.prototype.explosionHold = [];
    ExplosionFactory.prototype.readyExplosions = function(amount) {
        while (amount > 0) {
            amount -= 1;
            this.explosionHold.push({
                x: 0,
                y: 0,
                count: 1,
                fromX: 0,
				fromY: 0,
				width: 0,
				height: 0,
				throttle: 1
            });
        }
    };

    
    ExplosionFactory.prototype.addExplosion = function(ex, ey, ecount, fromX, fromY, width, height, throttle) {
        this.explosions[this.explosions.length] = this.explosionHold.pop();
        this.explosions[this.explosions.length - 1].x = ex;
        this.explosions[this.explosions.length - 1].y = ey;
        this.explosions[this.explosions.length - 1].count = ecount || 1;
        this.explosions[this.explosions.length - 1].fromX = fromX || 0;
        this.explosions[this.explosions.length - 1].fromY = fromY || 0;
		this.explosions[this.explosions.length - 1].width = width || 0;
        this.explosions[this.explosions.length - 1].height = height || 0;
		this.explosions[this.explosions.length - 1].throttle = throttle || 1;
    };
    
    ExplosionFactory.prototype.displayExplosions = function(canvasObject, source, incerY, scene) {
        var i = 0;
        var l = this.explosions.length;
        var eo;
        for (i; i < l; i++) {
            eo = this.explosions[i];
            if (eo) {  
                this.explosionRect.x = (eo.fromX || this.sFromX) + ( incerY ? 0 : (Math.round(eo.count) * (eo.width || this.eWidth) )  );
                this.explosionRect.y = (eo.fromY || this.sFromY)  + (!incerY ? 0 : (Math.round(eo.count) * (eo.height || this.eHeight) ) );
				this.explosionRect.width = eo.width || this.eWidth;
				this.explosionRect.height = eo.height || this.eHeight;
                this.explosionPoint.x = eo.x;
                this.explosionPoint.y = eo.y;
				if(scene) {//new
					scene.drawValueAt([this.explosionRect.y/this.explosionRect.height, this.explosionRect.x/this.explosionRect.width], this.explosionPoint.x, this.explosionPoint.y,this.explosionRect.width,this.explosionRect.height);
				} else {
					canvasObject.copyPixels(source, this.explosionRect, this.explosionPoint, this.explosionRect.width, this.explosionRect.height);
				}
                eo.count += eo.throttle || 1;
                if (eo.count >= this.countStop) {
					GeometricMath.splice(this.explosions, this.explosions.indexOf(eo));
					eo.x= 0;
					eo.y= 0;
					eo.count= 1;
					eo.fromX= 0;
					eo.fromY= 0;
					eo.width= 0;
					eo.height= 0;
					eo.throttle= 1;
					this.explosionHold[this.explosionHold.length] = eo;
                    continue;
                }
            }
        }
    };
	
	
	ExplosionFactory.prototype.removeLastExplosion = function() {
		
		if(this.explosions.length) {
			this.explosionHold.push(this.explosions.pop());
		}
	};
	
	
    export { ExplosionFactory   };


