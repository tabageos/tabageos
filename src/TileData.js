(function() { 

	'use strict';

	function TileData(p, value) {
		this.position = p || new tabageos.MoverPoint();
		this.value = value;
	};
	TileData.prototype.constructor = TileData;
	TileData.prototype.position;
	TileData.prototype.value;
	TileData._pool = [];
	TileData.make = function(x, y, value) {
		if (tabageos.TileData._pool.length <= 0) {
			var i = 0;
			for (i; i < 50; i++) {
				tabageos.TileData._pool.push(new tabageos.TileData(new tabageos.MoverPoint(),null));
			}
		}
		var td = tabageos.TileData._pool.pop();
		td.position.x = Math.floor(x);
		td.position.y = Math.floor(y);
		td.value = value;
		return td;
	};
	TileData.prototype.clone = function() {
		return new tabageos.TileData(this.position,this.value);
	};

	tabageos.TileData = TileData;
})();

