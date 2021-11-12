(function() { 

	'use strict';
	function SimpleIsoAnimation(source, canvasObject, fromRect, x, y, width, height) {
		tabageos.CanvasAnimation.call(this,source, canvasObject, fromRect, x, y, width, height);
		if (source || canvasObject) {
			this.init(source, canvasObject, fromRect, x, y, width, height);
		}
		this._currentValue = [];
	}
	SimpleIsoAnimation.prototype.constructor = SimpleIsoAnimation;
	SimpleIsoAnimation.prototype = Object.create(tabageos.CanvasAnimation.prototype);
	SimpleIsoAnimation.prototype._currentValue = [];
	SimpleIsoAnimation.prototype.getAnimationValue = function() {
		
		if( this.onlyHorizontalAnimations ) {
			
			var yi = this.animationSpecs[this.currentAnimation][0];
			var xi = this.animationSpecs[this.currentAnimation][1][Math.floor(this.ani)];
			this._currentValue[0] = yi+1-1; this._currentValue[1] = xi+1-1;
			
		} else {
			
			var xi = this.animationSpecs[this.currentAnimation][1][Math.floor(this.ani)];
			var yi = this.animationSpecs[this.currentAnimation][1][Math.floor(this.ani)+1];
			this._currentValue[0] = yi+1-1; this._currentValue[1] = xi+1-1;
			
		}
		return this._currentValue;
		
	};
	
	tabageos.SimpleIsoAnimation = SimpleIsoAnimation;
})();

