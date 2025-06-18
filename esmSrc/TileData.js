import { MoverPoint } from './MoverPoint.js';


	'use strict';

    function TileData(p, value) {
        this.position = p || new MoverPoint();
        this.value = value;
    };
    TileData.prototype.constructor = TileData;
    TileData.prototype.position;
    TileData.prototype.value;
    TileData._pool = [];
    TileData.make = function(x, y, value) {
        if (TileData._pool.length <= 0) {
            var i = 0;
            for (i; i < 50; i++) {
                TileData._pool.push(new TileData(new MoverPoint(),null));
            }
        }
        var td = TileData._pool.pop();
        td.position.x = Math.floor(x);
        td.position.y = Math.floor(y);
        td.value = value;
        return td;
    };
    TileData.prototype.clone = function() {
        return new TileData(this.position,this.value);
    };

    export { TileData   };


