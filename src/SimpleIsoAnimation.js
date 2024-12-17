(function() { 

	'use strict';
            function SimpleIsoAnimation(source, canvasObject, fromRect, x, y, width, height, scene) {
				tabageos.CanvasAnimation.call(this,source, canvasObject, fromRect, x, y, width, height);
                if (source || canvasObject) {
                    this.init(source, canvasObject, fromRect, x, y, width, height);
                }
                this._currentValue = [];
				this._scene = scene;
            }
            SimpleIsoAnimation.prototype.constructor = SimpleIsoAnimation;
            SimpleIsoAnimation.prototype = Object.create(tabageos.CanvasAnimation.prototype);
            SimpleIsoAnimation.prototype._currentValue = [];
			SimpleIsoAnimation.prototype._scene = null;
			
			//new
			SimpleIsoAnimation.prototype.changeAnimation = function(to) {
				
				this.currentAnimation = to;
				this.ani = 0;
				
				
			};
			SimpleIsoAnimation.prototype.blit = function(r, p, igf,cw,ch) {
				if (r)
					this.fromRect = r;
				if (p) {
					this.toPoint = p;
				} else if (!igf) {
					this.toPoint.x = this.x - (this.fromWidthOffset != 0 ? this.fromWidthOffset/2 : 0);
					this.toPoint.y = this.y - this.fromHeightOffset;
				} else if(igf) {
					this.toPoint.x = this.x;
					this.toPoint.y = this.y;
				}
				
				if(this._scene) {
					
					this._scene.drawValueAt(this.getAnimationValue(), this.toPoint.x,this.toPoint.y,cw||this.fromRect.width,ch||this.fromRect.height,this._canvas, this.fromWidthOffset,this.fromHeightOffset );
					
				} else {
					this._canvas.copyPixels(this._source, this.fromRect, this.toPoint, cw||this.fromRect.width, ch||this.fromRect.height);
				
					
				}
				
			};
            SimpleIsoAnimation.prototype.getAnimationValue = function() {
              
				if( this.onlyHorizontalAnimations ) {
			  
					var yi = this.animationSpecs[this.currentAnimation][0];
					var xi = this.animationSpecs[this.currentAnimation][1][Math.floor(this.ani)];
					this._currentValue[0] = yi+1-1; this._currentValue[1] = xi+1-1;
				
				} else {
					var ain = Math.floor(this.ani); if(ain % 2 != 0) { ain = ain -1; }
					var xi = this.animationSpecs[this.currentAnimation][1][Math.floor(ain)];
					var yi = this.animationSpecs[this.currentAnimation][1][Math.floor(ain)+1];
					this._currentValue[0] = yi+1-1; this._currentValue[1] = xi+1-1;
					
					
					
				}
                return this._currentValue;
                
            };
            
            tabageos.SimpleIsoAnimation = SimpleIsoAnimation;
})();