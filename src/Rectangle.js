(function() { 
	'use strict';
    function Rectangle(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.height = height || 0;
        this.width = width || 0;
    };
	Rectangle.prototype.x = 0;
    Rectangle.prototype.y = 0;
    Rectangle.prototype.width = 0;
    Rectangle.prototype.height = 0;
	Rectangle.prototype.constructor = Rectangle;
    tabageos.Rectangle = Rectangle;
})();

