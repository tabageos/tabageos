(function() { 
	'use strict';
	function BoundMethods() {};
	BoundMethods.boundTo = function(mover, boundObject) {
		var pos = mover.getPosition();
		var width = mover.width;
		var height = mover.height;
		if (pos.x + width >= boundObject.x + boundObject.width) {
			pos.x = boundObject.x + boundObject.width - width;
		}
		if (pos.x < boundObject.x) {
			pos.x = boundObject.x;
		}
		if (pos.y + height >= boundObject.y + boundObject.height) {
			pos.y = boundObject.y + boundObject.height - height;
		}
		if (pos.y < boundObject.y) {
			pos.y = boundObject.y;
		}
	};
	BoundMethods.bounceOff = function(mover, boundObject) {
		var pos = mover.getPosition();
		var width = mover.width;
		var height = mover.height;
		if (pos.x + width >= boundObject.x + boundObject.width) {
			pos.x = boundObject.x + boundObject.width - width;
			mover._veloc.x *= -1;
		}
		if (pos.x < boundObject.x) {
			pos.x = boundObject.x;
			mover._veloc.x *= -1;
			
		}
		if (pos.y + height >= boundObject.y + boundObject.height) {
			pos.y = boundObject.y + boundObject.height - height;
			mover._veloc.y *= -1;
		}
		if (pos.y < boundObject.y) {
			pos.y = boundObject.y;
			mover._veloc.y *= -1;
		}
	};
	BoundMethods.wrapAround = function(mover, boundObject) {
		var pos = mover.getPosition();
		var width = mover.width;
		var height = mover.height;
		if (pos.x > boundObject.x + boundObject.width + width) {
			pos.x = boundObject.x - width;
		}
		if (pos.x < boundObject.x - width) {
			pos.x = boundObject.x + boundObject.width + width;
		}
		if (pos.y > boundObject.y + boundObject.height + height) {
			pos.y = boundObject.y - height;
		}
		if (pos.y < boundObject.y - height) {
			pos.y = boundObject.y + boundObject.height;
		}
	};
	tabageos.BoundMethods = BoundMethods;
})();

