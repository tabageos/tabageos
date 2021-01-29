(function() { 

	'use strict';
    /*
	* eWidth/eHeight the explosion width/height
	* countStop the amount of frames of the explosion animation
	* spriteSheetX/Y the starting x/y position in your sprite sheet, of the explosion animation.
	*/
    function ExplosionFactory(eWidth, eHeight, countStop, spriteSheetX, spriteSheetY) {
        this.explosionRect = new tabageos.Rectangle(0,0,eWidth,eHeight);
        this.explosionPoint = new tabageos.MoverPoint();
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

    /* ex/ey, x/y position to place the explosion animation
	* ecount, the frame to start from, when it reaches countStop the animation stops
	* fromX, the x position in the sprite sheet to start the animation from
	*/
    ExplosionFactory.prototype.addExplosion = function(ex, ey, ecount, fromX, fromY, width, height, throttle) {
        this.explosions[this.explosions.length] = this.explosionHold.pop();
        this.explosions[this.explosions.length - 1].x = ex;
        this.explosions[this.explosions.length - 1].y = ey;
        this.explosions[this.explosions.length - 1].count = ecount || 1;
        this.explosions[this.explosions.length - 1].fromX = fromX || 0;
        this.explosions[this.explosions.length - 1].fromY = fromY || 0;
		this.explosions[this.explosions.length - 1].width = width || 16;
        this.explosions[this.explosions.length - 1].height = height || 16;
		this.explosions[this.explosions.length - 1].throttle = throttle || 1;
    };
    /*
	* canvasObejct, the tabageos.CanvasObject to draw the explosion animations into
	* source, the html img soruce to draw from. your sprite sheet.
	* this method needs to be called during a loop.
	*/
    ExplosionFactory.prototype.displayExplosions = function(canvasObject, source) {
        var i = 0;
        var l = this.explosions.length;
        var eo;
        for (i; i < l; i++) {
            eo = this.explosions[i];
            if (eo) {  
                this.explosionRect.x = (eo.fromX || this.sFromX) + (Math.round(eo.count) * (eo.width || this.eWidth) );
                this.explosionRect.y = eo.fromY || this.sFromY;
				this.explosionRect.width = eo.width || this.eWidth;
				this.explosionRect.height = eo.height || this.eHeight;
                this.explosionPoint.x = eo.x;
                this.explosionPoint.y = eo.y;
                canvasObject.copyPixels(source, this.explosionRect, this.explosionPoint, this.explosionRect.width, this.explosionRect.height);
                eo.count += eo.throttle || 1;
                if (eo.count >= this.countStop) {
					tabageos.GeometricMath.splice(this.explosions, this.explosions.indexOf(eo));
					this.explosionHold[this.explosionHold.length] = eo;
                    continue;
                }
            }
        }
    };
    tabageos.ExplosionFactory = ExplosionFactory;
})();

