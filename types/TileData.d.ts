declare function TileData(p: MoverPoint, value: any): void;
/**
*   @class TileData
*    @classdesc
*      Used by the BlitMath Class in some methods.
*
*
* @param p {MoverPoint}
* @param value  {Object}
*
*/
declare function TileData(p: MoverPoint, value: any): void;
declare class TileData {
    constructor(p: MoverPoint, value: any);
    /**
    *   @class TileData
    *    @classdesc
    *      Used by the BlitMath Class in some methods.
    *
    *
    * @param p {MoverPoint}
    * @param value  {Object}
    *
    */
    constructor(p: MoverPoint, value: any);
    position: MoverPoint;
    value: any;
    /**
    *
    *    Clones this TileData instance.
    *
    * @memberof TileData.prototype
    * @method clone
    * @returns {TileData}
    */
    clone(): TileData;
}
declare namespace TileData {
    let _pool: any[];
    /**
    *
    *    Constructs a new TileData with the values given.
    *    @static
    * @method make
    * @memberof TileData
    *
    * @param x {Number}
    * @param y {Number}
    * @param value {Object} The value the tile holds
    *
    * @returns {TileData}
    */
    function make(x: number, y: number, value: any): TileData;
}
//# sourceMappingURL=TileData.d.ts.map